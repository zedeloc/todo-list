import "./styles.css";
import { Goal, Task } from "./goal.js";


const task = new Task ("clean", "wash stuff", "high", "I just ate a huge sandwich")

const task2 = new Task ("clean", "wash stuff", "high", "I just ate a huge sandwich")

const task3 = new Task ("clean", "wash stuff", "high", "I just ate a huge sandwich")

const goal1 = new Goal("Clean Entire House", "just clean that house", "tomorrow", "medium", "ah jezus i don't wanna do it")

goal1.addTask(task);
goal1.addTask(task2);
goal1.addTask(task3);

console.table(goal1);
console.table(goal1.tasks)
console.table(goal1.tasks[0])

goal1.tasks[0].isComplete = true;
goal1.tasks[0].notes = "Actually I lied...";
console.table(goal1.tasks[0])