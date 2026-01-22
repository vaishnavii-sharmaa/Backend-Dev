const fs = require("fs");

function logActivity(message) {
    const timestamp = new Date().toLocaleString();
    const logMessage = `[${timestamp}] - ${message}\n`;

    fs.appendFile("activity.log", logMessage, (err) => {
        if (err) console.log("Fail to write log");
    });
}

const showLogs = (res) => {
    fs.readFile("activity.log", "utf8", (err, data) => {
        if (err) {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("No logs found");
            return;
        }

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(data);
    });
};

module.exports = { logActivity, showLogs };
