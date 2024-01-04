import React, { useState } from "react";
import styled from "styled-components";

const TitleStyle = styled.h1`
  border: 1px solid black;
  width: 150px;
  text-align: center;
  margin-bottom: 20px;
  color:white;
`;
const CountStyle = styled.div` 
  width: 150px;
  height: 150px;
  border: 1px solid black;
  font-size: 64px;
  font-weight: bold;  
  text-align: center;
  align-items: center;
  color:white;
`;
const CountBtn = styled.button`
  width: 80px;
  height: 80px;
  background: orange;
  border: 1px solid #c8c8c8;
  border-radius: 100px;
  font-size: 2rem;
  color:white;
  &:hover {
    cursor: pointer;
    background: #c8c8c8;
    color: #ffffff;
  }
`;
const AcBtn = styled.button`
  width: 80px;
  height: 80px;
  background: gray;
  border: 1px solid #c8c8c8;
  border-radius: 100px;
  font-size: 2rem;
  color:black;
  &:hover {
    cursor: pointer;
    background: #c8c8c8;
    color: #ffffff;
  }
`;
const BtnGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const Layout = styled.div`
  height:270px;
  width:270px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background:black;
  margin-left:750px;
`;

const Counter = () => {
    const [count, setCount] = useState(0);

    const handleIncrease = () => {
      setCount((prev) => (prev += 1));
    };
    const handleDecrease = () => {
      setCount((prev) => (prev -= 1));
    }
  return (
    
    <Layout>
        
        <TitleStyle>Title</TitleStyle>
        <CountStyle>{count}</CountStyle>
      
      <BtnGroup>
        <AcBtn 
          onClick={()=>{
          setCount(0);
        }}>AC</AcBtn>
        <CountBtn onClick={handleDecrease}>-</CountBtn>
        <CountBtn onClick={handleIncrease}>+</CountBtn>
      </BtnGroup>
    </Layout>
  );
};

export default Counter;
