import Post from '../../../models/post.js'
import connectMongo from '../../../models/connectMongo.js'

export default async (req, res) => {
	const { method } = req;
	/* connecting to db... */
	connectMongo()
	
	/* Get Single Post */
	if (method === "GET") {
		try {
            /* console.log(req.query.singlePost) */
			const post = await Post.findById(req.query.singlePost)
			res.status(200).json({ post })
		} catch (err) {
			res.status(500).json({ message: "Internal Server Error 😿" })
			console.log(`${err.message} 😿`)
		}
	}
}