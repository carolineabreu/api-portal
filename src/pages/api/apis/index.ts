import type { NextApiRequest, NextApiResponse } from 'next';
import Content  from '@/server/models/content';
import  connect  from '@/server/config/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await connect();

  switch (method) {
    case 'GET':
      try {
        const apis = await Content.find({});
        res.status(200).json(apis);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const existingApi = await Content.findOne({ api_name: req.body.api_name });

        if (existingApi) {
          return res.status(400).json({ success: false, error: 'API já se encontra na lista.' });
        }

        const api = await Content.create(req.body);
        res.status(201).json(api);
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
