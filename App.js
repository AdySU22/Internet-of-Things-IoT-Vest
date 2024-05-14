import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
