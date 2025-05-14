import '../assets/css/carta.css';
import Carta from '../assets/components/carta.jsx';
import { useState, useEffect } from 'react';
import { getCartas } from '../../api/api.js';
import { useNavigate } from 'react-router-dom';

function Cartas() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const token = localStorage.getItem('Authorization');
      const res = await getCartas(token);
      const genero = localStorage.getItem("Genero"); 
      
      document.body.classList.remove("woman", "men");
          if (genero === "F") document.body.classList.add("woman");

          else if (genero === "M") document.body.classList.add("men");
      if (res && res.data.username && res.data.message) {
         setMessage(res.data.message);
        setUsername(res.data.username);
       

      } else {
        navigate("/"); 
      }
    } catch (err) {
      navigate("/"); 
    
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Carta user={username} msg={message.replace(/{username}/g, username)} />
    </>
  );
}

export default Cartas;
