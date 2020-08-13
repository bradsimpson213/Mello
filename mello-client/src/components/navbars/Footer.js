import React from 'react';
import { Link } from "react-router-dom";
import { FaGithub, FaAngellist, FaLinkedin } from "react-icons/fa"
import styles from './Footer.module.css'

const Footer = () => {

    return(
        <>
            <Link href={github} icon={FaGithub} /> 
            <Link href={angel} icon={FaAngellist} /> 
            <Link href={linkedin} icon={FaLinkedin} /> 
            <span>© Copyright 2020 by Brad Simpson. All rights reserved.</span>
        </>
    );    
};

export default Footer;

