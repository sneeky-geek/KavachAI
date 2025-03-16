import mongoose, { Schema, Document } from 'mongoose';

export interface IProctoringData extends Document {
  userId: string;
  mouseMovements: number;
  clicks: number;
  keystrokes: number;
  tabSwitches: number;
  idleTime: number;
  timestamp: Date;
}

const ProctoringDataSchema: Schema = new Schema({
  userId: { type: String, required: true },
  mouseMovements: { type: Number, required: true },
  clicks: { type: Number, required: true },
  keystrokes: { type: Number, required: true },
  tabSwitches: { type: Number, required: true },
  idleTime: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const ProctoringData = mongoose.model<IProctoringData>('ProctoringData', ProctoringDataSchema);
