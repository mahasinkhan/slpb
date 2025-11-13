import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;

const getPrismaClient = (): PrismaClient => {
  if (!prisma) {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      throw new Error(
        'DATABASE_URL environment variable is not set. Please check your .env file.'
      );
    }

    prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });

    // Graceful shutdown
    process.on('beforeExit', async () => {
      if (prisma) {
        await prisma.$disconnect();
      }
    });
  }

  return prisma;
};

// Create a Proxy to lazily initialize Prisma Client
const prismaProxy = new Proxy({} as PrismaClient, {
  get(target, prop) {
    const client = getPrismaClient();
    return client[prop as keyof PrismaClient];
  }
});

export default prismaProxy;