
import e from "express";
import { AccountCreateInputDTO, AccountLoginInputDTO } from "../../domain/dto/account-dto";
import { AccountUseCase } from "../../domain/use-cases/account/account-usecase";
import { UserNotFoundError } from "../../infra/exeptions/account-exeptions";
import express, { Request, Response } from 'express';
import {FileInputDTO } from "../../domain/dto/file-dto";
import multer from 'multer';
const { v4: uuidv4 } = require('uuid');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
export class AccountController {
  accountUsecase: AccountUseCase;
  constructor(accountUsecase: AccountUseCase) {
    this.accountUsecase = accountUsecase;
  }
  async login(req: Request, res: Response): Promise<void> {
    try {
      var email = req.body.email;
      var password = req.body.password;
      var dto = new AccountLoginInputDTO(
        email,
        password
      )
      var account = await this.accountUsecase.login(dto);
      res.status(200).json(account);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        console.error('Error:', error.message);
      }
      res.status(500).send(error.message);
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const avatarUrl = req.body.imgAvatar as string;

      const body = req.body;
    
      const dto = new AccountCreateInputDTO(
        body.nome,
        body.email,
        body.password,
      )
      var outputDto = await this.accountUsecase.createUser(dto);
      res.status(200).json(outputDto);

    } catch (error) {
      console.error('Error fetching posts:', error);
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
      var user = await this.accountUsecase.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        console.error('Error:', error.message);
      }
      res.status(500).send(error.message);
    }
  }
}
