import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;

  @Expose()
  @Column({ unique: true })
  @ApiProperty({ example: 'username', description: 'User name' })
  username: string;

  @Column()
  @ApiProperty({ example: 'password', description: 'User password' })
  password: string;
}
