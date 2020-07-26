import React, {useState, useContext } from "react";
import useInputState from "./hooks/useInputState";
import useToggle from './hooks/useToggle';
import appContext from "../Context";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Icon,
  Input, 
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack, 
} from "@chakra-ui/core";
import styles from "./LogInPage.module.css";
import { baseUrl } from "../config";


const LogInPage = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState("");
    const [show, toggleShow] = useToggle(false);
    
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
      
            login(data.access_token, data.user);
            setLoggedIn(true);
            } catch (err) {
                alert("It appears you provided an incorrect login. Please meditate for a moment and then try again.  Namaste!");
            } 
    };

    const setFormValues = (e) => {
      if (e.target.name === 'email') setEmail(e.target.value)
      else if (e.target.name === 'password') setPassword(e.target.value)
    };
    
    const demoLogin = () => {
        setEmail("demo@gmail.com");
        setPassword("demo1");
    };


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
              <div className={styles.loginBox}>
                <form onSubmit={loginSubmit} className={styles.loginForm}>
                  <h4>Please Log in to Mello</h4>
                  <Stack spacing={3}>
                    <FormControl isRequired>
                      <FormLabel htmlFor="email">Email address</FormLabel>
                      <InputGroup>
                        <InputLeftElement children={<Icon name="email" />} />
                        <Input name="email" id="email" value={ email } onChange={ setFormValues }
                         background="whitesmoke" placeholder="Email" aria-label="email"/>
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <InputGroup>
                          <InputLeftElement children={<Icon name="lock" />} />
                          <Input
                            id="password" pr="4.5rem" aria-label="password" name="password"
                            type={show ? "text" : "password"}
                            placeholder="Enter password"
                            value={ password }
                            onChange={ setFormValues }
                          />
                          <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={toggleShow}>
                              {show ? "Hide" : "Show"}
                            </Button>
                          </InputRightElement>
                    </InputGroup>
                    </FormControl>
                    <Button
                      type="submit"
                      variantColor="green"
                      width="325px"
                      size="lg"
                    >
                      Log In
                    </Button>
                    <Button type="submit" onClick={ demoLogin }>Demo Login</Button>
                  </Stack>
                </form>
                <div className={styles.linkBox}>
                  <p>Return to Home Page to Sign Up for a New Account</p>
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
