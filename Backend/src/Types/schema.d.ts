import type { Document, Types } from "mongoose";

// User Schema
export interface IUser extends Document {
    _id: Types.ObjectId;
    displayName: string;
    email: string;
    password: string;
    emailVerification: Date | null;
    refreshToken: string | null;
    createdAt: Date;
    updatedAt: Date;
}

// File Schema
export interface IFile extends Document {
_id: Types.ObjectId;
fileName: string;
path: string;
size: number;
uuid: string;
sender: string | null;
receiver: string | null;
whoUploaded: Types.ObjectId | null;
createdAt: Date;
updatedAt: Date;
}

// Client Response
export interface IUserResponse {
    _id: string;
    displayName: string;
    email: string;
    emailVerification?: Date | null;
}