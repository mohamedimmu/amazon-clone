import React from "react";
import Product from "./Product";
import Image from "next/image";
101767335934



export default function ProductFeed({ products }) {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products
        .slice(0, 4)
        .map(({ id, title, price, description, category, image, rating }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
            rating={rating}
          />
        ))}
      <Image
        width={1500}
        height={300}
        src="https://links.papareact.com/dyz"
        alt="Product banner"
        className="w-full h-full object-contain md:col-span-full"
      />

      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, title, price, description, category, image, rating }) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
              rating={rating}
            />
          ))}
      </div>

      {products
        .slice(5, products.length)
        .map(({ id, title, price, description, category, image, rating }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
            rating={rating}
          />
        ))}
    </div>
  );
}
