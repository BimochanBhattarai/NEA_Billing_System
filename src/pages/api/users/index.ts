// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@/generated/prisma';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       const users = await prisma.user.findMany();
//       res.status(200).json(users);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       res.status(500).json({ error: 'Failed to fetch users' });
//     }
//   } else if (req.method === 'POST') {
//     try {
//       const { email, name } = req.body;
      
//       if (!email) {
//         return res.status(400).json({ error: 'Email is required' });
//       }

//       const user = await prisma.user.create({
//         data: {
//           Email,
//           Name: name || null,
//         },
//       });

//       res.status(201).json(user);
//     } catch (error) {
//       console.error('Error creating user:', error);
//       res.status(500).json({ error: 'Failed to create user' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET', 'POST']);
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }