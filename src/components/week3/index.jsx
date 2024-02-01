import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TodoItemWrapper = styled.div`
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const TodoContent = styled.div`
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TodoButtonWrapper = styled.div`
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const Button = styled.button``;

const RedButton = styled.button`
  color: red;
`;
const CardWrapper = styled.div`
  width: 350px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &+&{
    margin-top:16px;
  }
`;
const CardTitle = styled.h2`
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardContent = styled.div`
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const CardWrapper1 = styled.div`
  margin-left=200px;
  width: 350px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const CardTitle1 = styled.h2`
  margin-left=200px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardContent1 = styled.div`
  margin-left=200px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const API_ENDPOINT =
  "https://student-json-api.lidemy.me/comments?_sort=createdAt&_order=desc";
const ApiUse = () => {
  const [data, setData] = useState([]); //改了這[]
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageApiError, setMessageApiError] = useState(null);
  const [text, setText] = useState();
  const [postMessageError, setPostMessageError] = useState();
  const [isLoadingPostMessage, setIsLoadingPostMessage] = useState(false);
  useEffect(() => {
    //進來就要做第一次
    Fetchdata();
    apiData();
    return () => {
      //如果data變了就先做這個 然後再做一次上面的
    };
  }, []); //改了這[data] ->[]  data會重複到爆
  const Fetchdata = () => {
    fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => {
        setMessageApiError(err.message);
      });
  };

  const apiData = () => {
    axios
      .get(
        "https://data.moa.gov.tw/Service/OpenData/FarmJobInfo.aspx?IsTransData=1&UnitId=B61"
      )
      .then((response) => {
        console.log(response);
        //setData(response.data); //讓useState存資料
        const allData = response.data; //為啥一定要這樣?
        const specificCity = allData.filter(
          (cityname) => cityname.city === "臺中市"
        );
        console.log(specificCity);
        setData(specificCity); //如果沒加.data log會一直跑下去  改了這 變沒有.data
      });
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleButtonClick = () => {
    setTodos([value, ...todos]);
    setValue("");
    //console.log("re-render")
    //console.log(value);
    //apiData();
  };
  /*
  const Todoitem = ({ className, size, content }) => {
    return (
      <CardWrapper1 className={className}>
        <CardTitle1 size={size}>{content}</CardTitle1>
        <CardContent1>
          <Button>新增</Button>
          <RedButton>刪除</RedButton>
        </CardContent1>
      </CardWrapper1>
    );
  };
  */

  //
  const Title = styled.h1`
    color: #333;
  `;
  const MessageForm = styled.form`
    margin-top=16px;
  `;
  const MessageTextArea = styled.textarea`
    display: block;
    width: 25%;
  `;
  const SubmitButton = styled.button`
    margin-top: 16px;
  `;
  const MessageList = styled.div``;

  const MessageContainer = styled.div`
    border: 1px solid black;
    width: 25%;
    padding: 8px 16px;
    border-radius: 8px;

    & + & {
      margin-top: 8px;
    }
  `;
  const MessageHead = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 4px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  `;
  const MessageAuthor = styled.div`
    color: rgba(23, 78, 55, 0.3) font-size=14px;
  `;
  const MessageTime = styled.div``;
  const MessageBody = styled.div`
    font-size: 16px;
    margin-top: 16px;
  `;
  const ErrorMessage = styled.div`
    margin-top:16x:
    color:red;
  `;
  const Message = ({ author, time, children }) => {
    return (
      <MessageContainer>
        <MessageHead>
          <MessageAuthor>{author}</MessageAuthor>
          <MessageTime>{time}</MessageTime>
        </MessageHead>
        <MessageBody>{children}</MessageBody>
      </MessageContainer>
    );
  };
  const handleTextareaChange = (e) => {
    setText(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isLoadingPostMessage) {
      return;
    }

    setIsLoadingPostMessage(true);
    fetch("https://student-json-api.lidemy.me/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nickname: "dada",
        body: text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoadingPostMessage(false);
        if (data.ok === 0) {
          setPostMessageError(data.message);
          return;
        }
        setText("");
        Fetchdata();
      })
      .catch((err) => {
        setIsLoadingPostMessage(false);
        setPostMessageError(err.message);
      });
  };
  const handleTextareaFocus = (e) => {
    setPostMessageError(null);
  };
  /*
  Message.PropTypes={
    author:PropTypes.string,
    time:PropTypes.string,
    children:PropTypes.node,
  }
  */
  const Loading = styled.div`
 position:fixed;
 top:0;
 left:0:
 right:0;
 bottom:0;
 background:rgba(0,0,0,0.3);
 color: white;
 font-size: 30px;
 display:flex;
 align-items:center;
 justify-content=center;
 `;
  return (
    <div>
      <br />
      {/*  
      <input
        
        type="text"
        placeholder="請輸入要加入的待辦"
        value={value}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>Add todo</button>
      
      {
        todos.map((todos, index) => (
          <Todoitem key={index} content={todos} />
        )) //argument傳入todoitem不太懂
      }
      */}

      <ul>
        {data && data.length > 0 ? ( //validate
          data.map((item) => (
            <CardWrapper>
              {/* 不會跳錯誤 只是因為抓不到所以不會顯示而已 好扯 根本沒有random */}
              <CardTitle>
                {item.city}-{item.farm_name}
              </CardTitle>
              <CardContent>
                地址:{item.address} <br />
                相關服務:{item.service}
              </CardContent>
              {/* <li key={item.city}> 
                title:{item.city}...{item.farm_name}....info:{item.address}...
                {item.service}
              </li>
              //沒加key={item.city}也可以*/}
            </CardWrapper>
          ))
        ) : (
          <div></div>
        )}
      </ul>
      {isLoadingPostMessage && <Loading>Loading.....</Loading>}
      <Title>留言板</Title>
      <MessageForm onSubmit={handleFormSubmit}>
        <MessageTextArea
          value={text}
          onChange={handleTextareaChange}
          rows={10}
          onFocus={handleTextareaFocus}
        />
        <SubmitButton>送出留言</SubmitButton>
        {postMessageError && <ErrorMessage>{postMessageError}</ErrorMessage>}
      </MessageForm>
      {messageApiError && (
        <ErrorMessage>
          Something went wrong. {messageApiError.toString()}
        </ErrorMessage>
      )}
      {messages && messages.length === 0 && <div> No message</div>}
      <MessageList>
        {messages &&
          messages.map((message) => (
            <Message
              key={message.id}
              author={message.nickname}
              time={new Date(message.createdAt).toLocaleString()}
            >
              {message.body}
            </Message>
          ))}
      </MessageList>
    </div>
  );
};

export default ApiUse;
