import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    return Response.json({ success: true });
  }

  try {
    const { token } = await request.json();
    if (!token) {
      return Response.json({ success: false, error: "No token" });
    }

    const res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      { method: "POST" }
    );
    const data = await res.json();

    return Response.json({
      success: data.success === true && (data.score ?? 1) >= 0.5,
    });
  } catch {
    return Response.json({ success: false, error: "Verification failed" });
  }
}
