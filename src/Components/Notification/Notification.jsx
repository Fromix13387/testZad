import React, {useEffect, useMemo, useState} from 'react';
import cl from './Notification.module.scss'
const Notification = ({label, text, status, setVisible}) => {
    const DURATION = 3000
    const ANIMATION_TIME = 1500
    const [timeLeft, setTimeLeft] = useState(DURATION)
    const [hover, setHover] = useState(false)

    const type = () => {
        let cs = cl.Notification + " " + cl.visible + " "
        switch (status) {
            case "success":
                return cs += cl.success
            default:
                return cs += cl.error
        }
    }
    const [classes, setClasses] = useState(type())
    const onMouseLeave = () => {
        if (timeLeft > 0) {
            setHover(false);
            setTimeLeft(timeLeft - 1)
        }
    }

    useEffect(() => {
        const awaitTimeout = DURATION === timeLeft ? ANIMATION_TIME : 0
        if (timeLeft <= 0) {
            setClasses(type() + " " + cl.close)
            setTimeout(() => {
                setClasses(cl.Notification)
                setVisible(false)
            }, ANIMATION_TIME)
        }
        else if (!hover) setTimeout(() => {
             setTimeLeft(timeLeft => timeLeft - 10)
        }, 10 + awaitTimeout)



    }, [timeLeft]);

    return (
        <div onClick={() => setTimeLeft(0)} onMouseEnter={()=> setHover(true)} onMouseLeave={onMouseLeave} className={classes + ' ' + (DURATION === timeLeft ? cl.start : '')}>
            <div>
                {
                    status === 'success'
                        ?
                        <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.66666 18.6667L0.333328 7.52533L3.34085 4.68829L8.85463 12.2277L21.0727 2.3008e-05L23.9444 3.34732L8.66666 18.6667Z"
                                fill="#F5F5F5"/>
                        </svg>
                        :
                        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M11.0995 7.54663L3.64494 0.092041L0.0911713 3.64581L7.54576 11.1004L0.289712 18.3564L3.84348 21.9102L11.0995 14.6542L18.3556 21.9102L21.9093 18.3565L14.6533 11.1004L22.1079 3.64581L18.5541 0.092041L11.0995 7.54663Z"
                                  fill="white"/>
                        </svg>

                }
                <div className={cl.notification_info}>
                    <h3 className={cl.label}>{label}</h3>
                    <p className={cl.text}>{text}</p>
                    <progress value={timeLeft} max={DURATION} className={cl.progress}/>
                </div>
            </div>
        </div>
    );
};

export default Notification;