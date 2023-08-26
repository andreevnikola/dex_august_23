import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const webhookSecret: string = process.env.WEBHOOK_SECRET!;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ADMIN_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

const handler = async (req: Request) => {
  console.log("doinf work my brothers");
  const payload = await req.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent | undefined;
  try {
    // Verify the webhook payload and headers
    evt = wh.verify(payload, heads as any) as WebhookEvent;
  } catch (err) {
    console.error(err);
    return new NextResponse(null, { status: 400 });
  }
  const { id } = evt.data;

  const eventType = evt.type;
  switch (eventType) {
    case "user.updated":
      console.log(`User ${id} was ${eventType}`);
      break;
  }
  return new NextResponse(null, { status: 201 });
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
