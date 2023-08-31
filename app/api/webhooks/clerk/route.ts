import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/app/_db/prisma";

const webhookSecret: string = process.env.WEBHOOK_SECRET!;

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
  try {
    switch (eventType) {
      case "user.created":
        await db.user.create({
          data: {
            id: evt.data.id,
            first_name: evt.data.first_name,
            last_name: evt.data.last_name,
            email: evt.data.email_addresses.find(
              (mail) => mail.id === (evt!.data as any).primary_email_address_id
            )!.email_address,
            phone: evt.data.phone_numbers.find(
              (phone) => phone.id === (evt!.data as any).primary_phone_number_id
            )!.phone_number,
            image_url: evt.data.image_url,
          },
        });
        break;
      case "user.updated":
        await db.user.update({
          where: {
            id: evt.data.id,
          },
          data: {
            first_name: evt.data.first_name,
            last_name: evt.data.last_name,
            email: evt.data.email_addresses.find(
              (mail) => mail.id === (evt!.data as any).primary_email_address_id
            )!.email_address,
            phone: evt.data.phone_numbers.find(
              (phone) => phone.id === (evt!.data as any).primary_phone_number_id
            )!.phone_number,
            image_url: evt.data.image_url,
          },
        });
        break;
      case "user.deleted":
        await db.user.delete({ where: { id: evt.data.id } });
        break;
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(null, { status: 500 });
  }

  return new NextResponse(null, { status: 201 });
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
