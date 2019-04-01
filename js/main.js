var recordOperation;
const w = window;

$(function() {
    recordOperation = new RecordOperation(() => {
        $("#save-button").removeAttr("disabled");
    });
});


function saveRecord() {
    const tag = $('[name="tag"]').val();
    const num = $('[name="num"]').val();
    const desc = $('[name="desc"]').val();
    const date = $('[name="useTime"]').val();

    if(!tag || !num || date) {
        alert("请输入完整信息");
    }

    this.recordOperation.save({
        tag: tag, num: num, desc: desc, useTime: date, createTime: new Date()
    });
}