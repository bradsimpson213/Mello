import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/core";
import styles from './NavBar-1.module.css'

const NavBar1 = () => {

    return (
      <div className={styles.headerbar}>
        <img
          className={styles.logo}
          src="https://mello-landing-images.s3.amazonaws.com/white-logo.png"
          alt="Mello Logo"
        />
        <Link className={styles.loginLink} to="/login">
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
    );
}

export default NavBar1;
