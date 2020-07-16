import React from "react";
import useInputState from "./hooks/useInputState";
import { Link } from "react-router-dom";
import { Input, Button } from "@chakra-ui/core";
import styles from "./logInPage.module.css";
import { baseUrl } from "../config";


const LogInPage = (props) => {
    const [email, updateEmail] = useInputState("");
    const [password, updatePassword] = useInputState("");

    const loginSubmit = () => {
        return "yay";
    }

    return (
      <div className={styles.logInPage}>
        <div className={styles.logoDiv}>
          <img
            className={styles.logInLogo}
            src="https://mello-landing-images.s3.amazonaws.com/black-logo.png"
            alt="Site Logo Black"
          />
        </div>
        <div className={styles.mainBox}>
          <img
            className={styles.leftImage}
            src="https://mello-landing-images.s3.amazonaws.com/LoginImage1.png"
            alt="Buddhist Temple"
          />
          <div className={styles.loginBox}>
            <p>Please Log in to Mello</p>
            <Input
              value={email}
              onChange={updateEmail}
              width="300px"
              background="whitesmoke"
              placeholder="Email"
            />
            <Input
              value={password}
              onChange={updatePassword}
              width="300px"
              background="whitesmoke"
              placeholder="Password"
            />
            <Button
              onClick={loginSubmit}
              variantColor="green"
              width="325px"
              size="lg"
            >
              Log In
            </Button>
            <Link to="/signup">
              Sign Up For An Account
            </Link>
          </div>
          <img
            className={styles.rightImage}
            src="https://mello-landing-images.s3.amazonaws.com/LoginImage2.png"
            alt="Buddhist Arch"
          />
        </div>
      </div>
    );

}

export default LogInPage;
