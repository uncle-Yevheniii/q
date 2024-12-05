import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exhibit } from '../exhibit/Exhibit.entity';
import { Expose } from 'class-transformer';

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

  @ManyToOne(() => Exhibit, (exhibit) => exhibit.comment, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'exhibitID' })
  exhibitInfo: Exhibit;

  @Expose()
  @Column()
  exhibitID: number;
}
