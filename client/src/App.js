import './App.css';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {SocketContext, socket} from './context/socket';
import ChatOptions from './components/ChatOptions';
import Chat from './components/Chat';
function App() {
  
  return (
    <div className="App" >
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/options" element={<ChatOptions />} />
          <Route path="/chatroom" element={<Chat />} />
        </Routes>
        </BrowserRouter>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
