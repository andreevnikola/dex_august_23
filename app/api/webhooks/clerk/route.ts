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
    evt = wh.verify(JSON.stringify(payload), heads as any) as WebhookEvent;
  } catch (err) {
    console.error(err);
    return new NextResponse(null, { status: 400 });
  }

  const eventType = evt.type;
  switch (eventType) {
    case "user.created":
      const { error: creationError } = await supabase.from("users").insert({
        id: evt.data.id,
        first_name: evt.data.first_name,
        last_name: evt.data.last_name,
        email: evt.data.email_addresses.find(
          (mail) => mail.id === (evt!.data as any).primary_email_address_id
        ),
        phone: evt.data.phone_numbers.find(
          (phone) => phone.id === (evt!.data as any).primary_phone_number_id
        ),
      });
      if (creationError) {
        console.error(creationError);
        return new NextResponse(null, { status: 500 });
      }
      break;
    case "user.updated":
      const { error: updationError } = await supabase
        .from("users")
        .update({
          first_name: evt.data.first_name,
          last_name: evt.data.last_name,
          email: evt.data.email_addresses.find(
            (mail) => mail.id === (evt!.data as any).primary_email_address_id
          ),
          phone: evt.data.phone_numbers.find(
            (phone) => phone.id === (evt!.data as any).primary_phone_number_id
          ),
          profile_picture: evt.data.image_url,
        })
        .eq("id", evt.data.id);
      if (updationError) {
        console.error(updationError);
        return new NextResponse(null, { status: 500 });
      }
      break;
    case "user.deleted":
      const { error: deletionError } = await supabase
        .from("users")
        .delete()
        .eq("id", evt.data.id);
      if (deletionError) {
        console.error(deletionError);
        return new NextResponse(null, { status: 500 });
      }
      break;
  }
  return new NextResponse(null, { status: 201 });
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
