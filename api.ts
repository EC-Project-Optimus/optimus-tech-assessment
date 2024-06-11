import "reflect-metadata";
import express from "express";
import { Request, Response } from "express";
import {Column, DataSource, Entity, In, PrimaryColumn, PrimaryGeneratedColumn, Unique} from "typeorm";


const db = new DataSource({type: "postgres"})
const app = express();

app.use(express.json());

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string
}

@Entity()
export class Vote {
  @Column()
  userId: number
  
  @Column()
  colorId: number
}

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  value: string
}


app.get('/poll-result', async (req: Request, res: Response) => {  
  const votes = await db.getRepository(Vote).find()
  
  let results = {}
  for (const vote of votes) {
    results[vote.colorId] = (results[vote.colorId] || 0) + 1
  }

  const responseBody = []
  for (const [colorId, votes] of Object.entries(results)) {
    const color = await db.getRepository(Color).findById(vote.colorId)
    respondBody.push({
      color: color.value,
      votes
    })
  }
  
  res.send(responseBody);
});

interface PollVoteInput {
  email: string
  colors: string[]
}

app.post('/poll-vote',  async (req: Request, res: Response) => {
  const body = req.body as PollVoteInput
  
  let user = await db.getRepository(User).find({where: {email: body.email }})
  if (user) {
    throw new Error('User exist already')
  }
  
  user = await db.getRepository(User).create({email: body.email})
  
  for (const vote of body.color) {
    const color = await db.getRepository(Color).create({email: body.color})
    if (!color) {
      throw new Error('Color does not exist')
    }
    await db.getRepository(Vote)
      .create({userId: user.id, colorId: vote})
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
