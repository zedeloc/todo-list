export class Task {
    id = crypto.randomUUID();
    constructor(taskName, priority, description=undefined, notes=undefined, isComplete=false) {
        this.taskName = taskName;
        this.description = description;
        this.priority = priority;
        this.notes = notes;
        this.isComplete = isComplete
    }
}