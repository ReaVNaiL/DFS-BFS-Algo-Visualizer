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
        if (node == end) {
            return path;
        }
        for (var i in graph[node]) {
            if (!seen[i]) {
                seen[i] = true;
                var newPath = path.slice();
                newPath.push(i);
                queue.push(newPath);
            }
        }
    }
}

async function BFS(graph, start, end) {
    let queue = [];
    let seen = {};
    let path = [];
    queue.push(start);
    seen[start] = true;
    while (queue.length > 0) {
        let currentNode = queue.shift();
        path.push(currentNode);
        await visit_path(currentNode);
        if (currentNode === end) {
            return path;
        }
        for (let neighborNode in graph[currentNode]) {
            if (!seen[neighborNode]) {
                seen[neighborNode] = true;
                queue.push(neighborNode);
            }
        }
    }
    return path;
}

function reset_path() {
    document.querySelectorAll('.btn-active').forEach((e) => e.classList.remove('btn-active'));

    for (let key in graph) {
        document.getElementById(`node_${key}`).classList.remove('visited');
    }
}

async function visit_path(path) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    document.getElementById(`node_${path}`).classList.add('visited');
}

function start_bfs() {
    reset_path();
    document.getElementById('btn-bfs').classList.add('btn-active');
    console.log(`${BFS(graph, 'S', 'T')}`);
}

function start_dfs() {
    reset_path();
    document.getElementById('btn-dfs').classList.add('btn-active');
    console.log(`${DFS(graph, 'S', 'T')}`);
}

async function trace_short_path() {
    reset_path();
    document.getElementById('btn-trace').classList.add('btn-active');
    
    short_path = ['S', 'C', 'B', 'T'];

    for (let i = 0; i < short_path.length; i++) {
        await visit_path(short_path[i]);
    }
}
