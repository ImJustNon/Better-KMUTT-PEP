export class LocalStorage {
    storage: Storage;
    constructor() {
        this.storage = window.localStorage;
    }

    getPageOffset(): string {
        let pof = this.storage.getItem("pageOffset");
        if(!pof){
            this.setPageOffset("0");
            pof = "0";
        } 
        return pof;
    }

    setPageOffset(val: string): void {
        this.storage.setItem("pageOffset", val);
    }
}