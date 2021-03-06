import { useContext } from 'react';
import { CountDownContext } from "../contexts/CountDown.context";
import styles from '../styles/Components/CountDown.module.css'



export function CountDown() {

   const { minutes, seconds, hasFinished, isActive, startCountDown, resetCountDown} = useContext(CountDownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


   
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