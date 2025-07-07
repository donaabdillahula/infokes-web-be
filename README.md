# infokes-web-be

## 📦 Folder Explorer Backend API

This is the backend service for the Folder Explorer app. Built with **Node.js (Express)**, **Typescript**, **PostgreSQL**, and **Sequelize ORM**, following **Clean Architecture** principles.


## Features

-   RESTful API with Node.js (Express)
-   PostgreSQL database integration
-   Sequelize ORM
-   Dockerized for easy deployment
-   Docker Compose support

## Requirements

-   Node.js 22 (recommended)
-   NPM 10+
-   PostgreSQL database
-   Docker (for containerization)
-   Docker Compose (for multi-service orchestration)

## Docker

## Docker Compose

If you have a `docker-compose.yml` file, you can start all services (including database, etc) with:

```sh
docker-compose up
```

or in detached mode:

```sh
docker-compose up -d
```

## Environment Variables

The application uses environment variables for configuration. Example:

```
ENV=development
DB_HOST=db
DB_USER=postgres
DB_PWD=root
DB_NAME=infokes_web_db
DB_PORT=5432
PORT=3000
```

## Deployment

-   Push your Docker image to Docker Hub.
-   Deploy to Render or other cloud platforms using the Docker image.
-   **Note:** Build your image with `--platform=linux/amd64` for compatibility with most cloud providers.

## License

MIT

Made with ❤️ by Dona Abdillah Ula
