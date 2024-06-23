"use client"

import { useCallback, useEffect, useState } from "react";
import { animate, stagger, timeline } from "motion";

import Image from "next/image";

import styles from "./Hero.module.css"

export default function Hero() {
  const slides = [
    { id: 1, title: "having a good time", description: "entertaining your friends with your new found Rizz",
      image: { src:"/hero/barr.webp", alt: "a bar with people having a good time"} },
    { id: 2, title: "touching grass", description: "enjoying the park with your time in a park but with Rizz",
      image: { src:"/hero/park.webp", alt: "a park view "} },
    { id: 3, title: "giving a presentation", description: "giving a presentation with your new found Rizz",
      image: { src:"/hero/office.webp", alt: "a person giving a killer presentation"} }
  ]

  const [ currentFocusedIndex, setCurrentFocusedIndex ] = useState<number>(slides.length - 1);
  const [textDescription, setTextDescription] = useState<string>("");
  const [textTitle, setTextTitle] = useState<string>("");
  
  // updates the currentFocusedIndex when a button is clicked
  const setFocusIndex = (index: number) => {
    setCurrentFocusedIndex(index);
  }
  
  // updates the textBox when currentFocusedIndex changes
  const setNewTextData = useCallback(()=>{
    setTextTitle(slides[currentFocusedIndex].title);
    setTextDescription(slides[currentFocusedIndex].description);
  }, [currentFocusedIndex])

  useEffect(()=>{
    setNewTextData();  
  }, [currentFocusedIndex]);

  // Animate the text box fading in when it changes
  useEffect(() => {
    timeline([
      ['.hero-textBox-title', { opacity: [0, 1] }, { duration: 0.5 }],
      ['.hero-textBox-description', { opacity: [0, 1] }, { duration: 0.5, at: '-0.45' }]
    ]);
  }, [textTitle, textDescription]);

  // animate the buttons on initial load
  useEffect(()=> {
    animate(`.${styles.btn}`, { opacity: [0, 1], transform: ["translateX(-200px)", "translateX(0px)"] }, { delay:stagger(0.3), duration: 1})
  }, [])

  return (
    <section className={styles.body}>
      {/* TODO:container */}
      <div className={styles.container}>
        {/* TODO: top/left side */}
        <div className={`${styles.box} ${styles.imgBox}`}>

          {
            slides && slides.map((slide, index) => (
              <div className={`test ${styles.imageContainer} ${currentFocusedIndex < index ? styles.hide : ""}`} key={slide.id}>
                <Image className={styles.image} src={slide.image.src} width={350} height={350} alt={slide.image.alt} />
              </div>
            ))
          }

        </div>

        {/* TODO: bottom/right side */}
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
