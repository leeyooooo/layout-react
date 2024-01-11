import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

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
  }
`;
const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: justify;
    justify-content: center;
    flex-wrap: wrap;
`;

const ApiUtil = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        AxiosData()
    }, []) // 此陣列的內容若有改變就會執行useEffect中的程式,空的代表在程式開始運行時執行一次
    const AxiosData = () => {
        axios.get('https://data.moa.gov.tw/Service/OpenData/FarmJobInfo.aspx?IsTransData=1&UnitId=B61')
        .then((res) => {
            setData(res.data) // 讓useState存取資料
        })
        .catch(error => {
            console.log(error.status)
        })
    }
    const ShowData = ({data}) => {
        return (
            <ContentWrapper>
                <p>
                {data.city}<br />
                {data.farm_name}<br />
                {data.job_name}<br />
                {data.demand_num}<br />
                {data.leave_num}<br />
                {data.manager}<br />
                {data.unit_address}<br />
                {data.dining_offer}<br />
                {data.dorm_offer}<br />
                {data.on_work}<br />
                {data.job_intro}<br />
                {data.conditions}<br />
                {data.address}<br />
                {data.workfare}<br />
                {data.service}</p>
            </ContentWrapper>
        );
    }
    return (
        <>
            <Container>
                {
                    data.map((data, index) =>
                        <ShowData data={data} key={index} />
                    )
                }
            </Container>
            <hr />
            <Container>
                {
                    data.filter(data => data.city === '苗栗縣').map((data, index) =>
                        <ShowData data={data} key={index} />
                    )
                }
            </Container>
        </>
    );
}
export default ApiUtil;