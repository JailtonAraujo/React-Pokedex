import { useEffect, useState } from 'react'
import styles from './Message.module.css'

import { AiOutlineClose } from 'react-icons/ai'

const Message = ({type, msg}) => {

    const [visible, setVisible] = useState(false);

    useEffect(()=>{
        if(!msg){
            setVisible(false);
            return
        }

        setVisible(true);

        const time = setTimeout(()=>{
            setVisible(false)
        },3000)

        return () => clearTimeout(time);

    },[msg])

  return (
    <>
    { visible && <div className={styles.messageContainer}>
        <div className={`${styles.content} ${styles[type]}`}>
        <div className={styles.message}> <span>Messagem:</span> {msg} </div>
        <button className={styles.btnClose} onClick={()=>{setVisible(false)}}><AiOutlineClose/></button>
        </div>
    </div>}
    </>
  )
}

export default Message