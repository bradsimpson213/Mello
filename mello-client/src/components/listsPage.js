import React from 'react';
import NavBar2 from './navbars/NavBar2';
import NavBar3 from './navbars/NavBar3';
import List from './List';
import styles from './ListsPage.module.css';

const ListsPage = () => {


    return (
      <>
        <NavBar2 />
        <NavBar3 />
        <div className={styles.listsContainer}>
            <List />
        </div>
      </>
    );
}

export default ListsPage;