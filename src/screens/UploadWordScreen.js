import React, {useState, useEffect} from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { logout } from '../firebase';
import { useNavigate } from 'react-router-dom';
import db from "../firebase"
import WordDetails from '../components/WordDetails';

const UploadWordScreen = () => {
    let navigate = useNavigate();
    const [words, setWords] = useState([]);
   
    useEffect(() => {
        const collectionRef = collection(db, "words");
        const q = query(collectionRef, orderBy("createdAt", "asc"));
        onSnapshot(q, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setWords(data);
        });
      }, []);

    async function handleLogout(){
        logout();
        navigate('/', { reset: true });
    }
    async function createNewWord(){
        navigate('/word');
   }

    return (
        <>
        <header className='header'>
                <h1 className='logo'>TsigZung</h1>
                <div className='link-group'>
                    <button className="button-3" onClick={createNewWord}>Upload</button>
                    <button className="form-field"  onClick={handleLogout}>logout</button>
                </div>
            </header>
        <div className="form-container-2">
        <div className="register-form">
            <h2 className='upload'>Your Uploads</h2>
            <div className='content'>
                {words.map(({ id, day  }) => (
                    <WordDetails  key={id} id={id} day={day}/>
                ))}
            </div>
        </div>
        </div>
        </>
    )
    }
export default UploadWordScreen;