"use client"

import { useEffect, ReactNode, useRef, useCallback } from "react"
import styles from "./MouseEffect.module.css"


type posType = {
    x: number;
    y: number;
}

export default function MouseEffect({icon, distance, children }: {icon:string, distance:number, children: ReactNode }) {
    const bodyRef = useRef<HTMLDivElement>(null);
    const arrayRef = useRef<HTMLElement[]>([]);
    const lastStarPosRef = useRef<posType | null>(null)

    const duration = 900

    const calculateDistance = (prev: posType, after: posType):number => {
        const dx = after.x - prev.x;

        const dy = after.y - prev.y;

        return Math.sqrt((dx * dx) + (dy * dy))
    }

    const createIcon = useCallback((icon: string, posX:number, posY:number):HTMLElement => {
        const colors = ["#7AC6AC", "#FC6736", "#oC2D57"];
        const animations = ["down-rotate", "down-flip"];

        const element = document.createElement('i');
        element.classList.add(`${styles.dot}`);
        element.classList.add(`${icon}`);
        element.classList.add("bi");
        
        element.style.color = colors[Math.floor(Math.random() * colors.length)];
        element.classList.add(animations[Math.floor(Math.random()* animations.length)]);

        element.style.left = `${posX}px`;
        element.style.top = `${posY}px`;

        return element;
    },[]);

    const addIcon = useCallback((posX:number, posY:number) => {
        const block = createIcon(icon, posX, posY);
        
        arrayRef.current.push(block);
        document.body.appendChild(block);

        setTimeout(() => {
            const block = arrayRef.current.shift();

            if (block) {
                document.body.removeChild(block);
            }
        }, duration);
    }, [duration, icon, createIcon]);

    const mouseInside = useCallback((event: MouseEvent) => {
        const posX = event.clientX;
        const posY = event.clientY;

        if (bodyRef.current) {
            const bodyTop = bodyRef.current.offsetTop;
            const bodyBottom = bodyRef.current.offsetTop + bodyRef.current.clientHeight;

            const bodyLeft = bodyRef.current.offsetLeft;
            const bodyRight = bodyRef.current.offsetLeft + bodyRef.current.clientWidth;

            // y axis
            if (posY >= bodyTop && posY <= bodyBottom) {
                // x axis
                if (posX >= bodyLeft && posX <= bodyRight) {

                    if (lastStarPosRef.current === null) {
                        addIcon(posX, posY);
                        lastStarPosRef.current = {x: posX, y: posY};
                    }else{
                        const prev = lastStarPosRef.current;
                        const curr = {x: posX, y: posY}

                        const distanceBetween = calculateDistance(prev, curr);

                        if (distanceBetween >= distance) {
                            addIcon(posX, posY);
                            lastStarPosRef.current = curr;
                        }
                    }

                } 
            }
        }
    }, [addIcon]);


    // attach events
    useEffect(() => {
        console.clear();// FIX: removes this after testing

        window.addEventListener("mousemove", mouseInside);

        return () => {
            window.removeEventListener("mousemove", mouseInside);
        }
    }, [mouseInside])

    return (
        <div ref={bodyRef} className={styles.body}>
            {children}
        </div>
    )
}