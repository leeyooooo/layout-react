import axios from "axios";
import React from "react";
import { useEffect, useState, useMemo } from "react";
import styled from "styled-components";

const ContentWrapper = styled.div`
  width: 40%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  p {
    font-size: 0.9rem;
    margin: 0;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  flex-wrap: wrap;
`;

const ApiUtil = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    AxiosData();
  }, []); // 此陣列的內容若有改變就會執行useEffect中的程式,空的代表在程式開始運行時執行一次

  const AxiosData = () => {
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

  const filterData = useMemo(() => {
    return data && !data.city && data.filter((data) => data.city === "臺東縣");
  }, [data]);

  return (
    <>
      <Container>
        {filterData.map((data, index) => (
          <ShowData data={data} key={index} />
        ))}
      </Container>
    </>
  );
};
const ShowData = ({ data }) => {
  const [btnShow, setBtnShow] = useState(true);
  const [currentData, setCurrentData] = useState([]);
  const [count, setCount] = useState(0);
  const { city, farm_name, address, service } = data;
  // 取得 data 裡面所有的 key
  const keys = Object.keys(data);
  // 篩選掉一開始就有出現的值
  const filterKeys = keys.filter(
    (key) =>
      key !== "city" &&
      key !== "farm_name" &&
      key !== "address" &&
      key !== "service"
  );

  const showMore = (data) => {
    if (count < filterKeys.length) {
      // 驗證有資料才傳值
      data[filterKeys[count]] &&
        setCurrentData((current) => [
          ...current, // 把原本有的資料也放進來
          {
            [filterKeys[count]]: data[filterKeys[count]],
          },
        ]);
    }
    if (count === filterKeys.length - 1) {
      setBtnShow(false); // 資料都顯示完後就把按鈕隱藏
    }
    setCount(count => count + 1);
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
      
      {currentData.map((content, index) => ( // 將目前有的值傳進 content 顯示
        <Content content={content} key={index} />
      ))}

      {btnShow && <button onClick={() => showMore(data)}>show more</button>}
    </ContentWrapper>
  );
};

const Content = ({ content }) => {
  const {
    conditions,
    demand_num,
    dining_offer,
    dorm_offer,
    job_intro,
    job_name,
    manager,
    leave_num,
    on_work,
    unit_address,
    workfare,
  } = content;
  
  // 確保資料被傳進來後才顯示
  return (
    <>
      {conditions && <p>{conditions}</p>}
      {demand_num && <p>{demand_num}</p>}
      {dining_offer && <p>{dining_offer}</p>}
      {dorm_offer && <p>{dorm_offer}</p>}
      {job_intro && <p>{job_intro}</p>}
      {job_name && <p>{job_name}</p>}
      {manager && <p>{manager}</p>}
      {leave_num && <p>{leave_num}</p>}
      {on_work && <p>{on_work}</p>}
      {unit_address && <p>{unit_address}</p>}
      {workfare && <p>{workfare}</p>}
    </>
  );
};
export default ApiUtil;
