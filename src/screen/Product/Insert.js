import { useEffect, useState } from "react";
import {   Button } from "react-bootstrap";
import CatalogApi from "../../api/CatalogApi";
import './popup.css'
import ProductApi from "../../api/ProductApi";
import { Alert } from "bootstrap";

const Insert = (props) => {
    const { setshowPopup, formUpdate, setformUpdate,reload } = props
    const [images, setImages] = useState(formUpdate.imgs ? formUpdate.imgs.map(ele => ele.img) : []);
    const [catalog, setcatalog] = useState([]);
    const [prototy, setprototy] = useState([]);
    const manUpdated =  JSON.parse(localStorage.getItem('user'));

    const [form, setform] = useState({
        name: formUpdate.name || '', // Sử dụng toán tử OR để kiểm tra giá trị null hoặc undefined
        price: formUpdate.price || 0,
        quantity: formUpdate.quantity || 0,
        descripe: formUpdate.descripe || '',
        catalog: formUpdate.catalog ? formUpdate.catalog._id : '', // Giả sử giá trị của catalog là một chuỗi, nếu không, hãy thay đổi logic này
        prototy: formUpdate.prototy ? formUpdate.prototy.map(ele => ele._id) : [],
        manUpdated:  manUpdated.name,
        origin: formUpdate.origin || '',
    })

    const handleTxt = (e) => {
        setform(prev => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }

    const getAllcatalog = async () => {
        const result = await CatalogApi.getCatalog();
        if (result.status) {
            setcatalog(result.data)
            if (!formUpdate.catalog) {
                setform(prev => ({
                    ...prev,
                    catalog: result.data[0]
                }))
                setprototy(result.data[0].properties)
            } else {
                const index = result.data.findIndex(ele => ele._id == formUpdate.catalog._id)
                setprototy(result.data[index].properties)
            }

        } else {

        }
    }

    const imageupload = () => {
        document.getElementById('image-upload').click();
    }

    const uploadToCloundinary = async () => {
        try {
            const file = document.getElementById('image-upload').files[0];
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', 'ml_default');
            const response = await
                fetch('https://api.cloudinary.com/v1_1/dnodsjqql/image/upload', {
                    method: 'POST',
                    body: data
                });
            const result = await response.json();
            setImages([...images, result.secure_url]);
        } catch (error) {
   
        }
    }

    const removeImage = async (img) => {
        const newImages = images.filter(item => item.toString() !== img.toString());
        setImages(newImages);
    }

    const submit = async () => {
        const body = {
            ...form,
            img: images,
        }
        if (formUpdate?._id) {
            const result = await ProductApi.updateProduct(body, formUpdate._id);
            if (result.status) {
                setshowPopup(false);
            } else {
                window.alert("Không được bỏ trống")
            }
        } else {
            const result = await ProductApi.addProduct(body);
            if (result.status) {
                setshowPopup(false);
            } else {
                window.alert("Không được bỏ trống")
            }
        }
        setformUpdate({})
        reload();
    }

    useEffect(() => {
        getAllcatalog();
    }, [])

    return (
        <div
            onClick={() => { setshowPopup(false); setformUpdate({}) }}
            className="containerPopup">
            <div
                onClick={(e) => { e.stopPropagation(); }}
                className="popup-content containerInsidePopup">
                <form>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter name"
                            value={form.name}
                            name="name"
                            onChange={handleTxt}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price:</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter price"
                            value={form.price}
                            name="price"
                            onChange={handleTxt}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quantity:</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter quantity"
                            value={form.quantity}
                            name="quantity"
                            onChange={handleTxt} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter description"
                            value={form.descripe}
                            name='descripe'
                            onChange={handleTxt} />
                    </div>
        
                    <div className="mb-3">
                        <label className="form-label">Origin:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter description"
                            value={form.origin}
                            name='origin'
                            onChange={handleTxt} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Catalog:</label>
                        <select className="form-select" value={form.catalog} name="catalog"
                            onChange={(e) => {
                                const selectedCatalogId = e.target.value;
                                const selectedCatalog = catalog.find(item => item._id === selectedCatalogId);
                                if (selectedCatalog) {
                                    setprototy(selectedCatalog.properties);
                                    setform(prev => ({
                                        ...prev,
                                        prototy: []
                                    }));
                                }
                                handleTxt(e);
                            }}>
                            {
                                catalog.map((item, index) => {
                                    return (
                                        <option key={index} value={item._id}>{item.title}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Prototypes:</label>
                        {prototy.map((item) => (
                            <div key={item._id} className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={item._id}
                                    value={item._id}
                                    checked={form.prototy.includes(item._id)}
                                    onChange={(e) => {
                                        const checkedId = e.target.value;
                                        setform(prev => ({
                                            ...prev,
                                            prototy: prev.prototy.includes(checkedId) ? prev.prototy.filter(id => id !== checkedId) : [...prev.prototy, checkedId]
                                        }));
                                    }}
                                />
                                <label className="form-check-label" key={item._id}>{item.title}</label>
                            </div>
                        ))}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Images:</label>

                        <div style={{ flexDirection: 'row', display: 'flex', marginTop: 20 }}>
                            {
                                images.map((item, index) => {
                                    return (
                                        <div key={index} className="image-container">
                                            <img style={{ width: '100%', height: '100%' }} src={item.img || item} alt="" />
                                            <Button onClick={() => removeImage(item)} style={{ position: 'absolute', top: -15, right: -5 }}>x</Button>
                                        </div>
                                    )
                                })
                            }

                            <Button className="image-container" onClick={imageupload}>
                                <input type="file" className="form-control" id='image-upload'
                                    onChange={uploadToCloundinary} style={{ display: 'none' }} />
                                <img className="image-icon" src={'https://cdn-icons-png.flaticon.com/512/748/748113.png'} alt="" />
                            </Button>
                        </div>
                    </div>
                    <Button variant="info" style={{ marginTop: 20 }} onClick={submit}>Save</Button>
                </form>
            </div>
        </div>
    )
}

export default Insert