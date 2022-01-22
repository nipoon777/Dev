import './App.css';
import React from 'react';
import SignUp from './Components/SignUp';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Login from './Components/Login';
import Feed from './Components/Feed';
import PrivateRouter from './Components/PrivateRouter';
import Profile from "./Components/Profile";
function App() {
  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path = '/login' element = {<Login/>}>
          </Route>
          <Route path = "/profile/:id" element = {<Profile/>} />
          <Route path = '/signup' element = {<SignUp/> }/>
          <Route path = "/" element = {<PrivateRouter> <Feed/></PrivateRouter>} />
         
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
