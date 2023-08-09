'use client'

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank you, your order has been confirmed.
            </h1>
          </div>
          <p>
            Congratulations on your Amazon order! 🎉 Your items are on their way
            to you. Thank you for shopping with us! To check the status of your
            order, please press the link below or simply log in to your Amazon
            account and visit the Order History section. If you have any
            questions or need assistance, feel free to reach out to our customer
            support. Happy shopping.
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="button mt-8"
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
}
