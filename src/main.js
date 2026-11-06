const grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

const recipes = [
    {name: "stick", grid: [
        ["plank"],
        ["plank"]
    ]},
    {name: "planks", grid: [
        ["log"]
    ]}
]

const gridContainer = document.getElementById("grid");
const materialButtons = document.getElementById("materials");
const clearButton = document.getElementById("clear");
const craftButton = document.getElementById("craft");
const recipeText = document.getElementById("recipe");

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

function clearGrid() {
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            grid[y][x] = "";
        };
    };

    renderGrid();
}

function randomRecipe() {
    const index = Math.floor(Math.random() * Number(recipes.length));
    return recipes[index];
}

function recipesMatch(recipe1, recipe2) {
    if (recipe1.length !== recipe2.length) {
        return false;
    }

    for (var y = 0; y < recipe1.length; y++) {
        for (var x = 0; x < recipe1[y].length; x++) {
            if (recipe1[y][x] !== recipe2[y][x]) {
                return false;
            }
        }
    }

    return true;
}

function verifyRecipe(recipe) {
    const gridClone = structuredClone(grid);

    let emptyRow = true;

    /*top*/
    while (emptyRow && gridClone.length > 0) {
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

    /*bottom*/
    while (emptyRow && gridClone.length > 0) {
        for (let x = 0; x < 3; x++) {
            if (gridClone.at(-1)[x] != "") {
                emptyRow = false;
                break;
            };
        };

        if (emptyRow) {
            gridClone.pop();
        };
    };

    if (gridClone.length > 0) {
        let emptyColumn = true;
        /*left*/
        while(emptyColumn && gridClone[0].length > 0) {
            for (let y = 0; y < gridClone.length; y++) {
                if (gridClone[y][0] != "") {
                    emptyColumn = false;
                    break;
                };
            };

            if (emptyColumn) {
                for (let y = 0; y < gridClone.length; y++) {
                    gridClone[y].shift();
                };
            };
        };

        emptyColumn = true;
        /*right*/

        while (emptyColumn && gridClone[0].length > 0) {
            for (let y = 0; y < gridClone.length; y++) {
                if (gridClone[y].at(-1) != "") {
                    emptyColumn = false;
                    break;
                };
            };

            if(emptyColumn) {
                for (let y = 0; y < gridClone.length; y++) {
                    gridClone[y].pop();
                };
            };
        };
    };

    if (recipesMatch(gridClone, recipe.grid)) {
        return true;
    } 
    else {
        return false;
    }
};

    

let material = "";
let recipe = randomRecipe();
recipeText.innerHTML = recipe.name;

for (const button of materialButtons.children) {
    button.addEventListener("click", () => {
        material = button.getAttribute("data-material");
    });
};

clearButton.addEventListener("click", clearGrid);

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
    const crafted = verifyRecipe(recipe);

    if (crafted) {
        console.log("Crafted!")
        clearGrid();
        recipe = randomRecipe();
        recipeText.innerHTML = recipe.name;
    }
});