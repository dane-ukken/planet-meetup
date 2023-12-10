# Planet - Event Planner

An event planner application created using NextJS, React, and MongoDB.

## How to Use

To run this application, follow these steps:

1. Launch the Docker containers:

   ```
   docker compose up -d
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Build and run the application:

   ```
   npm run build
   npm start
   ```

4. (Optional) Run the application in development mode:

   ```
   npm run dev
   ```

After these steps, open your web browser and go to http://localhost:3000/.

## Stop the Database Container:

When you need to stop the database container, run:

```
docker compose down
```

## Reset the database

To reset the database, use the following command. This will remove all the data and restart the containers:

```
docker compose down -v && docker compose up -d
```

## Seed the database

Send a request to the following endpoint to seed the database with mock data:

```
curl -X POST http://localhost:3000/api/seedMockData
```

Sample customer credentials:

```
username: customer
password: password
```

Sample admin credentials:

```
username: admin
password: password
```

## Help

Make sure Docker is installed and running on your system before executing these commands. These steps are intended for setting up a local development environment.
