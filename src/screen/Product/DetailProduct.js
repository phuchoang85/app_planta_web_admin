import './popup.css'

const DetailProduct = (props) => {
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
                    <p>Image</p>
                    <div className='containerAllIamge'>
                        {item.imgs?.map(ele =>{
                            return (<div key={ele._id} className='image-container'>
                                <img style={{width: '100%', height: '100%'}}  src={ele.img}/>
                            </div>)
                        })}
                    </div>
                <h3>Name: {item.name}</h3>
                <h3>Price: {item.price}</h3>
                <h3>Quantity: {item.quantity}</h3>
                <h3>Origin: {item.origin}</h3>
                <h3>Descripe: {item.descripe}</h3>
                <h3>Prototy</h3>
                {item.prototy.map(ele => {
                    return <h5 key={ele._id}> - {ele.title}</h5>
                })}
                <h3>Catalog: {item.catalog.title}</h3>
                <h3>Update At:{xulyngay(item.updateAt)}</h3>
                <h3>Create At:{xulyngay(item.createdAt)}</h3>
                <h3>Admin update: {item.manUpdated}</h3>
            </div>
        </div>
    )
}

export default DetailProduct