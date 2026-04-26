import mongoose, { Schema, model } from "mongoose";
import type { IUser } from "../Types/schema.js";
import { hash, compare } from "bcryptjs";

const userSchema = new Schema<IUser>(
  {
    displayName: {
      type: String,
      required: [true, "Display name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Password is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    emailVerification: {
      type: Date,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }
  try {
    const hashPassword = await hash(this.password, 10);
    this.password = hashPassword;
  } catch (error) {
    console.log("Hasing fialed", error);
    throw error;
  }
});

userSchema.methods.checkPassword = async function (
  password: string,
): Promise<boolean> {
  return await compare(password, this.password);
};

export const User = mongoose.models.User || model<IUser>("User", userSchema);
