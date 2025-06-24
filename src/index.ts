// import { PrismaClient } from './generated/prisma'

// const prisma = new PrismaClient()



// async function main() {

//   await prisma.userType.create({
//     data: {
//       Name: 'Administrator',
//       Status: true
//     },
//   })

//   await prisma.user.create({
//     data: {
//         Email: 'alice@prisma.io',
//         Password: 'password123',
//         Status: true,
//         UserId: 'alice123',
//         UserName: 'alice',
//         Name: 'Alice',
//         UserType: {
//           connect: {
//             Name: 'Administrator',
//           },
//         },
//     }})

//   const allUsers = await prisma.user.findMany()
//   console.dir(allUsers, { depth: null })
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })