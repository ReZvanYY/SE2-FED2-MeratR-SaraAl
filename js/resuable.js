/* This file will be used to store all of the functions that are resuable.
such as:
- drop down menus
- new listing creation
- seach functions
*/

/* Looking for the access token in local storage of the browser. */
const token = localStorage.getItem("accessToken");

/* If the local storage has an accessToken, then the user is signed in */
/* If local storage does not have an accessToken, the the user is NOT signed in */
function isSignedIn() {
  return !!token;
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


/* creating a div inside the toggle menu container to display the hamburger menu content inside. */
const hamburgerMenuToggle = document.createElement("div");
hamburgerMenuToggle.id = "hamburger-menu-content";
hamburgerMenuToggle.className = "flex flex-col border-b-3 border-r-3 border-l-3 border-[#FACC15] bg-[#1E3A8A] items-center m-auto";
hamburgerMenuToggle.style.display = "none";
dropDownArea.appendChild(hamburgerMenuToggle);

/* by default the menu vill be disabled or not visual. */
let hamburgerMenuToggleVisibility = false;

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
    welcomeMessage.className = "font-Poppins font-bold text-xl text-[#FACC15] mb-4";
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
    homeButton.className = "hover:border-b-3 w-fit m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem] cursor-pointer"
    homeButton.onclick = () => {
      window.location.href = "../index.html";
    };
    hamburgerMenuToggle.appendChild(homeButton);

    const profileButton = document.createElement("button");
    profileButton.textContent = "PROFILE";
    profileButton.className = "hover:border-b-3 w-fit m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem] cursor-pointer"
    profileButton.onclick = () => {
      window.location.href = "/html/profile-page.html";
    };
    hamburgerMenuToggle.appendChild(profileButton);

    const purchaseCreditButton = document.createElement("button");
    purchaseCreditButton.textContent = "PURCHASE CREDIT";
    purchaseCreditButton.className = "hover:border-b-3 w-fit m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem] cursor-pointer"
    purchaseCreditButton.onclick = () => {
      window.location.href = "/html/purchase-credit.html";
    };
    hamburgerMenuToggle.appendChild(purchaseCreditButton);

    const contactButton = document.createElement("button");
    contactButton.textContent = "CONTACT";
    contactButton.className = "hover:border-b-3 w-fit m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem] cursor-pointer"
    contactButton.onclick = () => {
      window.location.href = "/html/contact.html";
    };
    hamburgerMenuToggle.appendChild(contactButton);

    const signOutButton = document.createElement("button");
    signOutButton.textContent = "SIGN OUT";
    signOutButton.className = "hover:border-b-3 w-fit m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem] cursor-pointer"
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
    homeButton.className = "hover:border-b-3 w-fit m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem] cursor-pointer"
    homeButton.onclick = () => {
      window.location.href = "../index.html";
    };
    hamburgerMenuToggle.appendChild(homeButton);

    const contactButton = document.createElement("button");
    contactButton.className = "hover:border-b-3 w-fit m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem] cursor-pointer"
    contactButton.textContent = "CONTACT";
    contactButton.onclick = () => {
      window.location.href = "/html/contact.html";
    };
    hamburgerMenuToggle.appendChild(contactButton);

    const signInButton = document.createElement("button");
    signInButton.textContent = "SIGN IN";
    signInButton.className = "hover:border-b-3 w-fit m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem] cursor-pointer"
    signInButton.onclick = () => {
      window.location.href = "/html/sign-in.html";
    };
    hamburgerMenuToggle.appendChild(signInButton);

    const signUpButton = document.createElement("button");
    signUpButton.textContent = "HOME";
    signUpButton.className = "hover:border-b-3 w-fit m-2 font-Poppins font-bold text-[#FACC15] text-[1.5rem] cursor-pointer"
    signUpButton.onclick = () => {
      window.location.href = "/html/sign-up.html";
    };
    hamburgerMenuToggle.appendChild(signUpButton);
  }
}
/* This code will open and close the toggle menus */
hamburgerMenuButton.addEventListener("click", (e) =>{
    e.stopPropagation();

    if(hamburgerMenuToggleVisibility){
        closeMenu();
    } else {
        renderToggleMenu();
        openMenu();
    }
});

/* The function for opening the toggle menu */
function openMenu(){
    hamburgerMenuToggle.style.display = "flex";
    hamburgerMenuButton.src = "https://i.imghippo.com/files/oM2664JM.png";
    hamburgerMenuToggleVisibility = true;
}
/* The function for closing the toggle menu */
function closeMenu(){
hamburgerMenuToggle.style.display = "none";
hamburgerMenuButton.src = "https://i.imghippo.com/files/LKqc2461NZo.png"
hamburgerMenuToggleVisibility = false;
}

/* Closing function when clicked outside of the border of the element */
document.addEventListener("click", (e) => {
    if(!dropDownArea.contains(e.target) && e.target !== hamburgerMenuButton){
        closeMenu();
    }
});
