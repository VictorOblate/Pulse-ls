const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminEmail = 'admin@newshub.com'
  const adminPassword = 'Admin@123' // Change this in production!

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (existingAdmin) {
    console.log('✅ Admin user already exists')
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 10)
    
    const admin = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: new Date(),
      },
    })

    console.log('✅ Admin user created:')
    console.log('   Email:', adminEmail)
    console.log('   Password:', adminPassword)
    console.log('   ⚠️  Please change this password after first login!')
  }

  // Create journalist user
  const journalistEmail = 'journalist@newshub.com'
  const journalistPassword = 'Journalist@123' // Change this in production!

  const existingJournalist = await prisma.user.findUnique({
    where: { email: journalistEmail },
  })

  if (existingJournalist) {
    console.log('✅ Journalist user already exists')
  } else {
    const hashedPassword = await bcrypt.hash(journalistPassword, 10)
    
    const journalist = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: journalistEmail,
        password: hashedPassword,
        role: 'JOURNALIST',
        bio: 'Senior journalist with 10 years of experience covering technology and business news.',
        emailVerified: new Date(),
      },
    })

    console.log('✅ Journalist user created:')
    console.log('   Email:', journalistEmail)
    console.log('   Password:', journalistPassword)
    console.log('   ⚠️  Please change this password after first login!')
  }

  console.log('\n🎉 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
