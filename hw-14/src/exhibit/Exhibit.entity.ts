import { Expose } from 'class-transformer';
import { User } from '../user/User.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '../comment/Comment.entity';

@Entity('exhibit')
export class Exhibit {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  imageUrl: string;

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

  @Column()
  userID: number;

  @Expose()
  @OneToMany(() => Comment, (comment) => comment.exhibitInfo, { cascade: true })
  comment: Array<Comment>;

  @Expose()
  @Column({ default: 0 })
  commentCount: number;
}
