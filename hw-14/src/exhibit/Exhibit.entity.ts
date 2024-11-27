import { User } from '../user/User.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exhibit')
export class Exhibit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.exhibit, { eager: true })
  @JoinColumn({ name: 'userID' })
  userInfo: User;

  @Column()
  userID: number;
}
