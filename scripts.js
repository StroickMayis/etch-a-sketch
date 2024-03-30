const containerDiv = document.querySelector(".container");
const leftContainer = document.querySelector(".leftContainer");
const rightContainer = document.querySelector(".rightContainer");
const sizeDisplay = document.querySelector("#sizeDisplay");
const flowDisplay = document.querySelector("#flowDisplay");
const colorSelector = document.querySelector("#colorSelector");
let mouseOverActive = false;
let mouseDownActive = false;
let canvasController = 16;
let canvasColor = [50,50,50];
let colorController = [-1,-1,-1];
let unassignedColorController = [51,51,51];
let currentTargetColor;
let flow = 10;
let randomColorMode = false;

// returns 0,1 or 2.
function getRandomRGBIndex () {
    return Math.floor(Math.random() * 3);
}

function convertColorToNum(targetColor) {
    currentTargetColor = targetColor;
    currentTargetColor = currentTargetColor.replaceAll(`rgb`,``);
    currentTargetColor = currentTargetColor.replaceAll(`(`,``);
    currentTargetColor = currentTargetColor.replaceAll(`)`,``);
    currentTargetColor = currentTargetColor.replaceAll(` `,``);
    currentTargetColor = currentTargetColor.split(`,`);
    for (i = 2; i >= 0; i--) {
        currentTargetColor[i] = Number(currentTargetColor[i]);
    }
}

function generateCanvas(canvasSize = 16, canvasColorLocal = `rgb(50,50,50)`) {
    if (canvasSize > 100 || canvasSize < 0) {
        canvasSize = 100;
    }
    let canvasArea = canvasSize ** 2;
    while (containerDiv.firstChild) {
        containerDiv.removeChild(containerDiv.firstChild);
    }
    for (let i = canvasArea; i > 0; i--) {
        containerDiv.appendChild(document.createElement("div"));
    }
    let style = document.createElement("style");
    style.textContent = 
    `
    .container div {
        border: 1px solid ${canvasColorLocal};
        height: ${40 / canvasSize}dvw;
        width: ${40 / canvasSize}dvw;
    }
    `;
    containerDiv.appendChild(style);
}

generateCanvas();

containerDiv.addEventListener("mousedown", (e) => 
{
    e.preventDefault();
});

containerDiv.addEventListener("mouseover", (e) => 
{
    if (e.target !== containerDiv) {
        mouseOverActive = true;
        if (mouseOverActive && mouseDownActive) {
            if (e.target.style.backgroundColor) {
                convertColorToNum(e.target.style.backgroundColor);
                if (randomColorMode) {
                        currentTargetColor[getRandomRGBIndex()] += (flow);
                } else {
                    for (i = 2; i >= 0; i--) {
                        currentTargetColor[i] += (colorController[i] * flow);
                    }
                }
                e.target.style.backgroundColor = `rgb(${currentTargetColor[0]},${currentTargetColor[1]},${currentTargetColor[2]})`;
            } else {
                if (randomColorMode) {
                    unassignedColorController[getRandomRGBIndex()] += (flow);
                } else {
                    for (i = 2; i >= 0; i--) {
                        unassignedColorController[i] += (colorController[i] * flow);
                    }
                }
                e.target.style.backgroundColor = `rgb(${unassignedColorController[0]},${unassignedColorController[1]},${unassignedColorController[2]})`;
                unassignedColorController = [51,51,51];
            }
        }
    }
});

containerDiv.addEventListener("click", (e) => 
{
    if (e.target !== containerDiv) {
            if (e.target.style.backgroundColor) {
                convertColorToNum(e.target.style.backgroundColor);
                if (randomColorMode) {
                        currentTargetColor[getRandomRGBIndex()] += (flow);
                } else {
                    for (i = 2; i >= 0; i--) {
                        currentTargetColor[i] += (colorController[i] * flow);
                    }
                }
                e.target.style.backgroundColor = `rgb(${currentTargetColor[0]},${currentTargetColor[1]},${currentTargetColor[2]})`;
            } else {
                if (randomColorMode) {
                    unassignedColorController[getRandomRGBIndex()] += (flow);
                } else {
                    for (i = 2; i >= 0; i--) {
                        unassignedColorController[i] += (colorController[i] * flow);
                    }
                }
                e.target.style.backgroundColor = `rgb(${unassignedColorController[0]},${unassignedColorController[1]},${unassignedColorController[2]})`;
                unassignedColorController = [51,51,51];
        }
    }
});

containerDiv.addEventListener("mousedown", (e) => 
{
    if (e.target !== containerDiv) {
        mouseDownActive = true;
    }
});

document.addEventListener("mouseup", (e) => 
{
    mouseDownActive = false;
});

leftContainer.addEventListener("click", (e) => 
{
    switch (e.target.id) {
        case "size+1":
            if (canvasController < 99) {
                canvasController++;
            } else {canvasController = 100;}
            generateCanvas(canvasController,`rgb(${canvasColor[0]},${canvasColor[1]},${canvasColor[2]})`);
            break;
        case "size+10":
            if (canvasController < 90) {
                canvasController += 10;
            } else {canvasController = 100;}
            generateCanvas(canvasController,`rgb(${canvasColor[0]},${canvasColor[1]},${canvasColor[2]})`);
            break;
        case "size-1":
            if (canvasController > 2) {
                canvasController--;
            } else {canvasController = 2;}
            generateCanvas(canvasController,`rgb(${canvasColor[0]},${canvasColor[1]},${canvasColor[2]})`);
            break;
        case "size-10":
            if (canvasController > 11) {
                canvasController -= 10;
            } else {canvasController = 2;}
            generateCanvas(canvasController,`rgb(${canvasColor[0]},${canvasColor[1]},${canvasColor[2]})`);
            break;
        case "canvasBrighten":
            for (i = 2; i >= 0; i--) {
                if (canvasColor[i] < 245) {
                    canvasColor[i] += 10;
                } else canvasColor[i] = 255;
            };
            generateCanvas(canvasController,`rgb(${canvasColor[0]},${canvasColor[1]},${canvasColor[2]})`);
            break;
        case "canvasDarken":
            for (i = 2; i >= 0; i--) {
                if (canvasColor[i] > 10) {
                    canvasColor[i] -= 10;
                } else canvasColor[i] = 0;
            };
            generateCanvas(canvasController,`rgb(${canvasColor[0]},${canvasColor[1]},${canvasColor[2]})`);
            break;
        case "clear":
            generateCanvas(canvasController,`rgb(${canvasColor[0]},${canvasColor[1]},${canvasColor[2]})`);
            break;
    }
    sizeDisplay.textContent = `${canvasController} X ${canvasController}`; 
});

rightContainer.addEventListener("click", (e) => 
{
    switch (e.target.id) {
        case "flow+1":
            if (flow < 254) {
                flow++;
            } else {flow = 255;}
            break;
        case "flow+10":
            if (flow < 245) {
                flow += 10;
            } else {flow = 255;}
            break;
        case "flow-1":
            if (flow > 2) {
                flow--;
            } else {flow = 1;}
            break;
        case "flow-10":
            if (flow > 11) {
                flow -= 10;
            } else {flow = 1;}
            break;
    }
    flowDisplay.textContent = `FLOW: ${flow}`; 
});

colorSelector.addEventListener("change", (e) => {
    switch (e.target.value) {
        case `black`:
            colorController = [-1,-1,-1];
            randomColorMode = false;
        break;
        case `white`:
            colorController = [1,1,1];
            randomColorMode = false;
        break;
        case `red`:
            colorController = [1,0,0];
            randomColorMode = false;
        break;
        case `green`:
            colorController = [0,1,0];
            randomColorMode = false;
        break;
        case `blue`:
            colorController = [0,0,1];
            randomColorMode = false;
        break;
        case `random`:
            randomColorMode = true;
        break;
    }
})





