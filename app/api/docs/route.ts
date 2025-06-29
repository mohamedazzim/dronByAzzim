import { type NextRequest, NextResponse } from "next/server"

const apiDocumentation = {
  version: "1.0.0",
  title: "SkyVision Pro API Documentation",
  description: "Comprehensive API documentation for the drone booking platform",
  base_url: "https://api.skyvisionpro.com/v1",
  endpoints: {
    authentication: {
      login: {
        method: "POST",
        path: "/api/auth/login",
        description: "Authenticate user and return session token",
        parameters: {
          email: "string (required)",
          password: "string (required)",
        },
        response: {
          success: "boolean",
          token: "string",
          user: "User object",
        },
      },
      register: {
        method: "POST",
        path: "/api/auth/register",
        description: "Register a new user account",
        parameters: {
          fullName: "string (required)",
          email: "string (required)",
          phone: "string (required)",
          password: "string (required, min 8 chars)",
        },
        response: {
          success: "boolean",
          message: "string",
          data: "User object",
        },
      },
      forgot_password: {
        method: "POST",
        path: "/api/auth/forgot-password",
        description: "Send password reset email",
        parameters: {
          email: "string (required)",
        },
        response: {
          success: "boolean",
          message: "string",
        },
      },
    },
    services: {
      list: {
        method: "GET",
        path: "/api/services",
        description: "Get all available drone services",
        parameters: {},
        response: "Array of Service objects",
      },
      details: {
        method: "GET",
        path: "/api/services/[id]",
        description: "Get specific service details",
        parameters: {
          id: "number (required)",
        },
        response: "Service object",
      },
    },
    bookings: {
      create: {
        method: "POST",
        path: "/api/bookings",
        description: "Create a new booking",
        parameters: {
          service_id: "number (required)",
          location: "string (required)",
          booking_date: "string (required, YYYY-MM-DD)",
          time_slot: "string (required)",
          duration_hours: "number (required)",
          custom_needs: "string (optional)",
        },
        response: {
          success: "boolean",
          data: "Booking object",
        },
      },
      list: {
        method: "GET",
        path: "/api/bookings",
        description: "Get user's bookings",
        parameters: {
          user_id: "number (optional)",
        },
        response: "Array of Booking objects",
      },
      update: {
        method: "PUT",
        path: "/api/bookings/[id]",
        description: "Update booking status",
        parameters: {
          id: "number (required)",
          status: "string (required)",
        },
        response: "Updated Booking object",
      },
      cancel: {
        method: "DELETE",
        path: "/api/bookings/[id]",
        description: "Cancel a booking",
        parameters: {
          id: "number (required)",
        },
        response: {
          success: "boolean",
          message: "string",
        },
      },
    },
    payment: {
      create_order: {
        method: "POST",
        path: "/api/payment/create-order",
        description: "Create Razorpay payment order",
        parameters: {
          booking_id: "number (required)",
          amount: "number (required)",
          currency: "string (optional, default: INR)",
        },
        response: {
          success: "boolean",
          order_id: "string",
          amount: "number",
        },
      },
      verify: {
        method: "POST",
        path: "/api/payment/verify",
        description: "Verify payment signature",
        parameters: {
          order_id: "string (required)",
          payment_id: "string (required)",
          signature: "string (required)",
        },
        response: {
          success: "boolean",
          message: "string",
        },
      },
    },
    admin: {
      users: {
        method: "GET",
        path: "/api/admin/users",
        description: "Get all users (admin only)",
        parameters: {},
        response: "Array of User objects",
      },
      bookings: {
        method: "GET",
        path: "/api/admin/bookings",
        description: "Get all bookings (admin only)",
        parameters: {},
        response: "Array of Booking objects",
      },
    },
    monitoring: {
      errors: {
        method: "GET",
        path: "/api/monitoring/errors",
        description: "Get error logs (admin only)",
        parameters: {
          severity: "string (optional)",
          limit: "number (optional)",
          offset: "number (optional)",
        },
        response: {
          errors: "Array of Error objects",
          total: "number",
        },
      },
      performance: {
        method: "GET",
        path: "/api/monitoring/performance",
        description: "Get performance metrics (admin only)",
        parameters: {
          metric: "string (optional)",
        },
        response: "Performance data object",
      },
    },
  },
  data_models: {
    User: {
      id: "number",
      full_name: "string",
      email: "string",
      phone: "string",
      created_at: "string (ISO 8601)",
      last_login: "string (ISO 8601, optional)",
      status: "string (active|inactive|suspended)",
    },
    Service: {
      id: "number",
      name: "string",
      description: "string",
      price_per_hour: "number",
      icon: "string",
      created_at: "string (ISO 8601)",
      status: "string (active|inactive)",
    },
    Booking: {
      id: "number",
      user_id: "number",
      service_id: "number",
      location: "string",
      booking_date: "string (YYYY-MM-DD)",
      time_slot: "string",
      duration_hours: "number",
      total_cost: "number",
      status: "string (pending|confirmed|cancelled|completed)",
      custom_needs: "string (optional)",
      payment_type: "string (optional)",
      payment_id: "string (optional)",
      created_at: "string (ISO 8601)",
      updated_at: "string (ISO 8601, optional)",
    },
  },
  error_codes: {
    400: "Bad Request - Invalid parameters",
    401: "Unauthorized - Authentication required",
    403: "Forbidden - Insufficient permissions",
    404: "Not Found - Resource not found",
    409: "Conflict - Resource already exists",
    422: "Unprocessable Entity - Validation failed",
    429: "Too Many Requests - Rate limit exceeded",
    500: "Internal Server Error - Server error",
  },
  rate_limits: {
    authentication: "10 requests per minute",
    bookings: "60 requests per minute",
    admin: "100 requests per minute",
    monitoring: "30 requests per minute",
  },
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const section = searchParams.get("section")

    if (section) {
      const sectionData = apiDocumentation[section as keyof typeof apiDocumentation]
      if (sectionData) {
        return NextResponse.json(sectionData)
      } else {
        return NextResponse.json(
          { error: "Section not found" },
          { status: 404 }
        )
      }
    }

    return NextResponse.json(apiDocumentation)
  } catch (error) {
    console.error("Failed to fetch documentation:", error)
    return NextResponse.json(
      { error: "Failed to fetch documentation" },
      { status: 500 }
    )
  }
}
