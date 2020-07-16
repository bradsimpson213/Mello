import React, { useEffect, useState } from 'react';
import useInputState from "./hooks/useInputState";
import { Input, Button, Link } from "@chakra-ui/core";
import styles from "./landing.module.css";


const Landing = () => {
    const [email, updateEmail, resetEmail ] = useInputState("");
    const [quote, setQuote ] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        const getQuote = async () => {
            const res = await fetch("https://zenquotes.io/api/random");
        const data = await res.json();
        setQuote(data.q);
        setAuthor(data.a);    
        };
    }, []);

    return (
      <>
        <div className={styles.headerbar}>
          <img
            className={styles.logo}
            src="https://mello-landing-images.s3.amazonaws.com/white-logo.png"
            alt="Mello Logo"
          />
          <Link className={styles.loginLink} color="white" href="/login">
            Log In
          </Link>
          <Button
            className={styles.signUpNav}
            variantColor="white"
            color="steeleblue"
            size="lg"
          >
            Sign Up
          </Button>
        </div>
        <div className={styles.mainBox}>
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
      </>
    );
}

export default Landing;