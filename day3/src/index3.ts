import * as readlineSync from 'readline-sync';

// Define types
type Workout = {
    type: string;
    duration: number; // in minutes
    caloriesBurned: number;
    date: Date;
};

type User = {
    id: string;
    name: string;
    age: number;
    weight: number;
    height: number;
    workouts: Workout[];
};

class FitnessTracker {
    private users: Map<string, User>;

    constructor() {
        this.users = new Map();
    }

    // Add User
    addUser(id: string, name: string, age: number, weight: number, height: number): void {
        if (this.users.has(id)) {
            throw new Error(`User with ID ${id} already exists.`);
        }
        if (age <= 0 || weight <= 0 || height <= 0) {
            throw new Error("Age, weight, and height must be positive values.");
        }
        this.users.set(id, { id, name, age, weight, height, workouts: [] });
    }

    // Log a workout for a user
    logWorkout(userId: string, workout: Workout): void {
        const user = this.users.get(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found.`);
        }
        if (workout.duration <= 0 || workout.caloriesBurned < 0) {
            throw new Error("Workout duration must be positive and calories burned cannot be negative.");
        }
        user.workouts.push(workout);
    }

    // Get all workouts of a user
    getAllWorkoutsOf(userId: string): Workout[] {
        const user = this.users.get(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found.`);
        }
        return user.workouts;
    }

    // Get all workouts of a specific type for a user
    getAllWorkoutsByType(userId: string, type: string): Workout[] {
        const user = this.users.get(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found.`);
        }
        return user.workouts.filter(workout => workout.type.toLowerCase() === type.toLowerCase());
    }

    // Get all users
    getUsers(): User[] {
        return Array.from(this.users.values());
    }

    // Get a specific user by ID
    getUser(id: string): User | undefined {
        return this.users.get(id);
    }

    // Update a user's details
    updateUser(id: string, updatedFields: Partial<Omit<User, 'id'>>): void {
        const user = this.users.get(id);
        if (!user) {
            throw new Error(`User with ID ${id} not found.`);
        }
        Object.assign(user, updatedFields);
    }
}

// Interactive CLI
const tracker = new FitnessTracker();

while (true) {
    console.log("\nFitness Tracker");
    console.log("1. Add User");
    console.log("2. Log Workout");
    console.log("3. Get All Workouts");
    console.log("4. Get Workouts By Type");
    console.log("5. Get Users");
    console.log("6. Get User Details");
    console.log("7. Update User");
    console.log("8. Exit");

    const choice = readlineSync.question("Enter your choice: ");
    switch (choice) {
        case "1": {
            const id = readlineSync.question("Enter User ID: ");
            const name = readlineSync.question("Enter Name: ");
            const age = parseInt(readlineSync.question("Enter Age: "));
            const weight = parseFloat(readlineSync.question("Enter Weight: "));
            const height = parseFloat(readlineSync.question("Enter Height: "));
            try {
                tracker.addUser(id, name, age, weight, height);
                console.log("User added successfully!");
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("Error:", error.message);
                } else {
                    console.error("Unknown error:", error);
                }
            }
            break;
        }
        case "2": {
            const userId = readlineSync.question("Enter User ID: ");
            const type = readlineSync.question("Enter Workout Type: ");
            const duration = parseInt(readlineSync.question("Enter Duration (minutes): "));
            const caloriesBurned = parseInt(readlineSync.question("Enter Calories Burned: "));
            try {
                tracker.logWorkout(userId, { type, duration, caloriesBurned, date: new Date() });
                console.log("Workout logged successfully!");
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("Error:", error.message);
                } else {
                    console.error("Unknown error:", error);
                }
            }
            break;
        }
        case "3": {
            const userId = readlineSync.question("Enter User ID: ");
            try {
                console.table(tracker.getAllWorkoutsOf(userId));
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("Error:", error.message);
                } else {
                    console.error("Unknown error:", error);
                }
            }
            break;
        }
        case "4": {
            const userId = readlineSync.question("Enter User ID: ");
            const type = readlineSync.question("Enter Workout Type: ");
            try {
                console.table(tracker.getAllWorkoutsByType(userId, type));
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("Error:", error.message);
                } else {
                    console.error("Unknown error:", error);
                }
            }
            break;
        }
        case "5": {
            try {
                console.table(tracker.getUsers());
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("Error:", error.message);
                } else {
                    console.error("Unknown error:", error);
                }
            }
            break;
        }
        case "6": {
            const id = readlineSync.question("Enter User ID: ");
            try {
                const user = tracker.getUser(id);
                if (user) {
                    console.table([user]);
                } else {
                    console.log("User not found.");
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("Error:", error.message);
                } else {
                    console.error("Unknown error:", error);
                }
            }
            break;
        }
        case "7": {
            const id = readlineSync.question("Enter User ID: ");
            const name = readlineSync.question("Enter New Name (leave blank to skip): ");
            const age = readlineSync.question("Enter New Age (leave blank to skip): ");
            const weight = readlineSync.question("Enter New Weight (leave blank to skip): ");
            const height = readlineSync.question("Enter New Height (leave blank to skip): ");

            const updatedFields: Partial<Omit<User, 'id'>> = {};
            if (name) updatedFields.name = name;
            if (age) updatedFields.age = parseInt(age);
            if (weight) updatedFields.weight = parseFloat(weight);
            if (height) updatedFields.height = parseFloat(height);

            try {
                tracker.updateUser(id, updatedFields);
                console.log("User updated successfully!");
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("Error:", error.message);
                } else {
                    console.error("Unknown error:", error);
                }
            }
            break;
        }
        case "8": {
            console.log("Exiting...");
            process.exit(0);
        }
        default:
            console.log("Invalid choice. Please try again.");
    }
}
