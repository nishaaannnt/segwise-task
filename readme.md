# Segwise.ai Backend Task

## Overview
This project is a backend service for managing and retrieving application reviews. It provides REST APIs for fetching, filtering, and classifying app reviews based on specified dates and categories. The solution is built to be scalable, flexible, and easy to set up locally, with deployment instructions and costs provided.

## Tech Stack
- **Node.js**: Backend runtime environment.
- **Express**: Node.js framework for building REST APIs.
- **MongoDB**: Database used to store reviews data.
- **Docker**: For containerized local development and deployment.
- **Vercel** or **AWS**: Cloud provider for deployment (change based on your actual deployment).
- **React**: Frontend built using Vite and React to allow users to interact with reviews and summaries.

## Libraries Used
### Backend Libraries
- **Mongoose**: MongoDB object modeling for Node.js.
- **axios**: Promise-based HTTP client for API requests.
- **express-async-handler**: Simplifies error handling in Express routes.
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
- **dotenv**: Loads environment variables from `.env` file.

### Frontend Libraries
- **React Query**: For data fetching and caching.
- **React Router**: To handle navigation between pages.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Date-fns**: For easy date manipulation and formatting.

## Features Implemented
1. **User Authentication**:
   - Simple login and registration feature with `auth` key stored in `localStorage`.

2. **Reviews Management**:
   - Fetch all reviews of a given day or week.
   - Filter reviews based on date and category.
   - View summarized reviews for a date or week.

3. **Classification API Integration**:
   - Classifies reviews into categories (e.g., Complaints, Praises, Bugs, etc.) using an AI model.

4. **Frontend Pages**:
   - **Login/Register**: Simple login and registration pages.
   - **Reviews Page**: View and filter reviews with a date picker and category dropdown.

## Sample API Request/Response

### GET `/reviews`
Fetch reviews based on date and category.
#### Request:
```http
GET /reviews?date=2024-11-05&category=Complaints
```
#### Response:
```json
{
  "status": "success",
  "data": [
    {
      "id": "40e55b35-55a8-45d2-b274-5f05ec6cac61",
      "userName": "Falynn Webber",
      "score": 5,
      "text": "Ncgakmsmcn",
      "date": "2024-11-04T17:50:37.134Z",
      "replyText": "We appreciate hearing your feedback."
    }
  ]
}
```

### POST `/classify`
Classify a review into a category.
#### Request:
```json
{
  "review": "Great app, love the new features!"
}
```
#### Response:
```json
{
  "status": "success",
  "category": "Praises"
}
```

## Setting Up Locally

### Prerequisites
- [Node.js](https://nodejs.org/) >= 14
- [MongoDB](https://www.mongodb.com/) (or a MongoDB connection string for cloud usage)
- [Docker](https://www.docker.com/) (if using Docker)

### Environment Variables
Create a `.env` file in the root directory and add the following:
```plaintext
MONGO_URI=<Your MongoDB connection string>
PORT=5000
```

### Local Setup Without Docker

1. **Install Dependencies**:
   ```bash
   npm install
   cd client && npm install
   ```

2. **Run Backend**:
   ```bash
   npm start
   ```

3. **Run Frontend**:
   ```bash
   cd client
   npm run dev
   ```

### Local Setup With Docker

1. **Build and Run Containers**:
   ```bash
   docker-compose up --build
   ```

2. **Access the App**:
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:3000`

### Testing the APIs
You can test the API endpoints using a tool like [Postman](https://www.postman.com/) or [curl](https://curl.se/).

## Deployment and Cost Analysis
- **Cloud Deployment**: The backend API is deployed on Vercel/AWS (adjust as per your cloud setup).
- **Frontend Deployment**: Also deployed on Vercel/AWS (link below).
- **Costs**:
   - **Hosting**: Assuming AWS free tier for MongoDB and Vercel’s free plan for low-traffic sites, costs can be minimal.
   - **AI Model**: If hosted on a cloud model API service, estimated costs would be low, around $1/month for 5 queries/day, based on typical pricing for text classification models.

### Links
- **Deployed API**: [https://your-api-link.com](https://your-api-link.com)
- **Frontend Link**: [https://your-frontend-link.com](https://your-frontend-link.com)



## segwise task (under work)

### To do 

1. setup base backend ✅
2. create models ✅
3. decide routes 
4. create handlers ✅
5. setup controllers 
6. setup services
7. check scraping ✅
8. check scheduling it ✅
9. setup auth 
10. dockerize (half)
11. local llm dhundo ✅


### Done
1. Dockerized Backend + Ollama with Small Language Model
2. Scheduled fetching of reviews done
3. remove too many clg

