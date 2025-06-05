import { Goal, Task } from './goal.js'

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
        cardWrapper.setAttribute('id', goal.id)
        // cardWrapper.setAttribute('id', goal.id);
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
                buildTasksView(goal, cardWrapper);
                viewTasksButton.classList.add('open');
                viewTasksButton.textContent = 'Close Tasks';
            } else {
                viewTasksButton.classList.remove('open');
                closeTasksView(cardWrapper);
                viewTasksButton.classList.add('closed');
                viewTasksButton.textContent = 'Add or View Tasks';
            }
            
        })
        // Delete Goal button 
        const deleteGoalButton = document.createElement('button');
        deleteGoalButton.classList.add('delete-goal-button');
        deleteGoalButton.textContent = "x";

        deleteGoalButton.addEventListener('click', () => {
            goalManager.removeGoal(goalManager.findGoalByID(goal.id));
            clearContent()
            buildGoalsView(goalManager);
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


        topLine.append(goalName, description, dueDate, deleteGoalButton);
        bottomLine.append(notes, viewTasksButton, creationDate)

        goalCard.append(topLine, bottomLine);
        cardWrapper.append(goalCard);

        content.append(cardWrapper);

        i++

    }
    const addGoal = document.createElement('div');
    addGoal.classList.add('goal-card');
    addGoal.classList.add('add-goal');
    addGoal.textContent = "+ + A d d   G o a l + +";
    addGoal.addEventListener('click', () => {
        createGoal(goalManager)
    })
    content.append(addGoal)

    
}

function buildTasksView(goal, cardWrapper) {
    const currentTasks = goal.tasks;
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

    const addTask = document.createElement('div');
    addTask.classList.add('task-card');
    addTask.classList.add('add-task');
    addTask.textContent = "+ + A d d   T a s k + +";
    addTask.addEventListener('click', () => {
        createTask(goal, cardWrapper)
    })
    tasksList.append(addTask)


    cardWrapper.append(tasksList);

}
// 
// 
// 
// Accidentily deleting goals from the dom
function closeTasksView(goal) {
    const thisCardWrapper = document.getElementById(goal.id)
    if (thisCardWrapper.querySelector('.tasks-list')) {
        thisCardWrapper.querySelector('.tasks-list').remove();
    }
    
}
// 
// 
// 
// 

function createGoal(goalManager) {
    const openModal = document.querySelector('[data-open-modal]');
    const closedModal = document.querySelector('[data-close-Modal]');
    const goalModal  = document.querySelector('[data-modal-new]');
    goalModal.showModal();

    // form
    const goalForm = document.createElement('form');
    const goalName = document.createElement('input')
    goalName.setAttribute('type', 'text')
    goalName.setAttribute('placeholder', 'Name')
    // goalName.setAttribute('required', 'required')
    const description = document.createElement('input');
    description.setAttribute('placeholder', 'Description')
    // description.setAttribute('required', '');
    const dueDate = document.createElement('input');
    dueDate.setAttribute('type', 'date')
    // dueDate.setAttribute('required', '')
    const priority = document.createElement('select');
    priority.id = 'priority';
    console.log(priority.value)
    // priority.setAttribute('required', '')
    const optionLow = document.createElement('option');
    optionLow.setAttribute('value', 'low');
    optionLow.textContent = "Low"
    const optionMedium = document.createElement('option');
    optionMedium.setAttribute('value', 'medium');
    optionMedium.textContent = "Medium";
    optionMedium.setAttribute('selected', '');
    const optionHigh = document.createElement('option');
    optionHigh.textContent = "High"
    optionHigh.setAttribute('value', 'high')
    let currentPriority = 'medium';
    priority.addEventListener('change', () => {
        currentPriority = priority.value;
        console.log(currentPriority)
    })



    const notes = document.createElement('input');
    notes.setAttribute('type', 'textbox');
    notes.setAttribute('placeholder', 'Add Notes')
    const newGoalButton = document.createElement('button');
    newGoalButton.setAttribute('type', 'button')
    newGoalButton.classList.add('new-goal-button')
    newGoalButton.textContent = "Submit New Goal";

    
    const closeModal = document.createElement('button')
    closeModal.classList.add('close-modal-button')
    closeModal.textContent = "Cancel";
    closeModal.addEventListener('click', () => {
        goalModal.replaceChildren()
        goalModal.close()
        
    })



    newGoalButton.addEventListener('click', (e) => {
        // const getPriority = document.querySelector('#priority').value
        // console.log(getPriority)
        e.preventDefault()
        if (goalName.value && dueDate.value) { 
                const newGoal = new Goal(goalName.value,  dueDate.value, description.value, currentPriority, notes.value)
                goalManager.addGoal(newGoal)
                clearContent()
                buildGoalsView(goalManager);
                goalModal.replaceChildren()
                goalModal.close()
            }
    })

    priority.append(optionLow, optionMedium, optionHigh)
    goalForm.append(goalName, description, dueDate, priority, notes, newGoalButton)
    goalModal.append(goalForm, closeModal)
}

function createTask(goal, cardWrapper) {
    const openModal = document.querySelector('[data-open-modal]');
    const closedModal = document.querySelector('[data-close-Modal]');
    const taskModal  = document.querySelector('[data-modal-new]');
    taskModal.showModal();

    // form
    const taskForm = document.createElement('form');
    const taskName = document.createElement('input')
    taskName.setAttribute('type', 'text')
    taskName.setAttribute('placeholder', 'Name')
    // goalName.setAttribute('required', 'required')
    const description = document.createElement('input');
    description.setAttribute('placeholder', 'Description')
    // description.setAttribute('required', '');
    const priority = document.createElement('select');
    priority.id = 'priority';
    console.log(priority.value)
    // priority.setAttribute('required', '')
    const optionLow = document.createElement('option');
    optionLow.setAttribute('value', 'low');
    optionLow.textContent = "Low"
    const optionMedium = document.createElement('option');
    optionMedium.setAttribute('value', 'medium');
    optionMedium.textContent = "Medium";
    optionMedium.setAttribute('selected', '');
    const optionHigh = document.createElement('option');
    optionHigh.textContent = "High"
    optionHigh.setAttribute('value', 'high')
    let currentPriority = 'medium';
    priority.addEventListener('change', () => {
        currentPriority = priority.value;
        console.log(currentPriority)
    })
    // 
    const notes = document.createElement('input');
    notes.setAttribute('type', 'textbox');
    notes.setAttribute('placeholder', 'Add Notes')
    const newTaskButton = document.createElement('button');
    newTaskButton.setAttribute('type', 'button')
    newTaskButton.classList.add('new-goal-button')
    newTaskButton.textContent = "Submit New Goal";
    // Close Button
    const closeModal = document.createElement('button')
    closeModal.classList.add('close-modal-button')
    closeModal.textContent = "Cancel";
    closeModal.addEventListener('click', () => {
        taskModal.replaceChildren()
        taskModal.close()
        
    })

    newTaskButton.addEventListener('click', (e) => {
        e.preventDefault()
        if (taskName.value) { 
                const newTask = new Task(taskName.value, currentPriority, description.value, notes.value)
                goal.addTask(newTask)
                closeTasksView(goal);
                buildTasksView(goal, cardWrapper);
                taskModal.replaceChildren();
                taskModal.close();
            }
    })

    priority.append(optionLow, optionMedium, optionHigh)
    taskForm.append(taskName, description, priority, notes, newTaskButton)
    taskModal.append(taskForm, closeModal)
}

function clearContent() {
    const content = document.querySelector('#content');
    content.replaceChildren();
}

function clearTasks(goal) {
    const allTasksLists = document.querySelectorAll('.tasks-list');
    for (let currentTaskList of allTasksLists) {
        currentTaskList.remove()
    }
}