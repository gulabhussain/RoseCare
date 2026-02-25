import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import {User} from "../models/userSchema.js";
import {generateToken} from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName, 
        lastName, 
        email,
        phone,
        password,
        gender,
        dob,
        adhar,
        role,
     } = req.body;
     if(

        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !adhar ||
        !role
     ) {
        return next(new ErrorHandler("Please enter all required fields", 400));
     }
     let user = await User.findOne({ email });
     if (user) {
        return next(new ErrorHandler("User already exists ", 400));
     }
     user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        adhar,  
        role,
     });
     generateToken(user, "Patient Registered Successfully", 201, res);
});


export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, role } = req.body;   
    if (!email || !password || !role) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }   
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    if (role !== user.role) {
        return next(new ErrorHandler( "User With This Role Not Found!", 400));
    }
   generateToken(user, "User Login Successfully", 200, res);
});


export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const {
         firstName,   
         lastName,
         email,
         phone,
         password,
         gender,
         dob,
         adhar
       } = req.body;
      if (
         !firstName ||
         !lastName ||
         !email ||
         !phone ||
         !password ||
         !gender ||
         !dob ||
         !adhar 
      ) {
         return next(new ErrorHandler("Please enter all required fields", 400));
       }
       const isRegistered = await User.findOne({ email });
       if (isRegistered) {
         return next(new ErrorHandler(`${isRegistered.role} already exists!`, 400));
       }
       const admin = await User.create({
         firstName,
         lastName,
         email,
         phone,
         password, 
         gender,
         dob,
         adhar,   
         role: "admin",
         //role: "Admin",
         });
        // generateToken(admin, "Admin Added Successfully", 201, res); 
         res.status(201).json({
         success: true,
         message: "Admin Added Successfully",
       }); 
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "doctor" });
    res.status(200).json({ 
         success: true, 
         doctors,
    });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
      res.status(200).json({  
         success: true,
         user,
      });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res
    .status(200)
    .cookie("adminToken", "", {
        expires: new Date(Date.now()), 
         httpOnly: true,
      })
      .json({  
         success: true,
         message: "Admin Logged Out Successfully!",
      });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res
    .status(200)
    .cookie("patientToken", "", {
        expires: new Date(Date.now()), 
         httpOnly: true,
      })
      .json({  
         success: true,
         message: "Patient Logged Out Successfully!",
      });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
   if(!req.files || Object.keys(req.files).length === 0){
      return next(new ErrorHandler("Doctor Avatar Require!", 400));
   }
   const {docAvatar} = req.files;
   const allowedFormates = ["image/jpeg", "image/png", "image/jpg, image/webp"];
   if(!allowedFormates.includes(docAvatar.mimetype)){
      return next(new ErrorHandler("Only .jpg, .jpeg, .png and .webp format allowed!", 400));
   }
   const {
      firstName,   
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      adhar,
      doctorDepartment
    } = req.body;
   if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||   
      !gender ||
      !dob ||
      !adhar ||
      !doctorDepartment  
   ) {
      return next(new ErrorHandler("Please enter all required fields", 400));
    }
   const isRegistered = await User.findOne({ email });
   if (isRegistered) {
      return next(new ErrorHandler(`${isRegistered.role} already exists!`, 400));
   }   
   const cloudinaryResponse = await cloudinary.uploader.upload(
      docAvatar.tempFilePath
   );
   if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
         "Cloudinary Error:",
         cloudinaryResponse.error || "Unknown Cloudinary error!"
      );
   }
   const doctor = await User.create({
      firstName,
      lastName,   
      email,
      phone,
      password,   
      gender,
      dob,
      adhar,
      doctorDepartment,   
      role: "doctor",
      docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
      },
   });
   res.status(201).json({
      success: true,
      message: "Doctor Added Successfully",
      doctor
   });
});