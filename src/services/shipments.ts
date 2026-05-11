import { Router } from 'express';

const router = Router();

// Mock Suppliers
let MOCK_SUPPLIERS = [
  { id: 1, name: 'Global Chemicals Ltd', country: 'Germany', contact: 'hans@globalchem.de' },
  { id: 2, name: 'ChemSource Inc', country: 'USA', contact: 'orders@chemsource.com' },
  { id: 3, name: 'Orient Polymers', country: 'China', contact: 'sales@orientpolymers.cn' }
];

// Mock Shipments
let MOCK_SHIPMENTS = [
  { 
    id: 1, 
    trackingNumber: 'SHIP-9021', 
    supplier: 'Global Chemicals Ltd', 
    status: 'In Transit', 
    eta: '2027-06-05',
    items: 'Hydrochloric Acid (5000L)'
  },
  { 
    id: 2, 
    trackingNumber: 'SHIP-8832', 
    supplier: 'ChemSource Inc', 
    status: 'Pending', 
    eta: '2027-06-15',
    items: 'Sodium Hydroxide (2000KG)'
  },
  { 
    id: 3, 
    trackingNumber: 'SHIP-7741', 
    supplier: 'Orient Polymers', 
    status: 'Delivered', 
    eta: '2027-05-01',
    items: 'Polyethylene Resin (10T)'
  }
];

// GET shipments
router.get('/', (req, res) => {
  res.json(MOCK_SHIPMENTS);
});

// GET suppliers
router.get('/suppliers', (req, res) => {
  res.json(MOCK_SUPPLIERS);
});

export default router;
