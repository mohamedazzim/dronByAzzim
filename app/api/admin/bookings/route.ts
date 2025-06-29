import { type NextRequest, NextResponse } from "next/server"
import { dataStore } from "@/lib/store"

export async function GET(request: NextRequest) {
  try {
    // In production, check admin authentication here
    const bookings = dataStore.getBookings()
    
    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Failed to fetch bookings:", error)
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    )
  }
}
