var recordOperation;
const w = window;
var tags = [];
var records = [];
var tagNum = {};

var monthCount = {};

$(function() {
    recordOperation = new RecordOperation(() => {
        $("#save-button").removeAttr("disabled");
        recordOperation.list(showRecord, listCompelete);
    });

    $("#save-button").on("click", () => saveRecord());

    $("#list-body").on("click", ".delete-item", (e) => {
        if(confirm("你确定要删除记录吗？")) {
            deleteRecord(e);
        }
    });

    $("#id-input").on("click", (e) => {
        $("input[name='id']").val("");
        $(e.currentTarget).hide();
    });

    $("#tags").on("click", ".tag-item", (e) => {
        const tag = e.currentTarget.dataset.tag;
        $("input[name='tag']").val(tag);
    });

    $("#list-body").on("click", ".item-row", (e) => {
        $(".item-row").removeClass("selected");
        const target = e.currentTarget;
        $(target).addClass("selected");
        const record = records[target.dataset.index];
        $("#id-input").show();
        $('[name="id"]').val(record.id);
        $('[name="tag"]').val(record.tag);
        $('[name="num"]').val(record.num);
        $('[name="desc"]').val(record.desc);
        $('[name="useTime"]').val(record.useTime.replace(' ','T'));
    })
});

function saveRecord() {
    const id = $('[name="id"]').val();
    const tag = $('[name="tag"]').val();
    const num = $('[name="num"]').val();
    const desc = $('[name="desc"]').val();
    const date = $('[name="useTime"]').val();

    if(!tag || !num || !date) {
        showMessage("请填写完整的信息！");
        return;
    }

    const request = recordOperation.save({
        id: id && $.isNumeric(id) ? parseInt(id) : id,
        tag: tag, num: Math.round(num * 100), desc: desc,
        useTime: new Date(date.replace(/-/g,'/').replace('T',' ')), createTime: new Date()
    });

    request.onsuccess = () => {
        showMessage("保存成功！");
        $("#list-body").html("");
        records = [];
        monthCount = {};
        recordOperation.list(showRecord, listCompelete);
    }
}

function listCompelete() {
    $("#count-list-body").html("");
    for(let i in monthCount) {
        $("#count-list-body").append("<tr><td>"+i+"</td><td>"+monthCount[i]+"</td></tr>");
    }

    $("#tag-list-body").html("");
    for(let i in tagNum) {
        $("#tag-list-body").append("<tr><td>"+i+"</td><td>"+tagNum[i]+"</td></tr>");
    }

    $("#tags").html("");
    for(let i = 0; i < tags.length; i++) {
        let t = tags[i];
        $("<div class='tag-item' data-tag='" + t + "'>" + t + "</div>").appendTo("#tags")[0]
            .style.background = hsltorgb(randInt(360), 50, 50, 0.4);
    }
}

function deleteRecord(e) {
    const id = e.target.dataset.key;
}

function showRecord(record) {
    let tag = record.tag;
    record.num = record.num / 100;
    const m = record.useTime.format("yyyy-MM");
    record.useTime = record.useTime.format('yyyy-MM-dd HH:mm');
    record.createTime = record.createTime.format('yyyy-MM-dd HH:mm');

    
    if(!monthCount[m]) {
        monthCount[m] = 0;
    }
    monthCount[m] += record.num;

    let html = 
    `<tr class="item-row" data-index="number">
        <td>tag</td>
        <td>num</td>
        <td>useTime</td>
        <td><a class="delete-item" data-key="id">删除</a></td>
    </tr>`;

    if(!tagNum[tag]) {
        tagNum[tag] = 0;
        tags.push(tag);
    }

    tagNum[tag] = tagNum[tag] + record.num;

    html = html.replace("number", records.length);
    records.push(record);

    

    for(let i in record) {
        let regExp = new RegExp(i, "g");
        html = html.replace(regExp, record[i]);
    }

    $("#list-body").append(html);
}

Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "H+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt; 
}    

let task;

function showMessage(text) {
    if(task) {
        clearTimeout(task);
    }

    let message = $("#message");
    message.removeClass("hide");
    message.text(text);

    task = setTimeout(() => message.addClass("hide"), 2000);
}