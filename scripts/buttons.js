console.clear();

graph = {
    S: { A: 2, C: 4 },
    A: { B: 8, C: 15, D: 5, S: 2 },
    B: { A: 8, C: 2, D: 8, T: 8 },
    C: { A: 15, B: 2, D: 2, S: 4 },
    D: { A: 5, B: 8, C: 2, T: 11 },
    T: { B: 8, D: 11 },
};

async function DFS(graph, start, end) {
    var queue = [],
        seen = {};
    queue.push([start]);
    seen[start] = true;
    while (queue.length > 0) {
        var path = queue.pop();
        var node = path[path.length - 1];
        await visit_path(node);
        await add_path_letters(node);
        if (node == end) {
            return path;
        }
        for (var i in graph[node]) {
            if (!seen[i]) {
                await set_available_path(graph[node]);
                seen[i] = true;
                var newPath = path.slice();
                newPath.push(i);
                queue.push(newPath);
            }
        }
        remove_available_path();
    }
}

async function BFS(graph, start, end) {
    let queue = [];
    let seen = {};
    let path = [];
    queue.push(start);
    seen[start] = true;
    while (queue.length > 0) {
        let currNode = queue.shift();
        path.push(currNode);
        await visit_path(currNode);
        await add_path_letters(currNode);
        if (currNode === end) {
            return path;
        }
        for (let neighborNode in graph[currNode]) {
            if (!seen[neighborNode]) {
                await set_available_path(graph[currNode]);
                seen[neighborNode] = true;
                queue.push(neighborNode);
            }
        }
        remove_available_path();
    }
    return path;
}


/* Button On Click Functions */
function start_bfs() {
    reset_path();
    document.getElementById('btn-bfs').classList.add('btn-active');
    console.log(`Starting BFS...`);
    BFS(graph, 'S', 'T');
}

function start_dfs() {
    reset_path();
    document.getElementById('btn-dfs').classList.add('btn-active');
    console.log(`Starting DFS...`);
    DFS(graph, 'S', 'T');
}

async function trace_short_path() {
    reset_path();
    document.getElementById('btn-trace').classList.add('btn-active');

    short_path = ['S', 'C', 'B', 'T'];

    for (let i = 0; i < short_path.length; i++) {
        await visit_path(short_path[i]);
        await add_path_letters(short_path[i]);
    }
}