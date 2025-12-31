const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Testing database connection...');
  
  try {
    // Test connection
    await prisma.$connect();
    console.log('✓ Database connected successfully');
    
    // Create a test user
    const user = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', // "password"
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN'
      }
    });
    
    console.log('✓ Test user created:', user.email);
    
    // List all users
    const users = await prisma.user.findMany();
    console.log('Total users:', users.length);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();