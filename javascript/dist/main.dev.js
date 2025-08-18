"use strict";

function loadRandomImage() {
  $(".loader").show(); // show loader

  $(".container-image img").remove(); // remove old image

  var randomSeed = Math.floor(Math.random() * 1000000);
  var imageURL = "https://picsum.photos/seed/".concat(randomSeed, "/600/400");
  var img = new Image();
  img.src = imageURL;
  img.alt = "Random Image";

  img.onload = function () {
    $(".loader").hide(); // hide loader

    $(".container-image").append(img); // show image
  };
}

function addEmail() {
  var emailInput = document.getElementById("email");
  var email = emailInput.value.trim();
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var selects = document.querySelectorAll(".selected");
  console.log(selects); // Validation using regex (also check not empty)

  if (email !== "" && !emailRegex.test(email)) {
    showMessage("error", "Please enter a valid email address");
    return;
  } else if (email == "") {
    showMessage("error", "Please enter an email address");
    return;
  } // Check for duplicates


  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = selects[0].options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var option = _step.value;

      if (option.value.toLowerCase() === email.toLowerCase()) {
        showMessage("error", "This email is already in the list.");
        return;
      }
    } // Create new option element

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = selects[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var select = _step2.value;
      var newOption = document.createElement("option");
      newOption.value = email;
      newOption.textContent = email;
      select.appendChild(newOption); // Remove placeholder option if it exists

      var placeholder = select.querySelector("option[value=none]");

      if (placeholder) {
        placeholder.remove();
      } // Make the new email the selected option


      select.value = email; // Trigger the change event manually

      select.dispatchEvent(new Event("change"));
    } // Reset input field

  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  emailInput.value = ""; // Show success message

  showMessage("success", "Email added");
}

loadRandomImage();

function addToCollection() {
  var containerImage = document.querySelector(".container-image img");
  var imageSrc = containerImage.src;
  var collectionsDiv = document.querySelector(".collections");
  var firstSelect = document.querySelector(".address .selected");
  var selectedValue = firstSelect.value;

  if (selectedValue === "none") {
    showMessage("error", "Please select an email first.");
    return;
  }

  if (!containerImage) {
    showMessage("error", "Please generate an image first.");
    return;
  } // Get or create the collection container


  var collectionGroup = document.getElementById(selectedValue);

  if (!collectionGroup) {
    collectionGroup = document.createElement("div");
    collectionGroup.id = selectedValue;
    collectionGroup.classList.add("collection-group");
    collectionsDiv.appendChild(collectionGroup);
  } // Check for duplicates


  var duplicate = collectionGroup.querySelector("img[src=\"".concat(containerImage.src, "\"]"));

  if (duplicate) {
    showMessage("error", "This image is already in this collection.");
    return;
  } // Create wrapper for image + delete button


  var imageDiv = document.createElement("div");
  imageDiv.classList.add("image-wrapper"); // Clone the current image

  var clonedImage = document.createElement("img");
  clonedImage.src = imageSrc;
  clonedImage.alt = containerImage.alt || "Collected Image"; // Create delete button

  var deleteBtn = document.createElement("span");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = "x"; // Add event to remove image on click

  deleteBtn.addEventListener("click", function () {
    imageDiv.remove(); // Successful removal message

    showMessage("success", "Image has been removed from collection");
  }); // Add image and button to wrapper

  imageDiv.append(clonedImage, deleteBtn); // Add to collection

  collectionGroup.append(imageDiv); // Show success message

  showMessage("success", "Image added to the collection");
}

var collectionsSelect = document.querySelector(".main-content-2 .select .selected");
collectionsSelect.addEventListener("change", function (event) {
  var selectedId = event.target.value; // Select all collection group divs inside .collections

  var allCollections = document.querySelectorAll(".collections > div.collection-group");
  allCollections.forEach(function (collection) {
    if (collection.id === selectedId) {
      collection.style.display = "flex"; // show the matching one
    } else {
      collection.style.display = "none"; // hide all others
    }
  });
}); // Success and Error messages

function showMessage(type, text) {
  var container = document.querySelector(".messages-container"); // Create a new message

  var message = document.createElement("div");
  message.classList.add("message", type);
  var content = document.createElement("p");
  content.textContent = text;
  message.append(content); // Add to container

  container.append(message); // Make sure to trigger CSS transition

  setTimeout(function () {
    return message.classList.add("show");
  }, 10); // Auto-remove after 3s

  setTimeout(function () {
    message.classList.remove("show");
    setTimeout(function () {
      return message.remove();
    }, 300);
  }, 3000);
}
//# sourceMappingURL=main.dev.js.map
