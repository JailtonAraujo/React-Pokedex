import { useEffect, useState } from 'react';

export const useMessage = () =>{

    const [message, setMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');

    const addMessage = (message,type) =>{
        
        setMessage(message);
        setTypeMessage(type)
    }

    const removeMessage = () =>{
        setMessage('');
        setTypeMessage('');
    }

    return {
        message,
        typeMessage,
        addMessage,
        removeMessage
    }

}