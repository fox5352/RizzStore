"use client"
import Link from "next/link";

import styles from "./Card.module.css"
import Image from "next/image";
import { MouseEvent } from "react";

export default function Card({
    id, title, detail, rating, price, in_stock, best_seller, image_url}: {
    id:string, title: string, detail: string, rating:number, price:number, in_stock:boolean, best_seller: boolean, image_url:string}) {


    const addToCart = (e: MouseEvent) =>{
        e.preventDefault();
        e.stopPropagation();
    }
    
    return (
        <Link className={styles.body} href={`/products/${id}`}>

            <div className={styles.head}>
                <Image className={styles.image} src={image_url ? image_url : "/hero/park.webp"} alt="" width={500} height={500} />
                
                <span className={styles.tag}>best_seller</span>
            </div>

            <div className={styles.content}>
                <h3 className={styles.contentTitle}>{title}</h3>

                <p className={styles.contentText}>{detail.slice(0, 45)+"..."}</p>

                <Stars rating={rating} />
                
                <p className={styles.contentPrice}>R <span>{price}</span></p>

                <button onClick={addToCart} disabled={!in_stock} className={`${styles.btn} ${in_stock && styles.stock}`}>Add to Cart</button>
            </div>
        </Link>
    )    
}


const Stars = ({rating}: {rating:number}) => {
    let list = []

    for (let index = 0; index < 5; index++) {
        if (index < rating) {
            list.push(<i className="bi bi-star-fill"></i>)
        }else{
            list.push(<i className="bi bi-star"></i>)
        }
    }

    return (
        <div className={styles.rating}>
            {list && list.map(data=>data)}
        </div>
    )
}