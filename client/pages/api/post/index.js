import Post from '../../../models/post.js'
import connectMongo from '../../../models/connectMongo.js'

export default async (req, res) => {
	const { method } = req;
	/* connecting to db... */
	connectMongo()
	
	// Create post
	if (method === 'POST') {
		try {
			const newPost = await Post.create(req.body)
			res.status(201).json({ data: newPost, message: "post sent!🙀" })
		} catch (err) {
			res.status(500).json({ message: "Internal Server Error" })
			console.log(`${err.message} 😿`)
		}
	}
	/* Get post */
	if (method === "GET") {
		try {
			const post = await Post.find()
			res.status(200).json({ post })
		} catch (err) {
			res.status(500).json({ message: "Internal Server Error 😿" })
			console.log(`${err.message} 😿`)
		}
	}
}