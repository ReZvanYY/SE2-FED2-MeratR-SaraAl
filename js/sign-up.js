/* pulling the wanted display area from the html file, with the element id */
const mainContainer = document.getElementById("main-content-container");

/* Creating a section for the register form to be in */
const registerSection = document.createElement("section");
registerSection.id = "sign-up-section";
registerSection.className =
    "flex flex-col border-2 border-[#FACC15] rounded-4xl mt-6 bg-[#1E3A8A] w-[85%] m-auto";
mainContainer.appendChild(registerSection);

/* Creating a title for the register form */
const registerTitle = document.createElement("h1");
registerTitle.textContent = "SIGN UP";
registerTitle.className =
    "text-[#FACC15] text-center text-[2rem] font-Poppins font-bold flex flex-col mt-4 mb-4";
registerSection.appendChild(registerTitle);

/* Creating a form for the register form to be in.  */
const registerForm = document.createElement("form");
registerForm.id = "sign-up-form";
registerForm.className = "flex flex-row";
registerSection.appendChild(registerForm);

/* Creating a div for the left side to have the company logo inside as the design file. */
const logoContainer = document.createElement("div");
logoContainer.className = "flex justify-center items-start w-1/3";
/* Company logo for the register form */
const companyLogo = document.createElement("img");
companyLogo.src = "https://i.imghippo.com/files/lwZc1015Zi.png";
companyLogo.alt =
    "BidSmart logo featuring a gold gavel icon on a square background next to the word “BidSmart” in gold text, all on a transparent background.";
companyLogo.className =
    "flex w-50 h-50 justify-center items-center m-auto lg:w-100 lg:h-100";
logoContainer.appendChild(companyLogo);
registerForm.appendChild(logoContainer);

/* Creating a right side div for the form inputfields, labels, and button */
const FormContainerRight = document.createElement("div");
FormContainerRight.className = "flex flex-col w-1/2 text-white";

/* Creating label + input for the needed fields in the form */
function registerFields(labelText, id, type = "text", placeholder) {
    const container = document.createElement("div");
    container.className = "mb-3 flex flex-col";
    /* Form labels */
    const FormLabel = document.createElement("label");
    FormLabel.textContent = labelText;
    FormLabel.className =
        "mb-1 font-Poppins font-semibold text-[1.25rem] text-[#FACC15]";
    /* Form input */
    const formInput = document.createElement("input");
    formInput.id = id;
    formInput.type = type;
    formInput.placeholder = placeholder;
    formInput.className =
        "w-[75%] border-3 border-[#FACC15] rounded-4xl py-1 bg-[#E4E3E0] placeholder:text-[#5D5B5B] font-semibold text-black px-3 focus:text-[1.25rem]";
    /* appending the form label & input to the container */
    container.appendChild(FormLabel);
    container.appendChild(formInput);

    return container;
}

/* Adding the fields for input and labels */
FormContainerRight.appendChild(
    registerFields("USERNAME", "name", "text", "Jane Doe")
);
FormContainerRight.appendChild(
    registerFields("E-MAIL", "email", "email", "Example@stud.noroff.no")
);
FormContainerRight.appendChild(
    registerFields("PASSWORD", "password", "password", "Enter wanted Password")
);
FormContainerRight.appendChild(
    registerFields("CONFIRM PASSWORD", "confirm-password", "password", "Re-enter Password"
    )
);

/* Adding Success & error messages to the form */
/* Error messages */
const errorMessage = document.createElement("p");
errorMessage.className = "mt-2 text-[1rem] text-[#FF0004]";
FormContainerRight.appendChild(errorMessage);

/* success messages */
const successMessage = document.createElement("p");
successMessage.className = "mt-2 text-[1rem] text-[#FACC15]";
FormContainerRight.appendChild(successMessage);

/* Adding a submit button for the form */
const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.setAttribute("form", "sign-up-form")
submitButton.textContent = "REGISTER";
submitButton.className =
    "border-2 border-[#FACC15] rounded-4xl text-white text-[1.5rem] font-Poppins font-bold px-3 bg-[#059669] hover:bg-[#04875F] cursor-pointer lg:w-[10rem] w-[8rem] m-auto mb-4";
registerSection.appendChild(submitButton);

/* Appending the form to the main container */
registerForm.appendChild(FormContainerRight);

/* Register form submit logic */
registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    /* Clear out any error or success messages. */
    errorMessage.textContent = "";
    successMessage.textContent = "";

    /* This code retrieves the user's input from a signup form. */
    const nameInput = document.getElementById("name").value.trim();
    const emailInput = document
        .getElementById("email")
        .value.trim()
        .toLowerCase();
    const passwordInput = document.getElementById("password").value;
    const confirmPasswordInput =
        document.getElementById("confirm-password").value;

    /* Validation of the users input */
    if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
        /* Error message will be display if the fields are not filled */
        errorMessage.textContent = "All fields are required";
        return;
    }
    /* Username regex = rules for the username selection. */
    /* This regex allows uppercase, lowercase, numbers and underscore. */
    const userNameRegex = /^[A-Za-z0-9_]+$/;
    if (!userNameRegex.test(nameInput)) {
        errorMessage.textContent = "Username can only contain uppercase letters, lowercase letters, numbers and underscore.";
        return;
    }
    /* This checks the email input to validate that the email used is a @stud.noroff.no */
    if (!emailInput.endsWith("@stud.noroff.no")) {
        errorMessage.textContent = "Needs to be @stud.noroff.no address."
        return;
    }
    /* email regex = must contain atleast 1 uppercase letter, 1 lowercase letter, 1 number and atleast 8 characters long */
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (!passwordRegex.test(passwordInput)) {
        errorMessage.textContent = "Password must contain uppercase letters, lowercase letters, numbers and be 8 characters long"
        return;
    }
    /* Checking and validating that entered password and confirmed password match each other. */
    if (passwordInput !== confirmPasswordInput) {
        errorMessage.textContent = "Password do not match, try again!"
        return;
    }
    /* User Input payload preparetion for API */
    const registrationData = {
        name: nameInput,
        email: emailInput,
        password: passwordInput
    };

    /* API handling and registering */
    /* Sending the registrationData paylod to API for registration */
    try {
        const registrationResponse = await fetch("https://v2.api.noroff.dev/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registrationData),
        });
        const registeringResult = await registrationResponse.json();
        /* Checking to see if registration was a success or failure, an error message will show when failed. */
        if (!registrationResponse.ok) {
            const resultMessage = registeringResult.errors?.[0]?.message || 
            registeringResult.message || "registration Failed! try again later!";
            throw new Error(resultMessage);
        }
        /* Signing in after a successful registration */
        const loginResponse = await fetch("https://v2.api.noroff.dev/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: emailInput,
                password: passwordInput,
            }),
        });
        /* Checking the login result, if failed a error message will be shown */
        const loginResult = await loginResponse.json();

        if (!loginResponse.ok) {
            throw new Error(loginResult.message || "Login failed after registration, go to sign in page to retry.")
        }
        const { accessToken, ...userData } = loginResult.data;

        /* Saving the login data to the localStorage of the browser. */
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(userData));

        /* Creating an API Key for the user */
        const apiKeyResponse = await fetch("https://v2.api.noroff.dev/auth/create-api-key",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            },
        );
        /* Checking the json response of the API KEY creation. */
        const apiKeyResult = await apiKeyResponse.json();
        if(!apiKeyResponse.ok){
            throw new Error(apiKeyResult.message || "Failed to create the API key for the user, please try again later.")
        }
        /* If no error, the API key will be stored in the localStorage of the browser */
        localStorage.setItem("apikey", apiKeyResult.data.key);

        /* Once everything is a success, there will be displayed a success message */
        successMessage.textContent = "Happy biding, Redirecting..."
        registerForm.reset();
        /* if success, after 2 seconds the user will be redirected to the home page of the web app. */
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 2000);
        /* This will catch any errors for the API and will display it to the user as an error. */
    } catch (error) {
        errorMessage.textContent = error.message;
    }
});
