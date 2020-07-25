import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import appContext from "../Context";
import NavBar2 from './navbars/NavBar2';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/core";
import { GrAddCircle } from 'react-icons/gr';
import { FaUserAlt, FaUsers } from 'react-icons/fa';
import { baseUrl } from "../config";
import styles from './BoardsPage.module.css';

const Boards = () => {
    const [boards, setBoards] = useState(null);
    const [teamBoards, setTeamBoards] = useState(null);
    const { user, token } = useContext(appContext);
     const { isOpen, onOpen, onClose } = useDisclosure();

    //THIS USE EFFECT GETS USERS BOARDS ON USER CHANGE (IDEALLY ONLY ONCE ON MOUNT)
    useEffect(() => {
      if (user) {
        loadBoards();
      };
    }, [user]);

    const loadBoards = async () => {
      const res = await fetch(`${baseUrl}/boards/user/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          }
        }
      );
      const data = await res.json();
      setBoards(data.boards);
    };


    return (
      <>
        <NavBar2 />
        <div className={styles.mainBox}>
          <div className={styles.titleBox}>
            <img className={styles.melloIcon} 
              src="https://mello-landing-images.s3.amazonaws.com/logo-icon.png" 
              alt="Mello Icon" 
            />
            <h2>Boards</h2>
          </div>
          <div className={styles.boardsBox}>  
            <div className={styles.iconHelper}>
              <FaUserAlt size="26px"/>
              <h2 className={styles.personalTitle}>Personal Boards</h2>
            </div>
            <div className={styles.personalHolder}>
              {boards ? boards.map((board) => (
                <Link to={`/lists/${board.id}`} className={styles.board} key={board.id} style={{backgroundImage: `url(${board.board_image})`}}>
                  <p className={styles.boardTitle}>{board.board_name}</p>
                </Link> 
              ))
              : ""}
                <div className={styles.boardNew}>
                  <p className={styles.titleNew}>Create New Board</p>
                  <GrAddCircle size="32px" />
                </div>
            </div>
            <div className={styles.iconHelper}>
              <FaUsers size="32px" />
              <h2 className={styles.teamTitle}>Team Boards</h2>
            </div>
            <div className={styles.teamHolder}>
              <div className={styles.boardNew}>
                <p className={styles.comingSoon}>Team Boards Coming Soon</p>
              </div> 
            </div>
          </div>
        </div>
      </>
    );
};

export default Boards;
