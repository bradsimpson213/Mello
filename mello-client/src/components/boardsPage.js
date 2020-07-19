import React, { useEffect, useState, useContext } from 'react';
import appContext from "../Context";
import NavBar2 from './navbars/NavBar2';
import { baseUrl } from "../config";
import styles from './BoardsPage.module.css';

const Boards = (props) => {
    const [boards, setBoards] = useState(null);

    const { id } = useContext(appContext);

    //THIS USE EFFECT GETS USERS BOARDS (ONLY ONCE ON MOUNT)
    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/boards/${id}`);
        const data = await res.json();
        setBoards(data);
        console.log(boards);
        })();
    }, []);

    return (
      <>
        <NavBar2 />
        <div className={styles.mainBox}>
          <div>
            <h2>Boards</h2>
          </div>
          <div>
            <h2>Personal Boards</h2>
            {/* {boards.map((board) => (
                <div className={styles.board} background={`${board.board_image}`}>
                    <p>[board.board_name</p>
                </div> 
            ))} */}
          </div>
          <div>
            <h2>Team Boards</h2>
          </div>
        </div>
      </>
    );
};

export default Boards;
