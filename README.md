# Random Data Generator

This project is a simple Node.js application that generates random data and serves it via a Server-Sent Events (SSE) endpoint. The frontend displays the data in real-time using a dark mode color scheme similar to GitHub's dark mode.

## Features

- Generates random IP addresses, locations, and usernames.
- Serves random data via an SSE endpoint.
- Real-time data updates on the frontend.

## Installation

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Run `npm start` to start the server.
4. Open `http://localhost:3001` in your browser to view the application.

## Endpoints

- `/` - Displays the frontend application.
- `/events` - SSE endpoint that streams random data.
