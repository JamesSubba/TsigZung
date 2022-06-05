import React, {useState} from 'react'
import db from "../firebase"
import {  Timestamp,addDoc, collection} from 'firebase/firestore';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid';
import { useNavigate } from 'react-router-dom'

const Word = () => {
    const [newWord, setWord] = useState("");
    const [newMeaning, setMeaning] = useState("");
    const [newSynonym, setSynonym] = useState("");
    const [newTranslation, setTranslation] = useState("");
    const [audioUpload, setAudio] = useState(null);
    const [day, setDay]=useState("");
    let navigate = useNavigate();

    const createWord = () => {
        if(audioUpload==null) return;
        const audioRef = ref(storage, `audios/${audioUpload.name + v4()}`);
        uploadBytes(audioRef, audioUpload).then((snapshot)=>{
            alert('Word uploaded');
            getDownloadURL(snapshot.ref).then((url)=> {
                const collectionRef = collection(db, "words" );
                addDoc(collectionRef, {
                    day: day,
                    word: newWord,
                    meaning: newMeaning,
                    synonym: newSynonym,
                    translation: newTranslation,
                    audioUrl: url,
                    createdAt: Timestamp.now().toDate()
                  });
                navigate('/uploadword');
            })
        })
    }   

    const goBack = ()=> {
        navigate('/uploadword')
    }
  return (
    <div className="form-container-3">
        <div className='header-2'>
            <h2 className="title">Upload New Word</h2>
            <button className='button-2' onClick={goBack}>Back</button>
        </div>
        <div className="register-form">
            <input
                placeholder="Word No"
                className="form-field"
                onChange={(event) => {
                setDay(event.target.value);
                }}
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
            <button className="form-field" onClick={createWord}>Create</button>
        </div>
    </div>
  )
}
export default Word;