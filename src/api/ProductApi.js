import port from "./port";

const ProductApi = {
    getAllproduct: async (limit, page) => {
        try {
            const result = await fetch(port+`getproductadmin?limit=${limit}&page=${page}`)
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
            const result = await fetch(port+'addproduct', data)
            const response = await result.json();
            return response
        } catch (error) {
            console.log(error)
        }
    },
    deleteProduct: async (id) => {
        try {
            const result = await fetch(port+'deleteproduct?_id=' + id);
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
            const result = await fetch(port+`updateproduct?_id=${id}`, data)
            const response = await result.json();
            return response
        } catch (error) {
            console.log(error)
        }
    }
}

export default ProductApi