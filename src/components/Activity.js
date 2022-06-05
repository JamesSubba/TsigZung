import React, {useState} from 'react'
import db from "../firebase"
import {  Timestamp,addDoc, collection,doc} from 'firebase/firestore';
import { useNavigate, useLocation} from "react-router-dom";

const Activity = () => {
    let navigate = useNavigate();
    const {state} = useLocation();
    const { wordid } = state;
    const [questions, setQuestions] = useState('');
    const [answers, setAnswer] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [count, setCount] = useState(1);

    const createActivity =()=> {
        const docRef = doc(db, "words", wordid);
        const colRef = collection(docRef, "q&a")
        addDoc(colRef, {
            question: questions,
            correct_answer: answers,
            incorrect_answer: [option1, option2],
            createdAt: Timestamp.now().toDate()
        });
        clearState();
    }

    const clearState = () => {
        if(count<5){
            setCount(count+1);
            setQuestions('');
            setAnswer('');
            setOption1('');
            setOption2('');
        }
        else{
            navigate('/details', { state: { wordid: wordid} })
        }
    }

    const goBack = () => {
        navigate('/details', { state: { wordid: wordid} })
    };
  return (
    <div className="form-container-5"> 
        <div className='header-2'>
            <h2 className="title">Create Activity</h2>
            <button className='button-5' onClick={goBack}>Back</button>
        </div>
            <h3 className='question-no'>Question no: {count}</h3>
        <div className="register-form">
            <input
                placeholder="Question"
                value={questions}
                className="form-field"
                onChange={(event) => {
                setQuestions(event.target.value);
                    }}
                />
            <input
                placeholder="Option 1"
                value={option1}
                className="form-field"
                onChange={(event) => {
                setOption1(event.target.value);
                    }}
                />
            <input
                placeholder="Option 2"
                value={option2}
                className="form-field"
                onChange={(event) => {
                setOption2(event.target.value);
                    }}
                />
            <input
                placeholder="Answer"
                value={answers}
                className="form-field"
                onChange={(event) => {
                setAnswer(event.target.value);
                    }}
                />
            <button className="form-field" onClick={createActivity}>create activity</button>
        </div>
    </div>
  )
}
export default Activity