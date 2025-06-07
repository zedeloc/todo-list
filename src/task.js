export class Task {
    id = crypto.randomUUID();
    constructor(name, priority="medium", description='', notes='', isComplete=false) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.notes = notes;
        this.isComplete = isComplete
    }

    editTask(newName, newDescription, newPriority, newNotes) {
        this.name = newName;
        this.description = newDescription;
        this.priority = newPriority;
        this.notes = newNotes;
    }
}