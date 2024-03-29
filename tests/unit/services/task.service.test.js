const faker = require('faker');
const { Types } = require('mongoose');
const { taskService } = require('../../../src/services');
const setupTestDB = require('../../utils/setupTestDB');
const { User } = require('../../../src/models');
const { Task } = require('../../../src/models');

setupTestDB();
describe('Task service', () => {
  describe('Task service functions', () => {
    let newTask;
    let randomTitle;
    let randomDescription;
    let taskId;
    beforeEach(async () => {
      const currentDate = new Date();
      randomTitle = faker.lorem.words();
      randomDescription = faker.lorem.words();

      const newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
        role: 'user',
      };
      const user = User(newUser);

      newTask = {
        userId: user.id,
        title: randomTitle,
        description: randomDescription,
        status: 'PENDING',
        dueDate: currentDate.toISOString().split('T')[0],
      };

      const task = await Task.create(newTask);
      taskId = task.id;
    });

    describe('create task', () => {
      it('should create a new task with a required fields', async () => {
        const actualTask = await taskService.createTask(newTask);

        // Test assertions
        expect(newTask).toBeDefined();
        expect(actualTask.title).toBe(newTask.title);
        expect(actualTask.description).toBe(newTask.description);
        expect(actualTask.createdAt).toBeInstanceOf(Date);
      });
    });

    describe('get task by id', () => {
      it('should get task information with given task id', async () => {
        // Act: Retrieve the task by ID
        const taskById = await taskService.getTaskById(taskId);

        // Assert
        expect(taskById).toBeDefined();
        expect(taskById._id.toString()).toBe(taskId);
        expect(taskById.title).toBe(newTask.title);
        expect(taskById.description).toBe(newTask.description);
      });
    });

    describe('delete task by id', () => {
      it('should delete task', async () => {
        // Act: Delete the task
        const deleted = await taskService.deleteTaskById(taskId);
        // Assert
        expect(deleted._id.toString()).toBe(taskId);
      });

      it('gives not found error if given task id is not added', async () => {
        // Fake task id
        const fakeTaskId = new Types.ObjectId();

        // Act & Assert
        await expect(taskService.deleteTaskById(fakeTaskId)).rejects.toThrowError('Task not found');
      });
    });

    describe('patch task by id', () => {
      it('should patch task', async () => {
        const updatedTaskData = {
          title: 'Updated Task Title',
        };

        // Act: Patch the task
        const updatedTask = await taskService.updateTaskById(taskId, updatedTaskData);

        // Assert
        expect(updatedTask.title).toEqual(updatedTaskData.title);
      });
    });
  });
});
