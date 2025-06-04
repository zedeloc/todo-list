export function makeHeader() {
    const header = document.querySelector('header');
    const logo = document.createElement('h1');
    const smile = document.createElement('p');
    const tagLine = document.createElement('p');
    tagLine.classList.add('tag-line')
    tagLine.textContent = " ...what you wish to."
    smile.classList.add('smile');
    smile.textContent = ")";
    logo.textContent = "u du";
    logo.append(smile);
    header.append(logo, tagLine);
}

export function buildGoalsView(goalManager) {
    const content = document.querySelector('#content')
    const currentGoals = goalManager.goals;
    let i = 0
    for (let goal of currentGoals) {
        // Build Card
        const cardWrapper = document.createElement('div');
        cardWrapper.classList.add('.card-wrapper');
        const goalCard = document.createElement('div');
        // build two lines
        const topLine = document.createElement('div');
        topLine.classList.add('top-line');
        const bottomLine = document.createElement('div');
        bottomLine.classList.add('bottom-line');
        goalCard.classList.add("goal-card");
        // View Tasks button
        const viewTasksButton = document.createElement('button')
        viewTasksButton.classList.add('view-tasks-button');
        viewTasksButton.classList.add('closed');
        viewTasksButton.textContent = "Add or View Tasks";
        viewTasksButton.addEventListener('click', () => {
            if (viewTasksButton.classList.contains('closed')){
                viewTasksButton.classList.remove('closed');
                buildTasksView(goal.tasks, cardWrapper);
                viewTasksButton.classList.add('open');
                viewTasksButton.textContent = 'Close Tasks';
            } else {
                viewTasksButton.classList.remove('open');
                closeTasksView(cardWrapper);
                viewTasksButton.classList.add('closed');
                viewTasksButton.textContent = 'Add or View Tasks';
            }
            
        })
        // Priority level lighting
        goalCard.classList.add(`${goal.priority}`)
        // Fetch card contents
        const goalName = document.createElement('h2');
        goalName.classList.add('goal-name'); //try to not use this class
        goalName.textContent = goal.goalName;
        const description = document.createElement('p')
        description.classList.add('goal-description');
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


        topLine.append(goalName, description, dueDate);
        bottomLine.append(notes, viewTasksButton, creationDate)

        goalCard.append(topLine, bottomLine);
        cardWrapper.append(goalCard);

        content.append(cardWrapper);

        i++

    }

    
}

function buildTasksView(currentTasks, cardWrapper) {
    // Task Card
    const tasksList = document.createElement('div');
    tasksList.classList.add('tasks-list');
    // Fetch task contents
    for (let task of currentTasks) {

        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card')
        taskCard.classList.add(`${task.priority}`)
        // build two lines
        const topLine = document.createElement('div');
        topLine.classList.add('top-line');
        const bottomLine = document.createElement('div');
        bottomLine.classList.add('bottom-line')
        
        const taskName = document.createElement('h3');
        taskName.classList.add('taskName') //try to not use this class
        taskName.textContent = task.taskName;

        const taskDescription = document.createElement('p')
        taskDescription.classList.add('goal-description');
        taskDescription.textContent = task.description;
        const taskPriority = document.createElement('div');
        taskPriority.classList.add(`${task.priority}`)
        const taskNotes = document.createElement('div');
        taskNotes.classList.add('notes');
        taskNotes.textContent = task.notes;
        const taskIsComplete = document.createElement('div')
        taskIsComplete.classList.add('complete-description')
        taskIsComplete.textContent = "Completion status: ";

        const completeToggle = document.createElement('span')
        completeToggle.classList.add('complete-toggle')
        completeToggle.classList.add(`complete-${task.isComplete}`)
        completeToggle.addEventListener('click', () => {
            if (completeToggle.classList.contains('complete-false')) {
                completeToggle.classList.remove('complete-false')
                task.isComplete = true;
                completeToggle.classList.add(`complete-${task.isComplete}`)
            } else {
                completeToggle.classList.remove('complete-true')
                task.isComplete = false;
                completeToggle.classList.add(`complete-${task.isComplete}`)
            }
        }
        )
        topLine.append(taskName, taskDescription);
        bottomLine.append(taskNotes, taskIsComplete, completeToggle)
        taskCard.append(topLine, bottomLine)
        tasksList.append(taskCard);

    }


    cardWrapper.append(tasksList);

}

function closeTasksView(cardWrapper) {
    cardWrapper.removeChild(cardWrapper.lastChild)
}

