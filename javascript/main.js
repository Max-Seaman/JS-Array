
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
    const selects = document.querySelectorAll(".selected");
    console.log(selects)

    // Validation using regex (also check not empty)
    if (email !== "" && !emailRegex.test(email)) {
        showMessage("error", "Please enter a valid email address");
        return;
    } else if (email == "") {
        showMessage("error", "Please enter an email address")
        return;
    }

    // Check for duplicates
    for (let option of selects[0].options) {
        if (option.value.toLowerCase() === email.toLowerCase()) {
            showMessage("error", "This email is already in the list.");
            return;
        }
    }

    // Create new option element
    for (let select of selects) {
        const newOption = document.createElement("option");
        newOption.value = email;
        newOption.textContent = email;
        select.appendChild(newOption);

        // Remove placeholder option if it exists
        const placeholder = select.querySelector("option[value=none]")
        if (placeholder) {
            placeholder.remove();
        }

        // Make the new email the selected option
        select.value = email;

        // Trigger the change event manually
        select.dispatchEvent(new Event("change"));
    }

    // Reset input field
    emailInput.value = "";

    // Show success message
    showMessage("success", "Email added");
}

loadRandomImage();

function addToCollection() {
    const containerImage = document.querySelector(".container-image img"); 
    const imageSrc = containerImage.src;
    const collectionsDiv = document.querySelector(".collections");
    const firstSelect = document.querySelector(".address .selected");
    const selectedValue = firstSelect.value;

    if (selectedValue === "none") {
        showMessage("error", "Please select an email first.");
        return;
    }

    if (!containerImage) {
        showMessage("error", "Please generate an image first.");
        return;
    }

    // Get or create the collection container
    let collectionGroup = document.getElementById(selectedValue);
    if (!collectionGroup) {
        collectionGroup = document.createElement("div");
        collectionGroup.id = selectedValue;
        collectionGroup.classList.add("collection-group");
        collectionsDiv.appendChild(collectionGroup);
    }

    // Check for duplicates
    const duplicate = collectionGroup.querySelector(`img[src="${containerImage.src}"]`);
    if (duplicate) {
        showMessage("error", "This image is already in this collection.");
        return;
    }

    // Create wrapper for image + delete button
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image-wrapper");

    // Clone the current image
    const clonedImage = document.createElement("img");
    clonedImage.src = imageSrc;
    clonedImage.alt = containerImage.alt || "Collected Image";

    // Create delete button
    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "x";

    // Add event to remove image on click
    deleteBtn.addEventListener("click", () => {
        imageDiv.remove();

        // Successful removal message
        showMessage("success", "Image has been removed from collection");
    });

    // Add image and button to wrapper
    imageDiv.append(clonedImage, deleteBtn);

    // Add to collection
    collectionGroup.append(imageDiv);

    // Show success message
    showMessage("success", "Image added to the collection");
}

const collectionsSelect = document.querySelector(".main-content-2 .select .selected");

collectionsSelect.addEventListener("change", (event) => {
    const selectedId = event.target.value;

    // Select all collection group divs inside .collections
    const allCollections = document.querySelectorAll(".collections > div.collection-group");

    allCollections.forEach(collection => {
        if (collection.id === selectedId) {
            collection.style.display = "flex"; // show the matching one
        } else {
            collection.style.display = "none"; // hide all others
        }
    });
});

// Success and Error messages
function showMessage(type, text) {
    const container = document.querySelector(".messages-container");

    // Create a new message
    const message = document.createElement("div");
    message.classList.add("message", type);
    
    const content = document.createElement("p");
    content.textContent = text;
    message.append(content);

    // Add to container
    container.append(message);

    // Make sure to trigger CSS transition
    setTimeout(() => message.classList.add("show"), 10);

    // Auto-remove after 3s
    setTimeout(() => {
        message.classList.remove("show");
        setTimeout(() => message.remove(), 300);
    }, 3000);
}
