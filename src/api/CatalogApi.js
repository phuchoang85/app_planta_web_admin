import port from "./port";

const CatalogApi = {
    getAllcatalog: async (limit, page) => {
        try {
            const result = await fetch(port+`getadminCatalogAndPrototy?limit=${limit}&page=${page}`)
            const response = await result.json();
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    deleteCatalog: async (id, admin) => {
        try {
            const result = await fetch(port+`deleteCatalog?id=${id}&admin=${admin}`)
            const response = await result.json();
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    addCatalog: async (body) => {
        try {
            const option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            }

            const result = await fetch(port+`addcatalog`, option)
            const response = await result.json();
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    updatecatalog: async (body, id) => {
        try {
            const option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            }

            const result = await fetch(port+`updatecatalog?_id=${id}`, option)
            const response = await result.json();
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    getCatalog: async () => {
        try {
            const result = await fetch(port+`getcatalog`)
            const response = await result.json();
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

export default CatalogApi