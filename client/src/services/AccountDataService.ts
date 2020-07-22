import http from "./HttpCommon";

class AccountDataService {
    private URI = '/accounts';

    getAllAccounts(){
        return http.get(this.URI)
    }

    createAccount(data: any){
        return http.post(this.URI, data)
    }

    getAccount(id: string) {
        return http.get(`${this.URI}/${id}`);
    }

    updateAccount(id: string, data: any) {
        return http.put(`${this.URI}/${id}`, data);
    }

    deleteAccount(id: string) {
        return http.delete(`${this.URI}/${id}`);
    }

    addTagToAccount(id: string, data: any){
        return http.post(`${this.URI}/${id}/tag`, data)
    }

    removeTagFromAccount(id: string, data: any){
        return http.delete(`${this.URI}/${id}/tag`, data)
    }

}

export default new AccountDataService();