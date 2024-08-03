import { useState } from "react"
import { Button } from "react-bootstrap";
import DetailCategory from "./DetailCategory";
import '../Product/popup.css'
import CatalogApi from "../../api/CatalogApi";


const RenderCategory = (props) => {
    const { item, setformUpdate, setshowPopup } = props
    const [isExists, setisExists] = useState(item.isExist);
    const [showDetail, setshowDetail] = useState(false)


    const deleteCategory = async (id) =>{
        try {
            const result = await CatalogApi.deleteCatalog(id,"phuc");
            if(result.status){
              setisExists(!isExists);
            }
        } catch (error) {
            
        }
       
    }
    return (
        <tr>
            <td className="center"><img style={{ width: 20, height: 20 }} src={isExists ? 'https://cdn-icons-png.flaticon.com/512/5610/5610944.png' :
                'https://cdn-icons-png.flaticon.com/512/399/399274.png'} /></td>
            <td className="center">{item.title}</td>
            <td  className="center">
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly',}}>
                    {item.properties.map(ele => {
                        return (
                            <div key={ele._id} >
                                <p style={{color: ele.isExist? 'green':'red'}}>{ele.title}</p>
                            </div>
                        )
                    })}
                </div>
            </td>
            <td className="center"> {item.products.length}  sản phẩm</td>
            <td className="center" style={{ display: 'flex', justifyContent: 'center' }}>
                <Button as="a" variant="primary" onClick={() => { setformUpdate(item); setshowPopup(true)}}>Update</Button>
                <Button style={{ marginInline: '5%' }} as="a" variant={isExists ? 'danger' : 'success'} onClick={() => {deleteCategory(item._id) }}>{isExists ? 'Delete' : 'Appear'}</Button>
                <Button as="a" variant="info" onClick={() => {setshowDetail(true) }}>Detail</Button>
                {showDetail && <DetailCategory item={item} setshowDetail={setshowDetail} />}
            </td>
        </tr>
    )
}

export default RenderCategory