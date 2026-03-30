// src/App.js
import React, {useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './Login';
import Question from './Question'
import AppBar from './AppBar'
import AddQuestion from './AddQuestion'
import Profile from './Profile'
import EditQuestion from './EditQuestion'
import CreateUser from './CreateUser'

function App() {
  const [, setLoggedUser] = useState(null)
  const isLoggedIn = sessionStorage.getItem("username") !== null;
  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn ? <AppBar /> : null}
        {isLoggedIn ? (
          <Routes>
            <Route path='/' element={<Question/>}/>
            <Route path='/add' element={<AddQuestion/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path={'/edit/:id'} element={<EditQuestion/>} />
            <Route path='/login' element={<Navigate to="/" replace />} />
            <Route path='/create-user' element={<Navigate to="/" replace />} />
            <Route path='*' element={<Navigate to="/" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path='/login' element={<Login setLoggedUser={setLoggedUser} />} />
            <Route path='/create-user' element={<CreateUser />} />
            <Route path='*' element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
