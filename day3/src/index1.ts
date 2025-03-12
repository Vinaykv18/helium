import * as readline from "readline";
import { UserManager, WorkoutManager, User, Workout } from "./fitness";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const userManager = new UserManager();
const workoutManager = new WorkoutManager();

function promptUser() {
    console.log("\n Fitness Tracker Menu");
    console.log("1. Add User");
    console.log("2. Log Workout");
    console.log("3. View All Workouts of User");
    console.log("4. View Workouts by Type");
    console.log("5. Get All Users");
    console.log("6. Get User Details");
    console.log("7. Update User Details");
    console.log("8. Exit");

    rl.question("\nChoose an option: ", handleUserChoice);
}

function handleUserChoice(choice: string) {
    switch (choice) {
        case "1":
            addUserPrompt();
            break;
        case "2":
            logWorkoutPrompt();
            break;
        case "3":
            getAllWorkoutsPrompt();
            break;
        case "4":
            getWorkoutsByTypePrompt();
            break;
        case "5":
            console.log("Users:", userManager.getUsers());
            promptUser();
            break;
        case "6":
            getUserPrompt();
            break;
        case "7":
            updateUserPrompt();
            break;
        case "8":
            console.log("Exiting...");
            rl.close();
            break;
        default:
            console.log("Invalid choice. Try again.");
            promptUser();
    }
}

function addUserPrompt() {
    rl.question("Enter User ID: ", (id) => {
        rl.question("Enter Name: ", (name) => {
            rl.question("Enter Age: ", (age) => {
                rl.question("Enter Weight (kg): ", (weight) => {
                    rl.question("Enter Height (cm): ", (height) => {
                        try {
                            userManager.addUser({
                                id,
                                name,
                                age: parseInt(age),
                                weight: parseFloat(weight),
                                height: parseFloat(height),
                            });
                            console.log(" User added successfully.");
                        } catch (error) {
                            if (error instanceof Error) console.error(error.message);
                        }
                        promptUser();
                    });
                });
            });
        });
    });
}

function logWorkoutPrompt() {
    rl.question("Enter User ID: ", (userId) => {
        rl.question("Enter Workout Type (e.g., Running, Yoga): ", (type) => {
            rl.question("Enter Duration (minutes): ", (duration) => {
                rl.question("Enter Calories Burned: ", (calories) => {
                    try {
                        workoutManager.logWorkout(userId, {
                            type,
                            duration: parseInt(duration),
                            caloriesBurned: parseInt(calories),
                            date: new Date().toISOString(),
                        });
                        console.log("Workout logged successfully.");
                    } catch (error) {
                        if (error instanceof Error) console.error(error.message);
                    }
                    promptUser();
                });
            });
        });
    });
}

function getAllWorkoutsPrompt() {
    rl.question("Enter User ID: ", (userId) => {
        try {
            console.log(" Workouts:", workoutManager.getAllWorkoutsOf(userId));
        } catch (error) {
            if (error instanceof Error) console.error(error.message);
        }
        promptUser();
    });
}

function getWorkoutsByTypePrompt() {
    rl.question("Enter User ID: ", (userId) => {
        rl.question("Enter Workout Type: ", (type) => {
            try {
                console.log(" Workouts of Type:", workoutManager.getAllWorkoutsByType(userId, type));
            } catch (error) {
                if (error instanceof Error) console.error(error.message);
            }
            promptUser();
        });
    });
}

function getUserPrompt() {
    rl.question("Enter User ID: ", (id) => {
        try {
            console.log(" User Details:", userManager.getUser(id));
        } catch (error) {
            if (error instanceof Error) console.error(error.message);
        }
        promptUser();
    });
}

function updateUserPrompt() {
    rl.question("Enter User ID: ", (id) => {
        rl.question("Enter New Age (or press Enter to skip): ", (age) => {
            rl.question("Enter New Weight (or press Enter to skip): ", (weight) => {
                rl.question("Enter New Height (or press Enter to skip): ", (height) => {
                    try {
                        const updatedFields: Partial<Omit<User, "id">> = {};
                        if (age) updatedFields.age = parseInt(age);
                        if (weight) updatedFields.weight = parseFloat(weight);
                        if (height) updatedFields.height = parseFloat(height);

                        userManager.updateUser(id, updatedFields);
                        console.log(" User updated successfully.");
                    } catch (error) {
                        if (error instanceof Error) console.error(error.message);
                    }
                    promptUser();
                });
            });
        });
    });
}

promptUser();