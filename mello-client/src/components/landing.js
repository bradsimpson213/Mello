import React, { useEffect } from 'react';
import styles from './landing.module.css';
import useInputState from './hooks/useInputState';
import { Button } from 'antd';

const Landing = (props) => {
    const [email, updateEmail, resetEmail ] = useInputState("");

    return (
        <div>
            <h1 classname={ styles.landingDescrip } >Mello provides at Zen like space to plan your personal or team goals</h1>
            <div>

                <Button type="primary">Sign Up - It's Free!</Button>
            </div>
        </div>
    );
}

export default Landing;