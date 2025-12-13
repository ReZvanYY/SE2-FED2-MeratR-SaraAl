/* Api url for the listings */
const apiUrl = "https://v2.api.noroff.dev/auction/listings";

/* Connecting the main container from the html file */
const mainContainer = document.getElementById("main-content-container");

/* Creating an element for error messages */
const errorMessage = document.createElement("p");
errorMessage.className = "mt-4 text-[1rem] text-[#FF0004]";
mainContainer.appendChild(errorMessage);

/* searching the params for the listing ID */
const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");

/* By default the highest bid will 0, will change once someone bids */
let highestBid = 0;

/* Fetching the listing, using accessToken as a signed in mock function, needs to have API Key to communicate with API */
async function fetchSingleListing() {
  try {
    const response = await fetch(
      `${apiUrl}/${listingId}?_bids=true&_seller=true`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "X-Noroff-API-Key": `${localStorage.getItem("apiKey")}`,
        },
      }
    );
    /* Checking to see if the response is okey, if not an error will be "thrown" */
    if (!response.ok) {
      throw new Error("Failed to fetch listing");
    }
    /* if response is okey, the data will come back as result. */
    const result = await response.json();
    /* listing will not be the name of the data */
    const listing = result.data;
    /* This will check the listing and see if there are any bids made already if yes, the highest bid will change amnount */
    if (listing.bids?.length) {
      highestBid = Math.max(...listing.bids.map((bid) => bid.amount));
    }

    renderItemPage(listing);
    /* this will check for any errors while loading the listing, if found the error message element will display a error message to the user */
  } catch (loadListingerror) {
    console.error(loadListingerror);
    errorMessage.textContent =
      "Unable to load listing. Please try again later.";
  }
}

/* A function that will render and display the html needed */
function renderItemPage(listing) {
  mainContainer.innerHTML = "";
  mainContainer.className =
    "grow";

  /* A section div for the left column items for placement */
  const leftColumn = document.createElement("section");
  leftColumn.className = "";

  const itemGrid = document.createElement("div");
  itemGrid.className = "grid grid-cols-1 md:grid-cols-2 items-stretch";

  /* Creating a wrapper for the media, if no media is found a default will be displayed */
  const imageWrapper = document.createElement("div");
  imageWrapper.className = "flex justify-center mt-2 mb-2 h-fit";

  /* Creating the images and getting all of them from the API */
  const itemImage = document.createElement("img");
  itemImage.src =
    listing.media?.[0]?.url || "https://i.imghippo.com/files/Ktl1265wvk.png";
  itemImage.alt = listing.media?.[0]?.alt || listing.title;
  itemImage.className = "border-3 border-[#FACC15] rounded-4xl w-full h-full";

  imageWrapper.appendChild(itemImage);

  /* Creating a wrapper to hold all of the text such as, title, description, seller info, bidcount, endtime, countdown, bid buttom , bid input area, bid label */
  const detailsWrapper = document.createElement("div");
  detailsWrapper.className =
    "border-3 border-[#FACC15] bg-[#1E3A8A] rounded-4xl text-white flex flex-col gap-4 text-center p-2 h-fit";

  /* Creating the title of the listing */
  const auctionItemTitle = document.createElement("h1");
  auctionItemTitle.textContent = listing.title;
  auctionItemTitle.className =
    "text-[#FACC15] text-[2rem] text-center font-semibold";

    /* Creating the description of the listing */
  const auctionItemDescription = document.createElement("p");
  auctionItemDescription.className = "text-md text-center"
  auctionItemDescription.textContent =
    listing.description || "No description provided";

    /* Displaying the seller */
  const auctionItemSeller = document.createElement("p");
  auctionItemSeller.textContent = `Seller: ${
    listing.seller?.name || "Unknown"}`;
  auctionItemSeller.className = "text-md";

  /* Creating a counter that tells the buyer how many bids has been placed */
  const auctionItemBidCount = document.createElement("p");
  auctionItemBidCount.textContent = `Total bids: ${listing._count.bids}`;
  auctionItemBidCount.className = "text-[#FACC15] font-semibold";

  /* Creating the end time, the countdown */
  const auctionItemEndTime = document.createElement("p");
  auctionItemEndTime.className = "text-[#FF0012] font-bold";

  /* Countdown function for the end time */
  function countDownTimer() {
    const now = new Date();
    const end = new Date(listing.endsAt);
    const diff = end - now;
    
    /* Checks to see if the differense is less or equal to 0 if yes, then the countdown stops and endtime textcontent will be "ENDED" */
    if (diff <= 0) {
      auctionItemEndTime.textContent = "ENDED";
      clearInterval(timer);
      return;
    }
    
    /* Quick maths to make sure that the days hours minutes and seconds are correctly counted. */
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    /* Countdown displayed timer */
    auctionItemEndTime.textContent = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
  }

  /* This code will countdown and 1000 is the same as 1 second. */
  const timer = setInterval(countDownTimer, 1000);
  countDownTimer();

  /* Creating a wrapper for the bidding part of the page */
  const bidWrapper = document.createElement("div");
  bidWrapper.className = "mt-4 flex flex-col gap-2";
  
  /* Creating a wrapper for the label and input */
  const labelandInputWrapper = document.createElement("div");
  labelandInputWrapper.className = "flex flex-row gap-2 items-center justify-center";

  /* Creating a label for the input field */
  const bidLabel = document.createElement("p");
  bidLabel.textContent = "Bid on this item!";
  bidLabel.className = "text-md font-bold font-Poppins"
    
  /* Creating the bid input */
  const bidInput = document.createElement("input");
  bidInput.type = "number";
  bidInput.placeholder = `Minimum bid: ${highestBid + 1}`;
  bidInput.className = "rounded-4xl w-fit text-center p-2 text-black w-40 bg-[#E4E3E0] placeholder:text-[#5D5B5B] border-3 border-[#FACC15]";
  /* Creating the bid button and adding a eventlistener to make sure that the function are working. */
  const bidButton = document.createElement("button");
  bidButton.textContent = "BID";
  bidButton.className =
    "mt-2 mb-4 border-3 border-[#FACC15] text-center m-auto w-fit px-10 py-2 rounded-4xl bg-[#059669] hover:bg-[#04875F] cursor-pointer";
 /* The addEventListener that take the value of the users input in the bidInput field, and submits the input */
  bidButton.addEventListener("click", () => {
    const amount = Number(bidInput.value);
    submitBid(listing.id, amount);
  });
  labelandInputWrapper.append(bidLabel, bidInput)
  bidWrapper.append(labelandInputWrapper, bidButton);

  detailsWrapper.append(
    auctionItemTitle,
    auctionItemDescription,
    auctionItemSeller,
    auctionItemBidCount,
    auctionItemEndTime,
    bidWrapper
  );

  itemGrid.append(imageWrapper, detailsWrapper);
  leftColumn.appendChild(itemGrid);

  /* The box for the bidding history */
  const bidHistory = document.createElement("aside");
  bidHistory.className =
    "border-3 border-[#FACC15] bg-[#1E3A8A] rounded-4xl p-4 text-white";
  /* the h2 title of the box the word (BID HISTROY) */
  const historyTitle = document.createElement("h2");
  historyTitle.textContent = "BID HISTORY";
  historyTitle.className = "text-[#FACC15] font-semibold mb-2";

  bidHistory.appendChild(historyTitle);
  /* An if statement that checks the listing for bids, if none found the text "No bids yet" will be displayed in the bid box */
  if (!listing.bids || listing.bids.length === 0) {
    const noBids = document.createElement("p");
    noBids.textContent = "No bids yet";
    bidHistory.appendChild(noBids);
  } else {
    /* if the state found 1 or several bids the bids will be displayed. The statement will display; Username : $amount */
    listing.bids
      .slice()
      .reverse()
      .forEach((bid) => {
        const bidEntry = document.createElement("p");
        bidEntry.textContent = `${bid.bidder.name}: $${bid.amount}`;
        bidHistory.appendChild(bidEntry);
      });
  }

  mainContainer.append(leftColumn, bidHistory);
}

/* The function that submits the bid that user has given in the input field */
async function submitBid(listingId, amount) {
    /* Checks to see if the amount that the user has submitted is higher than the last bid. */
    /* if not, the user will be given an alert that informs the user about the last bid amount */
  if (amount <= highestBid) {
    alert(`Bid must be higher than current highest bid ${highestBid}`);
    return;
  }
/* if the bid is higher than the submitted amount is taken and posted to the API */
  try {
    const response = await fetch(`${apiUrl}/${listingId}/bids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "X-Noroff-API-Key": `${localStorage.getItem("apiKey")}`,
      },
      body: JSON.stringify({ amount }),
    });
    /* Checks to see if the POST request was successful or not, if failed the user will get an error */
    if (!response.ok) {
      throw new Error("Bid failed");
    }

    location.reload();
    /* if the there are any issues then the catch condition will capture the issue and alert the user. */
  } catch (error) {
    console.error(error);
    alert("Unable to place bid");
  }
}

/* Calls the functions */
fetchSingleListing();
