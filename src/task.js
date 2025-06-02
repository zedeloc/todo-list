export class Task {
    constructor(taskName, description, dueDate, priority, notes=undefined) {
        this.taskName = taskName;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }
    uniqueId = crypto.randomUUID();
    isComplete = false;
}