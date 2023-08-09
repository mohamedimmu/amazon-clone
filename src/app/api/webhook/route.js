import { buffer } from "micro";
import * as admin from "firebase-admin";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

// Secure a connection to firebase from backend
const serviceAccount = require("../../../../permissions.json");

// If there is any  Firebase Admin SDK instances already initialized  it will refer to the existing instance.
// If there is no existing instance it will create new one.
// This will avoid multiple instance of the SDK
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

//Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      return NextResponse.json({ status: 200 });
    });
};

export async function POST(request) {
  
  try {
    const payload = await request.text();
    const sig = request.headers.get("stripe-signature");

    let event;

    //Verify that the event posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      return NextResponse.json({ err: `Webhook error: ${err.message}` }, { status: 400 });
    }

    // Handle the checkout session completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Fulfill the order
      return fulfillOrder(session)
        .then(() => NextResponse.json({ status: 200 }))
        .catch((err) =>
          NextResponse.json({ err: `Webhook error: ${err.message}` }, { status: 400 })
        );
      }
    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json({ err: `Internal server error: ${err.message}` }, { status: 500 });
  }
}