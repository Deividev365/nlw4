import { useState, useEffect, useContext } from 'react'
import { setTokenSourceMapRange } from 'typescript';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/Components/CountDown.module.css'


let countDownTimeout: NodeJS.Timeout
//let countDownFlag = 25 * 60;

export function CountDown() {

    const {startNewChallenge} = useContext(ChallengeContext);

    //console.log(contextData);
    
    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive]= useState(false);
    const [hasFinished, setHasFinished] = useState(false);
         // 25
    const minutes = Math.floor( time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


    function startCountDown() {
        setIsActive(true);

    }

    function resetCountDown() {
        clearTimeout(countDownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
    }

    useEffect(() => {
        if(isActive && time > 0) {
            countDownTimeout = setTimeout(() => {
                setTime(time -1 )
            }, 1000)
        } else if(isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);



    return(
    <div>

        <div className={styles.countDownContainer}>
            <div>
                <span>{minuteLeft}</span>
                <span>{minuteRight}</span>
            </div>

            <span>:</span>

            <div>
                <span>{secondLeft}</span>
                <span>{secondRight}</span>
            </div>

        </div>


        {hasFinished ? (
            <button
                disabled
                className={styles.countDownButton}
                >Ciclo Encerrado
                <img src="icons/check.svg" alt=""/>
            </button>
        ) : (

        <>
            { isActive ? (
                
                <button
                    className={`${styles.countDownButton} + ${styles.countDownButtonActive}`}
                    type="button"
                    onClick = {resetCountDown}
                    >Abandonar Ciclo</button>
                ) : (

                <button
                    className={styles.countDownButton}
                    type="button"
                    onClick = {startCountDown}
                    >Iniciar Ciclo</button>         
            )}
    

        </>

)}


        


 





    </div>
    )
}