"use client"

import {FC, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {AlarmClock} from "lucide-react";
import {ResetIcon} from "@radix-ui/react-icons";


interface TimerProps {

}

const Timer:FC<TimerProps> = () => {
    const [showTimer,setShowTimer] = useState<boolean>(false)
    const [seconds,setSeconds] = useState<number>(0)
    const [minutes,setMinutes] = useState<number>(0)


    useEffect(() => {
        const timer = setInterval( () =>{
            setSeconds((prevState) => prevState + 1)
            if(seconds >= 59){
                setMinutes((prevState) => prevState + 1)
                setSeconds(0)
            }
        },1000)


        return () => clearInterval(timer)

    }, [seconds]);

    return (
        <div>
           <Button onClick={() => {
               setShowTimer(!showTimer)
               setSeconds((prevState) => prevState = 0)
           }}>
               {
                   showTimer ? <div className={'flex flex-row gap-1'}>{minutes < 10 ? `0${minutes}` : `${minutes}`}:{seconds < 10 ? `0${seconds}` : `${seconds}`} <ResetIcon /></div> :  <AlarmClock />
               }
           </Button>
        </div>
    );
};

export default Timer;