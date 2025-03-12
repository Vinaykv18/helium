export type User = {
    id: string;
    name: string;
    age: number;
    weight: number;
    height: number;
};

export type Workout = {
    type: string;
    duration: number; // in minutes
    caloriesBurned: number;
    date: string;
};

export class UserManager {
    private users: Map<string, User> = new Map();

    addUser(user: User): void {
        if (this.users.has(user.id)) {
            throw new Error(`User with ID ${user.id} already exists.`);
        }
        this.users.set(user.id, user);
    }

    getUsers(): User[] {
        return Array.from(this.users.values());
    }

    getUser(id: string): User {
        const user = this.users.get(id);
        if (!user) {
            throw new Error(`User with ID ${id} not found.`);
        }
        return user;
    }

    updateUser(id: string, updatedFields: Partial<Omit<User, "id">>): void {
        const user = this.getUser(id);
        this.users.set(id, { ...user, ...updatedFields });
    }
}

export class WorkoutManager {
    private workouts: Map<string, Workout[]> = new Map();

    logWorkout(userId: string, workout: Workout): void {
        if (!workout.type || workout.duration <= 0 || workout.caloriesBurned <= 0) {
            throw new Error(`Invalid workout details.`);
        }

        if (!this.workouts.has(userId)) {
            this.workouts.set(userId, []);
        }
        this.workouts.get(userId)!.push(workout);
    }

    getAllWorkoutsOf(userId: string): Workout[] {
        if (!this.workouts.has(userId)) {
            throw new Error(`No workouts found for user ID ${userId}.`);
        }
        return this.workouts.get(userId)!;
    }

    getAllWorkoutsByType(userId: string, type: string): Workout[] {
        return this.getAllWorkoutsOf(userId).filter(workout => workout.type.toLowerCase() === type.toLowerCase());
    }
}