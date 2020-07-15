import React, { useEffect } from 'react';
import useInputState from "./hooks/useInputState";
import { Input, Button, Link } from "@chakra-ui/core";
import styles from "./landing.module.css";


const Landing = () => {
    const [email, updateEmail, resetEmail ] = useInputState("");

    return (
      <>
        <div>
            <img src="https://mello-landing-images.s3.amazonaws.com/white-logo.png" alt="Mello Logo" />
            <Link color="white" href="/login">Log In</Link>
            <Button variantColor="white" color="steeleblue">Sign Up</Button>
        </div>
        <div>
          <h1 className={styles.textTitle}>
            {" "}
            Mello provides a Zen like space to plan your personal or team goals{" "}
          </h1>
          <h3 className={styles.textDetail}>
            {" "}
            Mello's boards, lists, cards, and other components empower you to
            mindfully oraginze and priortize your projects, or life goals in
            mindful way.{" "}
          </h3>
          <img
            src="https://mello-landing-images.s3.amazonaws.com/landingimage.png"
            alt="Buddhist Temple"
          />
        </div>
        <div>
          <Input value={email} onChange={updateEmail} placeholder="Email..." />
          <Button variantColor="green" size="lg">
            Sign Up - It's Free!
          </Button>
        </div>
      </>
    );
}

export default Landing;