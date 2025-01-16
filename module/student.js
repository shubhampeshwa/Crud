
const mongoose = require('mongoose')
import mongoose from 'mongodb';

// Define the student schema
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
});

// Create the Student model
const Student = mongoose.model('Student', studentSchema);

export default Student;