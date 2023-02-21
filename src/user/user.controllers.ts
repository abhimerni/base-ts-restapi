import { Request, Response } from 'express';
import User, { UserDocument } from "../models/user.model";


export default {
  getProfile: async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.id)
		console.log('user', user);
	} catch (error) {
		res.status(500).json(error);
		console.log('error', error)
	}
  },
};
