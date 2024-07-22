import { Button } from "react-bootstrap"
import DetailProduct from "./DetailProduct"
import { useState } from "react"
import './popup.css'
import ProductApi from "../../api/ProductApi"

const RenderProduct = (props) => {
    const { item, setformUpdate, setshowPopup } = props
    const [showDetail, setshowDetail] = useState(false);
    const [isExists, setisExists] = useState(item.isExist);

    const deleteProduct = async (id) => {
        const result = await ProductApi.deleteProduct(id);
        if (result.status) {
            setisExists(!isExists);
        }
    }


    return (
        <tr>
            <td className="center"><img style={{ width: 20, height: 20 }} src={isExists ? 'https://cdn-icons-png.flaticon.com/512/5610/5610944.png' :
                'https://cdn-icons-png.flaticon.com/512/399/399274.png'} /></td>
            <td className="center"><img src={item?.imgs[0]?.img} alt='đang load ảnh' style={{ width: 80, height: 50, marginRight: 20 }} /></td>
            <td className="center" ><h6>{item?.name}</h6></td>
            <td className="center" > <h6>{item?.price}</h6></td>
            <td className="center" ><h6>{item?.quantity}</h6></td>
            <td className="center" ><h6>{item?.catalog?.title}</h6></td>
            <td className="center" >
                <div style={{display: 'flex' , flexDirection: 'column'}}>
                    {item?.prototy?.map((ele,index) => {
                        return (
                            <h7 key={index}>{ele.title}</h7>
                        )
                    })}
                </div>
            </td>
            <td className="center">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button as="a" variant="primary" onClick={() => { setshowPopup(true); setformUpdate(item) }}>Update</Button>
                    <Button as="a" variant={isExists ? 'danger' : 'success'} onClick={() => { deleteProduct(item._id) }}>{isExists ? 'Delete' : 'Appear'}</Button>
                    <Button as="a" variant="info" onClick={() => { setshowDetail(!showDetail) }}>Detail</Button>
                    {showDetail && <DetailProduct item={item} setshowDetail={setshowDetail} />}
                </div>
            </td>
        </tr>
    )
}

export default RenderProduct