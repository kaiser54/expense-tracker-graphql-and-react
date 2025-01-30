import { users } from "../dummyData/data.js"

const userResolver = {
	Query: {
		user: (_, { userId }) => {
			const userMap = new Map(users.map(user => [user._id, user]));
			return userMap.get(userId); // O(1) lookup
		},		
		users: () => {
			return users
		}
	},
	Mutation: {}
}

export default userResolver