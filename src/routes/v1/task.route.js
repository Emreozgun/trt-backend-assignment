const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { taskValidation } = require('../../validations');
const { taskController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(taskValidation.createTask), taskController.createTask)
  .get(auth(), validate(taskValidation.getTasks), taskController.getTasks);

router
  .route('/:taskId')
  .get(auth(), validate(taskValidation.getTask), taskController.getTask)
  .patch(auth(), validate(taskValidation.updateTask), taskController.updateTask)
  .delete(auth(), validate(taskValidation.deleteTask), taskController.deleteTask);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Task
 *   description: Task CRUD
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/TaskInput'
 *     responses:
 *       "201":
 *         description: Created
 *   get:
 *      tags: [Task]
 *      summary: Get all tasks
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        "200":
 *           description: OK
 * /tasks/{taskId}:
 *    get:
 *      tags: [Task]
 *      summary: Get a task by ID
 *      parameters:
 *        - name: taskId
 *          in: path
 *          description: ID of the task to retrieve
 *          required: true
 *          type: string
 *      responses:
 *        "200":
 *          description: OK
 *    patch:
 *      tags: [Task]
 *      summary: Update a task by ID
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - name: taskId
 *          in: path
 *          description: ID of the task to update
 *          required: true
 *          type: string
 *        - name: task
 *          in: body
 *          description: Task object
 *          required: true
 *          schema:
 *            $ref: '#/definitions/TaskInput'
 *    delete:
 *      tags: [Task]
 *      summary: Delete a task by ID
 *      security:
 *         - BearerAuth: []
 *      parameters:
 *        - name: taskId
 *          in: path
 *          description: ID of the task to delete
 *          required: true
 *          type: string
 *      responses:
 *        "200":
 *          description: OK
 */
