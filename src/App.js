import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';


import './App.css';
import Navbar from './Components/Navbar';
import { RegisterUser, LoginUser, LogoutUser} from './Components/Users';
import ArticleSubmissionComponent from './Components/ArticleSubmission'; 
import {ArticlesListComponent, SubmissionsComponent, SingleArticleComponent} from './Components/ArticleGetters'; // add SingleArticleComponent eventually
import { UserProvider } from './Components/Users';
import HomePage from './Components/HomePage';
// import UserStatusComponent from './Components/Debug';
import {UserStatusComponent, GetAllUsers, WipeArticles, WipeUsers} from './Components/Debug';


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
        <Route path="/submitarticle" element={<ArticleSubmissionComponent />} />
        <Route path="/getallarticles" element={<ArticlesListComponent />} />
        <Route path="/submissions" element={<SubmissionsComponent />} />
        <Route path="/articles/:articleId" element={<SingleArticleComponent />} />
        <Route path="/users/status" element={<UserStatusComponent />} /> 
        <Route path="/users/deteteall" element={< WipeUsers />} />
        <Route path="/articles/deleteall" element={< WipeArticles />} />

      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
