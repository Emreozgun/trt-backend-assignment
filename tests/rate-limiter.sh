#!/bin/bash

# Define the login endpoint
ENDPOINT="http://localhost:3000/v1/auth/login"

# Define the email and password to use in the request
EMAIL="example@example.com"
PASSWORD="examplepassword"

for i in {1..200}; do
    curl -X POST -H "Content-Type: application/json" -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}" $ENDPOINT &
done

wait
