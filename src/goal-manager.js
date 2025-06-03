export class GoalManager {
    constructor() {
        this.goals = [];
    }

    findGoalByID(goalID) {
        return this.goals.findIndex((goal) => {
            goal.id === taskID;
        })
    }

    addGoal(goal) {
        this.goals.push(goal);
    }

    removeGoal(goalID) {
        this.goals.splice(this.findGoalByID(goalID), 1);
    }

}