import { Router } from 'express';

const router = Router();

// Mock Warehouse Data
let MOCK_WAREHOUSES = [
  { id: 1, name: 'Main Nugegoda Warehouse', location: 'Colombo', capacity: 5000 },
  { id: 2, name: 'Western Province Hub', location: 'Kohuwala', capacity: 3500 },
  { id: 3, name: 'Southern Distribution Point', location: 'Galle', capacity: 2000 }
];

// Mock Stock Data by Warehouse
let MOCK_INVENTORY = [
  { id: 1, productId: 1, warehouseId: 1, quantity: 200 },
  { id: 2, productId: 1, warehouseId: 2, quantity: 250 },
  { id: 3, productId: 2, warehouseId: 1, quantity: 120 },
  { id: 4, productId: 3, warehouseId: 3, quantity: 15 }
];

// GET all warehouses
router.get('/warehouses', (req, res) => {
  res.json(MOCK_WAREHOUSES);
});

// GET stock levels with details
router.get('/stock', (req, res) => {
  // In a real SQL app, this would be a JOIN query
  const detailedStock = MOCK_INVENTORY.map(item => ({
    ...item,
    warehouse: MOCK_WAREHOUSES.find(w => w.id === item.warehouseId)?.name
  }));
  res.json(detailedStock);
});

export default router;
