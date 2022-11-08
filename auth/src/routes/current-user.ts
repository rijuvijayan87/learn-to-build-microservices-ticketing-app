import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  if (!req.session?.jwt) {
    return res.json({ currentUser: null });
  }
  try {
    const currentUser = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    return res.json({ currentUser: currentUser });
  } catch (error) {
    return res.json({ currentUser: null });
  }
});

export { router as currentUserRouter };
