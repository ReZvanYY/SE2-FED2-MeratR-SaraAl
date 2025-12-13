/* API Url for later use */
const apiUrl = "https://v2.api.noroff.dev/auction/listings?_active=true&sort=created&sortOrder=desc&_seller=true";
/* Connecting the main container from the HTML file */
const mainContainer = document.getElementById("main-content-container");

/* Error container */
const errorMessage = document.createElement("p");
errorMessage.className = "mt-2 text-[1rem] text-[#FF0004]";
mainContainer.appendChild(errorMessage);

/* Calling the API to fetch all listings. */
async function fetchListings() {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "X-Noroff-API-Key": `${localStorage.getItem("apiKey")}`,
      },
    });
    if(!response.ok){
        console.error("Failed to fetch listings")
    }
    /* Gets the result from the API */
    const result = await response.json();

    const sortedListings = (result.data || []).sort((a, b) =>{
        return new Date(b.created) - new Date(a.created);
    });
    renderUserListing(sortedListings);
  } catch (error) {
    console.error("Error fetching listings from API:", error);
    errorMessage.textContent = "Unable to fetch data, please try again later.";
  }
}
/* Creating a function to render the cards needed for posts. */
function renderUserListing(listings) {
  /* clearing any element in the main container */
  mainContainer.innerHTML = "";
  mainContainer.className =
    "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-4 m-auto gap-12 max-md:gap-3";

  /* Creating a fully functinal card for each listing created in this API */
  listings.forEach((post) => {
    /* Creating the container, the card itself */
    const card = document.createElement("article");
    card.className =
      "cursor-pointer bg-[#1E3A8A] border-2 border-[#FACC15] flex flex-col max-md:w-35 md:w-50 lg:w-50 xl:w-51.5 rounded-4xl m-2";
    card.onclick = () => {
        window.location.href = `/html/item-specific.html?id=${post.id}`;
    }
    /* creating the img of the cards */
    const listingImg = document.createElement("img");
    listingImg.src =
      post.media?.[0]?.url || "https://i.imghippo.com/files/Ktl1265wvk.png";
    listingImg.alt = post.media?.[0]?.alt || post.title;
    listingImg.className =
      "max-md:w-30 w-40 h-35 object-fit flex m-auto mt-2 rounded-4xl";
    card.appendChild(listingImg);

    /* Creating a wrapper for hold the information elements of the listing */
    const contentWrapper = document.createElement("div");
    contentWrapper.className = "flex flex-col items-center text-center justify-center m-auto";
    card.appendChild(contentWrapper);

    /* creating the title for the cards */
    const listingTitle = document.createElement("h2");
    listingTitle.textContent = post.title;
    listingTitle.className = "text-[#FACC15] font-Poppins font-semibold text-[1.5rem]";
    contentWrapper.appendChild(listingTitle);

    /* Sellers name on the card */
    const sellerName = document.createElement("p");
    sellerName.textContent = post.seller?.name || "Unknown Seller";
    sellerName.className = "text-white";
    contentWrapper.appendChild(sellerName)

    /* Creating the countdown for the listing in the card  */
    const countDownElement = document.createElement("p");
    countDownElement.className =
      "text-[1.25rem] text-[#FF0012] font-bold font-Poppins";
    contentWrapper.appendChild(countDownElement);

    /* Count down logic */
    function countDownCounter() {
      const timeNow = new Date();
      const endTime = new Date(post.endsAt);
      const difference = endTime - timeNow;
      /* Checking to see if the time difference is equal or less that 0 */
      /* if true, stops the countdown timer and changes the text to ENDED */
      if (difference <= 0) {
        countDownElement.textContent = "ENDED";
        clearInterval(timer);
        return;
      }
      /* Formula for calculating the time difference in days, hours, minutes, seconds */
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      /* Updating the counter to count down with days, hours, mintues, seconds */
      countDownElement.textContent = `${days} Days ${hours} Hours ${minutes} Mintues ${seconds} Seconds`;
    }
    const timer = setInterval(countDownCounter, 1000);
    countDownCounter();

    mainContainer.appendChild(card);
  });
}
fetchListings();
