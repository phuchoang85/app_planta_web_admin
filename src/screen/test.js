import React, { useState, useEffect } from 'react'

const Insert = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getAll = async () => {
            const response = await fetch('http://localhost:7777/categories');
            const result = await response.json();
            setCategories(result.data);
        }
        getAll();
        return () => { }
    }, []);

    const [images, setImages] = useState([]);
    const uploadToCloundinary = async () => {
        try {
            const file = document.getElementById('image').files[0];
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', 'ml_default');
            const response = await
                fetch('https://api.cloudinary.com/v1_1/dffuzgy5h/image/upload', {
                    method: 'POST',
                    body: data
                });
            const result = await response.json();
            setImages([...images, result.secure_url]);
        } catch (error) {

        }
    }

    const removeImage = (img) => {
        const newImages = images.filter(item => item.toString() !== img.toString());
        setImages(newImages);
    }

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');


    const handleSubmit = async () => {
        try {
            const body = {
                name: name,
                price: price,
                quantity: quantity,
                description: description,
                category: category,
                images: images
            }
            const result = await fetch('http://localhost:7777/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const response = await result.json();
            if (response.status) {
                alert('Thêm sản phẩm thành công');
            } else {
                alert('Thêm sản phẩm không thành công');
            }
        } catch (error) {
            console.log('....Loi:', error);
            alert('Thêm sản phẩm không thành công');
        }
    }

    return (
        <form>
            <div className="mb-3 mt-3">
                <label className="form-label">Name:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Price:</label>
                <input
                    type="number"
className="form-control"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Quantity:</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Description:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Category:</label>
                <select className="form-select" value={category}
                    onChange={e => setCategory(e.target.value)}>
                    {
                        categories.map((item, index) => {
                            return (
                                <option key={index} value={item._id}>{item.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Images:</label>
                <input type="file" className="form-control" id='image'
                    onChange={uploadToCloundinary} />
                {
                    images.map((item, index) => {
                        return (
                            <div style={{ position: 'relative' }}>
                                <img key={index} src={item} alt=""
                                    style={{ width: 100, height: 100, objectFit: 'cover' }} />
                                <div onClick={() => removeImage(item)} style={{ position: 'absolute' }}>x</div>
                            </div>
                        )
                    })
                }
            </div>
            <button onClick={handleSubmit} type="button" className="btn btn-primary">Save</button>
        </form>
    )
}

export default Insert