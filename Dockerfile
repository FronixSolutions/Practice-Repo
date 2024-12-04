# Step 1: Use an official Node.js image as the base image
FROM node:20.15.0 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Serve the app using an Nginx server
FROM nginx:alpine

# Step 8: Copy the build directory from the previous image
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose the port that Nginx will run on
EXPOSE 80

# Step 10: Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
