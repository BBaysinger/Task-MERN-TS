import express, { Application } from 'express';
import errorHandler from 'middleware/errorMiddleware';
import cors from 'cors';

// Import routes
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';

// Create and configure the Express app
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Attach routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Global error handling middleware
app.use(errorHandler);

export default app;