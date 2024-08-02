const ProductApi = {
    getAllproduct: async (limit, page) => {
        try {
            const result = await fetch(`http://quockhanh020924.id.vn:6868/getproductadmin?limit=${limit}&page=${page}`)
            const response = await result.json();
            return response
        } catch (error) {
            console.log(error)
        }
    },
    addProduct: async (body) => {
        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        }
        try {
            const result = await fetch('http://quockhanh020924.id.vn:6868/addproduct', data)
            const response = await result.json();
            return response
        } catch (error) {
            console.log(error)
        }
    },
    deleteProduct: async (id) => {
        try {
            const result = await fetch('http://quockhanh020924.id.vn:6868/deleteproduct?_id=' + id);
            const response = await result.json();
            return response
        } catch (error) {
            console.log(error)
        }
    },
    updateProduct: async (body,id) => {
        try {
            const data = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            }
            const result = await fetch(`http://quockhanh020924.id.vn:6868/updateproduct?_id=${id}`, data)
            const response = await result.json();
            return response
        } catch (error) {
            console.log(error)
        }
    }
}

export default ProductApi