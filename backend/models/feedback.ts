import mongoose from 'mongoose';

const { Schema } = mongoose;

const feedBackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export const FeedBack = mongoose.model('requests', feedBackSchema);
