import { useNavigate } from "react-router-dom";
import "../css/msg.css";
import confetti from "canvas-confetti";
import { useState } from "react";
import { login } from "../../../api/api.js";

function Msg({ msg, sub_msg }) {
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  const [heart, setHeart] = useState(false);

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
      localStorage.setItem("Authorization",  `Bearer ${res.data.token}`);
      navigate("/carta");
    } catch (err) {
      alert(err.response.data.message);
      navigate("/");
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
        />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default Msg;
