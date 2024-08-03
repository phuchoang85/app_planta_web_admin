
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import ProductApi from '../../api/ProductApi'
import Insert from './Insert'
import RenderProduct from './RenderProduct.js'

const Product = () => {
  const [product, setproduct] = useState([])
  const [showPopup, setshowPopup] = useState(false);
  const [page, setpage] = useState(1);
  const [formUpdate, setformUpdate] = useState({})

  const getProduct = async (page) => {
    try {
      const result = await ProductApi.getAllproduct(6, page);
      console.log(result)
      if (result.status && result.data.length !== 0) {
        setproduct(result.data);
        setpage(page);
      } else {
  
      }
    } catch (error) {
      
    }
   
  }

  useEffect(() => {
    getProduct(page);
  }, [])

  const chuyenTrang = (page) => {
    getProduct(page)
  }


  return (
    <div>
      <h1>Product</h1>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <Button onClick={() => setshowPopup(!showPopup) }>Thêm sản phẩm</Button>
      </div>


      <Table bordered hover >
        <thead>
          <tr>
            <td className='center'>Exist</td>
            <td className='center'>Image</td>
            <td className='center'>Name</td>
            <td className='center'>Price</td>
            <td className='center'>Quantity</td>
            <td className='center'>Category</td>
            <td className='center'>Prototy</td>
            <td className='center'>Option</td>
          </tr>
        </thead>
        <tbody>
          {
            product.map((ele) => {
              return <RenderProduct
                key={ele._id}
                item={ele}
                setformUpdate={setformUpdate}
                setshowPopup={setshowPopup} />
            })
          }
        </tbody>
      </Table>

      <div className='chuyentrang'>
        <Button onClick={() => { chuyenTrang(page - 1) }}>trái</Button>
        <h4 style={{ marginLeft: 20, marginRight: 20 }}>{page}</h4>
        <Button onClick={() => { chuyenTrang(page + 1) }}>phải</Button>
      </div>


      {
        showPopup &&
        <Insert setshowPopup={setshowPopup}
          formUpdate={formUpdate}
          setformUpdate={setformUpdate}
          reload={() => getProduct(page)} />
      }


    </div>
  )
}

export default Product