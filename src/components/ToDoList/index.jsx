import React from "react";
import styled from "styled-components";
import {
  MEDIA_QUERY_MOBILE,
  MEDIA_QUERY_LAPTOP,
  MEDIA_QUERY_LG,
} from "../../constants/breakpoint";

const Title = styled.h1`
  font-size: 2.8rem;
  ${MEDIA_QUERY_MOBILE} {
    font-size: 12vw;
  }
`;
const InputGroup = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0 40px;
  ${MEDIA_QUERY_MOBILE} {
    width: 90%;
  }
`;
const ToDoInput = styled.input`
  width: 85%;
  border: 1px solid #c8c8c8;
  border-radius: 5px;
  ${MEDIA_QUERY_MOBILE} {
    width: 75%;
  }
`;
const ToDoWrap = styled.div`
  width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${MEDIA_QUERY_MOBILE} {
    width: 100%;
  }
  ${MEDIA_QUERY_LAPTOP} {
    width: 90%;
  }
  ${MEDIA_QUERY_LG} {
    width: 800px;
  }
`;
const ToDoLabel = styled.label`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 10px;
  border-radius: 10px;
  &:nth-of-type(odd) {
    background: #e1e1e1;
  }
  ${MEDIA_QUERY_MOBILE} {
    width: 90%;
  }
`;
const ItemCheckBox = styled.input`
  width: 20px;
  height: 20px;
  border: 1px solid #c8c8c8;
`;
const ItemContent = styled.p`
  width: 50%;
  color: #000000;
  font-size: 1rem;
  ${props => props.$isDone && `
    text-decoration: line-through;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;
const Button = styled.button`
  background: #ffffff;
  border: 1px solid #999999;
  font-size: 1rem;
  border-radius: 10px;
  padding: 5px 15px;
  margin-left: 5px;
  &:hover {
    cursor: pointer;
    background: #999999;
    color: #ffffff;
  }
  ${MEDIA_QUERY_MOBILE} {
    padding: 1vw 2vw;
  }
`;

const ToDoList = () => {
  return (
    <ToDoWrap>
      <Title>TODOLIST</Title>
      <InputGroup>
        <ToDoInput type="text" placeholder="todo" />
        <Button>確認</Button>
      </InputGroup>
      <ToDoLabel>
        <ItemCheckBox type="checkbox" name="checkbox" />
        <ItemContent>寫功課</ItemContent>
        <ButtonGroup>
          <Button>
            刪除
          </Button>
        </ButtonGroup>
      </ToDoLabel>
    </ToDoWrap>
  );
};
export default ToDoList;
