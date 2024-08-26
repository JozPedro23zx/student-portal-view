

# School Admin Interface Project

## Project Description

This project is a front-end application developed using React and Redux, designed for managing school data. The interface allows administrators to manage students, teachers, classes, and other aspects of the school environment.

The application's state is managed with Redux, using slices to organize and modularize actions and reducers. Communication with the back-end is handled through slices that use `createAsyncThunk` to perform asynchronous requests. The back-end for this application can be found [here](link-to-backend-repository).

## Keycloak Setup

Keycloak is used to manage authentication, providing an open-source solution that supports single sign-on (SSO).

### Using Docker Compose

Here is the `docker-compose.yml` file you can use to run Keycloak:

```yaml
version: "3.8"

services:
  keycloak:
    image: quay.io/keycloak/keycloak:25.0.0
    ports:
      - "8080:8080"
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin
    command: start-dev
    volumes:
      - ./keycloak-theme/my-custom-theme:/opt/keycloak/themes/my-custom-theme 
 ```
 To start Keycloak using Docker Compose, run:
 ```
 docker-compose up -d
 ```
 ### Using Docker CLI

If you prefer to use the Docker command line, you can run the following command:
```
docker run -p 8080:8080 \ -e KEYCLOAK_ADMIN=admin \ -e KEYCLOAK_ADMIN_PASSWORD=admin \ -v $(pwd)/keycloak-theme/my-custom-theme:/opt/keycloak/themes/my-custom-theme \ quay.io/keycloak/keycloak:25.0.0 start-dev
```
This command will start Keycloak in development mode, exposing port 8080 and loading a custom theme.

## Commands

-   **Run the application:**
    `npm run start` 
    
-   **Run tests:**
    `npm run test`
