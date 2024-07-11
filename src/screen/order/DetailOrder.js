import '../Product/popup.css'
const DetailOrder = (props) => {
    const { item, setshowDetail } = props;
    const xulyngay = (date) => {
        const formattedDate = new Date(parseInt(date));
        const year = formattedDate.getFullYear();
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const day = String(formattedDate.getDate()).padStart(2, '0');
        const hours = String(formattedDate.getHours()).padStart(2, '0');
        const minutes = String(formattedDate.getMinutes()).padStart(2, '0');
        const seconds = String(formattedDate.getSeconds()).padStart(2, '0');
    
        const formattedDateTime = ` ${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        return formattedDateTime;
    }
  return (
    <div
            onClick={() => setshowDetail(false)}
            className="containerPopup">
            <div onClick={(e) => e.stopPropagation()}
                className="popup-content containerInsidePopup">
                <h3>Name: {item.namePayOrder}</h3>
                <h3>Email: {item.emailPayOrder}</h3>
                <h3>Address: {item.addressPayOrder}</h3>
                <h3>Phone number: {item.phonenumberPayOrder}</h3>
                <h3>Payment: {item.payment}</h3>
                <h3>Express: {item.express.title}</h3>
                <h3>List order</h3>
                {item.listproduct.map(ele => {
                    return (
                        <div key={ele._id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%',marginTop: 20}}>
                             <img style={{width: 50, height: 50}}  src={ele.product.imgs[0].img}/>
                            <h5 > {ele.product.name}</h5>
                            <h5> {ele.count}</h5>
                            <h5 > {ele.product.price}</h5>
                        </div>
                    )
                })}
                <h3>Total Price: {item.totalPrice}</h3>
                <h3>Create At: {xulyngay(item.createdAt)}</h3>
            </div>
        </div>
  )
}

export default DetailOrder