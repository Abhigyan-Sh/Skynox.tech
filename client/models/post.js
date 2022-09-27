import mongoose from 'mongoose'
const { Schema } = mongoose

const postSchema = new Schema(
    {
		postMessage: { 
			type: String, 
			required: true 
		}
    },
    { timestamps: true }    
);

export default mongoose.model('post', postSchema);