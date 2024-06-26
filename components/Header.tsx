"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

import { animate, stagger, timeline } from "motion";
import { useSession, signIn, signOut } from "next-auth/react";

import styles from "./Header.module.css"


export default function Header() {
    const [ displayMenu, setDisplayMenu ] = useState<boolean>(false);
    const { data: auth } = useSession();

    const heading = "RizzStore".split('');

    // flips heading animation
    const flipHeading = () => {
        animate(".char-flip",{ transform: ["rotateX(0deg)", "rotateX(360deg)"]}, { delay: stagger(0.1), duration: 1.4 })
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
        // header animations
        flipHeading();
        const acColor = auth ? "#FC6736": "#EEEEEE";

        animate(".char-flip", { color: [acColor, "#EEEEEE", acColor] }, { delay: stagger(0.05,), duration: 3, repeat: Infinity, endDelay: 2 });    

        
        // navbar navigation animations
        if (window.innerWidth > 1024 && auth) {
            timeline([
                [ `.${styles.body}`, { width: [null, "100%"] }, { duration: 1.4 }],
                [`.${styles.desk_nav_link}`, { opacity: [0, 1] }, { duration: 0.9, delay: stagger(0.5)}]
            ]);
    
        }else if (window.innerWidth > 1024 && !auth) {// shrink window

            animate(`.${styles.body}`, { width: [null, "167px"] }, { duration: 1.4 })
        }
    }, [auth])

    return (
        <header className={styles.header}>

            <div className={styles.container}>

                <div className={styles.body}>

                    <Link className={styles.heading} href="/" onClick={flipHeading}>
                        {heading.map(char => <div key={char} className="char-flip">{char}</div>)}
                    </Link>
                    
                    {auth?(
                        // Authenticated
                        <>
                        <div className={styles.navContainer}>
                            {/*  --------------------- Mobile nav --------------------- */}
                            <button className={`${styles.navBtn} ${displayMenu && styles.navBtn_active}`} onClick={toggleMenu}>
                                <div className={styles.hamburger}></div>
                            </button>

                            <nav className={`${styles.mobile_nav} ${displayMenu && styles.mobile_nav_active}`}>
                                <Link className={styles.mobile_nav_link} href="/cart">Cart</Link>
                                <Link className={styles.mobile_nav_link} href="/account">Profile</Link>
                            </nav>

                        </div>

                        <nav className={styles.desk_nav}>
                            <button className={styles.desk_nav_link} title="logout">
                                <i className="bi bi-door-closed-fill"></i>
                            </button>
                            <Link className={styles.desk_nav_link} href="/cart">
                                <i className="bi bi-cart-fill"></i>
                                Cart
                            </Link>
                            <Link className={styles.desk_nav_link} href="/account">
                                <i className="bi bi-person-circle"></i>
                                Profile
                            </Link>
                        </nav>
                        </>
                    ):(
                        // TODO: login button
                        <button className={styles.loginBtn} title="login button" onClick={() => signIn()}>
                            <i className="bi bi-door-open-fill"></i>
                        </button>
                    )}

                </div>

            </div>

        </header>
    )
}
