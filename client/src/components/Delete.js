import React, {useState} from 'react'
import axios from "axios";

function Delete() {

  const [targetId, setTargetId] = useState("");
  const [message, setMessage] = useState("");

  const deleteData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/serverdeletecity", {targetId2: targetId});
      setMessage(response.data.myMessage)
    } catch (error) {
      setMessage("Error Frontend: ", error.message);
    }
    
  }

  return (
    <div>
      <input type='number' className='inputArea' placeholder='enter id'
        value={targetId} onChange={e => setTargetId(e.target.value)} /> {"      "}{"      "}
      <button onClick={deleteData} className='btnSmall'>DELETE</button>  <br/> <br/>
      {message}
    </div>
  )
}

export default Delete;