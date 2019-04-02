class Database {
    constructor(callback) {
        this.INITIALIZED = false;
        this.db = null;

        this.callback = callback;
        this.initDB();
    }

    initDB() {
        const request = window.indexedDB.open("accounting", 1);
        request.onsuccess = (e) => this.onInitSuccess(e);
        request.onupgradeneeded = (e)=> this.onupgradeneeded(e);
    }

    onInitSuccess(event) {
        this.INITIALIZED = true;
        this.db = event.target.result;

        this.callback && this.callback();
    }

    onUpgradeNeeded(event) {
        const db = event.target.result;

        const os = db.createObjectStore("record", {
            keyPath: "id",
            autoIncrement: true
        });

        os.createIndex("id", "id", {unique: true});
        os.createIndex("tag", "tag");
        os.createIndex("num", "num"); 
        os.createIndex("desc", "desc");
        os.createIndex("useTime", "useTime");
        os.createIndex("createTime", "createTime");
    }

    t(name) {
        return this.INITIALIZED && this.db.transaction(name, "readwrite");
    }

    r(name) {
        return this.t(name).objectStore(name);
    }
}

class RecordOperation {
    constructor(callback) {
        this.dbInitilized = false;

        this.DB = new Database(_ => {
            this.dbInitilized = true;
            callback && callback();
        });
    }

    save(record) {
        this.t().add(record);
    }

    t() {
        return this.dbInitilized && this.DB.r("record");
    }

    list() {

    }

    update() {

    }

    delete() {

    }
}

