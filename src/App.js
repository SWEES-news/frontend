import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';


import './App.css';
import Navbar from './Components/Navbar';
import Games from './Components/Games';
import { GetAllUsers, RegisterUser, LoginUser, LogoutUser} from './Components/Users';
import ArticleSubmissionComponent from './Components/ArticleSubmission'; 
import {ArticlesListComponent, SubmissionsComponent} from './Components/ArticleGetters';
import { UserProvider } from './Components/Users';

import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='' element={<h1>Home</h1>} />
        <Route path="user/register" element={<RegisterUser />} /> 
        <Route path="user/login" element={<LoginUser />} />
        <Route path="user/logout" element={<LogoutUser />} />
        <Route path="games" element={<Games />} />
        <Route path="User/GetAll" element={<GetAllUsers />} />
        <Route path="/submitarticle" element={<ArticleSubmissionComponent />} />
        <Route path="/getallarticles" element={<ArticlesListComponent />} />
        <Route path="/submissions" element={<SubmissionsComponent />} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
