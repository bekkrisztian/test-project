import React from 'react';
import './App.css';

function App() {

    const task1 = (): number => {
        /** 1. If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9.
         *  The sum of these multiples is 23. 
         * Find the sum of all the multiples of 3 or 5 below 1000. 
         * */

        let total = 0;
        let i = 0;

        // look for numbers under 1000
        while (i < 1000) {
            // test the number to see if it is divisible by 5 or 3 and return an integer
            if (i % 3 === 0 || i % 5 === 0) {
                // add the result to the total
                total += i;
            }
            // index is increased continuously
            ++i;
        }

        // the output will be 233168
        return total;
    }

    console.log(task1());

    const isPrimeNumber = (value: number): boolean => {
        if (value === 1) return false;
        for (let i = 2; i <= Math.sqrt(value); i++) {
            if (value % i === 0) return false;
        }
        return true;
    }

    const task2 = (): number => {
        /** The prime factors of 13195 are 5, 7, 13 and 29.
         *  What is the largest prime factor of the number 600851475143 ? 
         * */

        let num = 600851475143;
        let primeFactor = 2;

        while (num > 1) {
            while (num % primeFactor === 0) {
                num = num / primeFactor;
            }
            if (num === 1) break;
            do {
                ++primeFactor;
            } while (!isPrimeNumber(primeFactor))
        }

        return primeFactor;
    }

    // Output: 6857
    console.log(task2());

    const task3 = (primeIndex: number): number => {
        /** 3. By listing the prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.
         *  What is the 10 001st prime number? 
         * */

        // start the counter from 1
        let counter = 1;
        // start from the 1st prime number
        let num = 2;

        // increment counter until it is equal to the prime index number
        while (counter <= primeIndex) {
            // if prime, increment the counter
            if (isPrimeNumber(num)) {
                ++counter;
            }
            // the number is constantly increasing
            ++num;
        }

        // when the counter equals primeIndex exits the loop
        // we get the number of the index
        // we subtract one from it or in the while loop we need to look again (counter > primeIndex ? return num : (++num))
        
        return num - 1;
    }

    // Output: 104743
    console.log(task3(10001));

    return (
        <div className="App">
          
        </div>
    );
}

export default App;
