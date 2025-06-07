import { useState, useEffect } from 'react'

import styles from './styles/Message.module.css'

function Message({type, text}) {

    const [visible, setVisible] = useState(false)
    const [shouldRender, setShouldRender] = useState(false)

    useEffect(() => {
        if (!text) {
            setVisible(false)
            setShouldRender(false)
            return
        }

        setVisible(true)
        setShouldRender(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text])

    const handleTransitionEnd = () => {
            if (!visible) {
                setShouldRender(false)
            }
        }

    return (<>
        {shouldRender && (
            <div className={`${styles.text} ${styles[type]} ${visible? styles.show : ''}`} onTransitionEnd={handleTransitionEnd}>{text}</div>
            )}
    </>)
}

export default Message