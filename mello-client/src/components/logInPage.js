import React, {useState} from "react";
import useInputState from "./hooks/useInputState";
import { Link } from "react-router-dom";
import { Input, Button } from "@chakra-ui/core";
import styles from "./logInPage.module.css";
import { baseUrl } from "../config";


const LogInPage = (props) => {
    const [email, updateEmail] = useInputState("");
    const [password, updatePassword] = useInputState("");
    const [errors, setErrors] = useState(null);

    const loginSubmit = async (e) => {
        e.preventDefault();
          try {
            const res = await fetch(
              `${baseUrl}/users/login`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
              }
            );
            const data = await res.json();

            if (data.error) {
              setErrors(data.error);
              return;
            }

          } catch (err) {
            alert(
              "It appears you provided an incorrect login. Please take a moment and then try again."
            );
          }
        };
    
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
                <h4>Please Log in to Mello</h4>
                <p>{errors ? errors : " "}</p>
                <Input value={email} onChange={updateEmail}
                    width="300px" background="whitesmoke"
                    placeholder="Email" />
                <Input value={password} onChange={updatePassword}
                        width="300px" background="whitesmoke"
                        placeholder="Password" />
                <Button onClick={loginSubmit} variantColor="green"
                        width="325px" size="lg" > Log In
                </Button>
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
    );
};

export default LogInPage;
