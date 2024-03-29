const Joi = require('joi');
const { objectId } = require('./custom.validation');
const TaskStatus = require('../utils/taskStatus');

const createTask = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string()
      .valid(...Object.values(TaskStatus))
      .optional(),
    dueDate: Joi.date().required(),
  }),
};

const getTasks = {
  query: Joi.object().keys({
    status: Joi.string()
      .valid(...Object.values(TaskStatus))
      .optional(),
    title: Joi.string().optional(),
    createdAt: Joi.date().optional(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTask = {
  params: Joi.object().keys({
    taskId: Joi.string().custom(objectId),
  }),
};

const updateTask = {
  params: Joi.object().keys({
    taskId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      status: Joi.string().optional(),
      dueDate: Joi.date().optional(),
    })
    .min(1),
};

const deleteTask = {
  params: Joi.object().keys({
    taskId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
