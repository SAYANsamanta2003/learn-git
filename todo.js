const fs = require("fs");
const filePath = "./tasks.json";

const loadTasks = () => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
};

const saveTasks = (tasks) => {
    const dataJSON = JSON.stringify(tasks);
    fs.writeFileSync(filePath, dataJSON);
};

const addTask = (task) => {
    const tasks = loadTasks();
    tasks.push(task);
    saveTasks(tasks);
    console.log("Task added", task);
};

const listTasks = () => {
    const tasks = loadTasks();
    // console.log("Your tasks:");
    tasks.forEach((t, i) => console.log(`${i + 1}. ${t}`));
};

const deleteTask = (index) => {
    const tasks = loadTasks();
    if (index > 0 && index <= tasks.length) {
        tasks.splice(index - 1, 1);
        saveTasks(tasks);
        console.log("Task deleted");
    } else {
        console.log("Invalid task number");
    }
};

const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
    addTask(argument);
} else if (command === "list") {
    listTasks();
} else if (command === "delete") {
    deleteTask(Number(argument));
} else {
    console.log("Command not found");
}
