import mongoose, { Schema, Document } from "mongoose";

export interface IReturn extends Document {
    projectID: mongoose.Types.ObjectId;
    title: string;
    description: string;
    amount: number; // リターンを受け取るために必要な支援額
}

const ReturnSchema: Schema = new Schema({
    projectID: { type: Schema.Types.ObjectId, ref: "Project", required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
});

export default mongoose.model<IReturn>("Return", ReturnSchema, "returns");
