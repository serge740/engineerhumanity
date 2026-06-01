"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../src/generated/prisma");
const bcrypt = require("bcryptjs");
const prisma = new prisma_1.PrismaClient();
async function main() {
    const email = 'admin@engineer4humanity.org';
    const name = 'Admin';
    const password = 'Admin@1234';
    const existing = await prisma.admin.findUnique({ where: { adminEmail: email } });
    if (existing) {
        console.log(`Admin already exists: ${email}`);
        return;
    }
    const hashed = await bcrypt.hash(password, 10);
    await prisma.admin.create({
        data: {
            adminEmail: email,
            adminName: name,
            password: hashed,
        },
    });
    console.log('─────────────────────────────────────');
    console.log('✅  Admin seeded successfully');
    console.log(`    Email   : ${email}`);
    console.log(`    Password: ${password}`);
    console.log('─────────────────────────────────────');
    console.log('⚠️  Change your password after first login!');
}
main()
    .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map