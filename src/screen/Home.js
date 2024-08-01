import React, { useEffect, useRef, useState } from 'react';
import { Line,Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import OrderApi from '../api/OrderApi';
import UseApi from '../api/UseApi';

const Home = () => {
  
  const monthlyProductCounts = Array.from({ length: 12 }, () => 0);
  const monthlyProductsBeingDelivered = Array.from({ length: 12 }, () => 0); 
  const monthlyProductsWaitingConfirm = Array.from({ length: 12 }, () => 0); 
  const monthlyProductsCancled = Array.from({ length: 12 }, () => 0); 
  const monthlyUserRegister = Array.from({ length: 12 }, () => 0);
  const monthlyUserWaittingRegister = Array.from({ length: 12 }, () => 0);

  const [isLoading, setisLoading] = useState(true)
  const [data, setdata] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
      label: 'Đơn đã giao thành công',
      data: monthlyProductCounts,
      borderWidth: 1,
      backgroundColor: 'green' ,
      borderColor: 'green',
    },
    {
      label: 'Đơn đang được giao',
      data: monthlyProductsBeingDelivered,
      borderWidth: 1,
      backgroundColor: 'purple' ,
      borderColor: 'purple',
    },
    {
      label: 'Đơn đang chờ xác nhận',
      data: monthlyProductsWaitingConfirm,
      borderWidth: 1,
      backgroundColor: 'yellow' ,
      borderColor: 'yellow',
    },
    {
      label: 'Đơn đã hủy',
      data: monthlyProductsCancled,
      borderWidth: 1,
      backgroundColor: 'red' ,
      borderColor: 'red',
    }]
  })

  const [dataUser, setdataUser] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
      label: 'Số lượt người đăng kí ',
      data: monthlyUserRegister,
      borderWidth: 1
    },
    {
      label: 'Số lượt người chưa xác nhận đăng kí ',
      data: monthlyUserWaittingRegister,
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
      if(order.status === 1){
        monthlyProductsWaitingConfirm[month] += order.totalPrice;
      }else if(order.status === 2){
        monthlyProductsBeingDelivered[month] += order.totalPrice;
      }
      else if(order.status === 3){
        monthlyProductCounts[month] += order.totalPrice;
      }else{
        monthlyProductsCancled[month] += order.totalPrice;
      }
    

      const newdata= {...data};
      newdata.datasets[0].data = monthlyProductCounts;
      setdata(newdata);
    });
  }

  const xulyManguser =  (mang) => {
     mang?.forEach(user => {
      const createdAt = new Date(Number(user.createdAt));
      const month = createdAt.getMonth();
      if(user.role == 2){
        
      }
      else if(user.isVerification == 1){
        monthlyUserWaittingRegister[month] += 1;
      }
      else{
        monthlyUserRegister[month] += 1;
      }

      const newdata= {...dataUser};
      newdata.datasets[0].data = monthlyUserRegister;
      setdataUser(newdata);
    });
  }

  useEffect(() => {
    setisLoading(true);
    Promise.all([getAllUser(), getAllOrrder()]).then(() => setisLoading(false));
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
