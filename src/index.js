import "./styles.css";
import { Goal, Task } from "./goal.js";
import { makeHeader, buildGoalsView } from "./dom.js";
import { GoalManager } from "./goal-manager.js";
import { defaultData } from "./storage.js";

// localStorage.clear() // to reset initial values

makeHeader()
if(!localStorage.getItem('goals')) {
  localStorage.setItem('goals', JSON.stringify(defaultData));
} 

console.table(JSON.parse(localStorage.getItem('goals')))
const goalManager = new GoalManager();
goalManager.parseStoredGoals()




buildGoalsView(goalManager);

