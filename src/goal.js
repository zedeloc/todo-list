import { Task } from "./task.js";
export { Goal, Task };
class Goal {
    tasks = [];
    id = crypto.randomUUID();
    constructor(goalName, description, dueDate, priority, notes=undefined) {
        this.goalName = goalName;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(taskID) {
        this.tasks.splice(this.findTaskByID(taskID), 1);
    }

    findTaskByID(taskID) {
        return this.tasks.findIndex((task) => task.id === taskID);
    }
}