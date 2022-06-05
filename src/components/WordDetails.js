import React from 'react'
import { useNavigate } from 'react-router-dom';

const WordDetails = ({day, id}) => {
  let navigate = useNavigate();
  return (
    <div className='card' onClick={() => (navigate("/details", { state: { wordid: id} }))} key={id}>
        <h1>Day {day}</h1>
    </div>
  )
}
export default WordDetails;