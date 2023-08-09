import moment from "moment";
import Image from "next/image";

export default function OrderItem({
  id,
  amount,
  amountShipping,
  images,
  timestamp,
  items,
}) {
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);

  const formattedAmountShipping = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amountShipping);

  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          <p className="font-bold text-xs uppercase">Order Placed</p>
          <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
        </div>

        <div>
          <p className="text-xs font-bold">Total</p>
          <p>
            {formattedAmount} -{" "}
            {formattedAmountShipping > 80
              ? "Fast Delivery"
              : "Standard Delivery"}{" "}
            {formattedAmountShipping}
          </p>
        </div>

        <p className="text-xl md:text-sm whitespace-nowrap self-end flex-1 text-right text-blue-500">
          {items.length} items
        </p>

        <p className="uppercase absolute top-2 right-2 w-40 lg:w-72 truncate whitespace-nowrap text-xs">
          Order ID: #{id}
        </p>
      </div>

      <div className="p-5 md:p-10">
        <div className="flex space-x-6 overflow-x-hidden">
          {images.map((image) => (
            <Image
              key={image}
              src={image}
              width={200}
              height={200}
              alt="Ordered Product"
              className="h-20 w-auto md:h-32 object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
