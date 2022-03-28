import './App.css';
import Navbar from './Components/Navbar';
import React from 'react';
import UserList from './Components/UserList';
import UserProfile from './Components/UserProfile';
import AlbumContent from './Components/AlbumContent';
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
      <Route path = "/users/:userId/album/:albumId" element={<AlbumContent/>}/>
        
    </Routes>

    </Router>
    </>
  );
}

export default App;
