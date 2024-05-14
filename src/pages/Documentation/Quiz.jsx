import React, { useRef, useState, useEffect } from 'react';
import './Quiz.css';
import { data } from './Data';

export const Quiz = () => {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);
    let option_array = [option1, option2, option3, option4];
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);
    let [startTime, setStartTime] = useState(0);
    let [endTime, setEndTime] = useState(0);
    let [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        if (result) {
            setEndTime(Date.now());
            setElapsedTime((endTime - startTime) / 1000); // Convert to seconds
        }
    }, [result, startTime, endTime]);

    const startTimer = () => {
        setStartTime(Date.now());
    };

    const checkans = (e, ans) => {
        if (lock === false) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.ans - 1].current.classList.add("correct");
            }
        }
    };

    const Suivant = () => {
        if (lock === true) {
            if (index === data.length - 1) {
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            option_array.forEach(Option => {
                Option.current.classList.remove("wrong");
                Option.current.classList.remove("correct");
            });
        }
    };

    const Retour = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    };

    return (
        <>
            <div className='quiz-container'>
              <h1 className='grain-text-left'>Quiz</h1>
              {result ? (
              <>
                <div className='msg'>
                <h2 className="congratulations">Félicitations  !</h2>
                <h2 className='scr'>Votre score finale est  {score}/{data.length}</h2>
                <h2 className='scr'>Temps écoulé : {elapsedTime} secondes</h2>
                </div>
                
                <button className='btn-refaire' onClick={Retour}>Refaire</button>
              </>
              ) : (
              <>
                 <div className='question-box'>
                    <h2 className='question'>{question.question}</h2>
                  </div>
                 
                 <div className='answers'>
                    <div className='rep'>
                        <button ref={option1} onClick={(e) => { checkans(e, 1) }} className="option-btn">.</button>
                        <p className="option-text">{question.Option1}</p>
                    </div>
                    <div className='rep'>
                        <button ref={option2} onClick={(e) => { checkans(e, 2) }} className="option-btn">.</button>
                        <p className="option-text">{question.Option2}</p>
                    </div>
                    <div className='rep'>
                        <button ref={option3} onClick={(e) => { checkans(e, 3) }} className="option-btn">.</button>
                        <p className="option-text">{question.Option3}</p>
                    </div>
                    <div className='rep'>
                        <button ref={option4} onClick={(e) => { checkans(e, 4) }} className="option-btn">.</button>
                        <p className="option-text">{question.Option4}</p>
                    </div>
                 
                 </div>
                 <button className='suiv' onClick={Suivant}>Suivant</button>
                 <div className="index">{index + 1} sur {data.length} questions</div>
             </>
              )}
            </div>
       
        </>
    )
}

export default Quiz;



