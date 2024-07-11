import { useState } from "react";
import { Button } from "react-bootstrap";
import DetailOrder from "./DetailOrder";

import '../Product/popup.css'
import OrderApi from "../../api/OrderApi";

const RenderOrder = (props) => {

    const { item,reload } = props
    const [showDetail, setshowDetail] = useState(false);

    const nextStatus = async (status) =>{

        if(status == 3){
            console.log('hết trạng thái')
        }else{
            const result =await OrderApi.updateStatusOrrder(status, item._id);
            if(result.status){
                reload();
            }else{
                console.log('lỗi')
            }
        }


    }

    return (
        <tr>
            <td className="center" ><h6>{item.namePayOrder}</h6></td>
            <td className="center" > <h6>{item.addressPayOrder}</h6></td>
            <td className="center" ><h6>{item.phonenumberPayOrder}</h6></td>
            <td className="center" ><h6 style={{color : item.status === 1 ? 'Green' :
                    item.status === 2 ? 'Blue' : 
                        item.status === 3 ? 'purple' :
                            'Red'}}>{
                item.status === 1 ? 'Chờ xác nhận' :
                    item.status === 2 ? 'Đang giao' :
                        item.status === 3 ? 'đã nhận' :
                            'đã hủy'}
            </h6></td>
            <td className="center" ><h6>{item.totalPrice}</h6></td>
            <td className="center">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button as="a" variant="primary" onClick={() => {nextStatus(item.status)}}>Next status</Button>
                    <Button as="a" variant="danger" onClick={() => { nextStatus(4) }}>Cancel</Button>
                    <Button as="a" variant="info" onClick={() => { setshowDetail(!showDetail) }}>Detail</Button>
                    {showDetail && <DetailOrder item={item} setshowDetail={setshowDetail} />}
                </div>
            </td>
        </tr>
    )
}

export default RenderOrder