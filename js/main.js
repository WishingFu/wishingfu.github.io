var recordOperation;
const w = window;
var tags = [];
var tagNum = {};

$(function() {
    recordOperation = new RecordOperation(() => {
        $("#save-button").removeAttr("disabled");
        recordOperation.list(showRecord);
    });

    $("#save-button").on("click", () => saveRecord());

    $("#list-body").on("click", ".delete-item", (e) => {
        if(confirm("你确定要删除记录吗？")) {
            deleteRecord(e);
        }
    });
});

function saveRecord() {
    const tag = $('[name="tag"]').val();
    const num = $('[name="num"]').val();
    const desc = $('[name="desc"]').val();
    const date = $('[name="useTime"]').val();

    if(!tag || !num || !date) {
        showMessage("请填写完整的信息！");
        return;
    }

    const request = recordOperation.save({
        tag: tag, num: Math.round(num * 100), desc: desc,
        useTime: new Date(date.replace(/-/g,'/').replace('T',' ')), createTime: new Date()
    });

    request.onsuccess = () => {
        showMessage("保存成功！");
        $("#list-body").html("");
        recordOperation.list(showRecord);
    }
}

function deleteRecord(e) {
    const id = e.target.dataset.key;
    alert(id);
}

function showRecord(record) {
    let tag = record.tag;
    record.num = record.num / 100;
    record.useTime = record.useTime.format('yy-MM-dd HH:mm');
    record.createTime = record.createTime.format('yy-MM-dd HH:mm');

    let html = 
    `<tr>
        <td>tag</td>
        <td>num</td>
        <td>useTime</td>
        <td><a class="delete-item" data-key="id">删除</a></td>
    </tr>`;

    if(!tagNum[tag]) {
        tagNum[tag] = 0;
        tags.push(tag);
    }

    tagNum[tag] = tagNum[tag] + 1;

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