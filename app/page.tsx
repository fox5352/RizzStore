import ProductsSection from "./components/ProductsSection";
import MouseEffect from "@/components/MouseEffect";
import Hero from "@/app/components/Hero";


import styles from "./home.module.css";
import { getFeaturedProducts, getLowestPriceProducts } from "@/model/products";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const bugetProducts = await getLowestPriceProducts(3);

  return (
    <main className={styles.main}>
      <MouseEffect distance={85} icon="bi-star-fill">
        <Hero />
      </MouseEffect>

      <ProductsSection title="Featured products" products={featuredProducts} />
      <ProductsSection title="Budget Products" products={bugetProducts} />
    </main>
  );
}
