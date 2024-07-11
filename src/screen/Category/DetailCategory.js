
import '../Product/popup.css'
const DetailCategory = (props) => {
  const { item, setshowDetail } = props

  console.log(item)
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
        
        <h3>Title catalog: {item.title}</h3>
        <h3>Prototies</h3>
        {item.properties.map(ele => {
          return <h5 key={ele._id}> - {ele.title}</h5>
        })}
        <h3>Products</h3>
        {item.products.map(ele => {
          return (
            <div key={ele._id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%',marginTop: 20}}>
              <img style={{width: 60, height: 60}} src={ele.imgs[0].img}/>
              <h5 > {ele.name}</h5>
              <h5 > {ele.price}</h5>
              <h5 > {ele.quantity}</h5>
            </div>
          )
        })}
        <h3>Update At:{xulyngay(item.updateAt)}</h3>
        <h3>Create At:{xulyngay(item.createdAt)}</h3>
        <h3>Admin update: {item.manUpdated}</h3>
      </div>
    </div>
  )
}

export default DetailCategory