export class Task {
    id = crypto.randomUUID();
    constructor(taskName, priority="medium", description=undefined, notes=undefined, isComplete=false) {
        this.taskName = taskName;
        this.description = description;
        this.priority = priority;
        this.notes = notes;
        this.isComplete = isComplete
    }
}