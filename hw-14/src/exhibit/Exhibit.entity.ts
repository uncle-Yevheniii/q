import { Expose } from 'class-transformer';
import { User } from '../user/User.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exhibit')
export class Exhibit {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  imageUrl: string;

  @Expose() //? maybe need to remove
  @Column()
  imagePublicId: string;

  @Expose()
  @Column({ type: 'text' })
  description: string;

  @Expose()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Expose()
  @ManyToOne(() => User, (user) => user.exhibit, { eager: true })
  @JoinColumn({ name: 'userID' })
  userInfo: User;

  @Expose()
  @Column()
  userID: number;
}
