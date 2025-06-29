import { type NextRequest, NextResponse } from "next/server"

interface PerformanceMetric {
  timestamp: number
  endpoint: string
  method: string
  responseTime: number
  statusCode: number
  userAgent?: string
  ip?: string
  userId?: number
}

interface SystemMetrics {
  timestamp: number
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  activeConnections: number
  requestsPerMinute: number
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: PerformanceMetric[] = []
  private systemMetrics: SystemMetrics[] = []
  private readonly maxMetrics = 10000 // Keep last 10k metrics

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  recordMetric(metric: PerformanceMetric) {
    this.metrics.push(metric)

    // Keep only recent metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics)
    }
  }

  recordSystemMetric(metric: SystemMetrics) {
    this.systemMetrics.push(metric)

    // Keep only last 24 hours of system metrics (assuming 1 per minute)
    if (this.systemMetrics.length > 1440) {
      this.systemMetrics = this.systemMetrics.slice(-1440)
    }
  }

  getMetrics(timeRange = 3600000): PerformanceMetric[] {
    const cutoff = Date.now() - timeRange
    return this.metrics.filter((m) => m.timestamp > cutoff)
  }

  getSystemMetrics(timeRange = 3600000): SystemMetrics[] {
    const cutoff = Date.now() - timeRange
    return this.systemMetrics.filter((m) => m.timestamp > cutoff)
  }

  getPerformanceStats(timeRange = 3600000) {
    const metrics = this.getMetrics(timeRange)

    if (metrics.length === 0) {
      return {
        totalRequests: 0,
        averageResponseTime: 0,
        errorRate: 0,
        slowestEndpoints: [],
        statusCodeDistribution: {},
      }
    }

    const totalRequests = metrics.length
    const averageResponseTime = metrics.reduce((sum, m) => sum + m.responseTime, 0) / totalRequests
    const errorCount = metrics.filter((m) => m.statusCode >= 400).length
    const errorRate = (errorCount / totalRequests) * 100

    // Group by endpoint for slowest endpoints
    const endpointStats: { [key: string]: { count: number; totalTime: number; errors: number } } = {}

    metrics.forEach((metric) => {
      const key = `${metric.method} ${metric.endpoint}`
      if (!endpointStats[key]) {
        endpointStats[key] = { count: 0, totalTime: 0, errors: 0 }
      }
      endpointStats[key].count++
      endpointStats[key].totalTime += metric.responseTime
      if (metric.statusCode >= 400) {
        endpointStats[key].errors++
      }
    })

    const slowestEndpoints = Object.entries(endpointStats)
      .map(([endpoint, stats]) => ({
        endpoint,
        averageResponseTime: stats.totalTime / stats.count,
        requestCount: stats.count,
        errorRate: (stats.errors / stats.count) * 100,
      }))
      .sort((a, b) => b.averageResponseTime - a.averageResponseTime)
      .slice(0, 10)

    // Status code distribution
    const statusCodeDistribution: { [key: string]: number } = {}
    metrics.forEach((metric) => {
      const statusRange = `${Math.floor(metric.statusCode / 100)}xx`
      statusCodeDistribution[statusRange] = (statusCodeDistribution[statusRange] || 0) + 1
    })

    return {
      totalRequests,
      averageResponseTime: Math.round(averageResponseTime),
      errorRate: Math.round(errorRate * 100) / 100,
      slowestEndpoints,
      statusCodeDistribution,
    }
  }

  getSystemStats(timeRange = 3600000) {
    const metrics = this.getSystemMetrics(timeRange)

    if (metrics.length === 0) {
      return {
        averageCpuUsage: 0,
        averageMemoryUsage: 0,
        averageDiskUsage: 0,
        peakConnections: 0,
        requestsPerMinute: 0,
      }
    }

    return {
      averageCpuUsage: Math.round((metrics.reduce((sum, m) => sum + m.cpuUsage, 0) / metrics.length) * 100) / 100,
      averageMemoryUsage: Math.round((metrics.reduce((sum, m) => sum + m.memoryUsage, 0) / metrics.length) * 100) / 100,
      averageDiskUsage: Math.round((metrics.reduce((sum, m) => sum + m.diskUsage, 0) / metrics.length) * 100) / 100,
      peakConnections: Math.max(...metrics.map((m) => m.activeConnections)),
      requestsPerMinute: Math.round(metrics.reduce((sum, m) => sum + m.requestsPerMinute, 0) / metrics.length),
    }
  }
}

// In production, this would connect to a real performance monitoring service
const mockPerformanceData = {
  response_times: {
    average: 245,
    p95: 450,
    p99: 890,
  },
  throughput: {
    requests_per_minute: 1250,
    requests_per_hour: 75000,
    requests_per_day: 1800000,
  },
  errors: {
    error_rate: 0.02, // 2%
    total_errors: 45,
    errors_today: 12,
  },
  endpoints: [
    {
      path: "/api/bookings",
      avg_response_time: 180,
      request_count: 450,
      error_count: 3,
    },
    {
      path: "/api/services",
      avg_response_time: 95,
      request_count: 1200,
      error_count: 1,
    },
    {
      path: "/api/auth/login",
      avg_response_time: 320,
      request_count: 280,
      error_count: 8,
    },
  ],
  system: {
    cpu_usage: 45,
    memory_usage: 62,
    disk_usage: 78,
    uptime: 86400, // seconds
  },
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const metric = searchParams.get("metric")

    if (metric) {
      // Return specific metric
      const data = mockPerformanceData[metric as keyof typeof mockPerformanceData]
      if (data) {
        return NextResponse.json(data)
      } else {
        return NextResponse.json(
          { error: "Metric not found" },
          { status: 404 }
        )
      }
    }

    // Return all performance data
    return NextResponse.json(mockPerformanceData)
  } catch (error) {
    console.error("Failed to fetch performance data:", error)
    return NextResponse.json(
      { error: "Failed to fetch performance data" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const monitor = PerformanceMonitor.getInstance()

    if (body.type === "system") {
      monitor.recordSystemMetric({
        timestamp: Date.now(),
        cpuUsage: body.cpuUsage || 0,
        memoryUsage: body.memoryUsage || 0,
        diskUsage: body.diskUsage || 0,
        activeConnections: body.activeConnections || 0,
        requestsPerMinute: body.requestsPerMinute || 0,
      })
    } else {
      monitor.recordMetric({
        timestamp: Date.now(),
        endpoint: body.endpoint,
        method: body.method,
        responseTime: body.responseTime,
        statusCode: body.statusCode,
        userAgent: body.userAgent,
        ip: body.ip,
        userId: body.userId,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Performance recording error:", error)
    return NextResponse.json({ success: false, message: "Failed to record performance data" }, { status: 500 })
  }
}
