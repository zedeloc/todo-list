export class Task {
    id = crypto.randomUUID();
    constructor(taskName, description, priority, notes=undefined, isComplete=false) {
        this.taskName = taskName;
        this.description = description;
        this.priority = priority;
        this.notes = notes;
        this.isComplete = isComplete
    }
}