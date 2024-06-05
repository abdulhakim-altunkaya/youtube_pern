import React, {useState, useEffect} from 'react';
import axios from "axios";

function Read() {

  const [message, setMessage] = useState([]);

  useEffect(() => {
    const sayHello = async () => {
      try {
        const response = await axios.get("http://localhost:5000/servergetcities");
        setMessage(response.data);
      } catch (error) {
        console.log(error.message);
        setMessage("error happened")
      }
    }
    sayHello();
  }, [])
  

  return (
    <div>{message.map(record => 
      <div key={record.id}>{record.city}</div>
    )}</div>
  )
}

export default Read