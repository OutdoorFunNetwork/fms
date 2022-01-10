import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import PostsRouter from './post/post.routes';
import AuthRoutes from './auth/auth.routes';
import UserRoutes from './user/user.routes';

dotenv.config();

const port: number = parseInt(process.env.PORT as string, 10) || 8181;
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req: Request, res: Response) => {
  res.status(200).send({
    message: 'Welcome to the FMS!',
    version: '1.0.0',
  });
});
app.use('/api/posts', PostsRouter);
app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on  http://localhost:${port}`);
});

export default app;
