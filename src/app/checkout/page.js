"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "@/redux/slices/basketSlice";
import CheckoutProduct from "@/components/CheckoutProduct";
import { useSession } from "next-auth/react";
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";


const stripePromise = loadStripe(
  process.env.stripe_public_key
);

export default function Checkout() {
  const items = useSelector(selectItems);
  const totalAmount = useSelector(selectTotal);
  const { data: session } = useSession();

  const formattedTotalAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(totalAmount);

  const createCheckoutSession = async() => {
    const stripe = await stripePromise;

    // Call the backend to create a checkout session
    const checkoutSession = await axios.post('/api/checkout-session', {
      items,
      email: session.user.email,
    });

    // Redirect user/customer to stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id
    });

    if(result.error){
      alert(result.error.message);
    }
  }

  return (
    <div className="bg-gray-100">
      <main className="lg:flex max-w-screen-xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            alt="ad-banner"
            width={1020}
            height={250}
            style={{ objectFit: "contain" }}
            className="w-[1020px] h-[250px]"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4  ">
              {items.length === 0
                ? "Shopping Basket is empty"
                : "Shopping Basket"}
            </h1>

            {items.map(
              ({
                id,
                title,
                price,
                description,
                category,
                image,
                rating,
                hasPrime,
              }) => (
                <CheckoutProduct
                  key={id}
                  id={id}
                  title={title}
                  price={price}
                  description={description}
                  category={category}
                  image={image}
                  rating={rating}
                  hasPrime={hasPrime}
                />
              )
            )}
          </div>
        </div>

        {/* Right */}
        
          {items.length > 0 && (
           <div className="flex flex-col bg-white p-10 shadow-md flex-shrink-0">
              <h2>
                Subtotal ({items.length}) items:
                <span className="font-bold">{formattedTotalAmount}</span>
              </h2>

              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-200 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </div>
          )}
      </main>
    </div>
  );
}
