import { Router, Request, Response } from 'express';
import { SumUseCase } from '../../application/useCases/SumUseCase';

const router = Router();

router.get('/sum', (req: Request, res: Response) => {
  try {
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    if (req.query.a === undefined || req.query.b === undefined) {
      res.status(400).json({ error: 'Query params "a" and "b" are required' });
      return;
    }

    const useCase = new SumUseCase();
    const result = useCase.execute({ a, b });
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
