
# Carpentry App

This project is a full-stack application designed for a carpentry company to manage custom cabinet orders. The application allows customers to choose dimensions and styles of cabinets, and generates an .ord file compatible with CabinetVision for the production team to use. The app streamlines the ordering process, reducing the need for manual input and speeding up the workflow.

## Features

- **Customer Interface**: Allows users to input dimensions and select styles for custom cabinets.
- **Order Management**: Displays a list of all orders in a CMS-style view.
- **File Generation**: Automatically generates an .ord file for each order, compatible with CabinetVision.

## Technologies Used

- **Frontend**: React, TypeScript
- **Backend**: NestJS, TypeScript, Node.js, Express
- **Database**: PostgreSQL or MySQL
- **Other Libraries**: Axios for HTTP requests, React Router for navigation

## Installation

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL or MySQL

### Setup

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd carpentry-app
   ```

2. **Install dependencies**:

   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

   - For the backend:
     ```bash
     cd backend
     npm install
     ```

3. **Configure Environment Variables**:

   - Create a `.env` file in the `backend` directory with the following variables:

     ```
     DB_HOST=localhost
     DB_PORT=5432
     DB_USERNAME=your_username
     DB_PASSWORD=your_password
     DB_NAME=your_database
     ```

4. **Run the Application**:

   - Start the backend server:
     ```bash
     cd backend
     npm run start:dev
     ```

   - Start the frontend server:
     ```bash
     cd frontend
     npm start
     ```

5. **Access the Application**:

   - The frontend app will be available at `http://localhost:3000`.
   - The backend will be serving from `http://localhost:4000`.

## Usage

- Navigate to the application in your web browser.
- Use the form to create a new cabinet order by specifying dimensions and style.
- View the list of all orders and download the generated .ord files.


## Time Keeper

Aug 13 1:30pm to 4pm
