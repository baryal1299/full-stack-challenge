class HttpClientError extends Error {
    readonly statusCode!: number;
    readonly message!: string;

    constructor(status: number, message: string) {
        super(message);
        this.statusCode = status;
        this.message = message;
    }
}

class DuplicateAccountException extends Error {
    constructor(message: string){
        super(message);
        this.name = "DuplicateAccountException";
    }
}

export { HttpClientError, DuplicateAccountException }