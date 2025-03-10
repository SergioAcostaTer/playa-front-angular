import axios from 'axios';

export const getHomeBeaches = async () => {
  try {
    const response = await axios.get('/mockup/beaches.json');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
