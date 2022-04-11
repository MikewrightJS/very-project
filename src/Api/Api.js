import axios from "axios";

const GetProducts = async () => {
    try {
        return await axios.get('Data/sampleData.json');
    } catch (error) {
       return false;
    }
}

export default GetProducts;