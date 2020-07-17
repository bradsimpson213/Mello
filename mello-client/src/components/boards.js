import React, { useEffect, useState } from 'react';
import NavBar2 from './navBar2';
import { baseUrl } from "../config";
import styles from './boards.module.css';

const Boards = (props) => {
    const [boards, setBoards] = useState(null);
    const [user, setUser] = useState('');
   

    //THIS USE EFFECT GETS USERS BOARDS (ONLY ONCE ON MOUNT)
    useEffect(() => {
        setUser(props.user);
        console.log(user['user']);
        (async () => {
            const res = await fetch(`${baseUrl}/boards/${user.id}`);
        const data = await res.json();
        console.log(data);
        setBoards(data);
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
                    <h4>{boards}</h4>
                </div>
                <div>
                    <h2>Team Boards</h2>
                </div>

            </div>
        </>
    );
};

export default Boards;
