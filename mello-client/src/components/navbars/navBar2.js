import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useToggle from '../hooks/useToggle';
import { FiHome } from 'react-icons/fi';
import { FaTrello } from 'react-icons/fa';
import { GoMute, GoUnmute } from 'react-icons/go';
import { baseUrl } from "../../config";
import styles from './NavBar2.module.css';
import { Avatar, Button, Icon, Input, InputGroup, InputRightElement, 
    Menu, MenuButton, MenuList, MenuItem, Tooltip } from "@chakra-ui/core";
import appContext from '../../Context'


const NavBar2 = () => {
    const [icon, toggleIcon] = useToggle(true);
    const [boards, setBoards] = useState(null);
    const myAudio = document.getElementById('myAudio')
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const { user, token } = useContext(appContext);
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

    useEffect(() => {
      if (user) {
        loadBoards();
      }
    }, [user]);

    const loadBoards = async () => {
      const res = await fetch(`${baseUrl}/boards/user/${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      setBoards(data.boards);
      
    };

    const toggleAudio = () => {
      toggleIcon();
      return myAudio.paused ? myAudio.play() : myAudio.pause();
    };

    const handleClick = () => {
      history.push("/boards");
    };

    return (
      <div className={styles.navBar2}>
        <FiHome
          className={styles.homeIcon}
          onClick={ handleClick }
        />
        {icon ? (
          <GoUnmute className={styles.music} onClick={toggleAudio} />
        ) : (
          <GoMute className={styles.music} onClick={toggleAudio} />
        )}
        <audio id="myAudio" autoPlay={ user ? user.music : true } loop={true}>
          <source
            src="https://mello-music.s3.amazonaws.com/2020-06-18_-_Serenity_-_www.FesliyanStudios.com_David_Renda.mp3"
            type="audio/mpeg"
          />
          {/* <source
            src="https://mello-music.s3.amazonaws.com/2019-04-06_-_Deep_Meditation_-_David_Fesliyan.mp3"
            type="audio/mpeg"
          /> */}
        </audio>
        <Menu>
          <MenuButton
            className={styles.boardDropDown}
            as={Button}
            leftIcon={FaTrello}
          >
            Boards
          </MenuButton>
          <MenuList className={styles.boardsContainer}>
            <MenuItem>Personal Boards</MenuItem>
            {boards
              ? boards.map((board) => (
                  <Link
                    to={`/lists/${board.id}`}
                    className={styles.boardBox}
                    key={board.id}
                    style={{ backgroundImage: `url(${board.board_image})` }}
                  >
                    <p className={styles.boardName}>{board.board_name}</p>
                  </Link>
                ))
              : ""}
            <MenuItem className={styles.boardsBox}>Team Boards</MenuItem>
            <p style={{'textAlign':"center"}}>Coming Soon</p>
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
        <div className={styles.quoteBox}>
          <p className={styles.quoteDetail}>{`"${quote}"`}</p>
          <p className={styles.authorDetail}>{`-${author}`}</p>
        </div>
        <Avatar size="sm" className={styles.avatar} name={user.name} src="" />
      </div>
    );
};

export default NavBar2;
