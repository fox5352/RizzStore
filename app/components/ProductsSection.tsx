import type { Product } from "@/model/products";
import styles from "./ProductsSection.module.css"

import ProductsTitle from "./ProductsTitle"
import Card from "@/components/Card";


export default async function ProductsSection({ title, products }: { title: string, products: Product[] | null }) {

    return (
        <div className={styles.body}>
            <ProductsTitle title={title} />

            <div className={styles.products}>

                {products && products.map(data => {
                    const { id, title, details, price, rating, in_stock, best_seller, image_url } = data;
                    return <Card key={id} id={`${id}`} title={title} detail={details} price={price} rating={rating} in_stock={in_stock} best_seller={best_seller} image_url={image_url} />
                })}
            </div>
        </div>
    )
}
