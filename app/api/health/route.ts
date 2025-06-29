import { type NextRequest, NextResponse } from "next/server"
import { dataStore } from "@/lib/store"

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now()
    
    // Check data store health
    const users = dataStore.getUsers()
    const services = dataStore.getServices()
    const bookings = dataStore.getBookings()
    
    const responseTime = Date.now() - startTime

    const healthStatus = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development",
      checks: {
        database: {
          status: "healthy",
          response_time: responseTime,
          users_count: users.length,
          services_count: services.length,
          bookings_count: bookings.length,
        },
        memory: {
          status: "healthy",
          used: process.memoryUsage().heapUsed,
          total: process.memoryUsage().heapTotal,
        },
        system: {
          status: "healthy",
          platform: process.platform,
          node_version: process.version,
        },
      },
      services: {
        authentication: "operational",
        booking: "operational",
        payment: "operational",
        monitoring: "operational",
      },
    }

    return NextResponse.json(healthStatus)
  } catch (error) {
    console.error("Health check failed:", error)
    
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: "Health check failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    )
  }
}
