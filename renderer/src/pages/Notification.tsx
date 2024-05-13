import { useLocation } from 'react-router-dom';
import './Notification.css';
import React, { useEffect, useRef, useState } from 'react';
import uuidv4 from '../util/uuid';

function Notification() {

    const { search } = useLocation();
    const params     = new URLSearchParams(search);

    const [audioEnd,setAudioEnd] = useState<boolean>();

    useEffect(() => {
        setAudioEnd(false);
    },[search]);

    function Title() {

        let finalTitle = params.get("title") ?? "제목없음";

        finalTitle = finalTitle.slice(0, 10);

        if(finalTitle.length > 10) {
            finalTitle += '...';
        }

        return (
            <div className="title">{finalTitle}</div>
        )
    }

    function Desc() {

        let totalDesc = params.get("desc") ?? ""
        
        return (
            <div className='desc'>
                {
                    totalDesc &&
                    totalDesc.split("\\n").map(str => (
                        <div key={uuidv4()}>
                            {str}
                        </div>
                    ))
                }
            </div>
        )
    }

    function Audio() {

        const [audio,setAudio] = useState<string | undefined>();

        async function loadAudio(audio: string | undefined) {
            if(audio) {
                const src = await window.electron.getAudioFileAsURL(audio);
                setAudio(src);
            }
        }

        useEffect(() => {
            loadAudio(params.get("audio") ?? "audio/default_alert.mp3");
        },[]);

        function onAudioEnd() {
            setAudioEnd(true);
        }

        if(!audio || audioEnd) return null;

        return (
            <audio autoPlay onEnded={onAudioEnd}>
                <source src={audio}></source>
            </audio>
        )
    }

    function Time() {

        const refTime = useRef<HTMLDivElement>(null);
        const [timer,setTimer] = useState<NodeJS.Timer>();

        useEffect(() => {
            startTime();
        }, [refTime]);

        useEffect(() => {
            return () => {
                clearInterval(timer);
            }
        },[timer]);

        function getTimeStr(date: Date) {
            const hours   = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
    
            const formattedHours   = hours.toString().padStart(2, '0');
            const formattedMinutes = minutes.toString().padStart(2, '0');
            const formattedSeconds = seconds.toString().padStart(2, '0');
    
            return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }

        function startTime() {

            const timeEl = refTime.current;
            
            if(!timeEl) return;

            const originDate = new Date();

            function updateTime() {

                originDate.setSeconds(originDate.getSeconds()+1);
                
                timeEl!.innerHTML = getTimeStr(originDate);   
            }

            updateTime();

            setTimer(
                setInterval(updateTime,1000)
            )
        }

        return <div className="time" ref={refTime} />
    }

    function CloseButton() {

        function onClick() {
            window.electron.send('notification', 'close');
        }

        return (
            <div className="close-btn" onClick={onClick}>
                <div />
            </div>
        )
    }

    return (
        <div className="noti-page">
            <Time />
            <Title />
            <Desc />
            <Audio />
            <CloseButton />
        </div>
    );
    
}

export default Notification;
