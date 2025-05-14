import { useState, useEffect } from "react";
import "../css/carta.css";
import confetti from "canvas-confetti";

const audio = new Audio("audio/cancion-happy-day-teacher.wav");
audio.volume = 0.4;

function Carta({ user, msg }) {
  const [abierto, setAbierto] = useState(false);
  const [mostrarOpen, setMostrarOpen] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setMostrarOpen(false);
    }, 700);
  }, []);

  useEffect(() => {
    setMessage(msg);
    setUsername(user);
  }, [user, msg]);

  function launchConfetti() {
    // Izquierda
    confetti({
      particleCount: 5,
      spread: 60,
      angle: 90,
      origin: { x: 0, y: 1 },
      disableForReducedMotion: true,
    });

    // Derecha
    confetti({
      particleCount: 5,
      spread: 60,
      angle: 90,
      origin: { x: 1, y: 1 },
      disableForReducedMotion: true,
    });

    // Llamar de nuevo después de un tiempo
    setTimeout(launchConfetti, 200); // cada 200ms
  }

  const toggleSobre = () => {
    if (!audioPlaying) audio.play(), launchConfetti();
    setAudioPlaying(true);

    if (abierto) {
      setAbierto(false);

      setTimeout(() => {
        setMostrarOpen(false);
      }, 700);
    } else {
      // Si está cerrada, mostrar inmediatamente
      setAbierto(true);
      setMostrarOpen(true);
    }
  };

  return (
    <>
      <h1 style={{ top: "-230px", position: "relative" }}>
        {abierto ? (
          <p>
            ¡Felicidades <span className="resaltado-nombre">{username}</span>!
          </p>
        ) : (
          "Presiona la carta para abrir"
        )}
      </h1>

      <div className={`sobre ${abierto ? "open" : ""}`}>
        <div className="carta-arriba--fondo"></div>
        <div className={`carta-arriba ${mostrarOpen ? "open" : "close"}`}></div>
        <div className="carta" onClick={toggleSobre}></div>

        <div className={`message ${abierto ? "open" : "close"}`}>
          <p dangerouslySetInnerHTML={{ __html: message }}></p>
        </div>
        <span
          className={`message_click ${abierto ? "open" : " "}`}
          onClick={toggleSobre}
        >
          Click para cerrar
        </span>
      </div>
    </>
  );
}

export default Carta;
