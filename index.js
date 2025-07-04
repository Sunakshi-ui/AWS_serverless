const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "ToDoTable";

exports.handler = async (event) => {
    const httpMethod = event.requestContext?.http?.method || event.httpMethod;
    let body;

    try {
        body = event.body ? JSON.parse(event.body) : {};
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid JSON in request body" })
        };
    }

    try {
        switch (httpMethod) {
            case "POST":
                if (!body.id || !body.task) {
                    return {
                        statusCode: 400,
                        body: JSON.stringify({ message: "Missing 'id' or 'task'" })
                    };
                }

                const newTask = {
                    id: body.id,
                    task: body.task,
                    completed: false
                };

                await dynamoDB.put({
                    TableName: TABLE_NAME,
                    Item: newTask
                }).promise();

                return {
                    statusCode: 201,
                    body: JSON.stringify({ message: "Task added successfully", task: newTask })
                };

            case "GET":
                const tasks = await dynamoDB.scan({ TableName: TABLE_NAME }).promise();
                return {
                    statusCode: 200,
                    body: JSON.stringify(tasks.Items)
                };

            case "PUT":
                if (!body.id || !body.task || body.completed === undefined) {
                    return {
                        statusCode: 400,
                        body: JSON.stringify({ message: "Missing 'id', 'task', or 'completed'" })
                    };
                }

                await dynamoDB.update({
                    TableName: TABLE_NAME,
                    Key: { id: body.id },
                    UpdateExpression: "set task = :task, completed = :completed",
                    ExpressionAttributeValues: {
                        ":task": body.task,
                        ":completed": body.completed
                    }
                }).promise();

                return {
                    statusCode: 200,
                    body: JSON.stringify({ message: "Item updated successfully" })
                };

            case "DELETE":
                if (!body.id) {
                    return {
                        statusCode: 400,
                        body: JSON.stringify({ message: "Missing 'id'" })
                    };
                }

                await dynamoDB.delete({
                    TableName: TABLE_NAME,
                    Key: { id: body.id }
                }).promise();

                return {
                    statusCode: 200,
                    body: JSON.stringify({ message: "Item deleted successfully" })
                };

            default:
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: "Unsupported HTTP method", method: httpMethod })
                };
        }
    } catch (err) {
        console.error("Error:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Internal Server Error",
                error: err.message
            })
        };
    }
};
