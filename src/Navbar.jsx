import {
   BrowserRouter,
   Routes,
   Route
} from 'react-router-dom';

import './App.css';

import Navbar from './Components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="games" element={<h1>Games</h1>} />
        <Route path='users' element={<h1>Users</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
