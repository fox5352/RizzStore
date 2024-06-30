import { getFeaturedProducts} from "@/model/products";
import styles from "./featuredProducts.module.css"

import FeaturedProductsTitle from "./FeaturedProductsTitle"
import Card from "@/components/Card";


export default async function FeaturedProducts() {
    const products = await getFeaturedProducts();

    return (
        <div className={styles.body}>
            <FeaturedProductsTitle />

            <div className={styles.products}>
                {products && products.map(data=>{
                    const {id, title, details, price, rating, in_stock, best_seller, image_url} = data;
                    return <Card key={id} id={`${id}`} title={title} detail={details} price={price} rating={rating} in_stock={in_stock} best_seller={best_seller} image_url={image_url} />
                })}
            </div>
        </div>
    )
}
