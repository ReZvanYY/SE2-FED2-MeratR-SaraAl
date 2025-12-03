/* pulling the wanted display area from the html file, with the element id */
const mainContainer = document.getElementById('main-content-container');

/* Creating a section for the register form to be in */
const registerSection = document.createElement('section');
registerSection.id = 'sign-up-section';
registerSection.className = "flex flex-col border-2 border-[#FACC15] rounded-4xl mt-6 bg-[#1E3A8A] w-[85%] m-auto";
mainContainer.appendChild(registerSection);

/* Creating a title for the register form */
const registerTitle = document.createElement('h1');
registerTitle.textContent = "SIGN UP";
registerTitle.className = 'text-[#FACC15] text-center text-[2rem] font-Poppins font-bold flex flex-col mt-4 mb-4';
registerSection.appendChild(registerTitle);

/* Creating a form for the register form to be in.  */
const registerForm = document.createElement('form');
registerForm.id = 'sign-up-form';
registerForm.className = 'flex flex-row';
registerSection.appendChild(registerForm);


/* Creating a div for the left side to have the company logo inside as the design file. */
const logoContainer = document.createElement('div');
logoContainer.className = "flex justify-center items-start w-1/3";
/* Company logo */
const companyLogo = document.createElement('img');
companyLogo.src = "https://i.imghippo.com/files/lwZc1015Zi.png";
companyLogo.alt = "BidSmart logo featuring a gold gavel icon on a square background next to the word “BidSmart” in gold text, all on a transparent background.";
companyLogo.className = "flex w-50 h-50 justify-center items-center m-auto lg:w-100 lg:h-100";
logoContainer.appendChild(companyLogo);
registerForm.appendChild(logoContainer);

/* Creating a right side div for the form inputfields, labels, and button */
const FormContainerRight = document.createElement('div')
FormContainerRight.className = "flex flex-col w-1/2 text-white"


/* Creating label + input for the needed fields in the form */
function registerFields(labelText, id, type = "text", placeholder){
    const container = document.createElement('div')
    container.className ="mb-3 flex flex-col";
/* Form labels */
    const FormLabel = document.createElement("label");
    FormLabel.textContent = labelText;
    FormLabel.className = "mb-1 font-Poppins font-semibold text-[1.25rem] text-[#FACC15]";
/* Form input */
    const formInput = document.createElement('input');
    formInput.id = id;
    formInput.type = type;
    formInput.placeholder = placeholder;
    formInput.className = "w-[75%] border-3 border-[#FACC15] rounded-4xl py-1 bg-[#E4E3E0] placeholder:text-[#5D5B5B] font-semibold text-black px-3 focus:text-[1.25rem]";
/* appending the form label & input to the container */
    container.appendChild(FormLabel);
    container.appendChild(formInput);

    return container;
}

/* Adding the fields for input and labels */
FormContainerRight.appendChild(registerFields("USERNAME", "name", "text", "Jane Doe"));
FormContainerRight.appendChild(registerFields("E-MAIL", "email", "email", "Example@stud.noroff.no"));
FormContainerRight.appendChild(registerFields("PASSWORD", "password", "password", "Enter wanted Password"));
FormContainerRight.appendChild(registerFields("CONFIRM PASSWORD", "confirm-password", "password", "Re-enter Password"));

/* Adding Success & error messages to the form */
/* Error messages */
const errorMessage = document.createElement('p');
errorMessage.className = "mt-2 text-[1rem] text-[#FF0004]";
FormContainerRight.appendChild(errorMessage);
/* success messages */
const successMessage = document.createElement('p');
successMessage.className = "mt-2 text-[1rem]"
FormContainerRight.appendChild(successMessage);

/* Adding a submit button for the form */
const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = "REGISTER";
submitButton.className = "border-2 border-[#FACC15] rounded-4xl text-white text-[1.5rem] font-Poppins font-bold px-3 bg-[#059669] hover:bg-[#04875F] cursor-pointer lg:w-[10rem] w-[8rem] m-auto mb-4";
registerSection.appendChild(submitButton);

/* Appending the form to the main container */
registerForm.appendChild(FormContainerRight);