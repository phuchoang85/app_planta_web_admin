import React, { useEffect, useState } from 'react'
import CatalogApi from '../../api/CatalogApi';
import { Button, Table } from 'react-bootstrap';
import RenderCategory from './RenderCategory';
import InsertAndUpdate from './InsertAndUpdate';

const Category = () => {  
  const [category, setcategory] = useState([]);
  const [page, setpage] = useState(1);
  const [formUpdate, setformUpdate] = useState({})
  const [showPopup, setshowPopup] = useState(false)

  const getCategory =async ( page) =>{
    try {
      const result =await CatalogApi.getAllcatalog(6, parseInt(page));

    if(result.status && result.data.length !=0){
      setpage(page);
      setcategory(result.data);
    }else{

    }
    } catch (error) {
      
    }
    
  }

  useEffect(() =>{
    getCategory(page);
  },[]);


  return (
    <div>
      <h1>Category</h1>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <Button onClick={() => setshowPopup(!showPopup)}>Thêm danh mục mới</Button>
      </div>


      <Table bordered hover >
        <thead>
          <tr>
            <td className='center'>Exist</td>
            <td className='center'>Title</td>
            <td className='center'>Prototy</td>
            <td className='center'>Total product</td>
            <td className='center'>Option</td>
          </tr>
        </thead>
        <tbody>
          {
            category.map((ele) => {return <RenderCategory key={ele._id} item={ele} setformUpdate={setformUpdate} setshowPopup={setshowPopup}/>})
          }
        </tbody>
      </Table>


      <div className='chuyentrang'>
        <Button onClick={() => {getCategory(page-1)}}>trái</Button>
        <h4 style={{marginLeft: 20, marginRight: 20}}>{page}</h4>
        <Button onClick={() => {getCategory(page+1)}}>phải</Button>
      </div>

      {
        showPopup && <InsertAndUpdate 
        formUpdate={formUpdate}
        setformUpdate={setformUpdate} 
        setshowPopup={setshowPopup}
        reload = {()=>getCategory(page)}/>
      }
    </div>
  )
}

export default Category