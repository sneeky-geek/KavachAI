import axios from 'axios';

export const sendToMLModel = async (data: any) => {
  try {
    const response = await axios.post('http://localhost:8000/analyze', data);
    return response.data;
  } catch (error) {
    console.error('Error communicating with ML model:', error);
    return { error: 'Failed to process data with ML model' };
  }
};
