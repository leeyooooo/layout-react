import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

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

const ApiUse = () => {
  const [data, setData] = useState([]); //改了這[]
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    //進來就要做第一次
    apiData();
    console.log("一次就好");
    return () => {
      //如果data變了就先做這個 然後再做一次上面的
    };
  }, []); //改了這[data] ->[]  data會重複到爆

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

  const expensive = (num) => {
    console.log("好貴好貴");
    for (let i = 0; i < 100000000; i++) {}
    return num * 10;
  };
  const trouble = useMemo(() => {
    return expensive(30);
    console.log("亂用一通");
  }, [todos]);
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
  return (
    <div>
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
              {/* <li key={item.city}>title:{item.city}...{item.farm_name}....info:{item.address}...{item.service}</li>//沒加key={item.city}也可以 */}
            </CardWrapper>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>
    </div>
  );
};

export default ApiUse;
