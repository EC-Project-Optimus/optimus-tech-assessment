import "reflect-metadata";
import { Repository } from 'typeorm';
import express from 'express';
import { Request, Response } from 'express';

const app = express();

app.use(express.json());

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}

@Entity()
export class UserTag {
  @Column()
  userId: number
  
  @Column()
  tagId: number
}

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  value: string
}


app.get('/users', async (req: Request, res: Response) => {
  const skip = parseInt(req.query.skip)
  const take = parseInt(req.query.take)
  
  // Let's say the underlying database does not support JOIN
  const users = await db.getRepository(User).find()
    .skip(skip)
    .take(take)
  
  const results = []
  for (const user of users) {
    const userTags = await db.getRepository(UserTag)
      .find({ where: { userId: user.id } })
    
    const tags = await db.getRepository(Tag)
      .find({ where: {id: in(userTags.map(t=>t.id)) } })
    
    results.push({user, tags})
  }
  res.send(results);
});

interface CreateUserPayload {
  name: string
  tags: number[]
}

app.post('/users',  async (req: Request, res: Response) => {
  const body = req.body as CreateUserPayload
  const user = await db.getRepository(User)
    .create({
      name: body.name
    })
  for (const tag of body.tags) {
    db.getRepository(UserTag)
      .create({userId: user.id, tagId: tag})
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
