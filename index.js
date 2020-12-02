const section = document.querySelector(".form section");
const fileInput = document.querySelector("#file-input");
const profileCard = document.querySelector(".profile-card");
const nameInput = document.querySelector("#name");
const occupationInput = document.querySelector("#occupation");

const CARD_UPDATE_EVENT_NAME = "cardupdate";

section.addEventListener("dragover", handleDragOver);
section.addEventListener("dragenter", handleDragEnter);
section.addEventListener("drop", handleDrop);
profileCard.addEventListener(CARD_UPDATE_EVENT_NAME, handleCardUpdate);
fileInput.addEventListener("change", (event) => {
  handleFileUpload(event.target.files[0]);
});
occupationInput.addEventListener("change", (event) => {
  dispatchCardEvent({
    occupation: event.target.value,
  });
});
nameInput.addEventListener("change", (event) => {
  dispatchCardEvent({
    name: event.target.value,
  });
});

function dispatchCardEvent(data) {
  profileCard.dispatchEvent(
    new CustomEvent(CARD_UPDATE_EVENT_NAME, {
      detail: data,
    })
  );
}

/**
 * @param {CustomEvent} event
 */
function handleCardUpdate(event) {
  const { image, name, occupation } = event.detail;

  if (image) {
    profileCard.querySelector("img").src = image;
  }
  if (name) {
    profileCard.querySelector("span.name").textContent = name;
  }
  if (occupation) {
    profileCard.querySelector("span.occupation").textContent = occupation;
  }
}

/**
 * @param {DragEvent} event
 */
function handleDragOver(event) {
  // Only allow files to be dropped here.
  if (!event.dataTransfer.types.includes("Files")) {
    return;
  }
  event.preventDefault();
  // Specify Drop Effect.
  event.dataTransfer.dropEffect = "copy";
}

/**
 * @param {DragEvent} event
 */
function handleDragEnter(event) {
  // Only allow files to be dropped here.
  if (!event.dataTransfer.types.includes("Files")) {
    return;
  }
  event.preventDefault();
}

/**
 * @param {DragEvent} event
 */
function handleDrop(event) {
  event.preventDefault();
  // Get the first item here since we only want one image
  const file = event.dataTransfer.files[0];
  // Check that file is an image.
  if (!file.type.startsWith("image/")) {
    alert("Only image files are allowed.");
    return;
  }

  handleFileUpload(file);
}

/**
 * @param {File} file
 */
function handleFileUpload(file) {
  const fileReader = new FileReader();
  fileReader.addEventListener("load", (event) => {
    // Dispatch an event to the profile card containing the updated profile.
    dispatchCardEvent({
      image: event.target.result,
    });
  });

  fileReader.readAsDataURL(file);
}
