import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { roomId, message, user } = await req.json();

    await pusherServer.trigger(`party-${roomId}`, "message", {
      text: message,
      user: user,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Pusher error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
