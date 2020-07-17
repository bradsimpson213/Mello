import React from 'react';
import NavBar2 from './navBar2';
import styles from './boards.module.css';

const Boards = (props) => {

    return (
        <>
            <NavBar2 />
            <div className={styles.mainBox}>
                <div>
                    <h2>Boards</h2>
                </div>
                <div>
                    <h2>Personal Boards</h2>
                </div>
                <div>
                    <h2>Team Boards</h2>
                </div>

            </div>
        </>
    );
};

export default Boards;
