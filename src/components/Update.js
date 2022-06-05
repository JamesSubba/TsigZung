import React, { useState, useEffect } from 'react'
import db from "../firebase"
import {  updateDoc } from 'firebase/firestore';
import { doc,getDoc } from 'firebase/firestore';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';
import { useNavigate, useLocation} from "react-router-dom";

const Update = () => {
    const [newWord, setWord] = useState("");
    const [newMeaning, setMeaning] = useState("");
    const [newSynonym, setSynonym] = useState("");
    const [newTranslation, setTranslation] = useState("");
    const [audioUpload, setAudio] = useState(null);
    const [words, setWords] = useState([]);
    const {state} = useLocation();
    const { wordid } = state;
    let navigate = useNavigate();

    useEffect(() => {
        const getWords = async () => {
            const docRef = doc(db, "words", wordid);
            let data = await getDoc(docRef);
            setWords(data.data(), data.id);
        };
        getWords();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    const update = () => {
        const audioRef = ref(storage, `audios/${audioUpload.name + v4()}`);
        uploadBytes(audioRef, audioUpload).then((snapshot)=>{
            alert('Word Updated');
            getDownloadURL(snapshot.ref).then((url)=> {
                const newFields = {day:words.day,word:newWord,meaning:newMeaning,synonym:newSynonym,translation:newTranslation,audioUrl: url}
                const docRef = doc(db,'words',wordid);
                updateDoc(docRef,newFields);
                navigate('/uploadword');
            })
        })
    }
    const goBack = ()=> {
        (navigate("/details", { state: { wordid: wordid} }))
    }
  return (
    <div className="form-container-3">
        <div className='header-2'>
            <h2 className="title">Edit Word</h2>
            <button className='button-6' onClick={goBack}>Back</button>
        </div>
        <div className="register-form">
            <input
                placeholder="Word No"
                value={words.day}
                className="form-field"
            />
            <input
                placeholder="Word"
                className="form-field"
                onChange={(event) => {
                setWord(event.target.value);
                }}
            />
            <input
                placeholder="Meaning"
                className="form-field"
                onChange={(event) => {
                setMeaning(event.target.value);
                }}
            />
            <input
                placeholder="Synonym"
                className="form-field"
                onChange={(event) => {
                setSynonym(event.target.value);
                }}
            />
            <input
                placeholder="Translation"
                className="form-field"
                onChange={(event) => {
                setTranslation(event.target.value);
                }}
            />
            <div>
            <input 
                type="file" 
                onChange={(event)=>{setAudio(event.target.files[0]); }}
            />
            </div>
            <button className="form-field" onClick={update}>Update</button>
        </div>
    </div>
  )
}
export default Update;