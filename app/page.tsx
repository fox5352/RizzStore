
import MouseEffect from "@/components/MouseEffect";
import Hero from "./components/Hero";
import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <MouseEffect distance={85} icon="bi-star-fill">
        <Hero />
      </MouseEffect>
    </main>
  );
}
