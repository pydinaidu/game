const readline = require('readline');

// Create interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to get user input
function getInput(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
}

// Async function to get numbers and calculate sum
async function addNumbers() {
    try {
        // Get first number
        const num1 = parseFloat(await getInput('Enter first number: '));
        
        // Get second number
        const num2 = parseFloat(await getInput('Enter second number: '));
        
        // Check if inputs are valid numbers
        if (isNaN(num1) || isNaN(num2)) {
            console.log('Please enter valid numbers!');
        } else {
            // Calculate and display the sum
            const sum = num1 + num2;
            console.log(`The sum of ${num1} and ${num2} is: ${sum}`);
        }
    } catch (error) {
        console.log('An error occurred:', error.message);
    } finally {
        // Close the readline interface
        rl.close();
    }
}

// Run the program
addNumbers(); 