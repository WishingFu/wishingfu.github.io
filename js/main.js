var recordOperation;
const w = window;

$(function() {
    recordOperation = new RecordOperation(() => {
        $("#save-button").removeAttr("disabled");
    });

    $("#save-button").on("click", () => saveRecord());
});

function saveRecord() {
    const tag = $('[name="tag"]').val();
    const num = $('[name="num"]').val();
    const desc = $('[name="desc"]').val();
    const date = $('[name="useTime"]').val();

    if(!tag || !num || !date) {
        showMessage();
        return;
    }

    recordOperation.save({
        tag: tag, num: num, desc: desc, useTime: date, createTime: new Date()
    });
}

let task;

function showMessage() {

    if(task) {
        clearInterval(task);
    }

    let message = $("#message");
    message.show();
    message.text("请填写完整的信息！");

    task = setTimeout(() => message.hide(), 2000);
}