import express from 'express';
import todoRoutes from './infrastructure/routes/todos';

const app = express();

app.use(express.json());
app.use(todoRoutes);

export default app;
