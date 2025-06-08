export class Task {
    
    constructor(name, priority="medium", description='', notes='', isComplete=false, id=crypto.randomUUID()) {
        this.name = name;
        this.priority = priority;
        this.description = description;
        this.notes = notes;
        this.isComplete = isComplete;
        this.id = id;
    }

    editTask(newName, newDescription, newPriority, newNotes) {
        this.name = newName;
        this.description = newDescription;
        this.priority = newPriority;
        this.notes = newNotes;
    }

    simple() {
        return {
            name: this.name,
            description: this.description,
            priority: this.priority,
            notes: this.notes,
            isComplete: this.isComplete,
            id: this.id
        };
    }
    
}