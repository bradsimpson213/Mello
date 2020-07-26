import React, { useEffect, useState, useRef, useContext } from 'react';
import useInputState from './hooks/useInputState';
import useToggle from './hooks/useToggle';
import { Link, useHistory } from 'react-router-dom';
import appContext from '../Context';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  FormHelperText,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  useDisclosure,
} from '@chakra-ui/core';
import styles from './LandingPage.module.css';
import { baseUrl } from '../config';


const Landing = () => {
    const [email, updateEmail, resetEmail] = useInputState();
    const [name, updateName, resetName] = useInputState();
    const [password, updatePassword, resetPassword] = useInputState();
    const [quote, setQuote ] = useState("");
    const [author, setAuthor] = useState("");
    const [show, toggleShow] = useToggle(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    const { login } = useContext(appContext);
    
    let history = useHistory();

    //THIS USE EFFECT GETS NEW RANDOM QUOTE (ONLY ONCE ON MOUNT)
    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/quotes`);
        const data = await res.json();
        setQuote(data.quote);
        setAuthor(data.author);    
        })();
    }, []);

    const cancelCreateUser = () => {
      onClose();
      resetEmail();
      resetName();
      resetPassword();
    };

    const createUser = async (e) => {
      e.preventDefault();

      const user = { email, name, password };
      cancelCreateUser();

      try {
        const res = await fetch(`${baseUrl}/users/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user }),
        });
        const data = await res.json();
        login(data.access_token, data.user);
        history.push("/boards");

      } catch (err) {
        alert("It appears there was an error creating you account. Please meditate for a moment and then try again.  Namaste!");
      }; 
    };

    return (
      <>
        <div className={styles.navBar}>
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
              ref={btnRef}
              onClick={onOpen}
              variantColor="white"
              color="steeleblue"
              size="lg"
            >
              Sign Up
            </Button>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
              size="sm"
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Create New Account</DrawerHeader>
                <DrawerBody>
                <form action="submit" onSubmit={ createUser }>
                  <Stack> 
                    <FormControl isRequired>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <InputGroup>
                        <InputLeftElement children={<Icon name="info" />} />
                        <Input pr="4.5rem" type="text" id="name" aria-label="name"
                            placeholder="Name here..." value={ name } onChange={ updateName } />
                      </InputGroup>
                      <FormHelperText id="name-helper-text">
                        Name should be in "First Last" format.
                      </FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel htmlFor="email">Email address</FormLabel>
                      <InputGroup>  
                        <InputLeftElement children={<Icon name="email" />} />
                        <Input pr="4.5rem" type="email" id="email" aria-label="email"
                        placeholder="Email here..." value={email} onChange={updateEmail} />
                      </InputGroup>
                      <FormHelperText id="email-helper-text">
                        We will never share your email address.
                      </FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <InputGroup size="md">
                        <InputLeftElement children={<Icon name="lock" />}/>
                        <Input
                          id="password" pr="4.5rem" aria-label="password"
                          type={show ? "text" : "password"}
                          placeholder="Enter password"
                          value={ password }
                          onChange= { updatePassword }
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={ toggleShow }>
                            {show ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormHelperText id="password-helper-text">
                        Please choose a strong password.
                      </FormHelperText>
                    </FormControl>  
                  </Stack>
                  <Button type="submit" variantColor="blue">Create User</Button>
                  <Button variantColor="red" mr={3} onClick={ cancelCreateUser }>
                    Cancel
                  </Button>
                </form>
                </DrawerBody>
                <DrawerFooter>
                  <img
                    className={styles.drawerImage}
                    src="https://mello-landing-images.s3.amazonaws.com/drawerimage1.png"
                    alt="Leaves and Rocks"
                  />
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
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
              <Button variantColor="green" size="lg" ref={btnRef}
                onClick={onOpen}>
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