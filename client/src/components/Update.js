import React, {useState} from 'react'
import axios from "axios";

function Update() {

  const [targetId, setTargetId] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [message, setMessage] = useState("");

  const updateData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/serverupdatecity", {goodcity: cityValue, targetId2: targetId});
      setMessage(response.data.myMessage)
    } catch (error) {
      setMessage("Error Frontend: ", error.message);
    }
    
  }

  return (
    <div>
      <input type='text' className='inputArea' placeholder='enter City'
        value={cityValue} onChange={e => setCityValue(e.target.value)} /> {"      "}{"      "}
      <input type='number' className='inputArea' placeholder='enter id'
        value={targetId} onChange={e => setTargetId(e.target.value)} /> {"      "}{"      "}
      <button onClick={updateData} className='btnSmall'>UPDATE</button>  <br/> <br/>
      {message}
    </div>
  )
}

export default Update;