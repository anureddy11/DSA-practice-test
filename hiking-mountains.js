function findPeak(matrix) {
    let highest = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let k = 0; k < matrix[0].length; k++) {
            if (matrix[i][k] > highest) {
                highest = matrix[i][k];
            }
        }
    }

    return highest;
}

function findStarts(matrix) {
    let starts = [];

    // Top Row
    for (let i = 0; i < matrix[0].length; i++) {
        if (matrix[0][i] == 0) {
            starts.push([0, i])
        }
    }

    // Bottom Row
    for (let i = 0; i < matrix[matrix.length-1].length; i++) {
        if (matrix[matrix.length-1][i] == 0) {
            starts.push([matrix.length-1, i])
        }
    }

    // Left except first and last
    for (let i = 1; i < matrix.length-1; i++) {
        if (matrix[i][0] == 0) {
            starts.push([i, 0])
        }
    }

    // Right except first and last
    for (let i = 1; i < matrix.length - 1; i++) {
        if (matrix[i][matrix[0].length - 1] == 0) {
            starts.push([i, matrix[0].length-1])
        }
    }

    return starts;
}

function findNeighbors(node, matrix) {
    let neighbors = [];
    let xCod = node[0];
    let yCod = node[1];
    let rows = matrix.length;
    let cols = matrix[0].length;


    const isValidCoord = (x, y) => x >= 0 && x < rows && y >= 0 && y < cols;


    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;

            const newX = xCod + i;
            const newY = yCod + j;

            if (isValidCoord(newX, newY) && Math.abs(matrix[newX][newY] - matrix[xCod][yCod]) <= 1) {
                neighbors.push([newX, newY]);
            }
        }
    }

    return neighbors;
}

function pathTraversal(node, matrix, visited, peak) {
    // Your code here
    let queue = [node];
    visited.add(node.toString());

    while (queue.length > 0) {
        let currNode = queue.shift();
        if (matrix[currNode[0]][currNode[1]] === peak) {
            return true;
        }

        let neighbors = findNeighbors(currNode, matrix); // Use current node
        neighbors.forEach((neighbor) => {
            let neighborKey = neighbor.toString();
            if (!visited.has(neighborKey)) {
                queue.push(neighbor);
                visited.add(neighborKey);
            }
        });
    }
    return false;
}

function identifyPath(mountain) {
    // Find the peak
    // Find the start

    // Traverse from the starts and try to get to the top
    // Your code here
    let peak = findPeak(mountain)
    let starts = findStarts(mountain)
    let visited = new Set()
    let output
    starts.forEach(start =>{
        if(pathTraversal(start,mountain,visited,peak)){
            output=start
        }

    })
    return output
}

// Uncomment for local testing

// // Example 0
// const mountain_0 = [
//     [1, 2, 4],
//     [4, 5, 9],
//     [5, 7, 6]
// ];

// console.log(findNeighbors([2,0], mountain_0)) // <- Expect '[ [ 1, 0 ], [ 1, 1 ] ]'

// // Example 1
// const mountain_1 = [
//         [1, 0, 1, 1],
//         [2, 3, 2, 1],
//         [0, 2, 4, 1],
//         [3, 2, 3, 1]
// ];

// test_visited = new Set()
// console.log(pathTraversal([0, 1], mountain_1, test_visited, 4)) // <- Expect 'true
// console.log(identifyPath(mountain_1)) // <- Expect '[ 0, 1 ]'

// // Example 2
// const mountain_2 = [
//         [0, 2, 1, 1],
//         [2, 2, 3, 1],
//         [1, 1, 1, 1],
//         [1, 0, 1, 1]
// ];

// console.log(identifyPath(mountain_2)) // <- Expect '[ 3, 1 ]'

// // Example 3
// const mountain_3 = [
//         [0, 1, 2, 0],
//         [5, 1, 3, 2],
//         [4, 1, 2, 1],
//         [3, 4, 3, 1]
// ];

// console.log(identifyPath(mountain_3)) // <- Expect '[ 0, 0 ]'



/*************DO NOT MODIFY UNDER THIS LINE ***************/

module.exports = [identifyPath, findNeighbors, pathTraversal];
