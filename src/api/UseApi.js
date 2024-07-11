
const UseApi = {
    login: async (body) => {
        try {
            const option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }

            const result = await fetch('http://localhost:6868/dang-nhap-admin', option);
            const response = await result.json();
            return response;
        } catch (error) {
            console.log(error)
        }
    }
}

export default UseApi