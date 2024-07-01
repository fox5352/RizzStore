"use client"
import { animate, stagger } from "motion";

import styles from "./ProductsTitle.module.css"
import { useEffect } from "react";

export default function ProductsTitle({ title }: { title: string }) {
    const newTitle = title.split("");

    useEffect(() => {
        const tag = `.${styles.letter}`

        animate(tag, { scale: [null, 0, 1] }, { duration: 1, delay: stagger(0.5) });
        animate(tag, { transform: ["rotateX(0deg)", "rotateX(360deg)"] }, { delay: stagger(0.1), duration: 1.4 })

    }, [])

    return (
        <h1 className={styles.title}>
            {newTitle.map((char, index) => {
                return (
                    <div className={styles.letter} key={index}>{char}</div>
                )
            })}
        </h1>
    )
}
