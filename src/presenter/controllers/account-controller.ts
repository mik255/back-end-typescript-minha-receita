import { AccountUseCaseApplication } from "../../application/use-cases/account-usecases";
import { UserNotFoundError } from "../../infra/exeptions/account-exeptions";
import { generateJWTToken } from "../middlewares/jwt";
import express, { Request, Response } from 'express';

export class AccountController {
  accountUseCaseApplication: AccountUseCaseApplication;
  constructor(accountUseCaseApplication: AccountUseCaseApplication) {
    this.accountUseCaseApplication = accountUseCaseApplication;
  }
  async login(req: Request, res: Response): Promise<void> {
    try {
      var email = req.body.email;
      var password = req.body.password;
      var user = await this.accountUseCaseApplication.login(email, password);
      var token = generateJWTToken(user.id);
      res.status(200).json(token);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        console.error('Error:', error.message);
      }
      res.status(500).send(error.message);
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      var userRequest = req.body;
      var user = await this.accountUseCaseApplication.createUser(userRequest);
      res.status(200).json(user);
    } catch (error) {
      if (error.message == "Usuário já existe") {
        res.status(500).send(error.message);
        return;
      }
      res.status(500).send('Internal Server Error');
    }
  }
  async getUserById(req, res: Response): Promise<void> {
    try {
      var id = req.userId;
      var user = await this.accountUseCaseApplication.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        console.error('Error:', error.message);
      }
      res.status(500).send(error.message);
    }
  }
}
