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
  var select = document.querySelector(".selected"); // Validation using regex (also check not empty)

  if (email !== '' && !emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return;
  } else if (email == '') {
    alert('Please enter an email address');
  } // Check for duplicates


  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = select.options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var option = _step.value;

      if (option.value.toLowerCase() === email.toLowerCase()) {
        alert("This email is already in the list.");
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

  var newOption = document.createElement("option");
  newOption.value = email;
  newOption.textContent = email;
  select.appendChild(newOption); // Reset input field

  emailInput.value = "";
}

function addToCollection() {
  var containerImage = document.querySelector(".container-image img");
  var imageSrc = containerImage.src;
  var collectionsDiv = document.querySelector(".collections");

  if (!containerImage) {
    alert("Please generate an image first.");
    return;
  } // Check for duplicates


  var duplicate = collectionsDiv.querySelector("img[src=\"".concat(imageSrc, "\"]"));

  if (duplicate) {
    alert("This image is already in the collection.");
    return;
  } // Clone the current image


  var clonedImage = document.createElement("img");
  clonedImage.src = containerImage.src;
  clonedImage.alt = containerImage.alt || "Collected Image"; // Append to collections

  collectionsDiv.appendChild(clonedImage);
}

loadRandomImage();
//# sourceMappingURL=main.dev.js.map
