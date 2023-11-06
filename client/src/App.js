// src/App.js
import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './Login';
import Question from './Question'
import AppBar from './AppBar'
import AddQuestion from './AddQuestion'

// function setLoggedUser(username) {
//   sessionStorage.setItem('username', JSON.stringify(username))
// }

// function getLoggedUser() {
//   const userString = sessionStorage.getItem('username')
//   const userName = JSON.parse(userString)
//   return userName?.username
// }

function App() {
  const [loggedUser, setLoggedUser] = useState(null)
  if (loggedUser === null) {
    return <Login setLoggedUser={setLoggedUser}/>
  }
  // if (!loggedUser) {
  //   return <Login setLoggedUser={setLoggedUser}/>
  // }
  return (
    <div className="App">
      <BrowserRouter>
        <AppBar></AppBar>
        <Routes>
          <Route path='/' element={<Question/>}/>
          <Route path='/add' element={<AddQuestion/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
