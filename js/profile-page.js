/* Check to see if the user is signed in. Checks after the accessToken given after sign in and sign up. */
function isSignedIn() {
  return !!localStorage.getItem("accessToken");
}
/* Extract name from localStorage */
function getNameFromStorage() {
  const params = new URLSearchParams(window.location.search);
  return params.get("name");
}
/* A function what will extract the stored name from the data known as user */
function getLoggedInUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
}
/* removing the html tags once the user wants to change their bio, profile picture or banner */
function stripHtml(htmlString) {
  if (!htmlString) return "";
  const temp = document.createElement("div");
  temp.innerHTML = htmlString;
  return temp.textContent || temp.innerText || "";
}
/* Api base url to make sure that I can change the url based on needs. */
const baseApiUrl = "https://v2.api.noroff.dev";

/* Getting updated profile info from the API to stay up with any changes. */
async function fetchProfile(name) {
  /* This is the API url for fetching a specific profile. */
  const fetchProfileUrl = `${baseApiUrl}/auction/profiles/${encodeURIComponent(
    name
  )}`;

  /* API options */
  const headers = { "Content-Type": "application/json" };
  const token = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");

  /* if the token and apikey is found the token will be used as Authorization and if apikey is found it is used as the noroff api key for access. */
  if (token) headers.Authorization = `Bearer ${token}`;
  if (apiKey) headers["X-Noroff-API-KEY"] = apiKey;

  /* Sending a fetch request to the the API to start the data extraction */
  const fetchProfileResponse = await fetch(fetchProfileUrl, { headers });
  if (!fetchProfileResponse.ok) {
    throw new Error(
      "Unable to fetch the profile!",
      fetchProfileResponse.status
    );
  }
  /* creating a constant that will be checking the result of the response that is being sent out */
  const profileResultData = await fetchProfileResponse.json();
  return profileResultData.data;
}

/* Fetching the listing the user has made. */
async function fetchUserListings(name) {
  /* This is the API url for fetching a specific profile. */
  const fetchListingUrl = `${baseApiUrl}/auction/profiles/${encodeURIComponent(
    name
  )}/listings?_bids=true`;

  /* API options */
  const headers = { "Content-Type": "application/json" };
  const token = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");

  /* if the token and apikey is found the token will be used as Authorization and if apikey is found it is used as the noroff api key for access. */
  if (token) headers.Authorization = `Bearer ${token}`;
  if (apiKey) headers["X-Noroff-API-KEY"] = apiKey;

  /* Sending a fetch request to the the API to start the data extraction */
  const fetchListingResponse = await fetch(fetchListingUrl, { headers });
  if (!fetchListingResponse.ok) {
    throw new Error("Unable to fetch listings", fetchListingResponse.status);
  }
  /* creating a constant that will be checking the result of the response that is being sent out */
  const listingResultData = await fetchListingResponse.json();
  return listingResultData.data;
}

/* Fetching the users bidding history */
async function fetchUserBids(name) {
  /* This is the API url for fetching a specific profile. */
  const fetchBidsUrl = `${baseApiUrl}/auction/profiles/${encodeURIComponent(
    name
  )}/listings?_bids=true`;

  /* API options */
  const headers = { "Content-Type": "application/json" };
  const token = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");

  /* if the token and apikey is found the token will be used as Authorization and if apikey is found it is used as the noroff api key for access. */
  if (token) headers.Authorization = `Bearer ${token}`;
  if (apiKey) headers["X-Noroff-API-KEY"] = apiKey;

  /* Sending a fetch request to the the API to start the data extraction */
  const fetchBidsResponse = await fetch(fetchBidsUrl, { headers });
  if (!fetchBidsResponse.ok) {
    throw new Error(
      "Unable to fetch bidding history",
      fetchBidsResponse.status
    );
  }
  /* creating a constant that will be checking the result of the response that is being sent out */
  const bidsResultData = await fetchBidsResponse.json();
  return bidsResultData.data;
}

/* A function that will allows the user to change their profile picture, banner and bio whenever */
async function updateProfileInfo(name, { avatarUrl, bannerUrl, bio }) {
  /* This is the API url for fetching a specific profile. */
  const updateProfileUrl = `${baseApiUrl}/auction/profiles/${encodeURIComponent(
    name
  )}`;

  /* API options */
  const headers = { "Content-Type": "application/json" };
  const token = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");

  /* if the token and apikey is found the token will be used as Authorization and if apikey is found it is used as the noroff api key for access. */
  if (token) headers.Authorization = `Bearer ${token}`;
  if (apiKey) headers["X-Noroff-API-KEY"] = apiKey;

  /* Creating the body tag so the user can enter the new updated info */
  const body = {};

  /* checking to see if there is a avatar url and alt text adding the value to the body tag */
  if (avatarUrl) {
    body.avatar = {
      url: avatarUrl,
      alt: `${name}'s avatar`,
    };
  }

  /* checking to see if there is a banner url and alt text adding the value to the body tag */
  if (bannerUrl) {
    body.banner = {
      url: bannerUrl,
      alt: `${name}'s banner`,
    };
  }
  /* checking to see if there is any bio if there is any, add the value to the body tag */
  if (bio !== undefined) {
    body.bio = bio;
  }
  /* Sending a fetch request to the the API to start the data extraction */
  const updateProfileResponse = await fetch(updateProfileUrl, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });

  if (!updateProfileResponse.ok) {
    throw new Error(
      "Failed to update the profile",
      updateProfileResponse.status
    );
  }
  /* creating a constant that will be checking the result of the response that is being sent out */
  const updateProfileResultData = await updateProfileResponse.json();
  return updateProfileResultData.data;
}

/* function to create the main content in the profile page. */
function buildProfileLayout() {
  /* connecting the main element tag to the the script */
  const mainContent = document.getElementById("main-content-container");
  if (!mainContent) return null;

  /* clearing out all of the previous innerHTML to always have the updated details*/
  mainContent.innerHTML = "";

  /* Creating a wrapper for the content of the main content */
  const profileWrapper = document.createElement("div");
  profileWrapper.className = "flex flex-col items-center";

  /* Creating a section for the content */
  const profileSection = document.createElement("section");
  profileSection.className = "";

  /* Creating a container for the banner and put the banner inside the container */
  const bannerContainer = document.createElement("div");
  bannerContainer.className = "w-full object-cover overflow-hidden";

  const bannerImg = document.createElement("img");
  bannerImg.id = "profile-banner";
  bannerImg.className = "w-full object-cover";
  bannerImg.alt = "profile-banner";

  /* appending the bannerImg to the bannerContainer then appending the container to the profileSection */
  bannerContainer.appendChild(bannerImg);
  profileSection.appendChild(bannerContainer);

  /* Creating a container for the top section of the section for the profile picture, username, bio, profile settings, and credit available */
  const topSectionContainer = document.createElement("div");
  topSectionContainer.className = "flex flex-row items-start";

  /* Creating the profile picture element inside a wrapper for placement */
  const profileAvatarWrapper = document.createElement("div");
  profileAvatarWrapper.className =
    "w-30 h-30 rounded-full overflow-hidden border-3 border-[#FACC15]";

  /* Creating the element for the profile picture */
  const profileAvatar = document.createElement("img");
  profileAvatar.id = "profile-picture";
  profileAvatar.alt = "Current profile picture for the user";

  profileAvatarWrapper.appendChild(profileAvatar);
  topSectionContainer.appendChild(profileAvatarWrapper);

  /* Creating a wrapper for the username, bio, credit available and profile settings button for easier placement. */
  const textAndButtonWrapper = document.createElement("div");
  textAndButtonWrapper.className = "flex-1 flex flex-col gap-3";

  /* Creating the element for the profile Username */
  const userName = document.createElement("h1");
  userName.className =
    "text-[1.25rem] text-center font-bold font-Poppins text-black";
  userName.id = "profile-username";
  textAndButtonWrapper.appendChild(userName);

  /* Creating the element for the profile Bio */
  const bio = document.createElement("textarea");
  bio.className =
    "text-[1rem] text-center font-semibold font-Poppins text-black resize-none";
  bio.id = "profile-bio";
  textAndButtonWrapper.appendChild(bio);

  /* Creating the element for the profile Credit Available */
  const creditAvailable = document.createElement("p");
  creditAvailable.className =
    "text-[1.25rem] text-center font-bold font-Poppins text-black";
  creditAvailable.id = "profile-credit-available";
  textAndButtonWrapper.appendChild(creditAvailable);

  /* Creating the a wrapper for the button due to placement  */
  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "flex justify-end mt-2";

  /* Creating the element for the profile Profile settings button */
  const profileSettingsButton = document.createElement("button");
  profileSettingsButton.textContent = "PROFILE SETTINGS";
  profileSettingsButton.className =
    "border-2 border-[#FACC15] rounded-4xl text-white text-[1.25rem] font-Poppins font-bold bg-[#059669] hover:bg-[#04875F] cursor-pointer";
  profileSettingsButton.id = "profile-settings-button";
  textAndButtonWrapper.appendChild(profileSettingsButton);

  buttonWrapper.appendChild(profileSettingsButton);
  textAndButtonWrapper.appendChild(buttonWrapper);

  /* Creating the settings menu */
  const profileSettingsMenu = document.createElement("div");
  profileSettingsMenu.id = "profile-settings-menu";
  profileSettingsMenu.className = "flex flex-col mt-3 hidden";

  /* Creating the change profile picture button inside the settings menu */
  const changeAvatarButton = document.createElement("button");
  changeAvatarButton.id = "change-avatar-button";
  changeAvatarButton.textContent = "CHANGE PROFILE PICTURE";
  changeAvatarButton.className =
    "border-2 border-[#FACC15] rounded-4xl text-white text-[1.25rem] font-Poppins font-bold bg-[#059669] hover:bg-[#04875F] cursor-pointer";
  profileSettingsMenu.appendChild(changeAvatarButton);

  /* Creating the change profile banner button inside the settings menu */
  const changeBannerButton = document.createElement("button");
  changeBannerButton.id = "change-banner-button";
  changeBannerButton.textContent = "CHANGE PROFILE BANNER";
  changeBannerButton.className =
    "border-2 border-[#FACC15] rounded-4xl text-white text-[1.25rem] font-Poppins font-bold bg-[#059669] hover:bg-[#04875F] cursor-pointer";
  profileSettingsMenu.appendChild(changeBannerButton);

  /* Creating the change profile bio button inside the settings menu */
  const changeBioButton = document.createElement("button");
  changeBioButton.id = "change-bio-button";
  changeBioButton.textContent = "CHANGE BIO";
  changeBioButton.className =
    "border-2 border-[#FACC15] rounded-4xl text-white text-[1.25rem] font-Poppins font-bold bg-[#059669] hover:bg-[#04875F] cursor-pointer";
  profileSettingsMenu.appendChild(changeBioButton);

  /* Appending everything together with the correct Parent/child relation */
  textAndButtonWrapper.appendChild(profileSettingsMenu);
  topSectionContainer.appendChild(textAndButtonWrapper);
  profileSection.appendChild(topSectionContainer);

  /* Creating a section for the users created listings. */
  const createdListingSection = document.createElement("section");
  createdListingSection.className =
    "bg-[#1E3A8A] border-3 border-[#FACC15] rounded-4xl overflow-hidden";

  /* creating listed item section box  */
  const listingItemContainer = document.createElement("div");
  listingItemContainer.className =
    "w-[75%] bg-[#E4E3E0] border-3 border-[#FACC15] text-center p-2";

  /* Creating the title for the section box. */
  const sectionTitle = document.createElement("h1");
  sectionTitle.className =
    "font-Poppins font-bold text-[1.5rem] text-[#FACC15] mt-2";

  listingItemContainer.appendChild(sectionTitle);
  createdListingSection.appendChild(listingItemContainer);

  /* Creating a container for placement and flex-col */
  const createdContainer = document.createElement("div");
  createdContainer.id = "profile-created-listing-container";
  createdContainer.className = "flex flex-col gap-3 p-4";

  createdListingSection.appendChild(createdContainer);
  profileWrapper.appendChild(createdListingSection);

  /* Bidding history section box */
  const bidsSection = document.createElement("section");
  bidsSection.className =
    "bg-[#1E3A8A] border-3 border-[#FACC15] rounded-4xl overflow-hidden";

  /* creating listed item section box  */
  const bidsItemContainer = document.createElement("div");
  bidsItemContainer.className =
    "w-[75%] bg-[#E4E3E0] border-3 border-[#FACC15] text-center p-2";

  /* Creating the title for the section box. */
  const bidsSectionTitle = document.createElement("h1");
  bidsSectionTitle.className =
    "font-Poppins font-bold text-[1.5rem] text-[#FACC15] mt-2";

  bidsItemContainer.appendChild(bidsSectionTitle);
  createdListingSection.appendChild(bidsItemContainer);

  /* Creating a container for placement and flex-col */
  const biddedContainer = document.createElement("div");
  biddedContainer.id = "profile-bidded-container";
  biddedContainer.className = "flex flex-col gap-3 p-4";

  bidsSection.appendChild(biddedContainer);
  profileWrapper.appendChild(bidsSection);
  mainContent.appendChild(profileWrapper);

  return {
    bannerImg,
    profileAvatar,
    userName,
    bio,
    creditAvailable,
    profileSettingsButton,
    changeAvatarButton,
    changeBannerButton,
    changeBioButton,
    createdContainer,
    biddedContainer,
  };
}
/* The function for inline edit of the listing */
function inlineEditListing(listing, rowElement) {
  if (rowElement.querySelector(".inline-edit-form")) return;

  /* Creating the form. */
  const inlineEditForm = document.createElement("div");
  inlineEditForm.className = "inline-edit-form flex flex-col";

  /* title label and input in the form */
  /* Label */
  const editFormTitleLabel = document.createElement("h3");
  editFormTitleLabel.textContent = "LISTING TITLE";
  editFormTitleLabel.className =
    "font-Poppins font-bold text-[#FACC15] text-[1.25rem] text-center m-2";
  inlineEditForm.appendChild(editFormTitleLabel);

  /* Inputfield */
  const editFormTitleInput = document.createElement("input");
  editFormTitleInput.id = "edit-title";
  editFormTitleInput.className = "border-3 border-[#FACC15] p-2 rounded-4xl";
  editFormTitleInput.placeholder = "Listing Title";
  editFormTitleInput.value = listing.title || "No title yet";
  inlineEditForm.appendChild(editFormTitleInput);

  /* description label and textarea in the form */
  /* Label */
  const editFormDescriptionLabel = document.createElement("h3");
  editFormDescriptionLabel.textContent = "DESCRIPTION";
  editFormDescriptionLabel.className =
    "font-Poppins font-bold text-[#FACC15] text-[1.25rem] text-center m-2";
  inlineEditForm.appendChild(editFormDescriptionLabel);

  /* Inputfield */
  const editFormDescriptionTextarea = document.createElement("textarea");
  editFormDescriptionTextarea.id = "edit-description";
  editFormDescriptionTextarea.className =
    "border-3 border-[#FACC15] p-2 rounded-4xl";
  editFormDescriptionTextarea.placeholder = "Listing description";
  editFormDescriptionTextarea.value =
    listing.description || "No description yet";
  inlineEditForm.appendChild(editFormDescriptionTextarea);

  /* Media label and input in the form */
  /* Label */
  const editFormMediaLabel = document.createElement("h3");
  editFormMediaLabel.textContent = "MEDIA";
  editFormMediaLabel.className =
    "font-Poppins font-bold text-[#FACC15] text-[1.25rem] text-center m-2";
  inlineEditForm.appendChild(editFormMediaLabel);

  /* Inputfield */
  const editFormMediaInput = document.createElement("input");
  editFormMediaInput.id = "edit-media";
  editFormMediaInput.className = "border-3 border-[#FACC15] p-2 rounded-4xl";
  editFormMediaInput.placeholder = "Only Public URL";
  editFormMediaInput.value =
    (listing.media && listing.media[0] && listing.media[0].url) ||
    "No Media found";
  inlineEditForm.appendChild(editFormMediaInput);

  /* Helper text */
  const helperLink = document.createElement("p");
  helperLink.innerHTML = `
  Need a public URL? Upload the image <a href="https://www.imghippo.com/" target="_blank" class="text-green-500 underline cursor-pointer">HERE</a>
  `;
  helperLink.className = "text-sm text-white font-semibold";
  inlineEditForm.appendChild(helperLink);

  /* SAVE and CANCEL button container */
  const editFormActionButtonsContainer = document.createElement("div");
  editFormActionButtonsContainer.className = "flex flex-row gap-3";

  /* SAVE button */
  const editFormSaveButton = document.createElement("button");
  editFormSaveButton.id = "save-button";
  editFormSaveButton.textContent = "SAVE CHANGES";
  editFormSaveButton.className =
    "font-bold font-Poppins text-[1.25rem] text-white text-center m-2 bg-[#059669] hover:bg-[#04875F] border-2 border-[#FACC15] rounded-4xl cursor-pointer";
  editFormActionButtonsContainer.appendChild(editFormSaveButton);

  /* Cancel button */
  const editFormCancelButton = document.createElement("button");
  editFormCancelButton.id = "cancel-button";
  editFormCancelButton.textContent = "CANCEL CHANGES";
  editFormCancelButton.className =
    "font-bold font-Poppins text-[1.25rem] text-center m-2 bg-[#FF0004] hover:bg-[#D40003] border-2 border-[#FACC15] rounded-4xl cursor-pointer";
  editFormActionButtonsContainer.appendChild(editFormCancelButton);

  inlineEditForm.appendChild(editFormActionButtonsContainer);
  rowElement.appendChild(inlineEditForm);

  /* Edit event callers */
  /* This code will cancel the form and do nothing with the listing */
  editFormCancelButton.onclick = () => inlineEditForm.remove();

  /* Save edit onclick function */
  editFormSaveButton.onclick = async () => {
    /* get the value of the user input for the title, description and media changes */
    const newUpdatedTitle = editFormTitleInput.value.trim();
    const newUpdatedDescription = editFormDescriptionTextarea.value.trim();
    const newUpdatedMediaUrl = editFormMediaInput.value.trim();

    /* Getting together a data payload to be sent to API with updated data for the listing */
    const updateListingData = {
      title: newUpdatedTitle || listing.title,
      description: newUpdatedDescription || listing.description,
    };
    if (newUpdatedMediaUrl) {
      updateListingData.media = [
        {
          url: newUpdatedMediaUrl,
          alt:
            newUpdatedTitle ||
            `Image for the listing: ${listing.title}` ||
            "listing image",
        },
      ];
    }
    try {
      await updateListing(listing.id, updateListingData);
      alert("Listing Updated");
      initProfilePage();
    } catch (updateError) {
      alert("Unable to update listing");
      console.error(updateError);
    }
  };
}

/* A function for fetching the listings */
function createListingRow(listing, withActions = false) {
  const mainRow = document.createElement("div");
  mainRow.className =
    "flex flex-row items-center justify-between border-3 border-[#FACC15] rounded-4xl p-2";

  /* Listing title for the profile */
  const listingTitle = document.createElement("p");
  listingTitle.textContent = listing.title || "Auction item name";
  listingTitle.className = "Font-Poppins text-[1.1rem] text-black";
  mainRow.appendChild(listingTitle);

  /* Creating the action calling buttons and containers */
  if (withActions) {
    const actionButtonsContainer = document.createElement("div");
    actionButtonsContainer.className = "flex flex-row gap-2";

    /* EDIT button */
    const editButton = document.createElement("button");
    editButton.textContent = "EDIT";
    editButton.className =
      "bg-[#4B0596] hover:bg-[#6D34A9] border-2 border-[#FACC15] rounded-4xl text-center text-[1.25rem] text-white cursor-pointer";
    actionButtonsContainer.appendChild(editButton);

    /* DELETE button */
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "DELETE";
    deleteButton.className =
      "bg-[#FF0004] hover:bg-[#D40003] border-2 border-[#FACC15] rounded-4xl text-center text-[1.25rem] text-white cursor-pointer";
    actionButtonsContainer.appendChild(editButton);

    mainRow.appendChild(actionButtonsContainer);

    /* Adding the onclick function for the edit button */
    editButton.onclick = () => {
      inlineEditListing(listing, mainRow);
    };

    /* Adding the onclick function for the delete button */
    deleteButton.onclick = async () => {
      const confirmDelete = confirm(
        "Are you sure you want to delete? This action cannot be reversed!"
      );
      if (!confirmDelete) {
        return;
      }

      try {
        await deleteListing(listing.id);
        alert("listing deleted!");
        mainRow.remove();
      } catch (deleteError) {
        alert("Unable to delete the listing");
        console.error(deleteError);
      }
    };
    /* If the listing row is clicked and not the buttons then it will send the user to the listing */
  } else {
    mainRow.className = "cursor-pointer";
    mainRow.onclick = () => {
      window.location.href = `/html/item-specific.html?id=${listing.id}`;
    };
  }
  return mainRow;
}

/* Rendering the UI for the profile */
function renderProfile(profile, uiElements) {
  const {
    bannerImg,
    profileAvatar,
    userName,
    bio,
    creditAvailable,
    profileSettingsButton,
    changeAvatarButton,
    changeBannerButton,
    changeBioButton,
  } = uiElements;

  /* Checking to find the profile. */
  if (!profile) {
    if (userName) {
      userName.textContent = "PROFILE NOT FOUND!";
    }
    return;
  }
  /* rendering and validating the banner src */
  if (bannerImg && profile.banner && profile.banner.url) {
    bannerImg.src = profile.banner.url;
  }

  /* Checking for the username of the profile and rendering */
  if (userName) {
    userName.textContent = profile.name || "Unknown user";
  }

  /* Checking for the bio of the profile and rendering */
  if (bio) {
    bio.value = stripHtml(profile.bio || "No bio yet");
  }

  /* Checking for credit available */
  if (creditAvailable) {
    if (typeof profile.credits === "number") {
      creditAvailable.textContent = `CREDITS: ${profile.credits}`;
    } else {
      creditAvailable.textContent = "NO CREDIT FOUND";
    }
  }
  /* Making sure that the user is the owner of the profile page */
  const loggedInUser = getLoggedInUser();
  const isOwnProfile =
    isSignedIn() &&
    loggedInUser.name &&
    profile.name &&
    loggedInUser.name.toLowerCase() === profile.name.toLowerCase();

  /* if the user is the owner, then the profile page will display the profile settings button for the user to interact with */
  if (isOwnProfile) {
    if (profileSettingsButton) {
      profileSettingsButton.onclick = () => {
        const menu = document.getElementById("profile-settings-menu");
        if (menu) menu.classList.toggle("hidden");
      };
    }
    /* Still inside the isOwnProfile if statement if true, the user will get the possibility to change their avatar */
    if (changeAvatarButton) {
      changeAvatarButton.onclick = async () => {
        const newUrl = prompt("Enter a new public image URL:");
        if (!newUrl) return;
        try {
          const updatedAvatar = await updateProfileInfo(profile.name, {
            avatarUrl: newUrl.trim(),
          });
          renderProfile(updatedAvatar, uiElements);
          alert("Profile Picture updated!");
        } catch (ProfilePictureUpdateError) {
          console.log(ProfilePictureUpdateError);
          alert("Unable to update the profile picture");
        }
      };
    }
    /* Still inside the isOwnProfile if statement if true, the user will get the possibility to change their bio */
    if (changeBioButton) {
      changeBioButton.onclick = async () => {
        const currentPlainBio = stripHtml(profile.bio || "No Bio found");
        const newBio = prompt("Update your bio:", currentPlainBio);
        if (newBio === null) return;
        try {
          const updatedBio = await updateProfileInfo(profile.bio, {
            bio: newBio.trim(),
          });
          renderProfile(updatedBio, uiElements);
          alert("Bio updated!");
        } catch (bioUpdateError) {
          console.log(bioUpdateError);
          alert("Unable to update the bio");
        }
      };
    }
    /* Still inside the isOwnProfile if statement if true, the user will get the possibility to change their avatar */
    if (changeBannerButton) {
      changeBannerButton.onclick = async () => {
        const newBannerUrl = prompt("Enter a new banner image PUBLIC URL");
        if (!newBannerUrl) return;
        try {
          const updatedBanner = await updateProfileInfo(profile.name, {
            bannerUrl: newBannerUrl.trim(),
          });
          renderProfile(updatedBanner, uiElements);
          alert("Profile banner updated!");
        } catch (bannerUpdateError) {
          console.log(bannerUpdateError);
          alert("Unable to update the profile banner");
        }
      };
    }
  } else {
    if(profileSettingsButton){
        profileSettingsButton.style.display = "none"
    }
  }
}
