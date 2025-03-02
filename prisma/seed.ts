import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.comment.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Seeding database...');

  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      password: 'password123', // In a real app, this would be hashed
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob Smith',
      email: 'bob@example.com',
      password: 'password123',
    },
  });

  console.log('Created users:', user1.id, user2.id);

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      title: 'Getting Started with Elysia.js',
      content: 'Elysia.js is a fast and flexible TypeScript framework for building web applications...',
      published: true,
      authorId: user1.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Working with Prisma and PostgreSQL',
      content: 'Prisma is a modern database toolkit that makes database access easy...',
      published: true,
      authorId: user1.id,
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: 'RESTful API Design Principles',
      content: 'When designing a RESTful API, it\'s important to follow these principles...',
      published: true,
      authorId: user2.id,
    },
  });

  console.log('Created posts:', post1.id, post2.id, post3.id);

  // Create comments
  const comment1 = await prisma.comment.create({
    data: {
      content: 'Great article! Very helpful for beginners.',
      authorId: user2.id,
      postId: post1.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      content: 'I\'ve been using Prisma for a while and it\'s amazing!',
      authorId: user2.id,
      postId: post2.id,
    },
  });

  const comment3 = await prisma.comment.create({
    data: {
      content: 'Could you elaborate more on idempotency?',
      authorId: user1.id,
      postId: post3.id,
    },
  });

  console.log('Created comments:', comment1.id, comment2.id, comment3.id);
  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
