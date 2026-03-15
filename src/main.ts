import express from 'express';
import todoRoutes from './infrastructure/routes/todos';

const app = express();
const port = 3000;

app.use(express.json());
app.use(todoRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
