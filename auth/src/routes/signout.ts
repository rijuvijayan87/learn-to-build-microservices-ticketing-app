import express from 'express';
import { requireAuth } from '@ticketing-rv/common';

const router = express.Router();

router.post('/api/users/signout', requireAuth, (req, res) => {
  req.session = null;
  res.send({});
});

export { router as signoutRouter };
