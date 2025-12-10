/* pulling the wanted display area from the html file, with the element id */
const mainContainer = document.getElementById("main-content-container");

/* Creating a section for the sign in form to be in */
const signInSection = document.createElement("section");
signInSection.id = "sign-in-section";
signInSection.className =
    "flex flex-col border-2 border-[#FACC15] rounded-4xl mt-6 bg-[#1E3A8A] w-[85%] m-auto";
mainContainer.appendChild(signInSection);

/* Creating a title for the sign in form */
const signInTitle = document.createElement("h1");
signInTitle.textContent = "SIGN IN";
signInTitle.className =
    "text-[#FACC15] text-center text-[2rem] font-Poppins font-bold flex flex-col mt-4 mb-4";
signInSection.appendChild(signInTitle);

/* Creating a form for the sign in form to be in.  */
const signInForm = document.createElement("form");
signInForm.id = "sign-in-form";
signInForm.className = "flex flex-row";
signInSection.appendChild(signInForm);

/* Creating a div for the left side to have the company logo inside as the design file. */
const logoContainer = document.createElement("div");
logoContainer.className = "flex justify-center items-start w-1/3";

/* Company logo for the sign in form */
const companyLogo = document.createElement("img");
companyLogo.src = "https://i.imghippo.com/files/lwZc1015Zi.png";
companyLogo.alt =
    "BidSmart logo featuring a gold gavel icon on a square background next to the word “BidSmart” in gold text, all on a transparent background.";
companyLogo.className =
    "flex w-50 h-50 justify-center items-center m-auto lg:w-100 lg:h-100";
logoContainer.appendChild(companyLogo);
signInForm.appendChild(logoContainer);

/* Creating a right side div for the form inputfields, labels, and button */
const FormContainerRight = document.createElement("div");
FormContainerRight.className = "flex flex-col w-1/2 text-white";

/* Creating label + input for the needed fields in the form */
function signInFields(labelText, id, type = "text", placeholder) {
    const container = document.createElement("div");
    container.className = "mt-4 flex flex-col";

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
    signInFields("E-MAIL", "email", "email", "Example@stud.noroff.no")
);
FormContainerRight.appendChild(
    signInFields("PASSWORD", "password", "password", "Enter wanted Password")
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
submitButton.setAttribute("form", "sign-in-form");
submitButton.textContent = "LOG IN";
submitButton.className =
    "border-2 border-[#FACC15] rounded-4xl text-white text-[1.5rem] font-Poppins font-bold px-3 bg-[#059669] hover:bg-[#04875F] cursor-pointer lg:w-[10rem] w-[8rem] m-auto mb-4";
signInSection.appendChild(submitButton);

/* Appending the form to the main container */
signInForm.appendChild(FormContainerRight);

/* Sign in form submit form logic */
signInForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    /* Clearing any error/success message */
    errorMessage.textContent = "";
    successMessage.textContent = "";

    /* Get user input from the form */
    const emailInput = document.getElementById("email").value.trim().toLowerCase();
    const passwordInput = document.getElementById("password").value;

    /* Validation of the user input */
    /* This will check if the user has filled both input fields that is required. */
    if (!emailInput || !passwordInput) {
        errorMessage.textContent = "Both fields are required!";
        return;
    }
    /* This will check to see if the user is the correct domain for the email. */
    if (!emailInput.endsWith("@stud.noroff.no")) {
        errorMessage.textContent = "Please make sure you have a @stud.noroff.no E-mail account.";
        return;
    }
    /* This will check if the password is within the rules of the password creation, which is 8 characters long. */
    if (passwordInput.length < 8) {
        errorMessage.textContent = "Password must be 8 characters long.";
        return;
    }
    /* Try to call the API endpoint to communicate with API */
    try {
        const loginResponse = await fetch("https://v2.api.noroff.dev/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: emailInput,
                password: passwordInput,
            }),
        });
        /* Login result after contact with API endpoint from response to result. */
        const loginResult = await loginResponse.json();

        /* Checking to see if the response is ok. if not there will be a error message. */
        if (!loginResponse.ok) {
            /* This will find the newest error if any */
            const resultMessage = loginResult.errors?.[0]?.message || loginResult.message || "Login Failed. Please check your credentials."
            throw new Error(resultMessage);
        }
        /* Extrack the user token and info */
        const { accessToken, ...userData } = loginResult.data;

        /* Storing the data into the localStorage of the browser. */
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(userData));

        /* checking to see if there is a API key present, if not creates a new. */
      const apiKeyResponse = await fetch("https://v2.api.noroff.dev/auth/create-api-key", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: "AuthKey" })
        });

        const apiKeyResult = await apiKeyResponse.json();
        if(!apiKeyResponse.ok){
            throw new Error(apiKeyResult.message || "Failed to generate API key");
        }

        localStorage.setItem("apiKey", apiKeyResult.data.key);

            /* SUCCESS!! */
            successMessage.textContent = "Welcome back! Redirecting...";
            signInForm.reset();

            setTimeout(() => {
                window.location.href = "../index.html";
            }, 2000);
        } catch (error) {
            errorMessage.textContent = error.message
        }
    });