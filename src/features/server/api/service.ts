import axios from 'axios';

export const serverService = {
  getServer: async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/servers`);

    return response.data;
  },
};
