# KASA - Web Application for Multimedia Product Management
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Daisy UI](https://img.shields.io/badge/Daisy%20UI-5A0EF8?logo=daisyui&logoColor=white)](https://daisyui.com/)
[![.NET](https://img.shields.io/badge/.NET-512BD4?logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![Gin Framework](https://img.shields.io/badge/Gin-blue?logo=go)](https://gin-gonic.com/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Stripe](https://img.shields.io/badge/Stripe-008CDD?logo=stripe&logoColor=white)](https://stripe.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-green?)](./LICENSE)
## Table of Contents
- [KASA - Web Application for Multimedia Product Management](#kasa---web-application-for-multimedia-product-management)
  - [Table of Contents](#table-of-contents)
  - [Background](#background)
  - [Technical Stack](#technical-stack)
  - [Install](#install)
    - [Download the app to mobile device](#download-the-app-to-mobile-device)
      - [Android](#android)
      - [iOS](#ios)
    - [Frontend (Next.js)](#frontend-nextjs)
    - [Backend (.NET Framework)](#backend-net-framework)
    - [ChatBot Backend (Gin Framework)](#chatbot-backend-gin-framework)
  - [Context of Use](#context-of-use)
  - [Features](#features)
  - [Contributors](#contributors)
  - [License](#license)

## Background

KASA is a multimedia company aiming to create a user-friendly web platform for managing and showcasing its multimedia product catalog, including PCs, mobile phones, tablets, and more. This project focuses on developing a robust system that fulfills the company’s business requirements while enhancing the customer experience.

## Technical Stack

- **Frontend:** [Next.js](https://nextjs.org/)
- **Auth Backend:** [.NET](https://dotnet.microsoft.com/)
- **Data Backend:** [.NET](https://dotnet.microsoft.com/)
- **ChatBot Backend:** [Gin Framework](https://gin-gonic.com/)
- **Database:** [SQLite](https://www.sqlite.org/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Payment Processing:** [Stripe](https://stripe.com/)
- **Styling:** [Daisy UI](https://daisyui.com/)
- **Deployment:** [Vercel](https://vercel.com/)

## Install

### Download the app to mobile device

#### Android
1.	Open the website in your browser:
	Use a browser that supports PWA installation, such as Chrome, Edge, or Firefox.
2.	Look for the installation option:
	A “Install” or “Add to Home Screen” prompt may appear automatically in the address bar or as a popup.
3.	Access the browser menu:
	If no prompt appears, tap the three-dot menu in the top-right corner of the browser.
4.	Select “Add to Home Screen”:
	In the dropdown menu, tap “Add to Home Screen” or “Install App”.


#### iOS
1.	Open the website in Safari:
	Ensure you are using the Safari browser, as it is the only browser on iOS that supports PWA installation.
2.	Access the share menu:
	Tap the Share icon (a square with an upward arrow) located at the bottom of the browser.
3.	Add to Home Screen:
	Scroll down the options and select “Add to Home Screen”.

### Frontend (Next.js)

- To install dependencies:
   ```zsh
   yarn install
   ```
- To run the application:
   ```zsh
   yarn dev
   ```

### Backend (.NET Framework)

- Ensure you have the [.NET SDK](https://dotnet.microsoft.com/download) installed. You can ckheck by running:
   ```zsh
   dotnet --version
   ```
- To build the project:
   ```zsh
   dotnet build
   ```
- To run the project:
   ```zsh
   dotnet run
   ```

### ChatBot Backend (Gin Framework)

- We compiled this backend into a binary so it can be run directly.
   ```zsh
   ./kommande-chatbot-backend
   ```

- Of course, if you wish to run the framework, you can use Golang to launch this backend. This requires you to complete a [Golang 1.22+](https://go.dev/) installation (a requirement of the Gin framework).
  ```zsh
   go mod tidy // to install dependencies
   go run main.go
   ```



## Context of Use

We, the development team, are tasked with building this platform for KASA. The company has expressed the following requirements:

1. **Product Display and Filtering**  
   The web application will display multimedia products in a visually organized manner, providing users with the ability to:
   - Browse through a comprehensive catalog.
   - Filter products by category (e.g., PCs, mobile phones, tablets).
   - Search for specific products quickly and efficiently.

2. **Enhanced User Experience**  
   To stand out in the competitive multimedia market, KASA seeks to offer a premium user experience with an intuitive and aesthetically pleasing interface. This will ensure ease of use, driving customer satisfaction and engagement.

3. **Personal Account System**  
   To foster customer loyalty, the company plans to introduce a personal account system, which will include:
   - User authentication and profile management.
   - The ability for users to create accounts, log in, and save favorite products.
   - A streamlined system for managing and tracking users’ saved items for future reference.

With these features, the company expects to create a standout multimedia e-commerce platform that not only showcases its products but also strengthens relationships with customers.



## Features

- **Product Catalog**: Displays a wide range of multimedia products with the option to sort and filter.
- **Search Functionality**: Advanced search feature to help users find products quickly.
- **User Accounts**: Allows users to create an account, log in, and save their favorite products.
- **Responsive Design**: The application will be responsive, ensuring a seamless experience on both desktop and mobile devices.
- **Secure Payments**: Integrated with Stripe for secure payment processing.

## Contributors
<a href="https://github.com/CestMerNeil/KASA/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=CestMerNeil/KASA" />
</a>
<p>
<a href="https://github.com/CestMerNeil/KASA/graphs/contributors">View contributors</a>

## License
This project is licensed under the terms of the [MIT License](./LICENSE).