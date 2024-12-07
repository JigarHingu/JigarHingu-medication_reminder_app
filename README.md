# Medication Reminder App
- A web application that allows users to schedule, track, and acknowledge their medication doses. It includes secure authentication, CRUD operations for medicines, and a history feature to log medication acknowledgment. Built using React, Node.js, MongoDB, and JWT for authentication.

# Features:

- Secure Authentication: JWT-based login and registration.
- CRUD Operations for Medications: Add, update, delete, and view medications.
- Acknowledgment Logs: Log when a medication is taken and view acknowledgment history.
- Responsive UI: Built with React and styled using CSS.

# Technologies Used:

## Frontend:

- React.js
- React Router for page navigation
- Axios for API requests
- React-Toastify for notifications
- CSS for styling

## Backend:

- Node.js
- Express.js for the server
- MongoDB for data storage
- JWT (JSON Web Tokens) for authentication
- Mongoose for MongoDB object modeling

## Deployment:

Frontend: Vercel
Backend: Vercel

# Setup Instructions

1. Clone the Repository
Clone this repository to your local machine
```bash
    git clone https://github.com/JigarHingu/medication-reminder-app.git
```

2. Backend Setup
Install dependencies:
```bash
    cd medication-backend
    npm install
```    

- Configure environment variables:
- Create a .env file in the backend directory and add the following:

```bash
    MONGO_URI=your_mongo_database_connection_string
    JWT_SECRET=your_jwt_secret
```

- Start the backend server:

```bash
    npm run dev
```
The server will be running at http://localhost:5000.

3. Frontend Setup
Install dependencies:

```bash
    cd medication-frontend
    npm install
```

- Configure environment variables:
- Create a .env file in the frontend directory and add:

```bash
    REACT_APP_API_URL=http://localhost:5000/api
```

- Start the frontend server:

```bash
    npm strat
```
The app will be running at http://localhost:3000.


## Endpoints:

### Authentication:

- POST /api/auth/login: Log in to get a JWT token.
Request body: { "email": "user@example.com", "password": "password123" }
- POST /api/auth/register: Register a new user.
Request body: { "email": "user@example.com", "password": "password123" }

### Medicines:

- GET /api/medicines: Get all medicines.
- POST /api/medicines: Add a new medicine.
Request body: { "name": "Aspirin", "dosage": "2 tablets", "scheduleTime": "08:00" }
- PUT /api/medicines/:id: Update a specific medicine by ID.
Request body: { "name": "Aspirin", "dosage": "2 tablets", "scheduleTime": "08:00" }
- DELETE /api/medicines/:id: Delete a medicine by ID.

### Acknowledgments:

- POST /api/acknowledgments: Log acknowledgment when medicine is taken.
Request body: { "medicineId": "medicineId", "status": "Taken" }
- GET /api/acknowledgments/:medicineId: Get acknowledgment logs by medicine ID.

# Deployment:

To deploy the frontend, push your code to GitHub, connect the repository to Vercel, and configure the build output directory to build. For the backend, deploy it to Vercel (or any other server), ensuring you set the necessary environment variables like MONGO_URI and JWT_SECRET.

# Future Improvements:

- Reminders: Implement email or SMS reminders for medication doses.
- User Preferences: Allow users to set custom schedules for their medications.
- Admin Panel: Add an admin panel to manage users and medicines.