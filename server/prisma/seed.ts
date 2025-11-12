// seed.ts - Simplified version without Employee table
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Delete existing data
  await prisma.interview.deleteMany();
  await prisma.content.deleteMany();
  await prisma.user.deleteMany();

  // Create Super Admin
  const superAdminPassword = await bcrypt.hash('superadmin123', 12);
  const superAdmin = await prisma.user.create({
    data: {
      email: 'superadmin@slbrothers.co.uk',
      password: superAdminPassword,
      firstName: 'Super',
      lastName: 'Admin',
      role: 'SUPERADMIN',
      status: 'ACTIVE',
      phone: '+44 7405 005823'
    }
  });
  console.log('✅ Super Admin created:', superAdmin.email);

  // Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@slbrothers.co.uk',
      password: adminPassword,
      firstName: 'John',
      lastName: 'Admin',
      role: 'ADMIN',
      status: 'ACTIVE',
      phone: '+44 7405 005824'
    }
  });
  console.log('✅ Admin created:', admin.email);

  // Create Sample Employee User
  const employeePassword = await bcrypt.hash('employee123', 12);
  const employee = await prisma.user.create({
    data: {
      email: 'employee@slbrothers.co.uk',
      password: employeePassword,
      firstName: 'Sarah',
      lastName: 'Employee',
      role: 'EMPLOYEE',
      status: 'ACTIVE',
      phone: '+44 7405 005825'
    }
  });
  console.log('✅ Employee user created:', employee.email);

  // Create sample interview
  const interview = await prisma.interview.create({
    data: {
      candidateId: employee.id,
      interviewerId: admin.id,
      position: 'Software Developer',
      division: 'AI & Software',
      status: 'SCHEDULED',
      scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      notes: 'Initial technical interview'
    }
  });
  console.log('✅ Sample interview created');

  console.log('🎉 Seeding completed!');
  console.log('\n📝 Login Credentials:');
  console.log('Super Admin: superadmin@slbrothers.co.uk / superadmin123');
  console.log('Admin: admin@slbrothers.co.uk / admin123');
  console.log('Employee: employee@slbrothers.co.uk / employee123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });