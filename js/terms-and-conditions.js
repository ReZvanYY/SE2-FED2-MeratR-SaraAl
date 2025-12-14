/* Getting the main container from the html file */
const mainContainer = document.getElementById("main-content-container");
mainContainer.innerHTML = "";

/* due to the grow function is being interferied with will create a wrapper  */
const wrapper = document.createElement("div");
wrapper.className =
  "flex flex-col m-auto border-3 border-[#FACC15] bg-[#1E3A8A] w-[80%] mt-4 mb-4 p-4";
mainContainer.appendChild(wrapper);

/* Creating the h1 title for the page. */
const pageTitle = document.createElement("h1");
pageTitle.textContent = "TERMS AND CONDITIONS";
pageTitle.className =
  "m-auto text-[2rem] text-[#FACC15] font-Poppins font-bold";
wrapper.appendChild(pageTitle);

const accordionWrapper = document.createElement("div");
accordionWrapper.className ="w-full";
wrapper.appendChild(accordionWrapper);

/* Dynamically adding the content of the page, with a eventlistener that runs when the DOM is loaded. */
document.addEventListener("DOMContentLoaded", function () {
  const termsData = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By using this website or registering for any BidSmart auction, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions, as well as our Privacy Policy",
    },
    {
      title: "2. Eligibility",
      content:
        "You must be at least 18 years old and legally capable of entering binding contracts under Norwegian law to participate in BidSmart auctions.",
    },
    {
      title: "3. Registration",
      content:
        "To bid in any auction, users must complete the registration process and provide accurate and up-to-date information. BidSmart reserves the right to approve or reject any registration at its discretion.",
    },
    {
      title: "4. Bidding Rules",
      content: `
                <ul>
                    <li>All bids are binding and cannot be withdrawn after submission.</li>
                    <li>The highest bid at the end of the auction period wins the item unless otherwise stated.</li>
                    <li>BidSmart reserves the right to extend, pause, or cancel an auction due to technical issues or other unforeseen circumstances</li>
                </ul>
            `,
    },
    {
      title: "5. Payments",
      content: `
                <ul>
                    <li>Winning bidders must complete payment within the specified timeframe outlined in the auction listing.</li>
                    <li>Accepted payment methods may include bank transfer, credit/debit card, or other methods listed during checkout.</li>
                    <li>Failure to complete payment may result in cancellation of the sale and suspension of the user’s account.</li>
                </ul>
            `,
    },
    {
      title: "6. Buyer’s Premium & Fees",
      content:
        "Some auctions may include a buyer’s premium, administrative fees, or VAT. These will be clearly stated in the auction listing and added to the final invoice.",
    },
    {
      title: "7. Item Descriptions & Condition",
      content: `
                <ul>
                    <li>All items are sold “as is” unless otherwise specified.</li>
                    <li>Descriptions and photos are provided for informational purposes and may not represent all aspects of an item’s condition.</li>
                    <li>It is the bidder’s responsibility to review all available information before placing a bid</li>
                </ul>
            `,
    },
    {
      title: "8. Collection & Shipping",
      content: `
                <ul>
                    <li>Details regarding pickup times, shipping options, or delivery costs will be included in the auction listing.</li>
                    <li>Buyers are responsible for collecting or arranging shipment of purchased items within the stated timeframe.</li>
                    <li>BidSmart is not liable for delays or damages caused by third-party shipping providers.</li>
                </ul>
            `,
    },
    {
      title: "9. User Conduct",
      content: `
            <p>Users agree not to:</p>
              <ul>
                    <li>Interfere with the proper functioning of the website or bidding system</li>
                    <li>Attempt to manipulate auction outcomes</li>
                    <li>Use fraudulent payment methods</li>
                    <li>Violate Norwegian law or infringe upon the rights of others</li>
                </ul>
            <p>Violation may result in immediate account suspension.</p>
            `,
    },
    {
      title: "10. Limitation of Liability",
      content: `
            <p>BidSmart is not responsible for:</p>
               <ul>
                    <li>Technical issues causing delays, bid errors, or website downtime</li>
                    <li>Losses incurred due to buyer or seller actions</li>
                    <li>Indirect, incidental, or consequential damages</li>
                </ul>
            <p>Our liability is limited to the fullest extent permitted by Norwegian law.</p>
            `,
    },
    {
      title: "11. Privacy",
      content:
        "Your personal information will be handled in accordance with our Privacy Policy, available on our website.",
    },
    {
      title: "12. Changes to Terms",
      content:
        "BidSmart reserves the right to modify these Terms & Conditions at any time. Changes take effect once posted on this page. Continued use of our services indicates acceptance of the updated terms.",
    },
    {
      title: "13. Governing Law",
      content:
        "These Terms & Conditions are governed by the laws of Norway. Any disputes will be handled by the appropriate Norwegian courts.",
    },
    {
      title: "14. Contact Information",
      content: `
                <p>For questions regarding these Terms & Conditions, you may contact us at:</p>
                <p>BidSmart Norway AS</p> 
                <p>Fjordgata 28</p> 
                <p>7050 Trondheim, Norway</p>
                <p>Phone: +47 55 92 31 84</p> 
                <p>Email: customerservice@bidsmart-norway.no</p>
            `,
    },
  ];

  /* will connect everything with the class main-content-container */
  const container = document.querySelector("#main-content-container .w-full");

  /* Creating a <p> for the intro text and <h2> for the label */
  const introTitle = document.createElement("h2");
  introTitle.textContent = "Terms & Conditions — BidSmart Norway AS";
  introTitle.classList =
    "text-[1.25rem] font-bold font-Poppins text-[#FACC15] mt-4 mb-4";
  container.appendChild(introTitle);

  const introParagraph = document.createElement("p");
  introParagraph.textContent =
    "Welcome to BidSmart Norway AS (“BidSmart,” “we,” “our,” or “us”). By accessing or using our website, services, or participating in any auction hosted by BidSmart, you agree to the following Terms and Conditions. Please read them carefully.";
  introParagraph.className =
    "text-md font-semibold font-Poppins text-white mb-6";
  container.appendChild(introParagraph);

  for (let i = 0; i < termsData.length; i++) {
    const item = termsData[i];

    const box = document.createElement("div");
    box.className = "";

    const toggleButton = document.createElement("button");
    toggleButton.className =
      "accordion-header flex justify-between items-center w-full p-4 text-left font-semibold text-[#FACC15] hover:bg-[#3451A4] transition duration-150 ease-in-out";
    toggleButton.innerHTML = item.title;
    toggleButton.setAttribute("data-active", "false");

    const iconSpan = document.createElement("span");
    iconSpan.className =
      "text-2xl text-[#FACC15] transform transition-transform duration-300 ease-in-out";
    iconSpan.textContent = "+";
    toggleButton.appendChild(iconSpan);

    const contentDiv = document.createElement("div");
    contentDiv.className =
      "accordion-content bg-[#1E3A8A] text-white transition-all duration-300 ease-in-out overflow-hidden max-h-0";

    const innerContent = document.createElement("div");
    innerContent.className = "prose max-w-none text-white p-4 pt-0";
    innerContent.innerHTML = item.content;
    contentDiv.appendChild(innerContent);

    box.appendChild(toggleButton);
    box.appendChild(contentDiv);
    container.appendChild(box);
  }
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const icon = this.querySelector("span");

      const wasActive = this.getAttribute("data-active") === "true";

      accordionHeaders.forEach((h) => {
        const otherContent = h.nextElementSibling;
        const otherIcon = h.querySelector("span");

        h.classList.remove("bg-[#3451A4]");
        h.setAttribute("data-active", "false");
        otherContent.style.maxHeight = null;
        otherIcon.style.transform = "rotate(0deg)";

        h.parentElement.classList.remove("rounded-b-none");
      });

      if (!wasActive) {
        this.classList.add("bg-[#3451A4]");
        this.setAttribute("data-active", "true");

        content.style.maxHeight = content.scrollHeight + "px";
        icon.style.transform = "rotate(45deg)";

        this.parentElement.classList.add("rounded-b-none");
      }
    });
  });
});
