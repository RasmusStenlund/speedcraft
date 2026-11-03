const grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

const recipes = [
    {name: "stick", grid: [
        ["plank"],
        ["plank"]
    ]}
]

const gridContainer = document.getElementById("grid");
const materialButtons = document.getElementById("materials");
const clearButton = document.getElementById("clear");
const craftButton = document.getElementById("craft");

function renderGrid() {
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            const button = gridContainer.querySelector(`[data-y="${y}"][data-x="${x}"]`);
            const image = button.querySelector("img");
            const value = grid[y][x];

            if (value != "") {
                image.setAttribute("src", `assets/${value}.png`);
                image.setAttribute("alt", value);
            }
            else {
                image.removeAttribute("src");
                image.removeAttribute("alt");
            };
        };
    };
};

function verifyRecipe(name) {
    const recipe = recipes.find(function (entry) {
        return entry.name == name;
    });

    const gridClone = structuredClone(grid);

    

    let emptyRow = true;

    while (emptyRow) {
        for (let x = 0; x < 3; x++) {
            if (gridClone[0][x] != "") {
                emptyRow = false;
                break;
            };
        };

        if (emptyRow) {
            gridClone.shift();
        }
    }

    emptyRow = true;

    while (emptyRow) {
        for (let x = 0; x < 3; x++) {
            if (gridClone.at(-1)[x] != "") {
                emptyRow = false;
                break;
            };
        };

        if (emptyRow) {
            gridClone.pop();
        };
    }

    console.log(gridClone);

    /* remove top and bottom*/
    /*remove sides */
    /*compare to recipe*/
};

let material = "";

for (const button of materialButtons.children) {
    button.addEventListener("click", () => {
        material = button.getAttribute("data-material");
    });
};

clearButton.addEventListener("click", () => {
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            grid[y][x] = "";
        };
    };

    renderGrid();
});

for (const button of gridContainer.children) {
    button.addEventListener("click", () => {
        const x = Number(button.getAttribute("data-x"));
        const y = Number(button.getAttribute("data-y"));
        const image = button.querySelector("img");

        grid[y][x] = material;
        renderGrid();
    });
};

craftButton.addEventListener("click", () => {
    verifyRecipe();
});