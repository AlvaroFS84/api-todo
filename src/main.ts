import express from 'express';
import todoRoutes from './infrastructure/routes/todos';
import sumRoutes from './infrastructure/routes/sum';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(todoRoutes);
app.use(sumRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
