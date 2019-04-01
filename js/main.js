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
    const date = $('[name="useTime"]').val();

    console.log();

    this.recordOperation.save({
        tag: tag, num: num, useTime: date, createTime: new Date()
    });
}