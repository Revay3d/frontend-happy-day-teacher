import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { useState } from "react";
import { login } from "../../api/api.js";
import "../assets/css/Home.css";

const msg =<>¡Feliz día de los <span className="resaltado-nombre">Maestros</span>!</>;
const sub_msg = "Preciona el corazon";

function Home() {
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  const [heart, setHeart] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const eventHeart = () => {
    if (!heart) {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
        disableForReducedMotion: true,
      });
    }
    setHeart(!heart);
  };

  const eventVerify = async (event) => {
    event.preventDefault();
    try {
  
      const res = await login(key);
      localStorage.setItem("Authorization", `Bearer ${res.data.token}`);
      localStorage.setItem("Genero", res.data.genero); 
      navigate("/carta");


    } catch (err) {
       setTimeout(() => {
          setIsInvalid(true);
      }, 100);
      setIsInvalid(false);
      
    }
  };

  return (
    <>
      <div className="msg">
        <i onClick={eventHeart} className="fa-solid fa-heart msg_icon"></i>
        <p>{msg}</p>
        <p className="sub_msg">{sub_msg}</p>
      </div>
      <form onSubmit={eventVerify} className={heart ? "form active" : "form"}>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Escribe la key"
          className={isInvalid ? "error" : ""}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}


export default Home;
 
 
