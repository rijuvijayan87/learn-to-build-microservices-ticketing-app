import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  res.json({ msg: 'current user route' });
});

export { router as currentUserRouter };
