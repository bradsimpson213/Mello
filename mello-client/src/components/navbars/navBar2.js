import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { FaTrello } from 'react-icons/fa';
import styles from './NavBar2.module.css';
import { Avatar, Button, Icon, Input, InputGroup, InputRightElement, 
    Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/core";


const NavBar2 = () => {
    const [user, setUser] = useState('Demo User')

    return (
      <div className={styles.navBar2}>
        <FiHome
          className={styles.homeIcon}
        />
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
        <Avatar
          className={styles.avatar}
          name={user}
          src=""
        />
      </div>
    );
};

export default NavBar2;
