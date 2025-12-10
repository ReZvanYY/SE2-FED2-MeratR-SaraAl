/* This file will be used to store all of the functions that are resuable.
such as:
- drop down menus
- new listing creation
- seach functions
*/

/* If the local storage has an accessToken, then the user is signed in */
/* If local storage does not have an accessToken, the the user is NOT signed in */
function isSignedIn() {
  return !!localStorage.getItem("accessToken");
}

/* Sign out function, that removes the user info and accessToken from the localStorage */
/* redirect the user back to home page, when signing out */
function signOut() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  window.location.href = "../index.html";
}

/* Adding the dropdown function for the hamburger menu. */
/* Fetching the needed elements from the html */
const dropDownArea = document.getElementById("toggle-element-container");
const hamburgerMenuButton = document.getElementById("hamburger-menu");
const newPostButton = document.getElementById("new-post-button");

/* creating a div inside the toggle menu container to display the hamburger menu content inside. */
const hamburgerMenuToggle = document.createElement("div");
hamburgerMenuToggle.id = "hamburger-menu-content";
hamburgerMenuToggle.className =
  "flex flex-col border-b-3 border-r-3 border-l-3 border-[#FACC15] bg-[#1E3A8A] items-center m-auto";
hamburgerMenuToggle.style.display = "none";
dropDownArea.appendChild(hamburgerMenuToggle);

/* Same as hamburger menu, creating a div for the new listing menu */
const createNewListingMenu = document.createElement("div");
createNewListingMenu.id = "create-new-listing-menu";
createNewListingMenu.className =
  "flex flex-col border-b-3 border-r-3 border-l-3 border-[#FACC15] bg-[#1E3A8A] items-center m-auto";
createNewListingMenu.style.display = "none";
dropDownArea.appendChild(createNewListingMenu);

/* by default the menu vill be disabled or not visual. */
let hamburgerMenuToggleVisibility = false;
let createNewListingVisibility = false;

/* Creating the wanted functions and html needed for the drop down menus */
function renderToggleMenu() {
  /* Clearing out the innerhtml of the div */
  hamburgerMenuToggle.innerHTML = "";

  /* checking if the user is signed in or not */
  if (isSignedIn()) {
    const signedInUser = JSON.parse(localStorage.getItem("user" || "{}"));

    /* if signed in the user will get a nice little welcome message when toggling the hamburger menu */
    const welcomeMessage = document.createElement("p");
    welcomeMessage.textContent = `Welcome, ${signedInUser.name || "User"}`;
    welcomeMessage.className =
      "font-Poppins font-bold text-xl text-[#FACC15] mb-4";
    hamburgerMenuToggle.appendChild(welcomeMessage);

    /* if signed in the buttons in the toggled hamburger menu will be 
            -HOME
            -Profile
            -Purchase credit
            -Contact
            -Sign out
        */

    const homeButton = document.createElement("button");
    homeButton.textContent = "HOME";
    homeButton.className =
      "hover:border-b-3 w-fit m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem] cursor-pointer";
    homeButton.onclick = () => {
      window.location.href = "../index.html";
    };
    hamburgerMenuToggle.appendChild(homeButton);

    const profileButton = document.createElement("button");
    profileButton.textContent = "PROFILE";
    profileButton.className =
      "hover:border-b-3 w-fit m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem] cursor-pointer";
    profileButton.onclick = () => {
      window.location.href = "/html/profile-page.html";
    };
    hamburgerMenuToggle.appendChild(profileButton);

    const purchaseCreditButton = document.createElement("button");
    purchaseCreditButton.textContent = "PURCHASE CREDIT";
    purchaseCreditButton.className =
      "hover:border-b-3 w-fit m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem] cursor-pointer";
    purchaseCreditButton.onclick = () => {
      window.location.href = "/html/purchase-credit.html";
    };
    hamburgerMenuToggle.appendChild(purchaseCreditButton);

    const contactButton = document.createElement("button");
    contactButton.textContent = "CONTACT";
    contactButton.className =
      "hover:border-b-3 w-fit m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem] cursor-pointer";
    contactButton.onclick = () => {
      window.location.href = "/html/contact.html";
    };
    hamburgerMenuToggle.appendChild(contactButton);

    const signOutButton = document.createElement("button");
    signOutButton.textContent = "SIGN OUT";
    signOutButton.className =
      "hover:border-b-3 w-fit m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem] cursor-pointer";
    signOutButton.onclick = signOut;
    hamburgerMenuToggle.appendChild(signOutButton);
  } else {
    /* if signed out, the buttons in the toggle menu will be;
        -Home
        -Contact
        -Sign in
        -Sign up
         */

    const homeButton = document.createElement("button");
    homeButton.textContent = "HOME";
    homeButton.className =
      "hover:border-b-3 w-fit m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem] cursor-pointer";
    homeButton.onclick = () => {
      window.location.href = "../index.html";
    };
    hamburgerMenuToggle.appendChild(homeButton);

    const contactButton = document.createElement("button");
    contactButton.className =
      "hover:border-b-3 w-fit m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem] cursor-pointer";
    contactButton.textContent = "CONTACT";
    contactButton.onclick = () => {
      window.location.href = "/html/contact.html";
    };
    hamburgerMenuToggle.appendChild(contactButton);

    const signInButton = document.createElement("button");
    signInButton.textContent = "SIGN IN";
    signInButton.className =
      "hover:border-b-3 w-fit m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem] cursor-pointer";
    signInButton.onclick = () => {
      window.location.href = "/html/sign-in.html";
    };
    hamburgerMenuToggle.appendChild(signInButton);

    const signUpButton = document.createElement("button");
    signUpButton.textContent = "SIGN UP";
    signUpButton.className =
      "hover:border-b-3 w-fit m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem] cursor-pointer";
    signUpButton.onclick = () => {
      window.location.href = "/html/sign-up.html";
    };
    hamburgerMenuToggle.appendChild(signUpButton);
  }
}
/* Everything about creating a new listing for auctions start here. */
/* A function that will create a new post/new listing after clicking the toggle button for creating a new listing */
function renderCreateListingMenu() {
  createNewListingMenu.innerHTML = "";

  /* if the user is not signed, the once the button is clicked the user will be redirected to sign in page to be able to sign in. */
  if (!isSignedIn()) {
    window.location.href = "/html/sign-in.html";
  }
  /* A wrapper to keep all of the elements grouped. */
  const newListingWrapper = document.createElement("div");
  newListingWrapper.className = "flex flex-col w-[75%]";

  /* The listing needs to have; 
  -Title
  -Description 
  -Media photos/images atleast 1.
  -Helper link / info text for public url photos/images.
  -Button to add more input fields for more media files.
  -Deadline date. */
  /* title */
  const listingTitle = document.createElement("h3");
  listingTitle.textContent = "LISTING TITLE";
  listingTitle.className =
    "m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem]";
  newListingWrapper.appendChild(listingTitle);

  const titleInput = document.createElement("input");
  titleInput.placeholder = "Listing Title";
  titleInput.className = "placeholder:text-[#424242] text-black bg-[#D9D9D9] border-3 border-[#FACC15] rounded-4xl p-2";
  newListingWrapper.appendChild(titleInput);

  /* Description */
  const descriptionTitle = document.createElement("h3");
  descriptionTitle.textContent = "DESCRIPTION";
  descriptionTitle.className =
    "m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem] resize-none";
  newListingWrapper.appendChild(descriptionTitle);

  const descriptionInput = document.createElement("textarea");
  descriptionInput.placeholder = "Listing description";
  descriptionInput.className =
    "placeholder:text-[#424242] text-black bg-[#D9D9D9] border-3 border-[#FACC15] rounded-4xl p-2";
  newListingWrapper.appendChild(descriptionInput);

  /* Media images/photos */
  const mediaTitle = document.createElement("h3");
  mediaTitle.textContent = "MEDIA";
  mediaTitle.className =
    "m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem]";
  newListingWrapper.appendChild(mediaTitle);

  const mediaWrapper = document.createElement("div");
  mediaWrapper.className = "flex flex-col";
  newListingWrapper.appendChild(mediaWrapper);

  const mediaInput = document.createElement("input");
  mediaInput.placeholder = "Public URL Only";
  mediaInput.className = "placeholder:text-[#424242] text-black bg-[#D9D9D9] border-3 border-[#FACC15] rounded-4xl p-2";
  mediaWrapper.appendChild(mediaInput);

  /* info text to help the user get the public url needed for their listing */
  const helperLink = document.createElement("p");
  helperLink.innerHTML = `
  Need a public URL? Upload the image <a href="https://www.imghippo.com/" target="_blank" class="text-green-500 underline cursor-pointer">HERE</a>
  `;
  helperLink.className = "text-sm text-white font-semibold";
  newListingWrapper.appendChild(helperLink);

  /* The button that will add more media files to the listing. */
  const plussOneMediaButton = document.createElement("button");
  plussOneMediaButton.textContent = "+1";
  plussOneMediaButton.className =
"border-2 border-[#FACC15] rounded-3xl text-white text-[1.5rem] font-Poppins font-bold bg-[#059669] hover:bg-[#04875F] cursor-pointer m-auto mb-4 w-16 h-8";

  /* Onclick function to add more media inputfields for more images/photos */
  plussOneMediaButton.onclick = () => {
    const extraInputField = document.createElement("input");
    extraInputField.placeholder = "Public URL Only";
    extraInputField.className =
      "placeholder:text-[#424242] text-black bg-[#D9D9D9] border-3 border-[#FACC15] rounded-4xl p-2 mt-2 mb-2";
    mediaWrapper.appendChild(extraInputField);
  };
  newListingWrapper.appendChild(plussOneMediaButton);

  /* Deadline */
  const deadlineTittle = document.createElement("h3");
  deadlineTittle.textContent = "DEADLINE";
  deadlineTittle.className =
    "m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem]";
  newListingWrapper.appendChild(deadlineTittle);

  const deadlineInput = document.createElement("input");
  deadlineInput.type = "datetime-local";
  deadlineInput.className = "placeholder:text-[#424242] text-black bg-[#D9D9D9] border-3 border-[#FACC15] rounded-4xl p-2 mb-4";
  newListingWrapper.appendChild(deadlineInput);

  /* Publish listing button */
  const publishButton = document.createElement("button");
  publishButton.textContent = "PUBLISH LISTING";
  publishButton.className =
    "border-2 border-[#FACC15] rounded-4xl text-white text-[1.5rem] font-Poppins font-bold bg-[#059669] hover:bg-[#04875F] cursor-pointer m-auto mb-4 p-2";

  /* Creating an onclick function on the publish listing button to extract the user input from the inputfields. This function will communicate with the API */
  publishButton.onclick = async () => {
    if (!titleInput.value || !deadlineInput.value || !descriptionInput.value) {
      alert("Title, description and deadline are required!");
      return;
    }
    const mediaInputs = mediaWrapper.querySelectorAll("input");
    const media = [];

    mediaInputs.forEach((input) => {
      if (input.value.trim()) {
        media.push({
          url: input.value.trim(),
          alt: titleInput.value.trim(),
        });
      }
    });
    const listingData = {
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        endsAt: deadlineInput.value,
        media
    };
    try {
        const apiUrl = "https://v2.api.noroff.dev/auction/listings";
        const response = await fetch(apiUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "X-Noroff-API-KEY" : `${localStorage.getItem("apiKey")}`,
          },
          body: JSON.stringify(listingData),
        }
      );
      if (!response.ok) {
        throw new Error(
          "Failed to create listing! Unable to reach API Endpoint."
        );
      }
      alert("Listing created, good luck!");
    } catch (error) {
      alert("Error creating listing, check console");
      console.error(error);
    }
  };
  newListingWrapper.appendChild(publishButton);
  createNewListingMenu.appendChild(newListingWrapper);
}

/* This code will open and close the toggle hamburger menu menus */
hamburgerMenuButton.addEventListener("click", (e) => {
  e.stopPropagation();

  if (hamburgerMenuToggleVisibility) {
    closeMenu();
  } else {
    renderToggleMenu();
    openMenu();
  }
});

/* This code will open and close the new listing drop down menu */
newPostButton.addEventListener("click", (event) => {
  event.stopPropagation();
  if (createNewListingVisibility) {
    closeCreateListingMenu();
  } else {
    renderCreateListingMenu();
    openCreateListingMenu();
  }
});

/* The function for opening the toggle menu */
function openMenu() {
  hamburgerMenuToggle.style.display = "flex";
  hamburgerMenuButton.src = "https://i.imghippo.com/files/oM2664JM.png";
  hamburgerMenuToggleVisibility = true;
}
/* The function for closing the toggle menu */
function closeMenu() {
  hamburgerMenuToggle.style.display = "none";
  hamburgerMenuButton.src = "https://i.imghippo.com/files/LKqc2461NZo.png";
  hamburgerMenuToggleVisibility = false;
}

/* function for opening the toggle menu for creating listing */
function openCreateListingMenu() {
  createNewListingMenu.style.display = "flex";
  createNewListingVisibility = true;
}

/* function for closing the toggle menu for creating listing */
function closeCreateListingMenu() {
  createNewListingMenu.style.display = "none";
  createNewListingVisibility = false;
}
/* Closing function when clicked outside of the border of the element */
document.addEventListener("click", (e) => {
    const target = e.target;
    if(!hamburgerMenuToggle.contains(target) && target !== hamburgerMenuButton){
        closeMenu();
    }
  });
/* Search function for searching for different posts based on postname and user. */