/**
 * Purchase Order Routes
 */
const express = require('express');
const router = express.Router();
const { requireAuth, requireProcurement } = require('../middleware/auth');
const { enforceOrgIsolation } = require('../middleware/org-isolation');
const { poController } = require('../controllers/procurement.controller');

router.get('/', requireAuth, requireProcurement, enforceOrgIsolation, poController.getPOs);
router.get('/:id', requireAuth, requireProcurement, enforceOrgIsolation, poController.getPO);
router.post('/', requireAuth, requireProcurement, enforceOrgIsolation, poController.createPO);
router.put('/:id', requireAuth, requireProcurement, enforceOrgIsolation, poController.updatePO);
router.post('/:id/approve', requireAuth, requireProcurement, enforceOrgIsolation, poController.approvePO);
router.post('/:id/send', requireAuth, requireProcurement, enforceOrgIsolation, poController.sendPO);
router.get('/:id/pdf', requireAuth, enforceOrgIsolation, poController.getPOPDF);

module.exports = router;