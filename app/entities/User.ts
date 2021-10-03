import { IsDate, IsDefined, IsEnum } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Gender {
  MAN = "man",
  WOMAN = "woman",
}

export const typeOfGender: Gender[] = Object.values(Gender);

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsDefined()
  name!: string;

  @Column()
  dob!: string;

  @Column()
  @IsEnum(Gender)
  gender!: Gender;
}
