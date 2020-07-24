import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import useToggle from '../hooks/useToggle';
import { FiHome } from 'react-icons/fi';
import { FaTrello } from 'react-icons/fa';
import { GoMute, GoUnmute } from 'react-icons/go';
import styles from './NavBar2.module.css';
import { Avatar, Button, Icon, Input, InputGroup, InputRightElement, 
    Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/core";
import appContext from '../../Context'


const NavBar2 = () => {
    const [icon, toggleIcon] = useToggle(true);
    const myAudio = document.getElementById('myAudio')

    const toggleAudio = () => {
      toggleIcon();
      return myAudio.paused ? myAudio.play() : myAudio.pause();
    };

    
    const { user } = useContext(appContext);

    return (
      <div className={styles.navBar2}>
        <FiHome
          className={styles.homeIcon}
          onClick={<Redirect to="/boards" />}
        />
        {icon ? (
          <GoUnmute className={styles.music} onClick={toggleAudio} />
        ) : (
          <GoMute className={styles.music} onClick={toggleAudio} />
        )}
        <audio id="myAudio" autoplay="true" loop="true">
          <source
            src="https://mello-music.s3.amazonaws.com/2020-06-18_-_Serenity_-_www.FesliyanStudios.com_David_Renda.mp3"
            type="audio/mpeg"
          />
          <source
            src="https://mello-music.s3.amazonaws.com/2019-04-06_-_Deep_Meditation_-_David_Fesliyan.mp3"
            type="audio/mpeg"
          />
        </audio>
        <Menu>
          <MenuButton
            className={styles.boardDropDown}
            as={Button}
            leftIcon={FaTrello}
          >
            Boards
          </MenuButton>
          <MenuList>
            <MenuItem>Personal Boards</MenuItem>

            <MenuItem>Team Boards</MenuItem>
          </MenuList>
        </Menu>
        <InputGroup className={styles.search}>
          <InputRightElement
            children={<Icon name="search" color="gray.300" />}
          />
          <Input type="text" placeholder="Search..." />
        </InputGroup>
        <img
          className={styles.logoWhite}
          src="https://mello-landing-images.s3.amazonaws.com/white-logo.png"
          alt="Mello Logo"
        />
        <Avatar className={styles.avatar} name={user.name} src="" />
      </div>
    );
};

export default NavBar2;
