export class Task {
    id = crypto.randomUUID();
    constructor(name, priority="medium", description='', notes='', isComplete=false) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.notes = notes;
        this.isComplete = isComplete
    }
}