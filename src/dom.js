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
    console.table(currentGoals)
    let i = 0;
    for (let goal of currentGoals) {
        // Build Card
        const cardWrapper = document.createElement('div');
        cardWrapper.classList.add('.card-wrapper');
        cardWrapper.setAttribute('id', goal.id)
        // cardWrapper.setAttribute('id', goal.id);
        const goalCard = document.createElement('div');
        goalCard.classList.add("goal-card");
        // build two lines
        const [ topLine, bottomLine ] = createTopBottomLine()
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
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = "x";
        deleteButton.addEventListener('click', () => {
            goalManager.remove(goal.id);
            clearContent()
            buildGoalsView(goalManager);
        })
        // Priority level lighting
        goalCard.classList.add(`${goal.priority}`)
        // Fetch card contents
        const [ name, description, priority, notes ] = fetchObjectProperties(goal);
        // Properties unique to object
        const dueDate = document.createElement('p')
        dueDate.classList.add('due-date');
        dueDate.textContent = "Due: " + goal.dueDate;
        const creationDate = document.createElement('div');
        creationDate.classList.add('creation-date');
        creationDate.textContent = "Created: " + goal.creationDate;

        const goalEditButton = document.createElement('button');
        goalEditButton.textContent = "Edit Task"
        goalEditButton.addEventListener('click', () => {
            editGoal(goal, goalManager, cardWrapper);
        })
        // Add to DOM
        topLine.append(name, description, dueDate, deleteButton);
        bottomLine.append(notes, viewTasksButton, creationDate, goalEditButton)
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

function createObjectCard(obj, elementClassName) {
    const objectCard = document.createElement('div');
    objectCard.classList.add(elementClassName);
    objectCard.classList.add(`${obj.priority}`);
    return objectCard;
}

function fetchObjectProperties(obj, parentElement) {
        const name = document.createElement('h3');
        name.classList.add('objName'); //try to not use this class
        name.textContent = obj.name;

        const description = document.createElement('p');
        description.classList.add('goal-description');
        description.textContent = "Description: " + obj.description;

        const priority = document.createElement('div');
        priority.classList.add(`${obj.priority}`);

        const notes = document.createElement('div');
        notes.classList.add('notes');
        notes.textContent = "Notes: " + obj.notes;

        return [ name, description, priority, notes ];
}

function createTopBottomLine() {
    const topLine = document.createElement('div');
    topLine.classList.add('top-line');
    const bottomLine = document.createElement('div');
    bottomLine.classList.add('bottom-line');
    return [ topLine, bottomLine ];
}

function buildTasksView(goal, cardWrapper) {
    const currentTasks = goal.tasks;
    // Task Card
    const tasksList = document.createElement('div');
    tasksList.classList.add('tasks-list');
    // Fetch task contents
    for (let task of currentTasks) {
        // Create the card to store the data
        const objectCard = createObjectCard(task, 'task-card')
        // Fetch Object Properties destructuring
        const [ name, description, priority, notes ] = fetchObjectProperties(task, tasksList, 'task-card')
        // Build the two lines
        const [ topLine, bottomLine ] = createTopBottomLine();
        // Parameters unique to object
        const taskIsComplete = document.createElement('div')
        taskIsComplete.classList.add('complete-description')
        taskIsComplete.textContent = `Completion status: ${task.isComplete}`;
        // Toggle complete button
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
            closeTasksView(goal);
            buildTasksView(goal, cardWrapper);
        }
        )
        // Edit Button
        const taskEditButton = document.createElement('button');
        taskEditButton.textContent = "Edit Task"
        taskEditButton.addEventListener('click', () => {
            editTask(task, goal, cardWrapper);
        })

        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = "x";
        deleteButton.addEventListener('click', () => {
            goal.remove(task.id);
            closeTasksView(goal);
            buildTasksView(goal, cardWrapper);
        })
        // Update DOM
        topLine.append(name, description, deleteButton);
        bottomLine.append(notes, taskIsComplete, completeToggle, taskEditButton)
        objectCard.append(topLine, bottomLine)
        tasksList.append(objectCard);
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

function closeTasksView(goal) {
    const thisCardWrapper = document.getElementById(goal.id)
    if (thisCardWrapper.querySelector('.tasks-list')) {
        thisCardWrapper.querySelector('.tasks-list').remove();
    }
}

function createModalTitle(titleString) {
    const modalTitle = document.createElement('div');
    modalTitle.classList.add('modal-header');
    modalTitle.textContent = titleString;
    return modalTitle;
}

function createGoal(goalManager) {
    const modalTitle = createModalTitle("Create New Goal")
    const [ openModal, closedModal, modal ] = displayModal();
    modal.showModal();
    // form
    const goalForm = document.createElement('form');
    const goalName = document.createElement('input')
    goalName.setAttribute('type', 'text')
    goalName.setAttribute('placeholder', 'Goal Name *Required*')
    // goalName.setAttribute('required', 'required')
    const description = document.createElement('input');
    description.setAttribute('placeholder', 'Goal Description')
    // description.setAttribute('required', '');
    const dueDateWrapper = document.createElement('div');
    const dueDateLabel = document.createElement('label');
    dueDateLabel.textContent = "Due Date (Required)"
    dueDateLabel.setAttribute('for', 'dueDateCal');
    const dueDate = document.createElement('input');
    dueDate.setAttribute('type', 'date');
    dueDate.setAttribute('id', 'dueDateCal');
    dueDateWrapper.append(dueDateLabel, dueDate);
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
    notes.setAttribute('placeholder', 'Add Goal Notes')
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
    goalForm.append(modalTitle, goalName, description, dueDateWrapper, closeModal, priorityWrapper, notes, submitModal)
    modal.append(goalForm, )
}

function createTask(goal, cardWrapper) {
    const modalTitle = createModalTitle("Create Task")
    const [ openModal, closedModal, modal ] = displayModal();
    modal.showModal();
    // form
    const taskForm = document.createElement('form');
    const taskName = document.createElement('input')
    taskName.setAttribute('type', 'text')
    taskName.setAttribute('placeholder', 'Task Name')
    const description = document.createElement('input');
    description.setAttribute('placeholder', 'Task Description')
    const priority = document.createElement('select');
    priority.id = 'priority';
    console.log(priority.value)
    const priorityWrapper = document.createElement('div')
    priorityWrapper.classList.add('priority-wrapper')
    const priorityLabel = document.createElement('label')
    priorityLabel.textContent = "Priority Level:";
    priorityWrapper.append(priorityLabel, priority)
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
                goal.add(newTask);
                closeTasksView(goal);
                buildTasksView(goal, cardWrapper);
                modal.replaceChildren();
                modal.close();
            }
    })
    const placeHoldingElement = document.createElement('div')
    priority.append(optionLow, optionMedium, optionHigh);
    taskForm.append(modalTitle, taskName, description, priorityWrapper, closeModal, notes, placeHoldingElement, submitModal);
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
    closeModal.classList.add('delete-button');
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

function buildEditForm(obj, objectName) {
    const editEntryForm = document.createElement('form');
    const name = document.createElement('input');
    name.setAttribute('type', 'text');
    name.setAttribute('value', obj.name);
    const description = document.createElement('input');
    description.setAttribute('placeholder', `${objectName} Description`);
    description.setAttribute('value', obj.description);
    const priority = document.createElement('select');
    priority.id = 'priority';
    priority.setAttribute('defaultValue', obj.priority)
    priority.setAttribute('value', obj.priority);
    const priorityWrapper = document.createElement('div')
    priorityWrapper.classList.add('priority-wrapper')
    const priorityLabel = document.createElement('label')
    priorityLabel.textContent = "Priority Level:";
    priorityWrapper.append(priorityLabel, priority)
    const optionLow = document.createElement('option');
    optionLow.setAttribute('value', 'low');
    optionLow.textContent = "Low";
    const optionMedium = document.createElement('option');
    optionMedium.setAttribute('value', 'medium');
    optionMedium.textContent = "Medium";;
    const optionHigh = document.createElement('option');
    optionHigh.textContent = "High"
    optionHigh.setAttribute('value', 'high');
    // 
    const notes = document.createElement('textarea');
    notes.setAttribute('placeholder', `${objectName} Notes`);
    notes.setAttribute('value', obj.notes);

    return [ editEntryForm, name, description, priority, priorityWrapper, optionLow, optionMedium, optionHigh, notes ]
}
// 
// 
// FOCUS ON THIS!!!
function editGoal(goal, goalManager) {
    const modalTitle = createModalTitle("Edit Goal");
    const [ openModal, closedModal, modal ] = displayModal();
    modal.showModal();

    const [ editEntryForm, name, description, priority, priorityWrapper, optionLow, optionMedium, optionHigh, notes ] = buildEditForm(goal, "Goal");
    // Priority change is a little screwy
    let currentPriority = goal.priority;
    priority.addEventListener('change', () => {
        currentPriority = priority.value;
        console.log(currentPriority);
    })
    const dueDate = document.createElement('input');
    dueDate.setAttribute('type', 'date')
    dueDate.setAttribute('value', goal.dueDate)
    const [ submitModal, closeModal ] = createModalButtons(modal);
    submitModal.addEventListener('click', (e) => {
        e.preventDefault()
        if (name.value) {
            goal.editGoal(name.value, dueDate.value, description.value, currentPriority, notes.value)
            // goal.name = name.value;
            // goal.description = description.value;
            // goal.priority = currentPriority;
            // goal.notes = notes.value;
            clearContent()
            buildGoalsView(goalManager)
            modal.replaceChildren();
            modal.close();
        }
    })
    priority.append(optionLow, optionMedium, optionHigh);
    editEntryForm.append(modalTitle, name, description, dueDate, priorityWrapper, closeModal, notes,  submitModal);
    modal.append(editEntryForm);
}
// 
// 
// 
function editTask(task, goal, cardWrapper) {
    const modalTitle = createModalTitle("Edit Task");
    const [ openModal, closedModal, modal ] = displayModal();
    modal.showModal();

    const [ editEntryForm, name, description, priority, priorityWrapper, optionLow, optionMedium, optionHigh, notes ] = buildEditForm(task, "Task")
    // Priority change is a little screwy
    let currentPriority = task.priority;
    priority.addEventListener('change', () => {
        currentPriority = priority.value;
        console.log(currentPriority);
    })
    const [ submitModal, closeModal ] = createModalButtons(modal);
    submitModal.addEventListener('click', (e) => {
        e.preventDefault()
        if (name.value) {
            task.editTask(name.value, description.value, currentPriority, notes.value)
            closeTasksView(goal);
            buildTasksView(goal, cardWrapper);
            modal.replaceChildren();
            modal.close();
        }})
    const placeHolderElement = document.createElement('div')
    priority.append(optionLow, optionMedium, optionHigh);
    editEntryForm.append(modalTitle, name, description, priorityWrapper, closeModal, notes, placeHolderElement,  submitModal);
    modal.append(editEntryForm);
}