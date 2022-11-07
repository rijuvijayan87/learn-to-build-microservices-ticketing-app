import express from 'express';

const router = express.Router();

router.get('/api/users/signin', (req, res) => {
  res.json({ msg: 'signin user route' });
});

export { router as signinRouter };
