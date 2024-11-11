DonateLife - A Blood Bank Platform
Overview
DonateLife is a full-stack blood bank management application designed to connect blood donors with recipients. It streamlines the process of blood donation by providing an intuitive interface for users to register as donors, search for blood groups, and request donations. This platform is built using the MERN stack (MongoDB, Express.js, React, Node.js).

Features:-
Donor Registration: Allows users to register as blood donors with their details and blood group.

Recipient Search: Enables users to search for available blood groups and contact potential donors.

Blood Requests: Facilitates users in raising requests for required blood types.

Admin Dashboard: Manages users, donation requests, and ensures data security and system integrity.
User Authentication: Secure user login and registration with password encryption.
Real-Time Notifications: Notifies donors and recipients of matched requests.
Tech Stack
Frontend: React.js, HTML5, CSS3, JavaScript
Backend: Node.js, Express.js
Database: MongoDB
Version Control: Git & GitHub
Setup Instructions
Prerequisites
Make sure you have the following installed:

Node.js and npm
MongoDB
Git
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/DonateLife.git
cd DonateLife
Install dependencies for both frontend and backend:

bash
Copy code
cd backend
npm install
cd ../frontend
npm install
Create a .env file in the backend directory and add the following:

plaintext
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the MongoDB server.

Start the application:

bash
Copy code
# In the backend folder
npm run server

# In the frontend folder
npm start
Open http://localhost:3000 to view the app in the browser.

Project Structure
plaintext
Copy code
DonateLife/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   └── .env
└── README.md
Contributions
Contributions are welcome! Feel free to open issues or submit pull requests.

License
This project is licensed under the MIT License.

Contact
For any questions or support, please reach out via GitHub or email at [your-email@example.com].
