// Language: javascript

/* Animations */
function reset_path() {
    document.querySelectorAll('.btn-active').forEach((e) => e.classList.remove('btn-active'));

    document.querySelectorAll('.visited').forEach((e) => e.classList.remove('visited'));
    
    document.getElementById('path').innerHTML = '';
}

async function set_available_path(path) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    for (let key in path) {
        document.getElementById(`node_${key}`).classList.add('available');
    }
}

function remove_available_path() {
    document.querySelectorAll('.available').forEach((e) => e.classList.remove('available'));
}

async function visit_path(node) {
    document.getElementById(`node_${node}`).classList.add('visited');
    await new Promise((resolve) => setTimeout(resolve, 500));
}

async function add_path_letters(letter) {
    let path = document.getElementById('path').innerHTML;
    
    path += `<p1 id="path_${letter}">[${letter}]</span>`;
    
    document.getElementById('path').innerHTML = path;
    
    document.getElementById(`path`).classList.add('letters');
    document.getElementById(`path_${letter}`).classList.add('letter-color');
    
    await new Promise((resolve) => setTimeout(resolve, 400));
    // add new p1 tag
    if (path != '' && !path.includes('T')) {
        path += ' -> ';
    }

    document.getElementById('path').innerHTML = path;
}


