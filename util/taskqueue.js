var process = require('child_process');

var queue = [];

/**
 *
 * @param task - ns:'namespace' project:'projectName' url:'url' branch:'branch'
 */
exports.push = function(task) {
    queue.push(task);
};

var exec = function() {
    if(queue.length) {
        var task = queue.shift();
        var pullCmd = [
            "cd repo/",
            task.ns,
            "/",
            task.name,
            "/doc && git pull ",
            task.url,
            " ",
            task.branch,
            ":",
            task.branch
        ].join("");
        console.log("pull task running:"+pullCmd);
        process.exec(pullCmd,function(err, stdout, stderr) {
            if(err) {
                console.log("err:"+err);
            }
            if(stderr){
                console.log("stderr:"+stderr);
            }
            if(stdout) {
                console.log("stdout:"+stdout);
            }
        });
    }
};

exports.start = function() {
    console.log("task queue is start...");
    setInterval(exec,10000);
};