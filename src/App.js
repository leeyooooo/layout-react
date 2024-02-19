import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Header from './header/Header';
import styled from 'styled-components';
import { useState,useEffect } from 'react';
import { AuthContext } from './contexts';
import { getMe } from './WebApi';
const Root = styled.div`
  padding-top:64px;
`;

function App() {
  const [user,setUser] =useState(null)
  useEffect(()=>{
    //TODO: 有token 才call api
      getMe.then(response =>{
        if(response.ok){
          setUser(response.data);
        }
      })
  },[])
  return (
    <AuthContext.Provider value ={{user,setUser} }>
    <Root>
      <Router>
        <Header>header</Header>
        
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* 修正此行 */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </Root>
    </AuthContext.Provider>
  );
}

export default App;
