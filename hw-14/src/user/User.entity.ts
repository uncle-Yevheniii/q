import { Exclude, Expose } from 'class-transformer';
import { Exhibit } from '../exhibit/Exhibit.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Expose({ groups: ['includeAccessToken'] })
  @Column({ default: '' })
  access_token?: string;

  @Expose()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Exhibit, (exhibit) => exhibit.userInfo, { cascade: true })
  exhibit: Array<Exhibit>;
}
