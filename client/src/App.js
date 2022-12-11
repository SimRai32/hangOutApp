import './App.css';
import io from 'socket.io-client';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const socket = io("http://localhost:4000");

function App() {
  
  return (
    <div className="App" >
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home socket={socket}/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
