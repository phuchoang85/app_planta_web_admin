import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import OrderApi from '../api/OrderApi';

const Home = () => {
  
  const monthlyProductCounts = Array.from({ length: 12 }, () => 0);
  
  const [isLoading, setisLoading] = useState(true)
  const [data, setdata] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
      label: 'Thống kê bán hàng',
      data: monthlyProductCounts,
      borderWidth: 1
    }]
  })


  const getAllOrrder = async () => {
    const result = await OrderApi.getAllOrder(null, null);
    if (result.status && result.data.length > 0) {
      xulyMang(result.data);
    }
  }

  const xulyMang = (mang) => {
    mang.forEach(order => {
      const createdAt = new Date(Number(order.createdAt));
      const month = createdAt.getMonth();
      monthlyProductCounts[month] += order.totalPrice;
      const newdata= {...data};
      newdata.datasets[0].data = monthlyProductCounts;
      setdata(newdata);
      setisLoading(false)
    });
  }

  useEffect(() => {
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
    </div>
  );
};

export default Home;
