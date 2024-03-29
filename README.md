# Task Management System

## BEFORE STARTING SOME NOTES
- Normally, the definitions shouldn't give in **.env.example**, but you know it is a case study,
  I have given all the environment in **.env.example**.
- I only added one model and one service test. I added model test for User and service test for Task. I didn't add more tests.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Usage](#usage)
- [Commands](#commands)

## Introduction

- An application will be developed for a Task to manage its user's task and operate CRUD functions.

## Features

- There are some modules and these modules includes some endpoints within the API.
  - auth/
    - login
    - register
  - task/
    - create
    - update
    - delete
    - findAll
    - findOne

## Swagger Documentation
- You can find the swagger documentation in the following link:
  - [Swagger Documentation](http://localhost:3000/v1/docs)

## Usage

Clone the repo with ssh:

```bash
git clone git@github.com:Emreozgun/trt-backend-assignment.git
```

Clone the repo with https:
```bash
git clone https://github.com/Emreozgun/trt-backend-assignment.git
```

Setup environment:
```bash
cd trt-backend-assignment
cp .env.example .env
```


Install the dependencies:

```bash
yarn install
```

## Commands

Testing:

```bash
# run all tests
yarn test

# run all tests in watch mode
yarn test:watch

# run test coverage
yarn coverage
```

If you want to start service locally:

```bash
yarn dev
```

To run ESLint:

```bash
yarn lint
```

Fix ESLint errors:

```bash
yarn lint:fix
```

To run prettier:

```bash
yarn prettier
```

Fix prettier errors:

```bash
yarn prettier:fix
```
