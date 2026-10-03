import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';
import { CloudinaryService } from '../src/modules/cloudinary/cloudinary.service';

// One-off: moves the three partners that used to be hard-coded in Footer.tsx
// into the database. Usage: ts-node -r tsconfig-paths/register prisma/seed-partners.ts <siteId>

const prisma = new PrismaClient();

const PARTNERS = [
  {
    name: 'MINEMA',
    file: 'image1.png',
    link: 'https://www.minema.gov.rw/',
    description: "This partnership establishes Engineers4Humanity Consultancy, an engineering social enterprise as an official operational partner of the Government of Rwanda through MINEMA, the Ministry responsible for disaster management and refugee affairs nationwide. MINEMA leads national coordination of refugee protection, emergency response, and long term resilience programs. Through this MoU, Engineers4Humanity joins MINEMA and UNHCR in implementing the Joint Strategy for the Economic Inclusion of Refugees and Host Communities, expanding livelihood opportunities, financial inclusion, and self reliance. The partnership also strengthens education, vocational skills development, public health engineering, and environmental protection to improve services and resilience in refugee camps and host communities.",
  },
  {
    name: 'UNHCR',
    file: 'image2.png',
    link: 'https://www.unhcr.org/rw/',
    description: "This partnership recognizes Engineers4Humanity Consultancy, an Engineering Social Enterprise as an operational partner in the MINEMA UNHCR Joint Strategy for the Economic Inclusion of Refugees and Host Communities in Rwanda. UNHCR is the United Nations agency mandated to protect and support refugees under the 1950 Statute and 1951 Refugee Convention—plays a vital role by ensuring refugee rights, guiding policy, and advancing market driven livelihoods, skills development, and job placement. Engineers4Humanity strengthens this mandate by delivering community based education, vocational training, and public health engineering solutions that expand opportunities, reduce dependency, and promote self reliance for refugee and host populations.",
  },
  {
    name: 'RAPEP',
    file: 'image3.png',
    link: 'https://www.rapep.org.rw/',
    description: "Partnership between RAPEP, the national authority regulating Rwanda's environmental professionals and Engineers4Humanity Consultancy, a registered environmental social enterprise founded and led by a refugee background Lead Environmental Expert. Together, they unite professional oversight with refugee led innovation to elevate climate resilient infrastructure and environmental stewardship in refugee camps and host districts. The collaboration directly strengthens the MINEMA–UNHCR Tripartite MoU by delivering compliant Public Health Engineering, accredited green skills training, and environmental restoration. It advances SDG 2030 priorities on climate action, clean water, decent work, and sustainable communities, while supporting UNHCR and MINEMA climate action commitments. Aligned with Rwanda Vision 2050, this partnership promotes resilience, dignity, and green growth for refugees and host communities.",
  },
];

async function main() {
  const siteId = process.argv[2];
  if (!siteId) throw new Error('Usage: seed-partners.ts <siteId>');

  const site = await prisma.site.findUnique({ where: { id: siteId } });
  if (!site) throw new Error(`Site ${siteId} not found`);

  const existing = await prisma.partner.count({ where: { siteId } });
  if (existing > 0) {
    throw new Error(`Site already has ${existing} partner(s); refusing to seed twice`);
  }

  const cloudinary = new CloudinaryService();
  const assetsDir = path.resolve(__dirname, '../../frontend/src/assets/partners');

  // Upload everything first so a failed upload writes no rows at all.
  const uploaded: string[] = [];
  for (const p of PARTNERS) {
    const buffer = fs.readFileSync(path.join(assetsDir, p.file));
    const result = await cloudinary.uploadImageFromBuffer(buffer, 'partners');
    uploaded.push(result.secure_url);
    console.log(`Uploaded ${p.name} -> ${result.secure_url}`);
  }

  await prisma.partner.createMany({
    data: PARTNERS.map((p, order) => ({
      siteId,
      name: p.name,
      image: uploaded[order],
      link: p.link,
      description: p.description,
      order,
    })),
  });
  console.log(`Seeded ${PARTNERS.length} partners for site ${siteId}`);
}

main()
  .catch(err => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
