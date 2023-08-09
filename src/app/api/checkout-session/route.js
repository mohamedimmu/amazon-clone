import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { items, email } = await request.json();
    const transformedItems = items.map((item) => ({
      price_data: {
        currency: "inr",
        unit_amount: item.price * 100, // 1Rs == 100 paise
        product_data: {
          name: item.title,
          images: [item.image],
        },
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_options: [
        {shipping_rate: 'shr_1NcVLOSIX9jyn1gLip9lOVPW'},
        {shipping_rate: 'shr_1NcVLrSIX9jyn1gLOZsaceml'},
      ],
      shipping_address_collection: {
        allowed_countries: ['IN', 'US', 'GB', 'CA']
      },
      line_items: transformedItems,
      mode: "payment",
      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/checkout`,
      metadata: {
        email,
        images: JSON.stringify(items.map((item) => item.image)) // Convert a JS object or value into a JSON string.
      }
    });

    return NextResponse.json({ id: session.id }, { status: 200 })
  } catch (err) {
    console.warn(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
