import React from 'react';
import st from './Notificator.module.css'
import { Alert } from 'antd';

export const Notificator = ({
    text,
    setErrorNotification,
} : {
    text: string
    setErrorNotification: () => void
}) => {

    const onClose = (e: React.MouseEvent<HTMLButtonElement | undefined>) => {
        console.log(e, 'I was closed.');
    };

    let x = setTimeout(() => {
        setErrorNotification()
        clearTimeout(x)
    }, 3000)


    return (
        <div className={st.notificatorContainer}>
            <Alert
                message="Some error has occurred..."
                description={`${text}`}
                type="error"
                closable
                onClose={onClose}
                banner
            />
        </div>
    )
}
