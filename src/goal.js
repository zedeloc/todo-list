import { Task } from "./task.js";
export { Goal, Task };
class Goal {
    tasks = [];
    id = crypto.randomUUID();
    
    constructor(goalName, description, dueDate, priority, notes=undefined, creationDate=new Date()) {
        this.goalName = goalName;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.creationDate = creationDate.toLocaleString()
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