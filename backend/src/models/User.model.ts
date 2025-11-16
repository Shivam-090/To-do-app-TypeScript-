import { Schema, model, Document } from "mongoose"
import bcrypt from "bcrypt";

export interface IUser extends Document {
    email: string;
    password: string;
    name?: string;
    resetPasswordToken?: string | null;
    resetPasswordExpires?: Date | null;
    comparePassword(candidate: string): Promise<boolean>;
}


const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null }
},{ timestamps: true });

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = function (candidate: string){
    return bcrypt.compare(candidate,  this.password);
};

export const User = model<IUser>("User", UserSchema)