import { getRepository } from "typeorm";
import Account from "./account.entity";
import Tag from './tag.entity';
import { DuplicateAccountException } from "../../utils/exceptions";
import {CreateAccountDTO} from "./account.dto";

class AccountsService {
    private accountRepository = getRepository(Account);
    private tagRepository = getRepository(Tag);

    public getAllAccounts = async (): Promise<Account[]> => {
        return this.accountRepository.find({relations: ["tags"]});
    };

    public createAccount = async (account: CreateAccountDTO): Promise<Account> => {
        try {
            const newAccount = this.accountRepository.create(account);
            await this.accountRepository.save(newAccount);
            return this.accountRepository.findOneOrFail(newAccount.id, {relations: ["tags"]})
        } catch (err) {
            // postgres unique constraint voilation
            if (err && err.code === "23505") {
                throw new DuplicateAccountException(`Account with email ${account.email} aleady exists`)
            }
            throw err
        }
    };

    public getAccountById = async (id: string): Promise<Account> => {
         return this.accountRepository.findOneOrFail(id, {relations: ["tags"]});
    };

    public updateAccount = async (id: string, accountData: Account): Promise<Account> => {
        await this.accountRepository.findOneOrFail(id);
        await this.accountRepository.update(id, accountData);
        return this.accountRepository.findOneOrFail(id, {relations: ["tags"]});
    };

    public deleteAccount = async (id: string): Promise<undefined> => {
        await this.accountRepository.findOneOrFail(id);
        await this.accountRepository.delete(id);
        return;
    };

    public addTagToAccount = async (id: string, tag: Tag): Promise<Account> => {
        const account: Account = await this.accountRepository.findOneOrFail(id, {relations: ["tags"]});
        await this.tagRepository.save(tag);
        if (account.tags) {
            if(!account.tags.some(item => item.name === tag.name)){
                account.tags.push(tag);
            }
        }else{
            account.tags = [tag]
        }
        await this.accountRepository.save(account);
        return this.accountRepository.findOneOrFail(id, {relations: ["tags"]});
    };

    public deleteTagFromAccount = async (id: string, tag: Tag): Promise<Account> => {
            const account: Account = await this.accountRepository.findOneOrFail(id, {relations: ["tags"]});
            account.tags = account.tags.filter(item => {
                return item.name !== tag.name
            });
            await this.accountRepository.save(account);
            return this.accountRepository.findOneOrFail(id, {relations: ["tags"]});
    };
}

export default AccountsService;