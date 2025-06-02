export class Task {
    id = crypto.randomUUID();
    constructor(taskName, description, priority, notes=undefined) {
        this.taskName = taskName;
        this.description = description;
        this.priority = priority;
        this.notes = notes;
    }
    isComplete = false;

    // function toggleComplete() ?
}