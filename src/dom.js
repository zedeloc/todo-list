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

        const taskEditButton = document.createElement('button');
        taskEditButton.textContent = "Edit Task"
        taskEditButton.addEventListener('click', () => {
            editTask(task, goal, cardWrapper);
        })
        topLine.append(taskName, taskDescription);
        bottomLine.append(taskNotes, taskIsComplete, completeToggle, taskEditButton)
        taskCard.append(topLine, bottomLine)
        tasksList.append(taskCard);

    }

    const addTask = document.createElement('div');
    addTask.classList.add('task-card');
    addTask.classList.add('add-goal');
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
    const [ openModal, closedModal, modal ] = displayModal();
    modal.showModal();

    // form
    const goalForm = document.createElement('form');
    const goalName = document.createElement('input')
    goalName.setAttribute('type', 'text')
    goalName.setAttribute('placeholder', 'Name *Required*')
    // goalName.setAttribute('required', 'required')
    const description = document.createElement('input');
    description.setAttribute('placeholder', 'Description')
    // description.setAttribute('required', '');
    const dueDateWrapper = document.createElement('div');
    const dueDateLabel = document.createElement('label');
    dueDateLabel.textContent = "Due Date (Required)"
    dueDateLabel.setAttribute('for', 'dueDateCal');
    const dueDate = document.createElement('input');
    dueDate.setAttribute('type', 'date');
    dueDate.setAttribute('id', 'dueDateCal');
    dueDateWrapper.append(dueDateLabel, dueDate);
    // dueDate.setAttribute('required', '')
    
    const priority = document.createElement('select');
    priority.id = 'priority';
    console.log(priority.value)
    const priorityWrapper = document.createElement('div')
    priorityWrapper.classList.add('priority-wrapper')
    const priorityLabel = document.createElement('label')
    priorityLabel.textContent = "Priority Level:";
    priorityWrapper.append(priorityLabel, priority)
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



    const notes = document.createElement('textarea');

    notes.setAttribute('placeholder', 'Add Notes')
    // Create Form Buttons with Destructuring
    const [ submitModal, closeModal ] = createModalButtons(modal);

    submitModal.addEventListener('click', (e) => {
        e.preventDefault()
        if (goalName.value && dueDate.value) { 
                const newGoal = new Goal(goalName.value,  dueDate.value, description.value, currentPriority, notes.value)
                goalManager.addGoal(newGoal)
                clearContent()
                buildGoalsView(goalManager);
                modal.replaceChildren()
                modal.close()
            }
    })

    priority.append(optionLow, optionMedium, optionHigh)
    goalForm.append(goalName, description, dueDateWrapper, closeModal, priorityWrapper, notes, submitModal)
    modal.append(goalForm, )
}

function createTask(goal, cardWrapper) {
    const [ openModal, closedModal, modal ] = displayModal();
    modal.showModal();

    // form
    const taskForm = document.createElement('form');
    const taskName = document.createElement('input')
    taskName.setAttribute('type', 'text')
    taskName.setAttribute('placeholder', 'Task Name')
    // goalName.setAttribute('required', 'required')
    const description = document.createElement('input');
    description.setAttribute('placeholder', 'Task Description')
    // description.setAttribute('required', '');
    
    const priority = document.createElement('select');
    priority.id = 'priority';
    console.log(priority.value)
    const priorityWrapper = document.createElement('div')
    priorityWrapper.classList.add('priority-wrapper')
    const priorityLabel = document.createElement('label')
    priorityLabel.textContent = "Priority Level:";
    priorityWrapper.append(priorityLabel, priority)
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
    const notes = document.createElement('textarea');
    notes.setAttribute('placeholder', 'Task Notes');
    // Create Modal Buttons using Destructuring
    const [ submitModal, closeModal ] = createModalButtons(modal);

    submitModal.addEventListener('click', (e) => {
        e.preventDefault()
        if (taskName.value) { 
                const newTask = new Task(taskName.value, currentPriority, description.value, notes.value);
                goal.addTask(newTask);
                closeTasksView(goal);
                buildTasksView(goal, cardWrapper);
                modal.replaceChildren();
                modal.close();
            }
    })

    
    const placeHoldingElement = document.createElement('div')
    priority.append(optionLow, optionMedium, optionHigh);
    taskForm.append(taskName, description, priorityWrapper, closeModal, notes, placeHoldingElement, submitModal);
    modal.append(taskForm, );
}

function createModalButtons(modal) {
    // SubmitModal button requires independent event listener that calls appropriate class
    // Submit
    const submitModal = document.createElement('button');
    submitModal.setAttribute('type', 'button');
    submitModal.classList.add('submit-modal-button');
    submitModal.textContent = "Submit";
    
    // Close Modal
    const closeModal = document.createElement('button');
    closeModal.classList.add('delete-goal-button');
    closeModal.textContent = "x";
    closeModal.addEventListener('click', () => {
        modal.replaceChildren()
        modal.close()
        
    });
    modal.addEventListener('keydown', (e) => {
        const key = e.key;
        if (key === 'Escape') {
            e.preventDefault();
            modal.replaceChildren();
            modal.close();

        }
    })
    return [ submitModal, closeModal ];
}

function clearContent() {
    const content = document.querySelector('#content');
    content.replaceChildren();
}

function displayModal() {
    const openModal = document.querySelector('[data-open-modal]');
    const closedModal = document.querySelector('[data-close-Modal]');
    const modal  = document.querySelector('[data-modal-new]');
    return [ openModal, closedModal, modal ]

}

function editTask(task, goal, cardWrapper) {
    const [ openModal, closedModal, modal ] = displayModal();
    modal.showModal();

    // form
    const taskForm = document.createElement('form');
    const taskName = document.createElement('input');
    taskName.setAttribute('type', 'text');
    taskName.setAttribute('value', task.taskName);
    // goalName.setAttribute('required', 'required')
    const description = document.createElement('input');
    description.setAttribute('placeholder', 'Task Description');
    description.setAttribute('value', task.description);
    
    // description.setAttribute('required', '');
    
    const priority = document.createElement('select');
    priority.id = 'priority';
    priority.setAttribute('defaultValue', task.priority)
    priority.setAttribute('value', task.priority);
    const priorityWrapper = document.createElement('div')
    priorityWrapper.classList.add('priority-wrapper')
    const priorityLabel = document.createElement('label')
    priorityLabel.textContent = "Priority Level:";
    priorityWrapper.append(priorityLabel, priority)
    // priority.setAttribute('required', '')
    const optionLow = document.createElement('option');
    optionLow.setAttribute('value', 'low');
    optionLow.textContent = "Low";
    const optionMedium = document.createElement('option');
    optionMedium.setAttribute('value', 'medium');
    optionMedium.textContent = "Medium";;
    const optionHigh = document.createElement('option');
    optionHigh.textContent = "High"
    optionHigh.setAttribute('value', 'high');
    let currentPriority = task.priority;
    priority.addEventListener('change', () => {
        currentPriority = priority.value;
        console.log(currentPriority);
    })
    // 
    const notes = document.createElement('textarea');
    notes.setAttribute('placeholder', "Task Notes");
    notes.setAttribute('value', task.notes);
    // Create Modal Buttons using Destructuring
    const [ submitModal, closeModal ] = createModalButtons(modal);

    submitModal.addEventListener('click', (e) => {
        e.preventDefault()
        if (taskName.value) {
            task.taskName = taskName.value;
            task.description = description.value;
            task.priority = currentPriority;
            task.notes = notes.value;

            closeTasksView(goal);
            buildTasksView(goal, cardWrapper);
            modal.replaceChildren();
            modal.close();
        }})
    // Close Button
    
    const placeHolderElement = document.createElement('div')
    priority.append(optionLow, optionMedium, optionHigh);
    taskForm.append(taskName, description, priorityWrapper, closeModal, notes, placeHolderElement,  submitModal);
    modal.append(taskForm);
}
