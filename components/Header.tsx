"use client"

import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";

import { animate, stagger } from "motion";

import styles from "./Header.module.css"


export default function Header({auth}: {auth: boolean}) {
    const [ displayMenu, setDisplayMenu ] = useState<boolean>(false);

    const heading = "RizzStore".split('');

    // flips heading animation
    const flipHeading = () => {
        animate(".char-flip",{ transform: ["rotateX(0deg)", "rotateX(360deg)"]}, { delay: stagger(0.1), duration: 2 })
    }

    // toggle menu 
    const toggleMenu = () => {
        setDisplayMenu(prev => !prev);
    }

    // click close event handler
    useEffect(() => {
        if (displayMenu) {
            document.addEventListener("click", toggleMenu);
        }

        return () => {
            document.removeEventListener("click", toggleMenu);
        }

    }, [displayMenu]);

    // animation management
    useEffect(() => {
        flipHeading();
        animate(".char-flip", {color: ["#EEEEEE", "#FC6736", "#EEEEEE"]}, { delay: stagger(0.1,), duration: 3, repeat: Infinity, endDelay: 2 });
        
    }, [])

    return (
        <header className={styles.header}>

            <div className={styles.container}>

                <div className={styles.body}>

                    <Link className={styles.heading} to="/" onClick={flipHeading}>
                        {heading.map(char => <div key={char} className="char-flip">{char}</div>)}
                    </Link>
                    
                    {auth?(
                        // Authenticated
                        <div className={styles.navContainer}>

                            <button className={`${styles.navBtn} ${displayMenu && styles.navBtn_active}`} onClick={toggleMenu}>
                                <div className={styles.hamburger}></div>
                            </button>

                            <nav className={`${styles.mobile_nav} ${displayMenu && styles.mobile_nav_active}`}>
                                <Link className={styles.mobile_nav_link} to="/cart">Cart</Link>
                                <Link className={styles.mobile_nav_link} to="/account">Account</Link>
                            </nav>
                        </div>
                    ):(
                        // TODO: login button
                        <button className={styles.loginBtn} title="login button">
                            <i className="bi bi-door-open-fill"></i>
                        </button>
                    )}

                </div>

            </div>

        </header>
    )
}
