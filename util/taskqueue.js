
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
        clone(task.url,"views/project",{"checkout_branch": "master"},function() {
            console.log("task:"+task.project+" is running...");
            complete = true;
        });
    }
};

exports.start = function() {
    console.log("task queue is start...");
    setInterval(exec,1000);
};