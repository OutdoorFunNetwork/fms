import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PostsRouter } from './post/post.routes';

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const port: number = parseInt(process.env.PORT as string);
const app = express();


app.use(helmet());
app.use(cors());
app.use(express());

app.use('/api/posts', PostsRouter);

app.listen(port, () => {
    console.log(`Listening on port ${ port }`);
});