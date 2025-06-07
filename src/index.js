import "./styles.css";
import { Goal, Task } from "./goal.js";
import { makeHeader, buildGoalsView } from "./dom.js";
import { GoalManager } from "./goal-manager.js";


makeHeader()

const goalManager = new GoalManager();
// TEST - High priority goal
const goal1 = new Goal("Clean Dishes", "2025-06-07", "Clean all the dishes in the house.", "high");
goalManager.addGoal(goal1);

const task1 = new Task("Collect all the dishes in my room", "high");
const task2 = new Task("Fill sink with soapy water", "high");
const task3 = new Task("Scrub them dishies", "high");
const task4 = new Task("Put dishies on dishy rack to dry", "high");
const task5 = new Task("Put them dishies away", "high");

goalManager.goals[0].add(task1);
goalManager.goals[0].add(task2);
goalManager.goals[0].add(task3);
goalManager.goals[0].add(task4);
goalManager.goals[0].add(task5);
// TEST - Medium priority goal
const goal2 = new Goal("Have fun", "2025-06-07", "Just do somethin you like", "medium");
goalManager.addGoal(goal2);

const task1b = new Task("Play Vidya");
const task2b = new Task("Jump around", "high");
const task3b = new Task("Eat pizza", "high");
const task4b = new Task("Dig in the dirt", "high");
const task5b = new Task("Sleep in the back yard", "high");

goalManager.goals[1].add(task1b);
goalManager.goals[1].add(task2b);
goalManager.goals[1].add(task3b);
goalManager.goals[1].add(task4b);
goalManager.goals[1].add(task5b);
// TEST - Low priority goal
const goal3 = new Goal("Clean Dishes", "2025-06-07", "Clean all the dishes in the house.", "low");
goalManager.addGoal(goal3);

const task1c = new Task("Collect all the dishes in my room", "high");
const task2c = new Task("Fill sink with soapy water", "high");
const task3c = new Task("Scrub them dishies", "high");
const task4c = new Task("Put dishies on dishy rack to dry", "high");
const task5c = new Task("Put them dishies away", "high");

goalManager.goals[2].add(task1c);
goalManager.goals[2].add(task2c);
goalManager.goals[2].add(task3c);
goalManager.goals[2].add(task4c);
goalManager.goals[2].add(task5c);


buildGoalsView(goalManager);

