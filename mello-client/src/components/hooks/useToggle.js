import { useState } from 'react';

//initialize to default of false for toggler
const useToggle = (initialValue = false) => {
    const [state, setState] = useState(initialValue)

    const toggle = () => {
        setState(!state);
    };
    return [state, toggle];
};

export default useToggle;