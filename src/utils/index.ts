import axios from 'axios';

export const fetchNames = async (name?: string) => {
  const baseUrl = 'https://www.balldontlie.io/api/v1/players?per_page=5';
  console.log(name);

  const response = await axios.get(
    name?.length ? `${baseUrl}&search=${name}` : baseUrl
  );

  const data = await response.data.data;

  return data;
};

export const fullName = (firstName: string, lastName: string) => {
  return `${firstName} ${lastName}`;
};
