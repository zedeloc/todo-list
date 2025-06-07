export class GoalManager {
    constructor() {
        this.goals = [];
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

}