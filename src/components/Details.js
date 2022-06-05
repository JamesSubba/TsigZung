import React, {useState, useEffect} from 'react';
import db from "../firebase";
import { collection, deleteDoc,doc,getDoc,getDocs, } from 'firebase/firestore';
import {useLocation, useNavigate} from "react-router-dom";

const Details = () => {
    let navigate = useNavigate();
    const {state} = useLocation();
    const { wordid } = state ;
    const [words, setWords] = useState([]);
    const [questions, setQuestions] = useState([]);
    
    const shuffleArray = array => {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    };

    useEffect(() => {
      const getWords = async () => {
          const docRef = doc(db, "words", wordid);
          let data = await getDoc(docRef);
          setWords(data.data(), data.id);
        };
      getWords();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    const getQuizAndQuestionDetails = async () => { 
        const docRef = doc(db, "words", wordid);
        const colRef = collection(docRef, "q&a");
        const questions = await getDocs(colRef);
        let tempQuestions = [];
        await questions.docs.forEach( async res => {
          let question = res.data();
        question.allOptions = shuffleArray([
          ...question.incorrect_answer,
          question.correct_answer,
          ]);
         await tempQuestions.push(question);
        });
        setQuestions([...tempQuestions]);
      };

    useEffect(()=>{
        getQuizAndQuestionDetails();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const goBack = ()=> {
        navigate('/uploadword')
    };

    const deleteWord = async () => {
        const docRef = doc(db, "words", wordid);
        navigate('/uploadword')
        await deleteDoc(docRef);
    }

    const deleteQuiz = async () => {
        const docRef = doc(db, "words", wordid);
        const colRef = collection(docRef, "q&a");
        const questions = await getDocs(colRef);
        questions.docs.forEach((doc)=> {
          deleteDoc(doc.ref);
        });
        alert('quiz deleted');
      }
    const createQuiz = () => {
        navigate('/activity', { state: { wordid: wordid} })
    }
  return (
    <div className="form-container-4">
        <div className='header-2'>
          <h2 className="title">Word Details</h2>
          <button className='button-4' onClick={goBack}>Back</button>
        </div>
            <div className="register-form">
              <div className='word-content'>
                <h3>Word: {words.word}</h3>
                <h3>Meaning: {words.meaning}</h3>
                <h3>Synonym: {words.synonym}</h3>
                <h3>Translation: {words.translation}</h3>
                <audio className="audio" src={words.audioUrl} controls/>
              </div>
                <button className="form-field" onClick={() =>navigate('/edit', { state: { wordid: wordid} })}>{" "}Edit Word</button>
                <button className="form-field" onClick={() => {deleteWord();}}>{" "}Delete Word</button>
                <button className="form-field" onClick={()=>createQuiz()}>Create Activity</button>
                <h2 className="title">Activity Details</h2>
              <div className='word-content'>
                {questions.map((item,index)=> (
                      <div key={index}>
                        <h1> {item.question}</h1>
                      {item.allOptions.map((option, optionIndex)=>{
                        return (
                          <div key={optionIndex}>
                            <h3> {option}</h3>
                          </div>
                        )
                      })}
                      </div>
                    )
                  )
                  }
              </div>
              <button className="form-field" onClick={() => {deleteQuiz()}}>{" "}Delete Activity</button>
            </div>
            
    </div>
    
  )
}
export default Details