import Tag from "./tag.entity";

export interface CreateAccountDTO {
    name_first: string;
    name_last: string;
    employer: string;
    phone: string;
    email: string;
    address: string;
    picture: string;
    balance: number;
    credit: number;
    comments: string;
    tags?: Tag[];
}