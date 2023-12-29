# Planet - Event Planner

A robust event planner application built with NextJS, React, MongoDB, and Redux, Planet offers a streamlined experience for both personal and professional event planning. It combines an intuitive interface with powerful backend features. With Passport.js, it efficiently manages user and admin roles, ensuring secure and reliable access for different users.

<img src="promos/planet_demo.gif"  alt="an animated gif demonstrating planet app functionality">

## Built With

- [NextJS](https://nextjs.org/)
- [React](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Redux](https://redux.js.org/)
- [Passport](http://www.passportjs.org/)
- [SWR](https://swr.vercel.app/)
- [Material Icons](https://material-ui.com/components/material-icons/)
- [Bootstrap](https://getbootstrap.com/)
- [Docker](https://www.docker.com/)

## Setup and Usage

### Prerequisites

- Docker
- Node.js

### Installation

1. Launch the Docker containers:

   ```
   docker compose up -d
   ```

2. Install the dependencies:

   ```
   npm install
   ```

### Running the App

- Production Build:

  ```
  npm run build
  npm start
  ```

- Development Mode:

  ```
  npm run dev
  ```

  Visit http://localhost:3000/ to view the application.

## Maintenance

- Stop the containers:

  ```
  docker compose down
  ```

- Reset the database:

  ```
  docker compose down -v && docker compose up -d
  ```

- Seed the database:

  ```
  curl -X POST http://localhost:3000/api/seedMockData
  ```

## Sample Credentials

- Customer:

  ```
  username: customer
  password: password
  ```

- Admin:

  ```
  username: admin
  password: password
  ```
