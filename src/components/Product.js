import Image from "next/image";
import primeLogo from "../../public/images/prime.png"
import { StarIcon } from "@heroicons/react/24/solid";

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

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      {/* Product Category */}
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>
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
          .map(() => (
            <StarIcon className="h-5 text-yellow-500" key={rating.rate} />
          ))}
      </div>

      {/* Description */}
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      
      {/* Price */}
      <p className="mb-2">{formattedPrice}</p>

      {/* Prime Delivery */}
      {rating.count > 100 ? (
        <div className="flex items-center space-x-2 mb-2">
          <Image
            src={primeLogo}
            alt="Prime Badge"
            width={200}
            height={200}
            className="w-12 h-auto object-cover"
          />
          <p className="text-xs text-gray-500">Free One-Day Delivery</p>
        </div>
      ) : (
        ""
      )}

      <button className="mt-auto button">Add to Cart</button>
    </div>
  );
}
