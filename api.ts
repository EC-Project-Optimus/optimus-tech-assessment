import "reflect-metadata";
import express from "express";
import { Request, Response } from "express";
import {Column, DataSource, Entity, PrimaryGeneratedColumn} from "typeorm";


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
    const color = await db.getRepository(Color).findOneById(colorId)
    responseBody.push({
      color: color!.value,
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
  
  let user = await db.getRepository(User).findOneBy({email: body.email })
  if (user) {
    throw new Error('User exist already')
  }
  
  user = await db.getRepository(User).save({email: body.email })

  for (const colorName of body.colors) {
    const color = await db.getRepository(Color).findOneBy({value: colorName})
    if (!color) {
      throw new Error('Color does not exist')
    }
    await db.getRepository(Vote)
      .save({userId: user.id, colorId: color.id})
  }
})

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
