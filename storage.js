function isStorageEmpty() {
  if (localStorage.getItem("profiles")) {
    return false;
  }
  return true;
}

function loadProfiles() {
  if (!isStorageEmpty()) {
    playerProfiles = [];
    for (element of JSON.parse(localStorage.getItem("profiles"))) {
      playerProfiles.push(element);
    }
  }
}

function storeProfiles() {
  localStorage.setItem("profiles", JSON.stringify(playerProfiles));
}
