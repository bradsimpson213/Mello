import React, { useRef, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Divider,
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
  FormControl,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Icon, 
  Input,
  Select,
  Stack,
  Switch,
  useDisclosure,
} from "@chakra-ui/core";
import appContext from "../../Context";
import { baseUrl } from "../../config";
import { MdArrowDropDown } from 'react-icons/md';
import styles from './NavBar3.module.css';
import useToggle from '../hooks/useToggle';
import useInputState from '../hooks/useInputState';


const NavBar3 = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, boardOrg, setBoardOrg, logout, token } = useContext(appContext);
    const btnRef = useRef();
    const [timer, setTimer] = useState(user.timer);
    const [music, toggleMusic] = useToggle(user.music);
    const [email, updateEmail] = useState(user.email);
    const [name, updateName] = useState(user.name);
    const [boardImage, updateBoardImage] = useInputState(boardOrg.board.boardImage);
    const [boardName, setBoardName] = useState('');
    let history = useHistory();

    let count = 1;
    
    const logOutUser = () => {
      logout();
      history.push("/");
    };

    const saveBoardName = async() => {
      const boardId = boardOrg.board.id;

      const res = await fetch(`${baseUrl}/boards/update/${boardId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ boardName }),
      });
      const data = await res.json();
      setBoardName(data.boards.board_name);
    };
  
    const mindBreak = () => {
      alert("Time for a break! Meditate for a few minutes to clear your mind!")
    };

    // useEffect(() => {
    //   if (!user.notification) {
    //     return;
    //   };

    //   if (user.notification !== 0) {
       
    //     const notifTimer = setTimeout( mindBreak, 
    //     [(user.notification * 60000)]);
    //     count++;
    //   };  
    // }, [user.notification, count]);

    const updateUser = async() => {

    };

    const updateBackground = async(e) => {
      e.preventDefault();

      const boardId = boardOrg.board.id;

      const res = await fetch(`${baseUrl}/boards/images/${boardId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ boardImage }),
      });
      const data = await res.json();
      const newImage = data.boards.board_image;
      console.log(data);
      console.log(boardOrg);
      const newContext = {
        ...boardOrg,
        board: {
          id: boardOrg.board.id, 
          boardName: boardOrg.board.boardName, 
          boardImage: newImage },
      };
      setBoardOrg(newContext);
    };

    return (
      <div className={styles.navBar3}>
        <Editable
          className={styles.boardName}
          defaultValue="Board Name..."
          value={ boardName ? boardName : boardOrg.board.boardName }
          onChange={ setBoardName }
          onSubmit = { saveBoardName }
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
        </div>
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
              <DrawerHeader >Menu - Update Settings</DrawerHeader>
              <DrawerBody>
                <Stack >
                  <form onSubmit={ updateUser }>
                  <FormControl>
                    <FormLabel htmlFor="name">Name (First Last)</FormLabel>
                    <InputGroup>
                      <InputLeftElement children={<Icon name="info" />} />
                      <Input pr="4.5rem" type="text" id="name" aria-label="name"
                      placeholder="Name here..." value={name} onChange={updateName} />
                    </InputGroup>
                  </FormControl>
                  <FormControl >
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <InputGroup>
                      <InputLeftElement children={<Icon name="email" />} />
                      <Input pr="4.5rem" type="email" id="email" aria-label="email"
                        placeholder="Email here..." value={email} onChange={updateEmail} />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="notification">Break Notification Timer (Minutes)</FormLabel>
                      <InputGroup>
                        <InputLeftElement children={<Icon name="time" />} />
                        <Input
                          value={timer} onChange={setTimer}
                          id="notification"
                          placeholder="Notification Timer"
                        type="number" aria-label="board-name"
                        />
                      </InputGroup>
                    <FormHelperText id="notification-helper">Set to zero for no break notifications</FormHelperText>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="music">Auto Play Music on Login</FormLabel>
                    <Switch
                    value={ music }
                    onChange={ toggleMusic }
                    id="music" size="md"
                    type="music" aria-label="music-switch"
                    />
                  </FormControl>
                    <Button type="submit">Update User Settings</Button>
                  </form>
                </Stack>
                <Divider />  
                <form onSubmit={ updateBackground }>
                  <FormControl >
                    <FormLabel htmlFor="backImage">Change Board Background Image</FormLabel>
                    <InputGroup>
                      <Select icon={MdArrowDropDown} id="backImage" placeholder="Current Background" onChange={ updateBoardImage }>
                        <option value="https://mello-zen-images.s3.amazonaws.com/zen-2.jpg">Bamboo Forrest</option>
                        <option value="https://mello-zen-images.s3.amazonaws.com/zen-3.jpg">Stones on Water</option>
                        <option value="https://mello-zen-images.s3.amazonaws.com/zen-4.jpg">Stones on Sand</option>
                        <option value="https://mello-zen-images.s3.amazonaws.com/zen-5.jpg">Stones with Bamboo</option>
                        <option value="https://mello-zen-images.s3.amazonaws.com/zen-6.jpg">Stacked Stones on Dock</option>
                        <option value="https://mello-zen-images.s3.amazonaws.com/zen-8.jpg">More Stones on Sand</option>
                        <option value="https://mello-zen-images.s3.amazonaws.com/zen-9.jpg">Zen Garden</option>
                        <option value="https://mello-zen-images.s3.amazonaws.com/zen-10.jpg">Hammock Between Palms</option>
                        <option value="https://mello-zen-images.s3.amazonaws.com/zen-11.jpg">Statue with Lotus</option>
                        <option value="https://mello-zen-images.s3.amazonaws.com/zen-12.jpg">Sunset Meditation</option>
                        <option value="https://mello-zen-images.s3.amazonaws.com/zen-13.jpg">Tree in Lake</option>
                        <option value="https://mello-zen-images.s3.amazonaws.com/zen-14.jpg">Zen Skyline</option>
                        <option value="https://mello-zen-images.s3.amazonaws.com/zen-15.jpg">Pagoda with Bamboo</option>
                        <option value="https://mello-zen-images.s3.amazonaws.com/zen-16.jpg">Zen Garden 2</option>
                      </Select>
                    </InputGroup>
                  </FormControl>
                  {boardImage ? (<div className={styles.backImage} style={{ backgroundImage: `url(${boardImage})` }}></div>)
                  : (<div className={styles.backImage} style={{ backgroundImage: `url(${boardOrg.board.boardImage})`}} ></div>)}
                  <Button type="submit" >Update Background</Button>
                </form>
                <Divider />
                <Button variantColor="red" onClick={ logOutUser } >Log Out of Mello</Button>
                
              </DrawerBody>
              <DrawerFooter>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
       
      </div>
    );
}

export default NavBar3;