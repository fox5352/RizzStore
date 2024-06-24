"use client"

import { useCallback, useEffect, useState } from "react";
import { animate, stagger, timeline } from "motion";
import Image from "next/image";
import styles from "./Hero.module.css"

export default function Hero() {
  const slides = [
    { id: 1, title: "having a good time", description: "entertaining your friends with your new found Rizz",
      image: { src:"/hero/barr.webp", alt: "a bar with people having a good time"} },
    { id: 2, title: "touching grass", description: "enjoying your time in a park but with Rizz",
      image: { src:"/hero/park.webp", alt: "a park view "} },
    { id: 3, title: "giving a presentation", description: "giving a presentation with your new found Rizz",
      image: { src:"/hero/office.webp", alt: "a person giving a killer presentation"} }
  ]

  const [ currentFocusedIndex, setCurrentFocusedIndex ] = useState<number>(slides.length - 1);
  const [textDescription, setTextDescription] = useState<string>(slides[slides.length - 1].description);
  const [textTitle, setTextTitle] = useState<string>(slides[slides.length - 1].title);
  
  // sets the currentFocusedIndex and the text to the new index
  const setFocusIndex = useCallback((index: number) => {
    setCurrentFocusedIndex(index);
    setTextTitle(slides[index].title);
    setTextDescription(slides[index].description);
  }, [slides]);

  // animate the text on every update
  useEffect(() => {
    const animateText = () => {
      timeline([
        ['.hero-textBox-title', { opacity: [0, 1] }, { duration: 0.3 }],
        ['.hero-textBox-description', { opacity: [0, 1] }, { duration: 0.3, at: '-0.2' }]
      ]);
    };

    
    animateText();
  }, [textTitle, textDescription]);

  // animate the buttons on on page initial load
  useEffect(() => {
    const animateButtons = () => {
      animate(`.${styles.btn}`, { opacity: [0, 1], transform: ["translateX(-100px)", "translateX(0px)"] }, { delay: stagger(0.2), duration: 0.5 });
    };

    animateButtons();
  }, []);

  return (
    <section className={styles.body}>
      <div className={styles.container}>
        <div className={`${styles.box} ${styles.imgBox}`}>
          {slides.map((slide, index) => (
            <div className={`${styles.imageContainer} ${currentFocusedIndex < index ? styles.hide : ""}`} key={slide.id}>
              <Image className={styles.image} src={slide.image.src} width={350} height={350} alt={slide.image.alt} loading="lazy" />
            </div>
          ))}
        </div>

        <div className={`${styles.box} ${styles.textBox}`}>
          <h3 className={`${styles.title} hero-textBox-title`}>{textTitle}</h3>
          <p className={`${styles.description} hero-textBox-description`}>{textDescription}</p>
        </div>
      </div>
      <div className={styles.controls}>
        {slides.map((slide, index) => (
          <Button key={slide.id} currentFocusedIndex={currentFocusedIndex} index={index} func={setFocusIndex} />
        ))}
      </div>
    </section>
  )
}

const Button = ({currentFocusedIndex, index, func}: {currentFocusedIndex: number, index: number, func: (index: number) => void}) => {
  return (
    <button className={`${styles.btn} ${currentFocusedIndex == index && styles.btnActive}`} 
      onClick={() => func(index)}></button>
  )
}
