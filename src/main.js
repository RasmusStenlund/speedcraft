const grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

const gridContainer = document.getElementById("grid");
const materialButtons = document.getElementById("materials");
const clearButton = document.getElementById("clear");

let material = "";

for (const button of materialButtons.children) {
    button.addEventListener("click", () => {
        material = button.getAttribute("data-material");
        console.log(material);
    })
}

clearButton.addEventListener("click", () => {
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            grid[y][x] = "";
        };
    };

    for (const button of gridContainer.children) {
        button.innerHTML = "";
    };
})

for (const button of gridContainer.children) {
    button.addEventListener("click", () => {
        const x = button.getAttribute("data-x");
        const y = button.getAttribute("data-y");

        grid[y][x] = material;
        button.innerHTML = material;

        console.log(grid);
    })
}

