let activeProfile = 0;
let playerProfiles = [
  {
    name: "default",
  },
];
let playerRunes = playerProfiles[activeProfile];
const runesInventoryElement = document.getElementById("runes-inventory");
const runewordsElement = document.getElementById("availible-runewords");
const profilesElement = document.getElementById("profiles-element");

const newProfileButton = document.getElementById("add-profile-btn");
const editProfileButton = document.getElementById("edit-profile-btn");
const deleteProfileButton = document.getElementById("delete-profile-btn");

function initiateRunes() {
  for (rune of runes) {
    if (!playerRunes[rune.name]) {
      playerRunes[rune.name] = 0;
    }
  }
}

function removeRune(event) {
  if (playerRunes[event.target.dataset.rune]) {
    playerRunes[event.target.dataset.rune]--;
    renderRunes();
    renderRunewords();
  }
}

function addRune(event) {
  if (!playerRunes[event.target.dataset.rune]) {
    playerRunes[event.target.dataset.rune] = 1;
  } else {
    playerRunes[event.target.dataset.rune]++;
  }

  renderRunes();
  renderRunewords();
}

function renderRunes() {
  runesInventoryElement.innerHTML = `
  <div class="search-controls" id="search-controls">
            <button>Weapon</button>
            <button>Armor</button>
            <button>All runewords</button>
          </div>
  `;
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

    if (playerRunes[rune.name]) {
      const runeCount = document.createElement("p");
      runeCount.classList.add("rune-count");
      runeCount.textContent = playerRunes[rune.name];
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

function switchProfile(event) {
  activeProfile = event.target.dataset.id;
  playerRunes = playerProfiles[activeProfile];
  renderProfiles();
  console.log(activeProfile);
}

function addProfile() {
  const profileName = window.prompt("Enter profile name");
  if (profileName) {
    playerProfiles.push({ name: profileName });
    activeProfile = playerProfiles.length - 1;
    playerRunes = playerProfiles[activeProfile];
    renderProfiles();
  }
}

function editProfile() {
  playerProfiles[activeProfile].name = window.prompt("Enter profile name");
  renderProfiles();
}

function deleteProfile() {
  if (playerProfiles.length == 1) {
    window.alert("You can`t delete the only profile!");
  } else {
    playerProfiles.splice(activeProfile, 1);
    activeProfile = playerProfiles.length - 1;
    playerRunes = playerProfiles[activeProfile];
    renderProfiles();
  }
}

function renderProfiles() {
  initiateRunes();
  profilesElement.innerHTML = "";

  for (let i = 0; i < playerProfiles.length; i++) {
    const profileButton = document.createElement("button");
    profileButton.classList.add("profile-btn");
    if (i == activeProfile) {
      profileButton.classList.add("active-profile");
    }
    profileButton.textContent = playerProfiles[i].name;
    profileButton.dataset.id = i;
    profileButton.addEventListener("click", switchProfile);
    profilesElement.appendChild(profileButton);
  }
  renderRunewords();
  renderRunes();
}

function checkRuneword(runes) {
  const runesCount = countRunes(runes);

  let check = true;
  for (rune in runesCount) {
    if (runesCount[rune] > playerRunes[rune]) {
      check = false;
    }
  }
  return check;
}

function renderRunewords() {
  runewordsElement.innerHTML = "";
  for (runeword of runeWords) {
    if (checkRuneword(runeword.runes)) {
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
}

newProfileButton.addEventListener("click", addProfile);
editProfileButton.addEventListener("click", editProfile);
deleteProfileButton.addEventListener("click", deleteProfile);

initiateRunes();
renderProfiles();
renderRunes();
renderRunewords();
