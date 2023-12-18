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
import fileRouter from './presenter/routes/files-routes';

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
var jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' });
var urlencodedParser = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoded' })

app.use(jsonParser);
app.use(urlencodedParser);
app.use(express.json({limit: 1024 * 1024 * 100}));

app.use('/uploads', express.static('uploads'));
app.use('/posts', postRouter);
app.use('/comment', commentRouter);
app.use('/likes', likesRouter);
app.use('/recipe', recipeRouter);
app.use('/account', accountRouter);
app.use('/files', fileRouter);

//rotas
app.get('/', (req: Request, res: Response) => {
    res.send('Olá, mundo!');
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
