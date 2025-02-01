import { users } from "../dummyData/data.js"

const userResolver = {
	Query: {
		user: (_, { userId }, context) => {
			const userMap = new Map(users.map(user => [user._id, user]));
			return userMap.get(userId); // O(1) lookup
		},		
		users: (_, __, context) => {
			return users
		}
	},
	Mutation: {}
}

export default userResolver