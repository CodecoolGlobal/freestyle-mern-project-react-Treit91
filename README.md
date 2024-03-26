# Movie Database Project

Welcome to the Movie Database Project! This web application is designed to provide users with a platform to search for movies and series, as well as add them to their watchlist. We prioritize security by storing hashed passwords and using JWT authentication for each HTTP request.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Features](#features)
- [Usage](#usage)


## Technologies Used

This project utilizes the following technologies:

- **React**: A JavaScript library for building user interfaces.
- **Express**: A web application framework for Node.js, used for building the server.
- **MongoDB**: A NoSQL database for storing movie and user information.

## Getting Started

To get started with the project, follow these steps:

1. Clone this repository to your local machine.
2. [Install docker](https://docs.docker.com/engine/install/)
3. [Install docker-compose](https://docs.docker.com/compose/install/)
4. Build docker image for the frontend in the client folder with `docker build -t moviedb-f .`
5. Build docker image for the backend in the server folder with `docker build -t moviedb-b .`
6. Run `docker-compose up` in the root folder of the project


## Features

- **Search**: Users can search for movies and series by title, genre, or keywords.
- **Watchlist**: Users can add movies and series to their watchlist for easy access.
- **User Authentication**: We use JWT authentication to secure user accounts and data.
- **Password Hashing**: User passwords are securely hashed before being stored.
- **User Profiles**: Users can create and manage their profiles with personalized information.

## Usage

1. Register for an account or log in if you already have one.
2. Use the search functionality to find movies and series of interest.
3. Add movies and series to your watchlist.
4. Enjoy an organized and personalized collection of your favorite movies and series.
