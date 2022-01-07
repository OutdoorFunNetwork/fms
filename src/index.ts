import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PostsRouter } from './post/post.routes';

dotenv.config();

const port: number = parseInt(process.env.PORT as string) || 8181;
const app = express();


app.use(helmet());
app.use(cors());
app.use(express());

app.use('/api/posts', PostsRouter);

app.listen(port, () => {
    console.log(`Listening on  http://localhost:${ port }`);
});