import { Task } from "./task.js";
export { Goal, Task };
class Goal {
    tasks = [];
    id = crypto.randomUUID();
    
    constructor(name, dueDate, description=undefined, priority='medium', notes=undefined, creationDate=new Date()) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.creationDate = creationDate.toLocaleString()
    }

    add(task) {
        this.tasks.push(task);
    }

    remove(taskID) {
        this.tasks.splice(this.findByID(taskID), 1);
    }

    findByID(taskID) {
        return this.tasks.findIndex((task) => task.id === taskID);
    }

    editGoal(newName, newDueDate, newDescription, newPriority, newNotes) {
        this.name = newName;
        this.dueDate = newDueDate;
        this.description = newDescription;
        this.priority = newPriority;
        this.notes = newNotes;
    }
}