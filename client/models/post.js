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

const modelPost = mongoose.models.post || mongoose.model('post', postSchema);

export default modelPost