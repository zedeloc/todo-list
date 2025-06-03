import "./styles.css";
import { Goal, Task } from "./goal.js";
import { makeHeader, buildGoalsView } from "./dom.js";
import { GoalManager } from "./goal-manager.js";


makeHeader()

const goalManager = new GoalManager();

const goal1 = new Goal("Clean Dishes", "Clean all the dishes in the house.", "tonight", "high");

goalManager.addGoal(goal1);

console.table(goalManager.goals);

const task1 = new Task("Collect all the dishes in my room", "high");

const task2 = new Task("Fill sink with soapy water", "high");

const task3 = new Task("Scrub them dishies", "high");

const task4 = new Task("Put dishies on dishy rack to dry", "high");

const task5 = new Task("Put them dishies away", "high");

goalManager.goals[0].addTask(task1);
goalManager.goals[0].addTask(task2);
goalManager.goals[0].addTask(task3);
goalManager.goals[0].addTask(task4);
goalManager.goals[0].addTask(task5);

console.table(goalManager.goals[0].tasks);

const idToRemove = goalManager.goals[0].tasks[0].id


console.table(goalManager.goals[0].tasks);

buildGoalsView(goalManager)

