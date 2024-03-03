import mongoose  from "mongoose";

const userSchema = ({
    userName: {
        type: String,
        required: [true, "please Provide a user"],
        unique: true 
    },
    email: {
        type: String,
        required: [true, "please Provide a Mail"],
        unique: true 
    },
    password: {
        type: String,
        required: [true, "Please provide a strong password"],
        unique: true
    },
    isVerfied: {
         type: Boolean,
         default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;