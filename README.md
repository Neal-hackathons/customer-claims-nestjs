## Customer Claims with NestJS

### An exercise

## Requirements

### **Description**

We want you to design a simple CRUD API that allow to manage customers and claims attached to them.

To create a customer, you must provide an email and a name.

- a customer is an email, a name and the sum of all the claims point value attached to the customer.

- Claims should be attached to a customer. They contain a title, a description and point value (an integer).

- should have the possibility to batch create claims.

Bonus : This API will be called by a partner and we want to protect the API with a simple authentication mechanism.

### **Requirements**

run `docker-compose up` and see it running

must use NestJS, Typescript and Postgres.

free to add any additional lib.

## Project setup

```bash
$ npm install
```

## Compile and run the project

## Please make sure you have a compatible version of docker-compose installed

```bash
docker version
```

should output

```
Client: Docker Engine - Community
 Cloud integration: v1.0.35+desktop.13
 Version:           27.3.1
 API version:       1.45 (downgraded from 1.47)
 Go version:        go1.22.7
 Git commit:        ce12230
 Built:             Fri Sep 20 11:41:00 2024
 OS/Arch:           linux/amd64
 Context:           desktop-linux

Server: Docker Desktop 4.30.0 (149282)
 Engine:
  Version:          26.1.1
  API version:      1.45 (minimum version 1.24)
  Go version:       go1.21.9
  Git commit:       ac2de55
  Built:            Tue Apr 30 11:48:28 2024
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.6.31
  GitCommit:        e377cd56a71523140ca6ae87e30244719194a521
 runc:
  Version:          1.1.12
  GitCommit:        v1.1.12-0-g51d5e94
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0
```

```bash
docker compose up --build
```

## Read the tests

### Create a customer test

file : src/customer/customer.controller.spec.ts#L18

### Create a claim test

file : src/claim/claim.controller.spec.ts

### Create batch claims test

file : src/claim/claim.controller.spec.ts

## Run tests

```bash
docker compose -f compose.test.yaml up --build
```

## Run manual QA tests

Create a customer

```bash
curl --request POST \
  --url http://localhost:8080/customer \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: postman/9.3.2' \
  --data '{
	"name": "tester",
	"email": "tester@testers.com"
}'
```

Create one claim for a given customer

```bash
curl --request POST \
  --url http://localhost:8080/claim \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: postman/9.3.2' \
  --data '{
		"title": "my truck broke",
		"description": "read the title",
		"point_value": 1000,
		"Customer": {
      "connect": {
        "id": "id-replace-with-customer-uuid"
      }
    }
	}'
```

Create a batch of claims for a given customer

```bash
curl --request POST \
  --url http://localhost:8080/claim/batch \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: postman/9.3.2' \
  --data '[
	{
		"title": "my girlfriend left me for my little brother",
		"description": "want compensation",
		"point_value": 1000,
		"customer": "id-replace-with-customer-uuid"
	},
	{
		"title": "my girlfriend  took the dog when she left",
		"description": "I'm more upset about the dog than her leaving. Need insurance money for a new dog",
		"point_value": 2000,
		"customer": "id-replace-with-customer-uuid"
	}
]'
```

## Bonus

### Partner flow

I had to use my imagination for the partner flow.

create a partner

```bash
curl --request POST \
  --url http://localhost:8080/partner \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: postman/9.3.2' \
  --data '{
	"name": "partner",
	"email": "partner@partner.com",
	"password": "strongpassword"
}'
```

partner authenticates and will receive a jwt token inside the cookies of the response.
the cookie will be named "jwt_partner"

```bash
curl --request POST \
  --url http://localhost:8080/auth/partner/login \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: postman/9.3.2' \
  --data '{
	"email": "partner@partner.com",
	"password": "strongpassword"
}'
```

partner makes authenticated requests to the api to create a claim for a given customer

```bash
curl --request POST \
  --url http://localhost:8080/partner/claim/create \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: postman/9.3.2' \
  --cookie jwt_partner=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZiMGQ5YmI3LWI4MDUtNGE3Yy04NTBkLTcxMTkwNzM0YmYxNiIsIm5hbWUiOiJwYXJ0bmVyIiwiaWF0IjoxNzMxODY5OTgzLCJleHAiOjM0NjU0NzU0MzY3OTZ9.oTBh935X5OpdAuedfPbexd4d6cG0XQhJVtyt4lyB7O4 \
  --data '{
	"title": "partner created claim",
	"description": "read the title",
	"point_value": 1000,
	"Customer": {
		"connect": {
			"id": "6bf68e66-f901-49c2-b57b-b40a3e7404ea"
		}
	}
}'
```

## Design decisions

Let's talk ?

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.

- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.

- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
