const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const TaskStatus = require('../utils/taskStatus');

const taskSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      validate(value) {
        if (!Object.values(TaskStatus).includes(value)) throw new Error('Invalid task status');
      },
      default: TaskStatus.PENDING,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
taskSchema.plugin(toJSON);
taskSchema.plugin(paginate);

/**
 * @typedef Task
 */
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
