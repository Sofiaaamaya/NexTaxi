import axios from '@/lib/axios';

export const getUsuarios = async () => {
  const res = await axios.get('/usuarios');
  return res.data;
};
