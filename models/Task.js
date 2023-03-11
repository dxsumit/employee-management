const mongoose = require('mongoose')
const Employee = require('./employee')

const taskSchema = new mongoose.Schema({
    empID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Employee',
        required: [true, "Task title can not be empty."],
        trim: true
    },
    title: {
        type: String,
        required: [true, "Task title can not be empty."],
        maxlength: [50, "Task length can not be more than 50"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "description can not be empty."],
        maxlength: [200, "description can not be more than 200"],
        trim: true
    },
    dueDate: {
        type: Date,
        required: [true, "Date can not be empty."],
        default: () => ( new Date(+new Date() + 7*24*60*60*1000) )
    }

})


module.exports = mongoose.model('Task', taskSchema);