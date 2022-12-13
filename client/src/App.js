import './App.css';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {SocketContext, socket} from './context/socket';
import ChatOptions from './components/ChatOptions';

function App() {
  
  return (
    <div className="App" >
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/options" element={<ChatOptions />} />
        </Routes>
        </BrowserRouter>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
