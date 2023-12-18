import express from 'express';
import { AccountController } from '../controllers/account-controller';
import { AccountUseCaseImpl } from '../../domain/use-cases/account/account-usecase';
import { AccountRepositoryImpl } from '../../infra/repositories/account-repository';
import { AccountDataSourceImpl } from '../../infra/data-source/account-data-source';
import { jwtMiddlewareService } from '../middlewares/jwt';
import { ImgBufferServiceImpl } from '../../infra/services/image-service-impl';
import multer from 'multer';
import { ImgBase64ServiceImpl } from '../../infra/services/image-base64-service';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const accountRouter = express.Router();
const accountUsecase = new AccountUseCaseImpl(
  new AccountRepositoryImpl(
    new AccountDataSourceImpl()
  ),
  new ImgBase64ServiceImpl(),
  jwtMiddlewareService,
);

const accountController = new AccountController(
  accountUsecase
);

accountRouter.post('/login', async (req, res) => {
  await accountController.login(req, res);
});
accountRouter.post('/register',async (req, res) => {
  
  await accountController.createUser(req, res);
});
accountRouter.get('/userInfo', async (req, res) => {
  await accountController.getUserById(req, res);
});
export default accountRouter;