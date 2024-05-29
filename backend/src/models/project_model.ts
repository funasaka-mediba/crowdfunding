// models/project_model.ts is a file that contains the schema for the projects.
import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
    projectID: mongoose.Types.ObjectId;
    title: string;
    description: string;
    goalAmount: number;
    deadline: Date;
    // returns: mongoose.Types.ObjectId[];
}

const ProjectSchema: Schema = new Schema({
    projectID: { type: Schema.Types.ObjectId, ref: "Project", required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    goalAmount: { type: Number, required: true },
    deadline: { type: Date, required: true },
    // returns: [{ type: Schema.Types.ObjectId, ref: "Return" }],
});

export default mongoose.model<IProject>("Project", ProjectSchema, "projects");
