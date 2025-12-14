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
  const { name, price, category, description, image, benefits } = req.body;
  try {
    // Treat benefits array as a single string for the Benefit entity
    // If benefits is ["A", "B"], we look for/create a Benefit named "A, B"
    const benefitName = Array.isArray(benefits) ? benefits.join(', ') : 'Default';
    
    const benefit = await prisma.benefit.upsert({
      where: { name: benefitName },
      update: {},
      create: { name: benefitName },
    });

    const product = await prisma.product.create({
      data: {
        name,
        price,
        category,
        description,
        image,
        benefitId: benefit.id,
      },
    });
    
    const mapped = {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description ?? '',
      image: product.image,
      benefits: benefitName === 'Default' ? [] : benefitName.split(', '),
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
    const products = await prisma.product.findMany({
      include: { benefit: true },
    });
    const mapped = products.map(p => {
      const bName = p.benefit?.name || '';
      return {
        id: p.id,
        name: p.name,
        price: p.price,
        category: p.category,
        description: p.description ?? '',
        image: p.image,
        benefits: (bName === 'Default' || !bName) ? [] : bName.split(', '),
      };
    });
    res.json(mapped);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id },
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Update product
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, category, description, image, benefits } = req.body;
  try {
    let benefitIdToUse = undefined;
    if (benefits && Array.isArray(benefits)) {
      const benefitName = benefits.join(', ');
      const benefit = await prisma.benefit.upsert({
        where: { name: benefitName },
        update: {},
        create: { name: benefitName },
      });
      benefitIdToUse = benefit.id;
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        category,
        description,
        image,
        ...(benefitIdToUse ? { benefitId: benefitIdToUse } : {}),
      },
      include: { benefit: true },
    });

    const bName = product.benefit?.name || '';
    const mapped = {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description ?? '',
      image: product.image,
      benefits: (bName === 'Default' || !bName) ? [] : bName.split(', '),
    };
    res.json(mapped);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
