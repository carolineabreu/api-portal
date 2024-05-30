import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get('https://ch-api-production.up.railway.app/api/apis');

    res.status(200).json(response.data);
  } catch (error) {
    const err = error as AxiosError;
    res.status(err.response?.status || 500).json({ message: err.message });
  }
}
