import express, { Application } from 'express';
import errorHandler from 'middleware/errorMiddleware';
import cors from 'cors';
import taskRoutes from 'routes/taskRoutes';
import userRoutes from 'routes/userRoutes';

// Create a separate instance of the Express app for testing
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Attach routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Use error handler
app.use(errorHandler);

export default app;