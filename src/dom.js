export function makeHeader() {
    const header = document.querySelector("header");
    const logo = document.createElement("h1");
    const smile = document.createElement('p');
    const tagLine = document.createElement('p');
    tagLine.classList.add('tag-line')
    tagLine.textContent = " ...Where you do what you wish to."
    smile.classList.add("smile");
    smile.textContent = ')';
    logo.textContent = 'u du';
    logo.append(smile);
    header.append(logo, tagLine);
}

export function buildGoalsView(goalManager) {
    const content = document.querySelector("#content")
    const currentGoals = goalManager.goals;
    for (let goal of currentGoals) {
        // Build Card
        const goalCard = document.createElement('div');
        goalCard.classList.add("goal-card");
        goalCard.classList.add(`${goal.priority}`)
        // Fetch card contents
        const goalName = document.createElement('h2');
        goalName.textContent = goal.goalName;
        const description = document.createElement('p')
        description.classList.add("goal-description");
        description.textContent = goal.description;
        const dueDate = document.createElement('p')
        dueDate.classList.add('due-date');
        dueDate.textContent = goal.dueDate;
        const priority = document.createElement('div');
        priority.classList.add(`${goal.priority}`)
        const notes = document.createElement('div');
        notes.classList.add('notes');
        notes.textContent = goal.notes;
        const creationDate = document.createElement('div');
        creationDate.classList.add('creation-date');
        creationDate.textContent = goal.creationDate;




        goalCard.append(goalName, dueDate, description, notes, priority, creationDate);

        content.append(goalCard);

    }
}