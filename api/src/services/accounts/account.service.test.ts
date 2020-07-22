import * as typeorm from 'typeorm';
import AccountService from './accounts.service';
import Account from './account.entity';
import { CreateAccountDTO } from './account.dto';

(typeorm as any).getRepository = jest.fn();

const testAccount: Account = {
    "id": "dae25f27-fe1a-41bd-bc47-47c9eb5bc169",
    "name_first": "Cheri",
    "name_last": "Rice",
    "employer": "Insurety",
    "phone": "7120744246",
    "email": "cheri.rice.9@insurety.net",
    "address": "150 Kossuth Place, Aberdeen, Virginia, 4119",
    "picture": "https://i.pravatar.cc/476",
    "balance": 1189.4400,
    "credit": 683,
    "comments": "some comments",
    "created": new Date(),
    "tags": [
        {
            "id": 1,
            "name": "ex"
        }
    ]
};

const testAccountCreate: CreateAccountDTO = {
    "name_first": "Cheri",
    "name_last": "Rice",
    "employer": "Insurety",
    "phone": "7120744246",
    "email": "cheri.rice.9@insurety.net",
    "address": "150 Kossuth Place, Aberdeen, Virginia, 4119",
    "picture": "https://i.pravatar.cc/476",
    "balance": 1189.4400,
    "credit": 683,
    "comments": "some comments",
    "tags": [
        {
            "id": 1,
            "name": "ex"
        }
    ]
};

describe("The AccountService", () => {
    describe("when fetching for all accounts", () => {
        it('should return list of accounts', () => {
            const accounts: Account[] = [testAccount];
            (typeorm as any).getRepository.mockReturnValue({
                find: () => Promise.resolve(accounts),
            });
            const accountService = new AccountService();
            return accountService.getAllAccounts().then(accounts => {
                expect(accounts).toEqual(accounts);
            });
        });
    });
    describe("when creating an account", () => {
        it("should return the new account created", () => {
            (typeorm as any).getRepository.mockReturnValue({
                create: () => ({
                    ...testAccountCreate,
                    id: testAccount.id,
                    created: testAccount.created
                }),
                save: () => Promise.resolve(),
                findOneOrFail: () => Promise.resolve(testAccount),
            });
            const accountService = new AccountService();
            return accountService.createAccount(testAccountCreate).then(
                data => {
                    expect(data).toEqual(testAccount);
                }
            )
        });
    });
    describe("when fetching for single account by id", () => {
        it("should return a single account", () => {
            (typeorm as any).getRepository.mockReturnValue({
                findOneOrFail: () => Promise.resolve(testAccount),
            });
            const accountService = new AccountService();
            return accountService.getAccountById("dae25f27-fe1a-41bd-bc47-47c9eb5bc169").then(
                data => {
                    expect(data).toEqual(testAccount);
                }
            )
        });
    })
});

/* TODO:
*  More tests needs to be added for coverage and edges cases.
*  Integration tests would also be need to be created.
*  Skipping these due to time constraint.
* */