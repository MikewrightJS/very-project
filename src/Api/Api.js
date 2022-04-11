import axios from "axios";

const GetProducts = async () => {
    try {
        return await axios.get('Data/sampleData.json');
    } catch (error) {
        // If we had a logging server, we'd also log this error
       return false;
    }
}

export default GetProducts;