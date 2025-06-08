import { Goal } from './goal.js'
export class GoalManager {
    constructor() {
        this.goals = [];
        this.simplifiedGoals = []
        this.storage = JSON.parse(localStorage.getItem('goals'));
    }

    findGoalByID(goalID) {
        return this.goals.findIndex((goal) => goal.id === goalID
        )
    }

    addGoal(goal) {
        this.goals.push(goal);
    }

    remove(goalID) {
        this.goals.splice(this.findGoalByID(goalID), 1);
    }

    getGoal(goalID) {
        const simpleGoal = this.goals[this.findGoalByID(goalID)];
        return new Goal(simpleGoal.name, simpleGoal.dueDate, simpleGoal.description, simpleGoal.priority, simpleGoal.notes, simpleGoal.creationDate, simpleGoal.id);
    }

    parseStoredGoals() {
        for (let goal of this.storage) {
            const rehydratedGoal = new Goal(goal.name, goal.dueDate, goal.description, goal.priority, goal.notes, goal.creationDate, goal.id, goal. tasks)
            this.addGoal(rehydratedGoal);
        }
    }
    prepGoalsForStorage() {
        const goalsForStorage = []
        for (let goal of this.goals) {
            goalsForStorage.push(goal.simple())
        }
        this.simplifiedGoals = goalsForStorage;
    }

    saveAndUpdate() {
        this.simplifiedGoals = [];
        this.prepGoalsForStorage();
        localStorage.setItem('goals', JSON.stringify(this.simplifiedGoals))
        this.storage = JSON.parse(localStorage.getItem('goals'));
        this.simplifiedGoals = [];
        this.goals = [];
        this.parseStoredGoals();
    }
}   