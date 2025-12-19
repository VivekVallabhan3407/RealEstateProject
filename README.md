# Real Estate Project

This is a Real Estate Project that is made using ReactJs and Tailwind CSS. This project aims to provide a seamless and intuitive experience for users looking to buy or rent properties. With a clean and modern user interface, users can easily browse through various real estate listings, view property details, and contact  for more information. They can save their selected properties to wishlist for future reference. Users have a option to check how much mortgage/rent they have to pay for rent of a property using built-in, easy-to-use calculator. For every action of user, toast notifications are shown for giving proper feedback to user that every action is either successful or failed.


## Features
- **Responsive Design**: The project is fully responsive, ensuring a great user experience on both desktop and mobile devices.
- **Project Showcase**: Display completed real estate projects using image cards.
- **Contact**: Users can easily contact agents through contact form.
- **Clean UI**: A modern and clean user interface for easy navigation.
- **Wishlist**: User can save their selected properties to a wihslist for future reference.
- **Pagination**: Add pagination for property listings for better viewing experience.
- **Profile Updation**: Users can update their profiles using edit profile option. 
- **Animations**: Smooth and engaging animations using Framer Motion to enhance the user experience.
- **Mortgage Calculator**: Calculator for checking how much rent would be required to give by user. Can be used by both user and owner of proeprty. It only supports Indian Rupees for now as the proeprties are based in India.
- **Notifications**: Real-time notifications using React Toastify to inform users about form submissions and other actions.


## Tech Stack
- **Frontend**: HTML, CSS, JavaScript, ReactJS, Tailwind CSS
- **Animations**: Framer Motion
- **Notifications**: React Toastify


## 📂 Project Structure:

```
RealEstateProject/
├── src/
│   ├── components
│       ├── About.jsx
│       ├── Contact.jsx
│       ├── ContactModal.jsx
│       ├── EditProfileModal.jsx
│       ├── FilterBar.jsx
│       ├── Footer.jsx
│       ├── Header.jsx
│       ├── Navbar.jsx
│       ├── Projects.jsx
│       └── Testimonials.jsx
│   ├── context
│       └── AuthContext.jsx
│   ├── data
│       └── proeprties.json
│   ├── pages
│       ├── Listings.jsx
│       ├── Login.jsx
│       ├── MortgageCalculator.jsx
│       ├── Profile.jsx
│       ├── PropertyDetails.jsx
│       ├── Signup.jsx
│       └── Wishlist.jsx
│   ├── App.cs
│   ├── App.tsx
│   ├── index.cs
│   └── main.tsx
└── index.html
```

## 🛠️ Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/<your-username>/jsonflow.git
cd jsonflow
```

### 2️⃣ Install dependencies
```bash
npm install

```

### 3️⃣ Run the project
```bash
npm run dev

```

## Future Scope

1. Multiple Images per Property: Convert each property to support a gallery of images instead of a single photo.

2. Wishlist Sync After Login: Save the wishlist to a backend or cloud database so it stays consistent across devices.

3. Contact Form Integration: Connect the “Contact Seller” form to an email service (like EmailJS or a backend API) to send real enquiries.

4. Advanced Search with Suggestions: Implement search suggestions using city names, locations, or property names as the user types.

5. Admin Dashboard (Basic): Add an admin panel to create, edit, and delete property listings easily.


## 📄 License

This project, RealEstate Project, is licensed under “All Rights Reserved.”

Copyright © 2025 Vivek Vallabhan
All rights reserved.

You are not allowed to copy, modify, share, or redistribute any part of this project in any form without explicit written permission from the author.

This project is provided for viewing and personal reference only.

## Acknowledgement

- React.js documentation

- React Router

- Tailwind CSS