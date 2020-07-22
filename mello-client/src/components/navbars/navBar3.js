import React, { useRef, useContext } from 'react';
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

     const { boardOrg, setBoardOrg } = useContext(appContext);

    return (
      <div className={styles.navBar3}>
        <Editable className={styles.boardName} defaultValue="Board Name..." value={boardOrg.board.boardName}>
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
                <h4> Change Background </h4>
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