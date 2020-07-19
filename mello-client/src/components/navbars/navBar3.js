import React, { useRef } from 'react';
import { useDisclosure } from 'react-use-disclosure';
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
} from "@chakra-ui/core";
import styles from './NavBar3.module.css';


const NavBar3 = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    return (
      <div className={styles.navBar3}>
        <div className={styles.boardName}>
          <Editable defaultValue="Take some chakra">
            <EditablePreview />
            <EditableInput />
          </Editable>
        </div>
        <div className={styles.drawerButton}>
          <Button ref={btnRef} lefticon="add" variantColor="teal" onClick={onOpen}>
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
              <DrawerHeader>Create your account</DrawerHeader>

              <DrawerBody>
                <Input placeholder="Type here..." />
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button color="blue">Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    );
}

export default NavBar3;