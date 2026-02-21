const cols  = 20;
const rows = 20;
const gridElement = document.getElementById('grid');
let node = [];
let startNode, targetNode;
let isDrawing = false;
gridElement.oncontextmenu = () => false;
function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
};

function resetGrid(randomWalls = false){
    gridElement.innerHTML = "";
    nodes = [];
    for (let i = 0; i < rows; i++){
        nodes[i] = [];
        for (let j = 0; j < cols; j++){
            let div = document.createElement('div');
            div.classList.add('cell');
            let isWall = randomWalls ? Math.random() < 0.25 : false;
            let node = { x: j, y: i, div: div, g: 0, h: 0, f: 0, parent: null, wall: isWall };
            if (node.wall) div.classList.add('wall');
            div.addEventListener('mousedown', () => {
                isDrawing = true;
                toggleWall(node);
            });
            div.addEventListener('mouseenter', () => {
                if (isDrawing) toggleWall(node);
            });

            gridElement.appendChild(div);
            nodes[i][j] = node;
        }
    }

    window.addEventListener('mouseup', () => isDrawing = false);
    startNode = nodes[0][0]; 
    targetNode = nodes[rows-1][cols-1];
    startNode.wall = false; 
    targetNode.wall = false;
    startNode.div.classList.add("start");
    targetNode.div.classList.add("target");
}

function toggleWall(node){
    if (node === startNode || node === targetNode) 
        return;
    node.wall = !node.wall;
    if (node.wall){
        node.div.classList.add('wall');
    } else {
        node.div.classList.remove('wall');
    };
};


function heuristic(a, b){
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

async function startAStar() {
    let openSet = [startNode];
    let closedSet = [];

    while (openSet.length > 0) {
        let winner = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) winner = i;
        }
        let current = openSet[winner];

        if (current === targetNode) {
            let temp = current;
            while (temp.parent) {
                temp.div.classList.add("path");
                temp = temp.parent;
                await sleep(30);
            }
            return console.log("Goal reached");
        }

        openSet.splice(winner, 1);
        closedSet.push(current);
        current.div.classList.add("closed");

        let neighbors = getNeighbors(current);
        for (let neighbor of neighbors) {
            if (!closedSet.includes(neighbor) && !neighbor.wall) {
                let tempG = current.g + 1;
                
                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) neighbor.g = tempG;
                } else {
                    neighbor.g = tempG;
                    openSet.push(neighbor);
                    neighbor.div.classList.add("open");
                }
                neighbor.h = heuristic(neighbor, targetNode);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = current;
            }
        }
        await sleep(20);
    }
    alert("No possible way found!");
}

function getNeighbors(n) {
    let res = [];
    if (n.x < cols - 1) res.push(nodes[n.y][n.x + 1]);
    if (n.x > 0) res.push(nodes[n.y][n.x - 1]);
    if (n.y < rows - 1) res.push(nodes[n.y + 1][n.x]);
    if (n.y > 0) res.push(nodes[n.y - 1][n.x]);
    return res;
}

resetGrid();