import { type NextRequest, NextResponse } from "next/server"
import { dataStore } from "@/lib/store"

export async function GET(request: NextRequest) {
  try {
    // In production, check admin authentication here
    const users = dataStore.getUsers()
    
    // Return users without sensitive information
    const safeUsers = users.map(user => ({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      created_at: user.created_at,
      last_login: user.last_login,
      status: user.status,
    }))

    return NextResponse.json(safeUsers)
  } catch (error) {
    console.error("Failed to fetch users:", error)
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    )
  }
}
