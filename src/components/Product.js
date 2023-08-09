'use client'

import Image from "next/image";
import primeLogo from "../../public/images/prime.png";
import { StarIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { addToBasket } from "@/redux/slices/basketSlice";
import { useState } from "react";

export default function Product({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}) {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);

  const [hasPrime] = useState(rating.count > 100);

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
      hasPrime
    };
    // Sending the product as actions to the reuc store.. The Basket Slice
    dispatch(addToBasket(product));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      {/* Product Category */}
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      {/* Product Image */}
      <Image
        alt={title}
        loading="lazy"
        src={image}
        width={200}
        height={200}
        className="w-[200px] h-[200px] object-contain m-auto"
      />

      {/* Product title */}
      <h4 className="my-3">{title}</h4>

      {/* Rating */}
      <div className="flex">
        {Array(Math.round(rating.rate))
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" key={i} />
          ))}
      </div>

      {/* Description */}
      <p className="text-xs my-2 line-clamp-2">{description}</p>

      {/* Price */}
      <p className="mb-2">{formattedPrice}</p>

      {/* Prime Delivery */}
      {hasPrime ? (
        <div className="flex items-center space-x-2 mb-2">
          <Image
            src={primeLogo}
            alt="Prime Badge"
            width={200}
            height={200}
            loading="lazy"
            className="w-12 h-auto object-cover"
          />
          <p className="text-xs text-gray-500">Free One-Day Delivery</p>
        </div>
      ) : (
        ""
      )}

      <button onClick={addItemToBasket} className="mt-auto button">
        Add to Cart
      </button>
    </div>
  );
}
