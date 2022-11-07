import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  res.json({ msg: 'signout user route' });
});

export { router as signoutRouter };
