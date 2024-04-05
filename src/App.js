import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';


import './App.css';
import Navbar from './Components/Navbar';
import { GetAllUsers, RegisterUser, LoginUser, LogoutUser} from './Components/Users';
import ArticleSubmissionComponent from './Components/ArticleSubmission'; 
import {ArticlesListComponent, SubmissionsComponent} from './Components/ArticleGetters';
import { UserProvider } from './Components/Users';
import HomePage from './Components/HomePage';

import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='' element={ < HomePage />} />
        <Route path="/users/register" element={<RegisterUser />} /> 
        <Route path="/users/login" element={<LoginUser />} />
        <Route path="/users/logout" element={<LogoutUser />} />
        <Route path="/users/getall" element={<GetAllUsers />} />
        {/* <Route path="/games" element={<Games />} /> */}
        <Route path="/submitarticle" element={<ArticleSubmissionComponent />} />
        <Route path="/getallarticles" element={<ArticlesListComponent />} />
        <Route path="/submissions" element={<SubmissionsComponent />} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
