
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

var exec = function(callback) {
    complete = false;
    if(queue.length) {
        var task = queue.shift();
        taskstack.push(task);
        clone(task.url,"views/project",{"checkout_branch": "master"},function() {
            callback(task);
            complete = true;
        });
    }
};

exports.start = function(callback) {
    console.log("task queue is start...");
    setInterval(exec(callback),60000);
};