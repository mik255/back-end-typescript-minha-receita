import express from 'express';
import { AccountController } from '../controllers/account-controller';
import { AccountUseCaseApplicationImpl } from '../../application/use-cases/account-usecases';
import { AccountUseCaseImpl } from '../../domain/use-cases/account/account-usecase';
import { AccountRepositoryImpl } from '../../infra/repositories/account-repository';
import { AccountDataSourceImpl } from '../../infra/data-source/account-data-source';



const accountRouter = express.Router();
const accountController = new AccountController(new AccountUseCaseApplicationImpl(
  new AccountUseCaseImpl(
    new AccountRepositoryImpl(
      new AccountDataSourceImpl()
    )
  )));

accountRouter.post('/login', async (req, res) => {
  await accountController.login(req, res);
});
accountRouter.post('/register', async (req, res) => {
  await accountController.createUser(req, res);
});
accountRouter.get('/userInfo', async (req, res) => {
  await accountController.getUserById(req, res);
});
export default accountRouter;