const mongoose = require("mongoose");
const {isEmail} = require('express-validator').check();

// create schema

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name can not be empty."],
        maxlength: [60, 'Name is more than 60 characters.'],
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email can not be empty."],
        unique: [true, "Email already exists"],
        validate: [isEmail, 'invalid Email']
    },
    phone: {
        type: String,
        required: [true, "phone can not be empty."],
        maxlength: [10, 'phone is more than 50 characters.'],
        trim: true
    },
    hireDate: {
        type: Date,
        required: [true, "Date can not be empty."],
        default: Date.now       
        
    },
    position: {
        type: String,
        required: [true, "position can not be empty."],
        maxlength: [20, 'position is more than 20 characters.'],
        trim: true
    }
}) 



module.exports = mongoose.model('Employee', employeeSchema);
