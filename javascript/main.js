
function loadRandomImage() {
    $(".loader").show(); // show loader
    $(".container-image img").remove(); // remove old image

    let randomSeed = Math.floor(Math.random() * 1000000);
    let imageURL = `https://picsum.photos/seed/${randomSeed}/600/400`;

    let img = new Image();
    img.src = imageURL;
    img.alt = "Random Image";
    img.onload = function () {
        $(".loader").hide(); // hide loader
        $(".container-image").append(img); // show image
    };
}

function addEmail() {
    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const select = document.querySelector(".selected");

    // Validation using regex (also check not empty)
    if (email !== '' && !emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    } else if (email == '') {
        alert('Please enter an email address')
    }

    // Check for duplicates
    for (let option of select.options) {
        if (option.value.toLowerCase() === email.toLowerCase()) {
            alert("This email is already in the list.");
            return;
        }
    }

    // Create new option element
    const newOption = document.createElement("option");
    newOption.value = email;
    newOption.textContent = email;

    select.appendChild(newOption);

    // Reset input field
    emailInput.value = "";
}

function addToCollection() {
    const containerImage = document.querySelector(".container-image img"); 
    const imageSrc = containerImage.src;
    const collectionsDiv = document.querySelector(".collections");

    if (!containerImage) {
        alert("Please generate an image first.");
        return;
    }

    // Check for duplicates
    const duplicate = collectionsDiv.querySelector(`img[src="${imageSrc}"]`);
    if (duplicate) {
        alert("This image is already in the collection.");
        return;
    }

    // Clone the current image
    const clonedImage = document.createElement("img");
    clonedImage.src = containerImage.src;
    clonedImage.alt = containerImage.alt || "Collected Image";

    // Append to collections
    collectionsDiv.appendChild(clonedImage);
}

loadRandomImage();
