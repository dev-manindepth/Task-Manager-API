# Task-Manager-API

The API will allow users to perform CRUD operations (Create, Read, Update, and Delete) on tasks

# API Endpoints Documentation

This document outlines the API endpoints for a Task Manager Application.

## Base URL

All URLs listed in this documentation are relative to the application's base URL. The base URL is dependent on the environment.

## Retrieve All Tasks

### `GET /tasks`

This endpoint returns all the tasks.

#### Query Parameters

- `completed`: Optional. Filter the tasks based on their completion status. Valid values are `true` and `false`.
- `priority`: Optional. Filter the tasks based on their priority level. Valid values are `low`, `medium`, and `high`.
- `sortBy`: Optional. Sort the tasks by a specific property. Valid values are `createdAt`. By default, the tasks are sorted by their `createdAt` property in descending order.

#### Response

##### Success

Status code: `200 OK`

```json
{
  "status": "success",
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "Task 1",
      "description": "Task 1 description",
      "priority": "medium",
      "completed": false,
      "createdAt": "2023-04-22T12:00:00.000Z"
    },
    {
      "id": 2,
      "title": "Task 2",
      "description": "Task 2 description",
      "priority": "high",
      "completed": false,
      "createdAt": "2023-04-21T12:00:00.000Z"
    }
  ]
}
```

##### Error

Status code: `400 Bad Request`

```json
{
  "status": "fail",
  "message": "Invalid query parameter: sortBy"
}
```

## Retrieve a Single Task

### `GET /tasks/:id`

This endpoint returns a single task based on the provided ID.

#### Parameters

- `id`: The ID of the task to retrieve.

#### Response

##### Success

Status code: `200 OK`

```json
{
  "status": "success",
  "message": "Task retrieved successfully",
  "data": {
    "id": 1,
    "title": "Task 1",
    "description": "Task 1 description",
    "priority": "medium",
    "completed": false,
    "createdAt": "2023-04-22T12:00:00.000Z"
  }
}
```

##### Error

Status code: `400 Bad Request`

```json
{
  "status": "fail",
  "message": "Invalid task ID"
}
```

## Retrieve Tasks by Priority Level

### `GET /tasks/priority/:level`

This endpoint returns all tasks with the specified priority level.

#### Parameters

- `level`: The priority level to filter tasks by. Valid values are `low`, `medium`, and `high`.

#### Response

##### Success

Status code: `200 OK`

```json
{
  "status": "success",
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "Task 1",
      "description": "Task 1 description",
      "priority": "medium",
      "completed": false,
      "createdAt": "2023-04-22T12:00:00.000Z"
    },
    {
      "id": 2,
      "title": "Task 2",
      "description": "Task 2 description",
      "priority": "medium",
      "completed": false,
      "createdAt": "2023-04-21T12:00:00.000Z"
    }
}
```

## Create a new task

Creates a new task.

```
POST /tasks
```

#### Parameters

The request body must contain the following fields:

- `title` - The title of the task.
- `description` - The description of the task.
- `priority` - The priority level of the task (low, medium, or high).
- `completed` - (Optional) Whether the task is completed or not. Defaults to false.

#### Response

```
Status: 201 Created

{
  "status": "success",
  "message": "Created successfully",
  "data": {
    "id": 4,
    "title": "Task 4",
    "description": "Description of Task 4",
    "priority": "medium",
    "completed": false,
    "createdAt": "2023-04-25T12:00:00.000Z"
  }
}
```

## Update

PUT /tasks/:id: Update an existing task by its ID.

Updates an existing task by its ID with new information provided in the request body. Returns the updated task object as a response.

**URL Parameters**

`id` (required): The ID of the task to be updated.

**Request Body**

The request body should contain a JSON object with the following properties:

- `title` (string, required): The title of the task.
- `description` (string, required): The description of the task.
- `priority` (string, required): The priority level of the task, which can be one of `low`, `medium`, or `high`.
- `completed` (boolean, optional): The completion status of the task.

**Response**

- `status` (string): The status of the response, which can be either `success` or `fail`.
- `message` (string): A message explaining the status of the response.
- `data` (object): The updated task object.

**Example**

Request:

```
PUT /tasks/1
{
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "priority": "medium",
  "completed": true
}
```

Response:

```
{
  "status": "success",
  "message": "Updated successfully",
  "data": {
    "id": 1,
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "priority": "medium",
    "completed": true,
    "createdAt": "2023-04-22T12:00:00.000Z"
  }
}
```

# DELETE /tasks/:id

This endpoint deletes a task from the list of tasks based on its ID.

## Request

- URL

  ```
  DELETE /tasks/:id
  ```

- Parameters

  - `id`: The ID of the task to be deleted (integer)

- Example

  ```
  DELETE /tasks/1
  ```

## Response

- Status Codes

  - `200 OK`: The task was successfully deleted.
  - `400 Bad Request`: The `id` parameter is not a valid integer or there is no task with the specified `id`.

- Example

  ### Success Response

  ```
  {
    "status": "success",
    "message": "Task successfully deleted"
  }
  ```

  ### Error Response

  ```
  {
    "status": "fail",
    "message": "Invalid id"
  }
  ```
