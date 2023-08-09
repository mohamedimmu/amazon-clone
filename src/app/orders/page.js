import db from "../../../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import moment from "moment/moment";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getSession } from "next-auth/react";
import OrderItem from "@/components/OrderItem";

async function getOrders() {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  // Get the users  logged in creditanls
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  }

  // Firebase Db
  const userOrderRef = collection(db, "users", session.user.email, "orders");
  const stripeOrders = await getDocs(
    query(userOrderRef, orderBy("timestamp", "desc"))
  );

  const getListofLineItems = async (sessionId) => {
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(
        sessionId,
        {
          limit: 100,
        }
      );
      return lineItems.data;
    } catch (error) {
      throw error;
    }
  };

  // Stripe orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: await getListofLineItems(order.id),
    }))
  );

  return { orders, session };
}

export default async function Orders() {
  const { orders, session } = await getOrders() || {};
  return (
    <div>
      <main className="max-w-screen-lg mx-auto">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>{orders?.length} orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, amountShipping, images, timestamp, items }) => (
              <OrderItem
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                images={images}
                timestamp={timestamp}
                items={items}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}
