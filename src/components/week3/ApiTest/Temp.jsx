import axios from "axios";
import React from "react";
import { useEffect, useState, useMemo } from "react";
import { ContentWrapper, Container } from "./styleComponents";

const DataItem = ({ data }) => {
  const [btnShow, setBtnShow] = useState(true);
  const [currentData, setCurrentData] = useState([]);
  const [count, setCount] = useState(0);
  const { city, farm_name, address, service, ...rest } = data;
  const excludeKeys = ["city", "farm_name", "address", "service"];

  const filterKeys = Object.keys(data).filter(
    (key) => !excludeKeys.includes(key)
  );

  const showMore = () => {
    if (count < filterKeys.length) {
      const key = filterKeys[count];
      const value = rest[key];
      if(value === "") setCurrentData((current) => [...current, { [filterKeys[count+1]]: rest[filterKeys[count+1]] }]);
      // 驗證有資料才傳值
      value && setCurrentData((current) => [...current, { [key]: value }]);
    }

    if (count === filterKeys.length - 1) {
      setBtnShow(false); // 資料都顯示完後就把按鈕隱藏
    }

    setCount((count) => count + 1);
  };

  return (
    <ContentWrapper>
      <h3>
        {city}
        <br />
        {farm_name}
      </h3>
      <p>
        {address}
        <br />
        {service}
      </p>

      {currentData.map(
        (
          content,
          index // 將目前有的值傳進 content 顯示
        ) => (
          <Content content={content} key={index} />
        )
      )}

      {btnShow && <button onClick={showMore}>show more</button>}
    </ContentWrapper>
  );
};

const Content = ({ content }) => {
  return (
    <>
      {Object.entries(content).map(
        ([key, value]) => value && <p key={key}>{value}</p>
      )}
    </>
  );
};

const Temp = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []); // 此陣列的內容若有改變就會執行useEffect中的程式,空的代表在程式開始運行時執行一次

  const getData = () => {
    axios
      .get(
        "https://data.moa.gov.tw/Service/OpenData/FarmJobInfo.aspx?IsTransData=1&UnitId=B61"
      )
      .then((res) => {
        res.data && setData(res.data); // 讓useState存取資料
      })
      .catch((error) => {
        console.log(error.status);
      });
  };

  const filterData = useMemo(
    () => data.filter((item) => item.city === "苗栗縣"),
    [data]
  );

  return (
    <>
      <Container>
        {filterData.map((data, index) => (
          <DataItem data={data} key={index} />
        ))}
      </Container>
    </>
  );
};
export default Temp;
