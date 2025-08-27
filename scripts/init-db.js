// Database initialization script
// Run this to create tables in your PostgreSQL database
// Usage: npm run db:init

const { PrismaClient } = require('@prisma/client');

async function main() {
  console.log('🚀 Initializing database...');
  
  const prisma = new PrismaClient();
  
  try {
    // Test connection
    await prisma.$connect();
    console.log('✅ Connected to database');
    
    // Get database info
    const result = await prisma.$queryRaw`SELECT current_database(), current_user, version()`;
    console.log('📊 Database info:', result[0]);
    
    // Count existing records
    const demoCount = await prisma.demo.count();
    const resultCount = await prisma.demoResult.count();
    const emailCount = await prisma.emailQueue.count();
    const webhookCount = await prisma.webhookLog.count();
    
    console.log('\n📈 Current database statistics:');
    console.log(`  - Demos: ${demoCount}`);
    console.log(`  - Results: ${resultCount}`);
    console.log(`  - Email Queue: ${emailCount}`);
    console.log(`  - Webhook Logs: ${webhookCount}`);
    
    console.log('\n✨ Database is ready to use!');
    console.log('\n💡 To generate Prisma client, run: npx prisma generate');
    console.log('💡 To create migrations, run: npx prisma migrate dev --name init');
    console.log('💡 To view database, run: npx prisma studio');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure PostgreSQL is running');
    console.log('2. Check your DATABASE_URL in .env.local');
    console.log('3. Format: postgresql://username:password@localhost:5432/database_name');
    console.log('4. Create the database first if it doesn\'t exist');
    console.log('5. Run: npx prisma migrate dev --name init');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);