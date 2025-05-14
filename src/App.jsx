import Home from './pages/Home.jsx';
import Cartas from './pages/Cartas.jsx';
import Error from './pages/404.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('Authorization'));
  useEffect(() => {
    const storedToken = localStorage.getItem('Authorization');
    setToken(storedToken);
  }, []);
  
  useEffect(() => {
    const res = localStorage.getItem('Authorization');
    const genero = localStorage.getItem('Genero');
    if (!genero) {
      localStorage.setItem('Genero', 'M');
    }
    setToken(res);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home setToken={setToken} />} />
      <Route path="/carta" element={token ? <Cartas /> : <Navigate to="/" />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
