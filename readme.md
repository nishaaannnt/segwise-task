# Segwise.ai Task

## Overview
This project is a backend service for managing and retrieving application reviews. It provides REST APIs for fetching, filtering, and classifying app reviews based on specified dates and categories.

## Tech Stack
- **Express**: wanted to try with golang, but due to time constraint went with something i am experienced in.
- **MongoDB**: as not explicitly mentioned went with mongodb.
- **Ollama**: went with phi3:mini - wanted to train it for better results, but had to create dataset so avoided it for now.
- **Docker**: Containerized both backend (along with phi3:mini model) and frontend.
- **Vercel**: for frontend.
- **Render**: for backend.
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

## Setting Up Locally

### Prerequisites
- [Node.js](https://nodejs.org/) >= 14
- [Docker](https://www.docker.com/) (if using Docker)

### Environment Variables
1. Create a `.env` file in the backend directory and copy the content from `.env.example` into it. 
2. You can create an access token using crypto library. You can refer [this](https://stackoverflow.com/questions/67537215/generate-token-using-crypto-library).
3. run your mongodb locally or get a uri string from mongodb atlas.
4. rest all variables can be same

### Local Setup Without Docker

1. **Install Dependencies**:
   ```bash

   cd backend && npm install
   cd frontend && npm install
   ```

2. **Run Backend**:
   ```bash
   nodemon index.js
   ```

3. **Run Frontend**:
   ```bash
   cd client
   npm run dev
   ```
4. Ensure you **Ollama installed on you computer**. It will automatically pull the required model. 

5. Also in ``frontend/src/services/api.js`` change `baseURL: 'https://segwise-task.onrender.com'` to 
`baseURL: 'http://localhost:4000'`

6. The above should be added in a dotenv file, but as frontend was not our priority, i did not focus on this currently. sorry for that.


### Local Setup With Docker

**Please do the above step 5 and 6 first.** 

1. **Build and Run Containers**:
   ```bash
   docker-compose up --build
   ```

2. **Access the App**:
   - Backend: `https://localhost:4000`
   - Frontend: `http://localhost:5173`

### Links
- **Deployed API**: [https://segwise-task.onrender.com/api/v1/health-check](https://segwise-task.onrender.com/api/v1/health-check)
- **Frontend Link**: [https://segwise-frontend-opal.vercel.app/](https://segwise-frontend-opal.vercel.app/)

## Sample API Request/Response

### GET `/reviews`
Fetch all reviews (default 10 paginated)
#### Request:
```http
GET /api/v1/reviews
```
#### Response:
```json
{
    "data": [
        {
            "_id": "672bb2624dbee85e909d0f7",
            "reviewBy": "Sandy claws",
            "reviewId": "343c6605-f65b-4cf-ad3c-c852d396f3bc",
            "category": "Praises",
            "evaluated": true,
            "date": "2024-11-05T17:12:35.139Z",
            "userImage": "IMG_URL",
            "score": 5,
            "text": "Fun",
            "replyDate": null,
            "replyText": "",
            "version": "1.83.3.22303",
            "thumbsUp": 0,
            "__v": 0,
            "createdAt": "2024-11-06T18:16:06.659Z",
            "updatedAt": "2024-11-06T18:16:06.659Z"
        },
        ....
    ]
}
```
### GET `/reviews/filter`
Fetch reviews based on date and category. (default 10 paginated)
#### Request:
```http
GET /api/v1/reviews/filter?date=2024-11-05&category=Bugs&limit=100
```
#### Response:
```json
{
    "data": [
        {
            "_id": "672bb26624dbee85e909d0ee",
            "reviewBy": "Michelle Kellie",
            "reviewId": "81e2317f-5aa7-4b6c-ae2b-d5410a3b6543",
            "category": "Bugs",
            "evaluated": true,
            "date": "2024-11-05T17:47:53.790Z",
            "userImage": "IMG_URL",
            "score": 1,
            "text": "I was just playing the sticker heist and I won a golden sticker wheel and I didn't get it. Please fix glitches. I also tried sending a golden sticker and it wouldn't send.",
            "replyDate": "2024-10-27T04:30:37.558Z",
            "replyText": "Hello there, Michelle!...",
            "version": "1.83.3.22303",
            "thumbsUp": 0,
            "__v": 0,
            "createdAt": "2024-11-06T18:16:06.659Z",
            "updatedAt": "2024-11-06T18:16:06.659Z"
        },
        {
            "_id": "672bb26624dbee85e909d0ea",
            "reviewBy": "Emily Harding",
            "reviewId": "5176d35e-a233-459-95ef-b04e2e936931",
            "category": "Bugs",
            "evaluated": true,
            "date": "2024-11-05T18:08:21.653Z",
            "userImage": "IMG_URL",
            "score": 3,
            "text": "It's ok, but recently when I get rewards off the pet eggs it says that there was ...",
            "replyDate": null,
            "replyText": "",
            "version": "1.83.3.22303",
            "thumbsUp": 0,
            "__v": 0,
            "createdAt": "2024-11-06T18:16:06.659Z",
            "updatedAt": "2024-11-06T18:16:06.659Z"
        },
    ]
}
```

### POST `/login`
Login to access the APIs and dashboard
#### Request:
```http
POST /auth/v1/login
```
#### body
```json
{
    "email": "user@gmail.com",
    "password": "user"
}
```
#### Response:
```json
{
    "user": [
        {
            "_id": "672b958ef72f0cb6b26e7e1d",
            "email": "user@gmail.com",
            "password": "$2b$10$4WVLEXTI812o.vseAebk9.AGxxFEEr5tZ4o/NwH7gyq2AH4xvfqdu",
            "__v": 0,
            "createdAt": "2024-11-06T16:13:02.997Z",
            "updatedAt": "2024-11-06T16:13:02.997Z"
        }
    ],
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzA5NTExMzEsImV4cCI6MTczMDk1NDczMX0.TMPz6yy8hNMcH5IxwvygfbcSk3QTiC9DFs0xVd6qVjU"
}
```

### POST `/register`
Register to access the APIs and dashboard
#### Request:
```http
POST /auth/v1/register
```
#### body
```json
{
    "email": "dixit@gmail.com",
    "password": "dixit"
}
```
#### Response:
```json
{
    "message": "User created successfully",
    "data": [
        {
            "email": "dixit@gmail.com",
            "password": "$2a$10$LtfPquV9Jz6gi278SypfOC1ixxVj10polVJcFlKZ9l0Sumu5mZU2",
            "_id": "672c3c3eac1811c9a39914d",
            "__v": 0,
            "createdAt": "2024-11-07T04:04:14.080Z",
            "updatedAt": "2024-11-07T04:04:14.080Z"
        }
    ]
}
```

### GET `/trends`
Get trends for the week according to the date
#### Request:
```http
GET /reviews/trends?date=2024-11-05
```
#### Response:
```json
{
    "2024-11-04": {
        "Praises": 4
    },
    "2024-11-05": {
        "Bugs": 5,
        "undefined": 30,
        "Praises": 7,
        "Complaints": 5,
        "Crashes": 5,
        "Other": 4
    }
}
```

### Testing the APIs
1. you can test the apis in the ui itself or tools like postman
2. couldn't write tests for them. although i have worked with jestjs and do know how it's done.

## Deployment and Cost Analysis
1. if we just want the backend code to be hosted and AI model hosteds somewhere else, it is just simple apis with no heavy dependencies, we can use AWS EC2 t3.micro instance for 5 queries a day and it will require maximum up to `5$ to 7.2$` a month. [aws docs](https://aws.amazon.com/ec2/instance-types/t3/)
2. our AI model is actually about 2.2 gb in size. which is decent, but if required to be hosted, it needs good enough resources.
3. so phi3:mini requires atleast 4gb of ram and so we need to get an instance with 8gb of ram and 2v CPUs to set it up with our docker.
4. so with AI Model + backend code -> approximately `60$ to 70$`
5. the frontend is very minimal - so we can pack it in one. or else use t3.nano instance for it which can get us `3$ to 4$` a month (this is not necessary tho)

## What else i could have been done

1. train the small language model. it hallucinates sometimes
2. was thinking of a queuing system to scrape. but then thought it has a whole day to scrape, so not required
3. have used cors, but not configured it.
4. jestjs test cases missing. 

## some issues i ran into and notes

1. couldn't find a place to host my slm. like ofcourse, it was large and required high resources. also it was said to not use apis.
2. phi3:mini as it was not trained, hallucinated a lot after categorizing about 30 reviews. so in the db, you will find about 30 reviews for testing.
3. again, the above hallucination would not have happened if it was trained or fine-tuned, with a small dataset.
4. but overall it gets the work done, and if fine-tuned, everything will work like a charm.
5. categorizing 20 reviews can take about 2-3 minutes in my laptop (m3 air). it can depend as per the device.

## resources used

1. Google + Stack Overflow - for bugs and documentation of libraries
2. ChatGPT - mostly for frontend UI (the work is to debug it lol). also to understand about libraries and more. it is not very good for backend code as it provides beginners code structure.
3. aws docs - for pricing
4. ollama docker image library documentations
5. some youtube tutorials about phi3:mini model
