# Serverless Personal To-Do List Application

A fully serverless task manager built using AWS Lambda, API Gateway, and DynamoDB. Designed to perform CRUD operations without provisioning or managing any servers.

---

## Tech Stack
- **AWS Lambda** – Backend logic for each operation
- **API Gateway** – Exposes RESTful endpoints
- **DynamoDB** – NoSQL database for task storage
- **CloudWatch** – Logs for debugging and performance monitoring
- **AWS CLI** – Command-line deployment and config tool

---

## Features
- Add, retrieve, update, and delete tasks
- Serverless architecture with low maintenance
- Secure IAM-based access and real-time logging

---

## Folder Structure

```
AWS_serverless/
├── index.js                  # Main Lambda function containing CRUD operations
├── package.json              # Project dependencies (e.g., aws-sdk)
├── package-lock.json         # Lockfile to ensure consistent installs
├── .gitignore                # Specifies files/folders to exclude from Git tracking
├── README.md                 # Project overview and usage instructions
├── architecture-diagram.png # Visual layout of AWS service interactions
├── screenshots/              # Postman test results, CloudWatch logs, DynamoDB view
│   ├── api-post-request.png
│   ├── dynamodb-table.png
│   └── cloudwatch-logs.png
├── report/                   # Final project report and documentation
│   └── Serverless_Todo_Report.pdf
```

---

## API Endpoints

| Method | Endpoint | Description         |
|--------|----------|---------------------|
| POST   | `/`      | Add a new task      |
| GET    | `/`      | Retrieve all tasks  |
| PUT    | `/`      | Update a task       |
| DELETE | `/`      | Delete a task       |

### Sample POST Payload:
```json
{
  "id": "task1",
  "task": "Finish AWS Lambda integration"
}
```
---
## Setup Instructions
- Configure AWS CLI with aws configure
- Deploy the Lambda using the AWS Console or CLI
- Set up an HTTP API via API Gateway
- Link endpoints to the Lambda
- Use Postman or curl for testing


