import { Task } from "./task.js";
export { Goal, Task };
class Goal {
    constructor(name, dueDate, description=undefined, priority='medium', notes=undefined, creationDate=new Date(), id=crypto.randomUUID(), tasks=[]) {
        
        this.name = name;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.notes = notes;
        this.creationDate = creationDate.toLocaleString()
        this.id = id;

        if (tasks.length > 0) {
            const rehydratedTasks = []
            for (let task of tasks) {
                const rehydratedTask = new Task(task.name, task.priority, task.description, task.notes, task.isComplete, task.id);
                rehydratedTasks.push(rehydratedTask);
            }
            this.tasks = rehydratedTasks;
        } else {
            this.tasks = tasks;
        }
        
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

    simple() {
        const tasksForStorage = [];
        for (let task of this.tasks) {
            tasksForStorage.push(task.simple())
        }
        return {
            name: this.name,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            notes: this.notes,
            creationDate: this.creationDate,
            id: this.id,
            tasks: tasksForStorage
        }
    } 
    
    getTasks(taskID) {
        const simpleTask = this.tasks[this.findByID(taskID)];
        return new Task(simpleTask.name, simpleTask.priority, simpleTask.description, simpleTask.notes, simpleTask.isComplete, simpleTask.id)
    }
    
}