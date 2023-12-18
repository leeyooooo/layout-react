import React, { useState } from "react";
import styled from "styled-components";

const title = {
  border: "1px solid black",
  width: "150px",
  textAlign: "center",
  marginBottom: "20px",
};

const countStyle = {
  width: "150px",
  height: "150px",
  border: "1px solid black",
  fontSize: "64px",
  fontWeight: "bold",
  textAlign: "center",
  alignItems: "center",
};

const CountBtn = styled.button`
  width: 80px;
  height: 80px;
  background: transparent;
  border: 1px solid #c8c8c8;
  border-radius: 15px;
  font-size: 2rem;
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount((prev) => (prev += 1));
  };
  const handleDecrease = () => {
    setCount((prev) => (prev -= 1));
  };

  return (
    <Layout>
      <div>
        <h1 style={title}>Title</h1>
        <div style={countStyle}>{count}</div>
      </div>
      <BtnGroup>
        <CountBtn onClick={handleDecrease}>-</CountBtn>
        <CountBtn onClick={handleIncrease}>+</CountBtn>
      </BtnGroup>
    </Layout>
  );
};

export default Counter;
