import { type NextRequest, NextResponse } from "next/server"
import { dataStore } from "@/lib/store"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookingId = parseInt(params.id)
    if (isNaN(bookingId)) {
      return NextResponse.json(
        { error: "Invalid booking ID" },
        { status: 400 }
      )
    }

    const bookings = dataStore.getBookings()
    const booking = bookings.find(b => b.id === bookingId)

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(booking)
  } catch (error) {
    console.error("Failed to fetch booking:", error)
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookingId = parseInt(params.id)
    if (isNaN(bookingId)) {
      return NextResponse.json(
        { error: "Invalid booking ID" },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      )
    }

    const updatedBooking = dataStore.updateBookingStatus(bookingId, status)

    if (!updatedBooking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedBooking)
  } catch (error) {
    console.error("Failed to update booking:", error)
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookingId = parseInt(params.id)
    if (isNaN(bookingId)) {
      return NextResponse.json(
        { error: "Invalid booking ID" },
        { status: 400 }
      )
    }

    // In production, implement soft delete or status update
    const updatedBooking = dataStore.updateBookingStatus(bookingId, "cancelled")

    if (!updatedBooking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Booking cancelled successfully",
      data: updatedBooking,
    })
  } catch (error) {
    console.error("Failed to cancel booking:", error)
    return NextResponse.json(
      { error: "Failed to cancel booking" },
      { status: 500 }
    )
  }
} 