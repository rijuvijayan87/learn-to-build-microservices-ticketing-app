import { NotAuthorizedError, requireAuth } from '@ticketing-rv/common';
import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', requireAuth, (req, res) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  res.json({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
