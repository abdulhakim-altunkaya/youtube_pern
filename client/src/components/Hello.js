import React, {useState, useEffect} from 'react';
import axios from "axios";

function Hello() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    const sayHello = async () => {
      try {
        const response = await axios.get("http://localhost:5000/serversendhello");
        setMessage(response.data.myMessage);
      } catch (error) {
        console.log(error.message);
        setMessage("error happened")
      }
    }
    sayHello();
  }, [])
  

  return (
    <div>{message}</div>
  )
}

export default Hello