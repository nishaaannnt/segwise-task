# Segwise.ai Backend Task

## Overview
This project is a backend service for managing and retrieving application reviews. It provides REST APIs for fetching, filtering, and classifying app reviews based on specified dates and categories.

## Tech Stack
- **Express**: wanted to try with golang, but due to time constraint went with something i am experienced in.
- **MongoDB**: as not explicitly mentioned went with mongodb.
- **Ollama**: went with phi3:mini - wanted to train it for better results, but had to create dataset so avoided it for now.
- **Docker**: Containerized both backend (along with phi3:mini model) and frontend.
- **Vercel**: hosted both the backend and frontend.
- **React + Tailwind**: for ui.

## Libraries Used
- **axios**: HTTP requests for API data fetching.
- **bcryptjs**: Password hashing for secure storage.
- **cors**: Cross-Origin Resource Sharing configuration middleware.
- **cron**: Schedule tasks at specified intervals.
- **dotenv**: Loads environment variables from `.env` file.
- **express**: Fast, minimal web server framework.
- **express-winston**: Logging middleware for Express applications.
- **google-play-scraper**: Fetch app data from Google Play Store.
- **jsonwebtoken**: Token-based authentication and verification.
- **mongoose**: MongoDB object modeling and schema management.
- **nodemon**: Automatically restarts server on file changes.
- **ollama**: Interface for Ollama AI API services.
- **winston**: Logging library for managing log files.

## Features Implemented

1. Scrape on rolling basis (everyday at 1am)
2. Categorize reviews - using Small language models (phi3:mini)
3. Summary of Days - when api is called, it makes ai summarize the days review
4. Trends/ Statistics of the days - used aggregation
5. Authentication - Register/ login and middleware to verify bearer tokens
6. Deployed the backend and frontend
7. Good code quality - segregated functions where necessary, and commented important parts

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
   - Backend: `https://localhost:4000`
   - Frontend: `http://localhost:5173`

### Testing the APIs
You can test the API endpoints using a tool like [Postman](https://www.postman.com/) or [curl](https://curl.se/).

## Deployment and Cost Analysis
- **Cloud Deployment**: The backend API is deployed on Render (adjust as per your cloud setup).
- **Frontend Deployment**: Also deployed on Vercel (link below).
- **Costs**:
   - **Hosting**: Assuming AWS free tier for MongoDB and Vercel’s free plan for low-traffic sites, costs can be minimal.
   - **AI Model**: If hosted on a cloud model API service, estimated costs would be low, around $1/month for 5 queries/day, based on typical pricing for text classification models.

### Links
- **Deployed API**: [https://segwise-task.onrender.com/api/v1/health-check](https://segwise-task.onrender.com/api/v1/health-check)
- **Frontend Link**: [https://segwise-frontend-opal.vercel.app/](https://segwise-frontend-opal.vercel.app/)



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

