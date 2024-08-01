import React, { useEffect } from 'react'
import OrderApi from '../../api/OrderApi';
import { useState } from 'react';
import RenderOrder from './RenderOrder';
import { Button, Table } from 'react-bootstrap';

const Order = () => {
  const [order, setorder] = useState([]);
  const [page, setpage] = useState(1);
   
  const getAllOrrder = async (page) => {
    const result = await OrderApi.getAllOrder(6, page);
    if (result.status && result.data.length > 0) {
        setpage(page)
        setorder(result.data)
    }
  }

  useEffect(() => {
    getAllOrrder(page)
  },[])

  return (
    <div>
      <h1>Order</h1>
      <Table bordered hover >
        <thead>
          <tr>
            <td className='center'>Người đặt</td>
            <td className='center'>Địa chỉ</td>
            <td className='center'>Phone number</td>
            <td className='center'>Status</td>
            <td className='center'>Total Price</td>
            <td className='center'>Option</td>
          </tr>
        </thead>
        <tbody>
          {
            order.map((ele) => {
              return <RenderOrder
                key={ele._id}
                item={ele} 
                reload = {() =>getAllOrrder(page)}/>
            })
          }
        </tbody>
      </Table>

      <div className='chuyentrang'>
        <Button onClick={() => { if(page >1) getAllOrrder(page - 1) }}>trái</Button>
        <h4 style={{ marginLeft: 20, marginRight: 20 }}>{page}</h4>
        <Button onClick={() => { getAllOrrder(page + 1) }}>phải</Button>
      </div>

    </div>
  )
}

export default Order