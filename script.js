let considerRunes = true;
let considerSockets = false;
let allowedSockets = 2;
let considerBases = false;
let allowedBase = "Amazon bow";

const runesInventoryElement = document.getElementById("runes-inventory");
const runewordsElement = document.getElementById("availible-runewords");
const profilesElement = document.getElementById("profiles-element");
const basesSelectElement = document.getElementById("bases-selection");
const socketsSelectElement = document.getElementById("sockets-selection");

const newProfileButton = document.getElementById("add-profile-btn");
const editProfileButton = document.getElementById("edit-profile-btn");
const deleteProfileButton = document.getElementById("delete-profile-btn");
const considerBaseButton = document.querySelector(".bases-select button");
const considerSocketsButton = document.querySelector(".sockets-select button");
const considerRunesButton = document.getElementById("consider-runes");

function renderBases() {
  for (element of bases) {
    const singleBase = document.createElement("option");
    singleBase.textContent = element;
    singleBase.value = element;
    basesSelectElement.appendChild(singleBase);
  }
}

function renderSockets() {
  for (let i = 2; i <= 6; i++) {
    const socketsNumber = document.createElement("option");
    socketsNumber.textContent = i;
    socketsNumber.value = i;
    socketsSelectElement.appendChild(socketsNumber);
  }
}

function checkBase(bases) {
  let check = false;
  for (base of bases) {
    if (base === allowedBase) {
      check = true;
    }
  }
  return check || !considerBases;
}

function checkSockets(runes) {
  const socketsCount = runes.length;
  return socketsCount == allowedSockets || !considerSockets;
}

function initiateRunes() {
  for (rune of runes) {
    if (!playerProfiles[activeProfile][rune.name]) {
      playerProfiles[activeProfile][rune.name] = 0;
    }
  }
}

function removeRune(event) {
  if (playerProfiles[activeProfile][event.target.dataset.rune]) {
    playerProfiles[activeProfile][event.target.dataset.rune]--;
    renderRunes();
    renderRunewords();
    storeProfiles();
  }
}

function addRune(event) {
  if (!playerProfiles[activeProfile][event.target.dataset.rune]) {
    playerProfiles[activeProfile][event.target.dataset.rune] = 1;
  } else {
    playerProfiles[activeProfile][event.target.dataset.rune]++;
  }

  renderRunes();
  renderRunewords();
  storeProfiles();
}

function renderRunes() {
  // runesInventoryElement.innerHTML = "";
  runesInventoryElement.innerHTML = ``;
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

    if (playerProfiles[activeProfile][rune.name]) {
      const runeCount = document.createElement("p");
      runeCount.classList.add("rune-count");
      runeCount.textContent = playerProfiles[activeProfile][rune.name];
      runeInfo.appendChild(runeCount);
    }

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

function countRunes(runes) {
  const counts = {};
  runes.forEach((rune) => {
    if (!counts[rune]) {
      counts[rune] = 1;
    } else {
      counts[rune]++;
    }
  });
  return counts;
}

function checkRunes(runes) {
  const runesCount = countRunes(runes);

  let check = true;
  for (rune in runesCount) {
    if (runesCount[rune] > playerProfiles[activeProfile][rune]) {
      check = false;
    }
  }
  return check || !considerRunes;
}

function renderRunewords() {
  runewordsElement.innerHTML = "";
  for (runeword of runeWords) {
    if (
      checkRunes(runeword.runes) &&
      checkBase(runeword.itemTypes) &&
      checkSockets(runeword.runes)
    ) {
      const runewordContainer = document.createElement("li");
      runewordContainer.classList.add("runeword-container");

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
}

loadProfiles();
initiateRunes();
renderProfiles();
renderRunes();
renderRunewords();
renderBases();
renderSockets();

newProfileButton.addEventListener("click", addProfile);
editProfileButton.addEventListener("click", editProfile);
deleteProfileButton.addEventListener("click", deleteProfile);
basesSelectElement.addEventListener("change", (event) => {
  allowedBase = event.target.value;
  renderRunewords();
});
socketsSelectElement.addEventListener("change", (event) => {
  allowedSockets = event.target.value;
  renderRunewords();
});

considerBaseButton.addEventListener("click", () => {
  if (considerBases) {
    considerBaseButton.classList.remove("active");
  } else {
    considerBaseButton.classList.add("active");
  }
  considerBases = !considerBases;
  renderRunewords();
});

considerSocketsButton.addEventListener("click", () => {
  if (considerSockets) {
    considerSocketsButton.classList.remove("active");
  } else {
    considerSocketsButton.classList.add("active");
  }
  considerSockets = !considerSockets;
  renderRunewords();
});

considerRunesButton.addEventListener("click", () => {
  if (considerRunes) {
    considerRunesButton.classList.remove("active");
  } else {
    considerRunesButton.classList.add("active");
  }
  considerRunes = !considerRunes;
  renderRunewords();
});
