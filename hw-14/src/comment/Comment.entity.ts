import { Exclude, Expose } from 'class-transformer';
import { Exhibit } from '../exhibit/Exhibit.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comment')
export class Comment {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ type: 'text' })
  comment: string;

  @Expose()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Exhibit, (exhibit) => exhibit.comment, { eager: true })
  @JoinColumn({ name: 'exhibitID' })
  exhibitInfo: Exhibit;

  @Expose()
  @Column()
  exhibitID: number;
}
