# SE2-FED2-MeratR-SaraAl
# BidSmart Norway AS

BidSmart is a web-based auction platform that allows users to register, log in, browse auction listings, place bids, and manage their profiles. The application features dynamic content rendering, live search, and secure authentication with API key management.

### This project is a collaboration between Merat Rezvany and Sara Al.

## Features
User Registration & Sign-In:
Secure sign-up and login with validation.
Supports @stud.noroff.no email addresses.

## Profile Management:
Users can edit their avatar, banner, and bio.
Display of user’s active listings and bids.

## Auction Listings:
Dynamic creation of listings with title, description, media, and deadline.
Live search for listings and users with real-time results.
Search Functionality:
Search for users or listings based on keywords.
Shows thumbnails and redirects to relevant pages.

## Terms & Conditions:
Interactive accordion for reading all policies.
Responsive UI & UX:
Hamburger menu and create listing menu toggles.
Clean Tailwind-inspired styling with hover effects and transitions.

## Demo
Currently, the application is designed to work with the Noroff API

## Technologies
Design: Figma
Frontend: Vanilla JavaScript, HTML5, CSS3, Tailwind-like styling.
API: Noroff Auction API v2
Storage: localStorage for access tokens, user info, and API keys.

## Installation
Clone the repository:
git clone <repository-url>

Install dependencies
npm install
Run the development server
npm run dev

Open index.html or any page in a browser to run the app.
Make sure to have internet access to connect to the Noroff API.

## Usage
Register a new account using sign-up.html.
Login using sign-in.html.
Browse auctions on index.html.
Search for users or listings using the search bar.
Create new listings via the “Create Listing” menu (available after login).
Manage your profile via the profile page.

## Authentication & API Keys
Access Tokens: Received after successful login and stored in localStorage.
API Keys: Automatically generated after login and stored in localStorage.
Headers for API calls include:
headers = {
  Authorization: `Bearer ${accessToken}`,
  "X-Noroff-API-KEY": apiKey,
  "Content-Type": "application/json"
}

## Search Functionality
Search bar dynamically queries listings and users.
Displays results with thumbnails, titles, and links.
Includes “No results found” message when appropriate.
Debouncing is recommended for performance improvement.
Forms & Validation

## Sign-Up:
Username: Letters, numbers, underscore.
Email: Must end with @stud.noroff.no.
Password: At least 8 characters, with uppercase, lowercase, and number.
Password confirmation must match.

## Sign-In:
Email validation for domain.
Password length minimum of 8 characters.
Terms & Conditions Page
Accordion-style expandable sections.
Smooth transitions with rotation icons.
Full legal information about eligibility, bidding rules, fees, liability, and contact.

## Contributing
Fork the repo and submit pull requests.
Ensure new features maintain consistent UI and functionality.
Validate all API interactions.