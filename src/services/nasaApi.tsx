import axios from 'axios';

export const getMarsRoverImages = async (sol: number, page: number) => {
    try {
        const response = await axios.get(process.env.BASE_URL + `/?api_key=${process.env.API_KEY}&sol=${sol}&page=${page}`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error fetching Mars Rover images - Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error('Error fetching Mars Rover images');
    }
};
