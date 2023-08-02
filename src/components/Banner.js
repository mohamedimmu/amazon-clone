"use client";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20"

      />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <Image
            loading="lazy"
            src="https://links.papareact.com/gi1"
            width={1304}
            height={521}
            alt="Banner Carousel"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div>
          <Image
            width={1304}
            height={521}
            loading="lazy"
            src="https://links.papareact.com/6ff"
            alt="Banner Carousel"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div>
          <Image
            width={1304}
            height={521}
            loading="lazy"
            src="https://links.papareact.com/7ma"
            alt="Banner Carousel"
            style={{ objectFit: "cover" }}
          />
        </div>
      </Carousel>
    </div>
  );
}
