import React, { useEffect, useState } from 'react';
import useInputState from "./hooks/useInputState";
import { Link } from 'react-router-dom';
import { Input, Button } from "@chakra-ui/core";
import NavBar1 from "./navbars/NavBar1";
import styles from "./LandingPage.module.css";
import { baseUrl } from "../config";


const Landing = () => {
    const [email, updateEmail] = useInputState("");
    const [quote, setQuote ] = useState("");
    const [author, setAuthor] = useState("");

    //THIS USE EFFECT GETS NEW RANDOM QUOTE (ONLY ONCE ON MOUNT)
    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/quotes`);
        const data = await res.json();
        setQuote(data.quote);
        setAuthor(data.author);    
        })();
    }, []);

    return (
      <>
        <NavBar1 className={styles.navBar}/>
        <div className={styles.mainBox}>
          <div className={styles.quoteBox}>
            <p className={styles.quoteDetail}>{`"${quote}"`}</p>
            <p>{`-${author}`}</p>
          </div>
          <div className={styles.textBox}>
            <h1 className={styles.textTitle}>
              {" "}
              Mello provides a Zen space to plan your personal or team projects
              and goals{" "}
            </h1>
            <h2 className={styles.textDetail}>
              {" "}
              Mello's boards, lists, cards, and other components empower you to
              mindfully oraganize and priortize your projects, or life goals in
              mindful ways.{" "}
            </h2>
            <div className={styles.emailSignUp}>
              <Input
                value={email}
                onChange={updateEmail}
                width="300px"
                placeholder="Email"
                marginRight="7px"
              />
              <Button variantColor="green" size="lg">
                Sign Up - It's Free!
              </Button>
            </div>
          </div>
          <img
            className={styles.bigImage}
            src="https://mello-landing-images.s3.amazonaws.com/landingimage.png"
            alt="Buddhist Temple"
          />
        </div>
        <footer className={styles.footer}>© Copyright 2020 by Brad Simpson. All rights reserved.</footer>
      </>
    );
}

export default Landing;