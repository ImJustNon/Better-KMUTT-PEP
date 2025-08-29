export class LocalStorage {
    storage: Storage;
    constructor() {
        this.storage = window.localStorage;
    }

    getPage(): string {
        let pof = this.storage.getItem("page");
        if(!pof){
            this.setPage("1");
            pof = "1";
        } 
        return pof;
    }

    setPage(val: string): void {
        this.storage.setItem("page", val);
    }
}