import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import postRouter from './presenter/routes/posts-routes';
import accountRouter from './presenter/routes/account-routes';
import { authMiddleware } from './presenter/middlewares/jwt';
import interceptorLogger from './presenter/middlewares/interceptor-logger';
import recipeRouter from './presenter/routes/recipe-routes';
import likesRouter from './presenter/routes/likes-routes';
import commentRouter from './presenter/routes/comment-routes';

const uri = 'mongodb://localhost:27017/minha_receita';
mongoose.connect(uri);

const app = express();
const port = 3001;
app.use(authMiddleware);
app.use(interceptorLogger);
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/posts', postRouter);
app.use('/comment', commentRouter);
app.use('/likes', likesRouter);
app.use('/recipe', recipeRouter);
app.use('/account', accountRouter);

//rotas
app.get('/', (req: Request, res: Response) => {
    res.send('Olá, mundo!');
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
