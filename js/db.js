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
        request.onupgradeneeded = (e)=> this.onUpgradeNeeded(e);
    }

    onInitSuccess(event) {
        this.INITIALIZED = true;
        this.db = event.target.result;

        this.callback && this.callback();
        showMessage("数据库初始化完成！");
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
        if(record.id) {
            return this.t().put(record);
        } else {
            return this.t().add(record);
        }
    }

    t() {
        return this.dbInitilized && this.DB.r("record");
    }

    list(callback, finishCallback) {
        this.t().openCursor().onsuccess = (e) => {
            const cursor = e.target.result;
            if(cursor) {
                callback && callback(cursor.value);
                cursor.continue();
            } else {
                showMessage("列表读取完成！");
                finishCallback && finishCallback();
            }
        }
    }

    update() {

    }

    delete() {
        
    }
}

