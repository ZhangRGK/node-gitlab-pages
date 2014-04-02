var process = require('child_process');

var queue = [];

var complete = true;
/**
 *
 * @param task - ns:'namespace' project:'projectName' url:'url' branch:'branch'
 */
exports.push = function(task) {
    queue.push(task);
};

exports.isComplete = function(callback) {
    callback(complete);
};

var exec = function() {
    complete = false;
    if(queue.length) {
        var task = queue.shift();
        var pullCmd = [
            "cd repo/",
            task.ns,
            "/",
            task.project,
            "/doc && git pull ",
            task.url,
            " doc:doc"
        ].join();
        process.exec(pullCmd);
    }
};

exports.start = function() {
    console.log("task queue is start...");
    setInterval(exec,10000);
};