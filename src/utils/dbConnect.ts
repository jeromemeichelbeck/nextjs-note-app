import mongoose from 'mongoose'

const dbConnect = async () => {
	if (mongoose.connections[0].readyState) return

	await mongoose.connect(process.env.MONGO_URI as string, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
}

export default dbConnect
