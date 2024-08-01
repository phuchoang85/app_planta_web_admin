import React, { useEffect, useRef, useState } from 'react';
import { Line,Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import OrderApi from '../api/OrderApi';
import UseApi from '../api/UseApi';

const Home = () => {
  
  const monthlyProductCounts = Array.from({ length: 12 }, () => 0);
  const monthlyUserRegister = Array.from({ length: 12 }, () => 0);
  
  const [isLoading, setisLoading] = useState(true)
  const [data, setdata] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
      label: 'Thống kê bán hàng',
      data: monthlyProductCounts,
      borderWidth: 1
    }]
  })

  const [dataUser, setdataUser] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
      label: 'Thống kê số lượt đang kí',
      data: monthlyUserRegister,
      borderWidth: 1
    }]
  })


  const getAllOrrder = async () => {
    const result = await OrderApi.getAllOrder(null, null);
    if (result.status && result.data.length > 0) {
      xulyMang(result.data);
    }
  }

  const getAllUser = async () => {
    const result = await UseApi.getAllUser();
    if (result.status && result.data.length > 0) {
      xulyManguser(result.data);
    }
  }

  const xulyMang = (mang) => {
    mang?.forEach(order => {
      const createdAt = new Date(Number(order.createdAt));
      const month = createdAt.getMonth();
      monthlyProductCounts[month] += order.totalPrice;
      const newdata= {...data};
      newdata.datasets[0].data = monthlyProductCounts;
      setdata(newdata);
      setisLoading(false)
    });
  }

  const xulyManguser = (mang) => {
    mang?.forEach(user => {
      const createdAt = new Date(Number(user.createdAt));
      const month = createdAt.getMonth();
      monthlyUserRegister[month] += 1;
      const newdata= {...dataUser};
      newdata.datasets[0].data = monthlyUserRegister;
      setdataUser(newdata);
    });
  }

  useEffect(() => {
    getAllUser();
    getAllOrrder();
  },[])
  
  if(isLoading){
    return (
      <div>
        Đang loading
      </div>
    )
  }


  return (
    <div>
      <h1>Home</h1>
      <Line data={data} />
      <Bar data={dataUser} />
    </div>
  );
};

export default Home;
