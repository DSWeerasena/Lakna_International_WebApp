import { Router } from 'express';

const router = Router();

// Mock initial data based on your schema
let MOCK_PRODUCTS = [
  { 
    id: 1, 
    code: 'CH-001', 
    name: 'Hydrochloric Acid', 
    category: 'Industrial', 
    supplier: 'Global Chemicals Ltd', 
    stock: 450, 
    unit: 'Liters', 
    expiryDate: '2027-05-12',
    price: 15.50
  },
  { 
    id: 2, 
    code: 'CH-002', 
    name: 'Sodium Hydroxide', 
    category: 'Laboratory', 
    supplier: 'ChemSource Inc', 
    stock: 120, 
    unit: 'KG', 
    expiryDate: '2026-11-20',
    price: 22.00
  },
  { 
    id: 3, 
    code: 'CH-003', 
    name: 'Sulfuric Acid', 
    category: 'Industrial', 
    supplier: 'Global Chemicals Ltd', 
    stock: 15, 
    unit: 'Liters', 
    expiryDate: '2025-08-15',
    price: 18.75
  }
];

// GET all products
router.get('/', (req, res) => {
  res.json(MOCK_PRODUCTS);
});

// POST new product
router.post('/', (req, res) => {
  const newProduct = {
    id: MOCK_PRODUCTS.length + 1,
    ...req.body
  };
  MOCK_PRODUCTS.push(newProduct);
  res.status(201).json(newProduct);
});

// DELETE product
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  MOCK_PRODUCTS = MOCK_PRODUCTS.filter(p => p.id !== id);
  res.status(204).send();
});

export default router;
