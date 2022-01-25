// const playerRunes = {};
// rune = "Ral";
// playerRunes[rune] = 1;
// console.log(playerRunes.Ral);
const playerRunes = {};
const runesInventoryElement = document.getElementById("runes-inventory");
const runewordsElement = document.getElementById("availible-runewords");

function removeRune(event) {
  if (playerRunes[event.target.dataset.rune]) {
    playerRunes[event.target.dataset.rune]--;
    renderRunes();
  }
}

function addRune(event) {
  playerRunes[event.target.dataset.rune]++;
  renderRunes();
}

function renderRunes() {
  runesInventoryElement.innerHTML = "";
  for (rune of runes) {
    const runeContainer = document.createElement("div");
    runeContainer.classList.add("rune-container");

    const removeRuneButton = document.createElement("button");
    removeRuneButton.classList.add("remove-rune-btn");
    removeRuneButton.dataset.rune = rune.name;
    removeRuneButton.textContent = "-";
    removeRuneButton.addEventListener("click", removeRune);
    runeContainer.appendChild(removeRuneButton);

    const runeInfo = document.createElement("div");
    runeInfo.classList.add("rune-info");

    const runeImgCont = document.createElement("div");
    runeImgCont.classList.add("rune-img-container");
    const runeImg = document.createElement("img");
    runeImg.classList.add("rune-img");
    runeImg.src = rune.image;
    runeImgCont.appendChild(runeImg);
    runeInfo.appendChild(runeImgCont);

    const runeName = document.createElement("p");
    runeName.classList.add("rune-name");
    runeName.textContent = rune.name;
    runeInfo.appendChild(runeName);

    const runeCount = document.createElement("p");
    runeCount.classList.add("rune-count");
    runeCount.textContent = playerRunes[rune.name];
    runeInfo.appendChild(runeCount);
    runeContainer.appendChild(runeInfo);

    const addRuneButton = document.createElement("button");
    addRuneButton.classList.add("remove-rune-btn");
    addRuneButton.dataset.rune = rune.name;
    addRuneButton.textContent = "+";
    addRuneButton.addEventListener("click", addRune);
    runeContainer.appendChild(addRuneButton);

    runesInventoryElement.appendChild(runeContainer);
  }
}

function renderRunewords() {
  runewordsElement.innerHTML = "";
  for (runeword of runeWords) {
    const runewordContainer = document.createElement("li");
    runewordContainer.classList.add("runeWord-container");

    const runewordNameElement = document.createElement("h3");
    runewordNameElement.classList.add("runeword-name");
    runewordNameElement.textContent = runeword.name;
    runewordContainer.appendChild(runewordNameElement);

    const runewordRecipe = document.createElement("p");
    runewordRecipe.classList.add("runeword-recipe");
    runewordRecipe.textContent = "Recipe: " + runeword.runes.join(" ");
    runewordContainer.appendChild(runewordRecipe);

    const runewordItem = document.createElement("p");
    runewordItem.classList.add("runeword-item");
    runewordItem.textContent = "Base item: " + runeword.itemType;
    runewordContainer.appendChild(runewordItem);

    const runewordLevel = document.createElement("p");
    runewordLevel.classList.add("runeword-level");
    runewordLevel.textContent = "Required level: " + runeword.level;
    runewordContainer.appendChild(runewordLevel);

    const runewordAttributes = document.createElement("ul");
    runewordAttributes.classList.add("runeword-attributes");
    for (attribute of runeword.attributes) {
      const runewordAttribute = document.createElement("li");
      runewordAttribute.textContent = attribute;
      runewordAttributes.appendChild(runewordAttribute);
    }
    runewordContainer.appendChild(runewordAttributes);

    runewordsElement.appendChild(runewordContainer);
  }
}

for (rune of runes) {
  playerRunes[rune.name] = 0;
}
renderRunes();
renderRunewords();
