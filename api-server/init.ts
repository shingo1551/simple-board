import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

//
async function findMany() {
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  console.dir(allUsers, { depth: null })
}

async function create() {
  await prisma.user.create({
    data: {
      email: 'alice@prisma.io',
      posts: {
        create: { message: 'Hello World' },
      },
      profile: {
        create: { name: 'Alice' },
      },
    },
  })
}

async function update() {
  const post = await prisma.profile.update({
    where: { id: 1 },
    data: { phone: '090-1234-5678' },
  })
  console.log(post)
}

async function deleteAll() {
  const deletePosts = prisma.post.deleteMany()
  const deleteProfile = prisma.profile.deleteMany()
  const deleteUsers = prisma.user.deleteMany()

  // The transaction runs synchronously so deleteUsers must run last.
  await prisma.$transaction([deleteProfile, deletePosts, deleteUsers])
}

//
async function main() {
  await create();
  await findMany();
  await update();
  await findMany();
  await deleteAll()
  await findMany();
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
