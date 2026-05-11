import { Router } from 'express';

const router = Router();

// Mock Customers
let MOCK_CUSTOMERS = [
  { id: 1, name: 'Lanka Industrial Hub', type: 'Corporate', location: 'Negombo' },
  { id: 2, name: 'Southern Agri-Chem', type: 'Wholesale', location: 'Matara' },
  { id: 3, name: 'Western Paints', type: 'Manufacturer', location: 'Kalutara' }
];

// Mock Orders
let MOCK_ORDERS = [
  { 
    id: 101, 
    orderNumber: 'ORD-5502', 
    customer: 'Lanka Industrial Hub', 
    date: '2027-05-08',
    amount: 1540.00,
    status: 'Pending'
  },
  { 
    id: 102, 
    orderNumber: 'ORD-5503', 
    customer: 'Southern Agri-Chem', 
    date: '2027-05-07',
    amount: 890.50,
    status: 'Shipped'
  },
  { 
    id: 103, 
    orderNumber: 'ORD-5498', 
    customer: 'Western Paints', 
    date: '2027-05-02',
    amount: 2100.00,
    status: 'Delivered'
  }
];

// GET orders
router.get('/', (req, res) => {
  res.json(MOCK_ORDERS);
});

// GET customers
router.get('/customers', (req, res) => {
  res.json(MOCK_CUSTOMERS);
});

export default router;
