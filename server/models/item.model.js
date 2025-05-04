import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    title:       { type: String, required: true },
    description: { type: String },
    price:       { type: Number, required: true },
    owner:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt:   { type: Date, default: Date.now }
});

export default mongoose.model('Item', itemSchema);
