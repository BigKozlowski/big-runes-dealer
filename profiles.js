let activeProfile = 0;
let playerProfiles = [
  {
    name: "default",
  },
];

function switchProfile(event) {
  activeProfile = event.target.dataset.id;
  renderProfiles();
  console.log(activeProfile);
}

function addProfile() {
  const profileName = window.prompt("Enter profile name");
  if (profileName) {
    playerProfiles.push({ name: profileName });
    activeProfile = playerProfiles.length - 1;
    renderProfiles();
    storeProfiles();
  }
}

function editProfile() {
  playerProfiles[activeProfile].name = window.prompt("Enter profile name");
  renderProfiles();
  storeProfiles();
}

function deleteProfile() {
  if (playerProfiles.length == 1) {
    window.alert("You can`t delete the only profile!");
  } else {
    playerProfiles.splice(activeProfile, 1);
    activeProfile = playerProfiles.length - 1;
    renderProfiles();
    storeProfiles();
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
