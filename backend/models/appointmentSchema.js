import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,   
        required: true,
        minLength: [3, "First name must be at least 3 characters long"]
    },
    lastName: {
        type: String,   
        required: true,
        minLength: [3, "Last name must be at least 3 characters long"]
    },
    email: {    
        type: String,
        required: true,
        validate: [validator.isEmail, "Please enter a valid email address"] 
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone number must be at least 10 characters long"],
        maxlength: [15, "Phone number must be at most 15 characters long"]
    },
    adhar: {
        type: String,
        required: true, 
        minLength: [12, "Adhar Must Contain 12 Digits!"],
        maxlength: [12, "Adhar Must Contain 12 Digits!"]
    },
    dob: {
        type: Date,
        required: [true, "DOB is required!"]  
    }, 
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
    }, 
    appointment_date: {
        type: Date,
        required: true, 
    },
    department: {
        type: String,
        required: true,
    },
    //doctor: {
        //firstName: {
            //type: String,   
            //required: true,
        //},
        //lastName: {
            //type: String,
            //required: true,
        //},
    //},  
    doctor: {
        firstName: String,
        lastName: String,
    },
    hasVisited: {
        type: Boolean,
        default: false,
    },
    //doctorId: {
        //type: mongoose.Schema.ObjectId,
        //required: true,
    //},
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    //patientId: {
        //type: mongoose.Schema.ObjectId,
        //required: true,
    //},
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);