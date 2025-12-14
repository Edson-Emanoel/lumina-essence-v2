// g:/DESK-EDSON/dev/lumina-essence-v2/server.ts
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

// Create product
app.post('/api/products', async (req, res) => {
  const { name, price, category, description, image, benefitId } = req.body;
  try {
    let benefitIdToUse = benefitId;
    if (!benefitIdToUse) {
      const defaultBenefit = await prisma.benefit.upsert({
        where: { name: 'Default' },
        update: {},
        create: { name: 'Default' },
      });
      benefitIdToUse = defaultBenefit.id;
    }
    const product = await prisma.product.create({
      data: {
        name,
        price,
        category,
        description,
        image,
        benefitId: benefitIdToUse,
      },
    });
    const mapped = {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description ?? '',
      image: product.image,
      benefits: [] as string[],
    };
    res.json(mapped);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Get products
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    const mapped = products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      category: p.category,
      description: p.description ?? '',
      image: p.image,
      benefits: [] as string[],
    }));
    res.json(mapped);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
