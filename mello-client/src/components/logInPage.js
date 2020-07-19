import React, {useState, useContext } from "react";
import useInputState from "./hooks/useInputState";
import appContext from "../Context";
import { Link, Redirect } from "react-router-dom";
import { Input, Button } from "@chakra-ui/core";
import styles from "./LogInPage.module.css";
import { baseUrl } from "../config";


const LogInPage = () => {
    const [email, updateEmail] = useInputState("");
    const [password, updatePassword] = useInputState("");
    const [errors, setErrors] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
 
    const { login } = useContext(appContext);

    const loginSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${baseUrl}/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
                
            if (data.error) {
                setErrors(data.error);
                return;
            };
            login(data.access_token, data.user);
            setLoggedIn(true);
            } catch (err) {
                alert("It appears you provided an incorrect login. Please meditate for a moment and then try again.  Namaste!");
            } 
        };
    
    // const demoLogin = () => {
    //     updateEmail("demo@gmail.com");
    //     updatePassword("demo1");
    // };


    return (
      <div>
        {loggedIn ? (
          <Redirect to="/boards" />
        ) : (
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
              <div onSubmit={loginSubmit} className={styles.loginBox}>
                <form onSubmit={loginSubmit} className={styles.loginForm}>
                  {errors ? <p>{errors ? errors : " "}</p> : ""}
                  <h4>Please Log in to Mello</h4>
                  <Input
                    value={email}
                    onChange={updateEmail}
                    width="300px"
                    background="whitesmoke"
                    placeholder="Email"
                  />
                  <Input
                    type="password"
                    value={password}
                    onChange={updatePassword}
                    width="300px"
                    background="whitesmoke"
                    placeholder="Password"
                  />
                  <Button
                    type="submit"
                    variantColor="green"
                    width="325px"
                    size="lg"
                  >
                    Log In
                  </Button>
                </form>
                <div className={styles.linkBox}>
                  <Link to="/signup">Sign Up For An Account</Link>
                  <Link to="/">Return to Homepage</Link>
                </div>
              </div>
              <img
                className={styles.rightImage}
                src="https://mello-landing-images.s3.amazonaws.com/LoginImage2.png"
                alt="Buddhist Arch"
              />
            </div>
          </div>
        )}
      </div>
    );
};

export default LogInPage;
