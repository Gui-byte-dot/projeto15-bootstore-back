import { AuthSchema } from '../models/auth.model.js';
import { sessionsCollection, usersCollection } from "../database/db.js"

export async function auth(req, res, next) {
  const token = req.get('Authorization');

  const { error } = AuthSchema.validate({
    token,
  })

  if(error) {
    const erros = error.details.map((details) => details.message)
    return res.status(401).send(erros)
  }

  try {
    const session = await sessionsCollection.findOne({
      token,
    })
    if(session !== null) {
      const user = await usersCollection.findOne({ 
        _id: session.userId 
      });

      if (!user) {
        return res.status(401).send('Unauthorized');
      }

      delete user.password;
      req.user = user;
      next();
    }else {
      res.status(401).send('Unauthorized');
    }
  } catch (error) {
    res.status(500).send(error)
  }
}