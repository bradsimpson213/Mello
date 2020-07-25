import React, { useRef, useContext, useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Editable, 
  EditableInput, 
  EditablePreview,
  Button, 
  Input,
  useDisclosure
} from "@chakra-ui/core";
import appContext from "../../Context";
import styles from './NavBar3.module.css';


const NavBar3 = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const [timer, setTimer] = useState();

    const { user, boardOrg, setBoardOrg } = useContext(appContext);

    console.log(user);

    return (
      <div className={styles.navBar3}>
        <Editable
          className={styles.boardName}
          defaultValue="Board Name..."
          value={boardOrg.board.boardName}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
        <div className={styles.drawerButton}>
          <Button
            ref={btnRef}
            leftIcon="add"
            variantColor="teal"
            onClick={onOpen}
          >
            Show Menu
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <h4> Preferences </h4>
                <Input
                  value={timer}
                  onChange={setTimer}
                  width="200px"
                  background="whitesmoke"
                  placeholder="Email"
                />
                <h4> Music Controls</h4>

                <h4> Change Background </h4>
              </DrawerBody>
              <DrawerFooter>
                <div>
                  <p>This website was designed by Brad Simpson</p>
                  <a href="https://brad-simpson-website.herokuapp.com/">
                    Click Here to view my Personal Website
                  </a>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    );
}

export default NavBar3;