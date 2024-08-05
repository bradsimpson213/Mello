import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import useInputState from './hooks/useInputState';
import appContext from "../Context";
import NavBar2 from './navbars/NavBar2';
import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
  Stack, 
  useDisclosure,
} from "@chakra-ui/core";
import { GrAddCircle } from 'react-icons/gr';
import { MdArrowDropDown } from 'react-icons/md';
import { FaUserAlt, FaUsers } from 'react-icons/fa';
import { baseUrl } from "../config";
import styles from './Boards.module.css';

const Boards = () => {
    const [boards, setBoards] = useState(null);
    // const [teamBoards, setTeamBoards] = useState(null);
    const [boardName, setBoardName, resetBoardName] =useInputState();
    const [boardImage, setBoardImage, resetBoardImage] = useInputState();
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

    const createBoard = async (e) => {
      e.preventDefault();
      
      const board = { boardName, boardImage };
        closeModal();

      const res = await fetch(`${baseUrl}/boards/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ board, user }),
        });
        const data = await res.json();
        setBoards(data.boards);
    };

    const closeModal = () => {
      onClose();
      resetBoardName();
      resetBoardImage();
    }

    return (
      <>
        <NavBar2 />
        <div className={styles.mainBox}>
          <div className={styles.titleBox}>
            <img
              className={styles.melloIcon}
              src="https://mello-landing-images.s3.amazonaws.com/logo-icon.png"
              alt="Mello Icon"
            />
            <h2>Boards</h2>
          </div>
          <div className={styles.boardsBox}>
            <div className={styles.iconHelper}>
              <FaUserAlt size="26px" />
              <h2 className={styles.personalTitle}>Personal Boards</h2>
            </div>
            <div className={styles.personalHolder}>
              {boards
                ? boards.map((board) => (
                    <Link
                      to={`/lists/${board.id}`}
                      className={styles.board}
                      key={board.id}
                      style={{ backgroundImage: `url(${board.board_image})` }}
                    >
                      <p className={styles.boardTitle}>{board.board_name}</p>
                    </Link>
                  ))
                : ""}
              <div className={styles.boardNew} onClick={onOpen}>
                <p className={styles.titleNew}>Create New Board</p>
                <GrAddCircle size="32px" />
              </div>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Create New Board</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <form className={styles.boardForm} onSubmit={createBoard}>
                      <Stack spacing={3}>
                        <FormControl isRequired>
                          <FormLabel htmlFor="newboard">New Board Name</FormLabel>
                          <InputGroup>
                            <InputLeftElement children={<Icon name="info-outline" />} />
                            <Input className={styles.formBoardName}
                            value={boardName} onChange={setBoardName}
                            placeholder="Board Name" type="text" aria-label="board-name"
                            />
                            </InputGroup>
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel htmlFor="newImage">New Board Image</FormLabel>
                          <InputGroup>           
                            <Select icon={MdArrowDropDown} id="newImage" className={styles.formSelect} placeholder="Select background" onChange={setBoardImage}>
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
                      { boardImage ? (<div className={styles.backImage} style={{ backgroundImage: `url(${boardImage})`}}></div>) 
                      : (<div className={styles.backImage} >Select A Board Image to Display</div>) }
                      <div className={styles.formButtons}>
                        <Button variantColor="blue" type="submit">Create New Board</Button>
                        <Button variantColor="red" onClick={ closeModal }>Cancel</Button>
                      </div>
                      </Stack>  
                    </form>
                  </ModalBody>

                  {/* <ModalFooter>
                    <Button variantColor="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button variant="ghost">Secondary Action</Button>
                  </ModalFooter> */}
                </ModalContent>
              </Modal>
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
          <div className={styles.spacer}></div>
        </div>
      </>
    );
};

export default Boards;
