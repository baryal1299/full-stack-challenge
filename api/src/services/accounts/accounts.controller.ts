import {Router, Request, Response, NextFunction} from 'express';
import Account from "./account.entity";
import Tag from './tag.entity';
import Controller from '../../interfaces/controller.interface';
import validator from '../../utils/validator';
import {HttpClientError, DuplicateAccountException} from "../../utils/exceptions";
import HttpStatus from 'http-status-codes';
import AccountsService from './accounts.service';
import {CreateAccountDTO} from "./account.dto";

class AccountsController implements Controller {
    public path = '/accounts';
    public router = Router();
    private accountsService = new AccountsService();

    constructor() {
        this.router.get(
            this.path,
            validator.validate("get", this.path),
            this.getAllAccounts
        );
        this.router.post(
            this.path,
            validator.validate("post", this.path),
            this.createAccount
        );
        this.router.get(
            `${this.path}/:id`,
            validator.validate("get", `${this.path}/{id}`),
            this.getAccountById
        );
        this.router.put(
            `${this.path}/:id`,
            validator.validate("put", `${this.path}/{id}`),
            this.updateAccount
        );
        this.router.delete(
            `${this.path}/:id`,
            validator.validate("delete", `${this.path}/{id}`),
            this.deleteAccount
        );
        this.router.post(
            `${this.path}/:id/tag`,
            validator.validate("post", `${this.path}/{id}/tag`),
            this.addTagToAccount
        );
        this.router.delete(
            `${this.path}/:id/tag`,
            validator.validate("delete", `${this.path}/{id}/tag`),
            this.deleteTagFromAccount
        )
    }

    private getAllAccounts = async (req: Request, res: Response) => {
        const accounts = await this.accountsService.getAllAccounts();
        res.send(accounts);
    };

    private createAccount = async (request: Request, response: Response, next: NextFunction) => {
        const account: CreateAccountDTO = request.body;
        try {
            const newAccount = await this.accountsService.createAccount(account);
            response.status(HttpStatus.CREATED).send(newAccount);
        } catch (err) {
            // postgres unique constraint voilation
            if (err instanceof DuplicateAccountException) {
                next(
                    new HttpClientError(
                        HttpStatus.BAD_REQUEST,
                        err.message
                    )
                );
            }
            next(err)
        }

    };

    private getAccountById = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        try {
            const account = await this.accountsService.getAccountById(id);
            response.send(account);
        } catch (err) {
            next(err)
        }
    };

    private updateAccount = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        const accountData: Account = request.body;
        try {
            const updatedAccount = await this.accountsService.updateAccount(id, accountData);
            response.send(updatedAccount);
        } catch (err) {
            next(err)
        }
    };

    private deleteAccount = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        try {
            await this.accountsService.deleteAccount(id);
            response.sendStatus(200)
        } catch (err) {
            next(err)
        }
    };

    private addTagToAccount = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        const tag: Tag = request.body;
        try {
            const updatedAccount = await this.accountsService.addTagToAccount(id, tag);
            response.send(updatedAccount)
        } catch (err) {
            next(err)
        }
    };

    private deleteTagFromAccount = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        const tag: Tag = request.body;
        try {
            const updatedAccount = await this.accountsService.deleteTagFromAccount(id, tag);
            response.send(updatedAccount)
        } catch (err) {
            next(err)
        }
    };
}

export default AccountsController;