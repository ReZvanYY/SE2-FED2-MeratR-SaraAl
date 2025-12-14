/* API Url for later use */
const apiUrl =
  "https://v2.api.noroff.dev/auction/listings?_active=true&sort=created&sortOrder=desc&_seller=true";
/* Connecting the main container from the HTML file */
const mainContainer = document.getElementById("main-content-container");
const carouselContainer = document.getElementById("carousel-container");

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
    if (!response.ok) {
      console.error("Failed to fetch listings");
    }
    /* Gets the result from the API */
    const result = await response.json();

    const sortedListings = (result.data || []).sort((a, b) => {
      return new Date(b.created) - new Date(a.created);
    });
    renderUserListing(sortedListings);
  } catch (error) {
    console.error("Error fetching listings from API:", error);
    errorMessage.textContent = "Unable to fetch data, please try again later.";
  }
}
/* Fetch the 20 newest listings */
async function fetchCarouselListings() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "X-Noroff-API-Key": localStorage.getItem("apiKey"),
      },
    });
    if (!response.ok) throw new Error("Failed to fetch carousel listings");
    const result = await response.json();
    const latestListings = (result.data || []).slice(0, 20);
    startCarousel(latestListings);
  } catch (error) {
    console.error("Error fetching carousel listings:", error);
    errorMessage.textContent = "Unable to fetch carousel data.";
  }
}
function createCarouselCard(post) {
  const card = document.createElement("article");
  card.className =
    "w-[90%] flex flex-col rounded-4xl border-2 border-[#FACC15] p-4 cursor-pointer bg-[#1E3A8A] hover:scale-[1.02] transition-transform m-auto mt-4";

  card.addEventListener("click", () => {
    window.location.href = `/html/item-specific.html?id=${post.id}`;
  });

  const img = document.createElement("img");
  img.src = post.media?.[0]?.url || "https://i.imghippo.com/files/Ktl1265wvk.png";
  img.alt = post.title;
  img.className = "w-full h-[12rem] object-cover rounded-4xl";
  card.appendChild(img);

  const title = document.createElement("h3");
  title.textContent = post.title;
  title.className = "text-[#FACC15] font-bold text-center mt-2";
  card.appendChild(title);

  /* Countdown timer */
  const countdown = document.createElement("p");
  countdown.className = "text-[1.15rem] text-[#FF0012] font-bold text-center mt-1";
  card.appendChild(countdown);

  function updateCountdown() {
    const now = new Date();
    const end = new Date(post.endsAt);
    const diff = end - now;

    if (diff <= 0) {
      countdown.textContent = "ENDED";
      clearInterval(timer);
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    countdown.textContent = `${d} Days ${h} Hours ${m} Minutes ${s} Seconds`;
  }

  const timer = setInterval(updateCountdown, 1000);
  updateCountdown();

  return card;
}

/* Start carousel loop */
function startCarousel(listings) {
  let index = 0;
  carouselContainer.innerHTML = "";
  carouselContainer.appendChild(createCarouselCard(listings[index]));

  setInterval(() => {
    index = (index + 1) % listings.length;
    carouselContainer.innerHTML = "";
    carouselContainer.appendChild(createCarouselCard(listings[index]));
  }, 3000); // change card every 3 seconds
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
      "w-full flex flex-col rounded-4xl p-2 border-2 border-[#FACC15] cursor-pointer hover:scale-[1.02] transition-transform bg-[#1E3A8A]";
    card.onclick = () => {
      window.location.href = `/html/item-specific.html?id=${post.id}`;
    };
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
    contentWrapper.className =
      "flex flex-col items-center text-center justify-center m-auto";
    card.appendChild(contentWrapper);

    /* creating the title for the cards */
    const listingTitle = document.createElement("h2");
    listingTitle.textContent = post.title;
    listingTitle.className =
      "text-[#FACC15] font-Poppins font-semibold text-[1.5rem]";
    contentWrapper.appendChild(listingTitle);

    /* Sellers name on the card */
    const sellerName = document.createElement("p");
    sellerName.textContent = post.seller?.name || "Unknown Seller";
    sellerName.className = "text-white";
    contentWrapper.appendChild(sellerName);

    /* Creating the countdown for the listing in the card  */
    const countDownElement = document.createElement("p");
    countDownElement.className =
      "text-[1.15rem] text-[#FF0012] font-bold font-Poppins mb-2";
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

fetchCarouselListings();
fetchListings();