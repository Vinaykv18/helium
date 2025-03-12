import * as readline from 'readline';
import MoviesManagement from './moviesman';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const movieManager = new MoviesManagement();

function mainMenu(): void {
    console.log("\nMovie Management System");
    console.log("1. Add Movie");
    console.log("2. Rate Movie");
    console.log("3. Get Movie Rating");
    console.log("4. Get Top Rated Movies");
    console.log("5. Get Movies by Genre");
    console.log("6. Get Movies by Director");
    console.log("7. Search Movies");
    console.log("8. Get Movie Details");
    console.log("9. Remove Movie");
    console.log("10. Exit");

    rl.question("Choose an option: ", (option: string) => {
        switch (option) {
            case "1":
                rl.question("Enter Title: ", (title: string) => {
                    rl.question("Enter Director: ", (director: string) => {
                        rl.question("Enter Release Year: ", (releaseYear: string) => {
                            rl.question("Enter Genre: ", (genre: string) => {
                                try {
                                    movieManager.addMovie(title, director, parseInt(releaseYear), genre);
                                } catch (error) {
                                    if (error instanceof Error) {
                                        console.error("Error adding movie:", error.message);
                                    } else {
                                        console.error("Unknown error:", error);
                                    }
                                }
                                mainMenu();
                            });
                        });
                    });
                });
                break;
            case "2":
                rl.question("Enter Movie ID: ", (id: string) => {
                    rl.question("Enter Rating (1-5): ", (rating: string) => {
                        try {
                            movieManager.rateMovie(id, parseInt(rating));
                        } catch (error) {
                            if (error instanceof Error) {
                                console.error("Error:", error.message);
                            } else {
                                console.error("Unknown error:", error);
                            }
                        }
                        mainMenu();
                    });
                });
                break;
            case "3":
                rl.question("Enter Movie ID: ", (id: string) => {
                    const avgRating = movieManager.getAverageRating(id);
                    console.log(avgRating !== undefined ? `Average Rating: ${avgRating.toFixed(2)}` : "No ratings available.");
                    mainMenu();
                });
                break;
            case "4":
                console.log("\nTop Rated Movies:");
                console.table(movieManager.getTopRatedMovies());
                mainMenu();
                break;
            case "5":
                rl.question("Enter Genre: ", (genre: string) => {
                    console.log("\nMovies in Genre:");
                    console.table(movieManager.getMoviesByGenre(genre));
                    mainMenu();
                });
                break;
            case "6":
                rl.question("Enter Director: ", (director: string) => {
                    console.log("\nMovies by Director:");
                    console.table(movieManager.getMoviesByDirector(director));
                    mainMenu();
                });
                break;
            case "7":
                rl.question("Enter Keyword: ", (keyword: string) => {
                    console.log("\nSearch Results:");
                    console.table(movieManager.searchMoviesBasedOnKeyword(keyword));
                    mainMenu();
                });
                break;
            case "8":
                rl.question("Enter Movie ID: ", (id) => {
                    const movie = movieManager.getMovie(id);
                    movie ? console.table([movie]) : console.log("Movie not found.");
                    mainMenu();
                });
                break;
            case "9":
                rl.question("Enter Movie ID: ", (id) => {
                    try {
                        movieManager.removeMovie(id);
                    } catch (error: unknown) {
                        if (error instanceof Error) {
                            console.error("Error:", error.message);
                        } else {
                            console.error("Unknown error occurred while removing the movie.");
                        }
                    }
                    mainMenu();
                });
                break;
            case "10":
                console.log("Exiting...");
                rl.close();
                break;
            default:
                console.log("Invalid option. Try again.");
                mainMenu();
                break;
        }
    });
}

mainMenu();
