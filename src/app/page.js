import Banner from "@/components/Banner";
import ProductFeed from "@/components/ProductFeed";

async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = response.json();
  return products;
} 

export default async function Home(props) {
  const products = await getProducts();
  return (
    <div className="bg-gray-100">
      
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />

        {/* Product Feed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}