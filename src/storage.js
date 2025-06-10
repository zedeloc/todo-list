import { Goal, Task } from "./goal.js";

const defaultData = [];

const goal1 = new Goal("Clean Dishes", "2025-06-07", "Clean all the dishes in the house.", "low");

const task1 = new Task("Collect all the dishes in my room", "medium");
const task2 = new Task("Fill sink with soapy water", "high");
const task3 = new Task("Scrub them dishies", "high");
const task4 = new Task("Put dishies on dishy rack to dry", "high");
const task5 = new Task("Put them dishies away", "low");

goal1.add(task1);
goal1.add(task2);
goal1.add(task3);
goal1.add(task4);
goal1.add(task5);

// TEST - Medium priority goal
const goal2 = new Goal("Have fun", "2025-06-07", "Just do somethin you like", "medium");

const task1b = new Task("Play Vidya", 'low');
const task2b = new Task("Jump around", "medium");
const task3b = new Task("Eat pizza", "high");
const task4b = new Task("Dig in the dirt", "high");
const task5b = new Task("Sleep in the back yard", "high");

goal2.add(task1b);
goal2.add(task2b);
goal2.add(task3b);
goal2.add(task4b);
goal2.add(task5b);

// TEST - Low priority goal
const goal3 = new Goal("Clean Clothes", "2025-06-07", "Clean all the dishes in the house.", "high");

const task1c = new Task("Collect all the clothes in my room", "high");
const task2c = new Task("Fill washer", "high");
const task3c = new Task("Take washed clothes to dryer", "medium");
const task4c = new Task("Fold closes", "low");
const task5c = new Task("Put clothes away", "low");

goal3.add(task1c);
goal3.add(task2c);
goal3.add(task3c);
goal3.add(task4c);
goal3.add(task5c);

defaultData.push(goal1.simple(), goal2.simple(), goal3.simple())

export { defaultData };