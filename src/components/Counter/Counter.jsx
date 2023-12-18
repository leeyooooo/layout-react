import React from "react";
import styled from "styled-components";

const title = {
  border: "1px solid black",
  width: "150px",
  textAlign: "center",
  marginBottom: "20px",
};

const count = {
  width: "150px",
  border: "1px solid black",
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "center",
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
const Counter = () => {
  return (
    <>
      <div>
        <h1 style={title}>Title</h1>
        <div style={count}>Count</div>
      </div>
      <BtnGroup>
        <CountBtn>-</CountBtn>
        <CountBtn>+</CountBtn>
      </BtnGroup>
    </>
  );
};

export default Counter;
