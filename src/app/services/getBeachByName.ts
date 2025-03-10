import axios from 'axios';

export const getBeachByName = async (name: string) => {
  console.log('name:', name);
  try {
    const { data } = await axios.get('/mockup/beaches.json');
    const beach = data.find(
      (beach: any) => beach.title?.replace(/ /g, '-')?.toLowerCase() === name
    );
    console.log(data.map((beach: any) => beach.name));
    return beach;
  } catch (error) {
    console.error(error);
  }
};
