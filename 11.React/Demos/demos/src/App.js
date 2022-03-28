import './App.css';
import Navbar from './Components/Navbar';
import React from 'react';
import UserList from './Components/UserList';
import UserProfile from './Components/UserProfile';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
    <Navbar/>
    <Routes>
      <Route path = "/" element = {<UserList/>}></Route>
      <Route path = "/users" element = {<UserList/>}></Route>
      <Route path = "/userprofile/:userId"  element ={ <UserProfile/>}/>
        
    </Routes>

    </Router>
    </>
  );
}

export default App;
