import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, tag } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const API_KEY = process.env.BUTTONDOWN_API_KEY;
    if (!API_KEY) {
      console.error("BUTTONDOWN_API_KEY is not set");
      return NextResponse.json(
        { error: "Newsletter service is not configured." },
        { status: 500 }
      );
    }

    const body: Record<string, unknown> = {
      email_address: email,
      type: "regular",
    };

    // Add career tag if subscribing from a career page
    if (tag) {
      body.tags = [tag];
    }

    const response = await fetch("https://api.buttondown.email/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    }

    const data = await response.json();

    const dataStr = JSON.stringify(data);

    // Handle duplicate subscriber
    if (response.status === 400 && dataStr.includes("already")) {
      return NextResponse.json(
        { error: "You're already subscribed! Check your inbox for our latest updates." },
        { status: 409 }
      );
    }

    // Handle blocked/disposable email
    if (response.status === 400 && data.code === "subscriber_blocked") {
      return NextResponse.json(
        { error: "This email address cannot be used. Please try a different email." },
        { status: 400 }
      );
    }

    console.error("Buttondown API error:", response.status, data);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: response.status }
    );
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
