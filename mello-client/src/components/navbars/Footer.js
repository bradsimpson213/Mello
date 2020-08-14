import React from 'react';
import { Link } from '@chakra-ui/core';
import { FaGithub, FaAngellist, FaLinkedin, FaEnvelope, FaUserTie } from 'react-icons/fa'
import styles from './Footer.module.css'

const Footer = () => {

    return(
        <div className={styles.footerContainer}>
            <p className={styles.footerText}>© Copyright 2020 by Brad Simpson. All rights reserved.</p>
            <Link href="https://github.com/bradsimpson213"><FaGithub className={styles.footerIcon} /></Link> 
            <Link href="https://angel.co/u/brad-simpson-8"><FaAngellist className={styles.footerIcon} /></Link> 
            <Link href="https://www.linkedin.com/in/brad-simpson-a6b1b7b2/"><FaLinkedin className={styles.footerIcon} /></Link>
            <Link href="mailto:bradsimpson@icloud.com"><FaEnvelope className={styles.footerIcon} /></Link>
            <Link href="https://brad-simpson-website.herokuapp.com/"><FaUserTie className={styles.footerIcon} /></Link>
        </div>
    );    
};

export default Footer;

