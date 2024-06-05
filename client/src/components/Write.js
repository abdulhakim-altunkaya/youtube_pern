import React, {useState} from 'react'
import axios from "axios";

function Write() {

  const [cityValue, setCityValue] = useState("");
  const [message, setMessage] = useState("");

  const saveData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/serversavecity", {goodcity: cityValue});
      setMessage(response.data.myMessage)
    } catch (error) {
      setMessage("Error Frontend: ", error.message);
    }
    
  }

  return (
    <div>
      <input type='text' className='inputArea' placeholder='enter City'
        value={cityValue} onChange={e => setCityValue(e.target.value)} /> {"      "}{"      "}
      <button onClick={saveData} className='btnSmall'>SAVE</button>  <br/> <br/>
      {message}
    </div>
  )
}

export default Write;