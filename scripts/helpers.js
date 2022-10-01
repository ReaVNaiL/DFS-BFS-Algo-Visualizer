// Algorithm Helpers

// Function to measure the time taken by an algorithm in 10 times
function measureTime(func, ...args) {
    let total = 0;
    for (let i = 0; i < 10; i++) {
        const start = performance.now();
        let val = func(...args);

        if (i == 9) console.log(val);
        
        const end = performance.now();
        total += end - start;
    }

    return total / 10;
}

// Convert to milliseconds
function convertToMilliseconds(time) {
    return time.toFixed(2);
}

// Call the function to measure the time taken by an algorithm
const dfsTime = convertToMilliseconds(measureTime(DFS, graph, "S", "T", true));
console.log(`Time taken by DFS: ${dfsTime} ms`);

const bfsTime = convertToMilliseconds(measureTime(BFS, graph, "S", "T", true));
console.log(`Time taken by BFS: ${bfsTime} ms`);
