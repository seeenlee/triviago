// src/App.js
import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './Login';
import Question from './Question'
import AppBar from './AppBar'
import AddQuestion from './AddQuestion'
import Profile from './Profile'
import EditQuestion from './EditQuestion'

function App() {
  const [loggedUser, setLoggedUser] = useState(null)
  if (sessionStorage.getItem("username") === null) {
    return <Login setLoggedUser={setLoggedUser}/>
  }
  return (
    <div className="App">
      <BrowserRouter>
        <AppBar></AppBar>
        <Routes>
          <Route path='/' element={<Question/>}/>
          <Route path='/add' element={<AddQuestion/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path={'/edit/:id'} element={<EditQuestion/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
