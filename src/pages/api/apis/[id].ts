import type { NextApiRequest, NextApiResponse } from 'next';
import content  from '@/server/models/content';
import  Connect from '@/server/config/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  await Connect();

  switch (method) {
    case 'GET':
      try {
        const api = await content.findById(id);
        if (!api) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json(api);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const api = await content.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!api) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json(api);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedAPI = await content.deleteOne({ _id: id });
        if (!deletedAPI) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
