import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';


import './App.css';
import Navbar from './Components/Navbar';
import Games from './Components/Games';
import { GetAllUsers, AddUser } from './Components/Users';
import ArticleSubmissionComponent from './Components/ArticleSubmission'; 


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='' element={<h1>Home</h1>} />
        <Route path="games" element={<Games />} />
        <Route path="User/GetAll" element={<GetAllUsers />} />
        <Route path="User/Add" element={<AddUser />} /> 
        <Route path="/submitarticle" element={<ArticleSubmissionComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
