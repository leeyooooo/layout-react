import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PostsPage from "./pages/PostsPage";
import Header from "./components/Header";
import styled from "styled-components";
import { AuthContext } from "./contexts";
import { getMe } from "./WebAPI";

const Root = styled.div``;

function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    getMe().then(res => {
      if(res.ok) {
        setUser(res.data)
      }
    })
  },[])
  return (
    <AuthContext.Provider value={{user, setUser}}>
      <Root>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/posts/:userId" element={<PostsPage />} />
          </Routes>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
