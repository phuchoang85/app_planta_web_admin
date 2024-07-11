
const OrderApi = {
    getAllOrder: async (limit,page) => {
        try {
            const result = await fetch(`http://localhost:6868/getallorder?limit=${limit}&page=${page}`);
            const response = await result.json();
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    updateStatusOrrder: async (status, id) => {
        try {
            const result = await fetch(`http://localhost:6868/updatestatus?status=${status}&_id=${id}`);
            const response = await result.json();
            return response;
        } catch (error) {
            console.log(error)
        }
    }
}

export default OrderApi