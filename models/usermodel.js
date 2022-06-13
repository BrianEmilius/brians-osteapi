import mongoose from "mongoose"

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username required, duh!"],
		unique: true
	},
	password: {
		type: String,
		required: [true, "Password required, dumbass!"]
	}
})

const User = mongoose.model("User", userSchema)
export default User
