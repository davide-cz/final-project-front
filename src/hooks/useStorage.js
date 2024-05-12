import { useState } from "react";

export default function (key, defaultValue){
    //hook generico personalizzato per raccogliere ciò che è presente nel localStorage
    //e definire nuove variabili
    //setto il value di key presente in local-storage come default 
    const oldValue = localStorage.getItem(key);
    
    const [state, setState] = useState(oldValue !== null ? JSON.parse(oldValue) : defaultValue);

    const changeState = (newValue) => {
        setState(newValue);
        localStorage.setItem(key, JSON.stringify(newValue))
    }

    return [state, changeState]
    
}