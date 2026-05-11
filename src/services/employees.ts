import { Router } from 'express';

const router = Router();

// Mock Employees
let MOCK_EMPLOYEES = [
  { id: 1, name: 'Shanuka Weerasena', role: 'ADMIN', email: 'shanuka@lakna.com', status: 'Active', department: 'Management' },
  { id: 2, name: 'Anura Kumara', role: 'Inventory Manager', email: 'anura@lakna.com', status: 'Active', department: 'Logistics' },
  { id: 3, name: 'Dilshan Silva', role: 'Sales Head', email: 'dilshan@lakna.com', status: 'On Leave', department: 'Sales' },
  { id: 4, name: 'Kamal Perera', role: 'Warehouse Supervisor', email: 'kamal@lakna.com', status: 'Active', department: 'Logistics' }
];

// GET employees
router.get('/', (req, res) => {
  res.json(MOCK_EMPLOYEES);
});

export default router;
