'use client'

import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import primeLogo from "../../public/images/prime.png";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "@/redux/slices/basketSlice";

export default function CheckoutProduct({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  hasPrime,
}) {

  const formattedCurrency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);

  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
    }

    dispatch(addToBasket(product));
  }

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  }

  return (
    <div className="grid grid-cols-5">
      {/* Left */}
      <Image
        src={image}
        height={200}
        width={200}
        className="w-[200px] h-[200px] object-contain"
        alt="Product"
      />

      {/* Middle */}
      <div className="col-span-3 mx-5">
        <p className="mb-1">{title}</p>
        <span className="flex">
          {Array(Math.round(rating.rate))
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </span>

        <p className="my-2 text-xs line-clamp-3">{description}</p>

        <p className="my-2">{formattedCurrency}</p>

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <Image
              src={primeLogo}
              alt="Prime Badge"
              width={200}
              height={200}
              className="w-12 h-auto object-cover"
            />
            <p className="text-xs text-gray-500">Free One-Day Delivery</p>
          </div>
        )}
      </div>

      {/* Right */}

      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToBasket}>Add to Cart</button>
        <button className="button" onClick={removeItemFromBasket}>Remove from Cart</button>
      </div>
    </div>
  );
}
