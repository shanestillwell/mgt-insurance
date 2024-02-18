import { 
  Entity, 
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm"

import {
    IsInt,
    Length,
    Min,
    Max,
} from "class-validator"

@Entity()
export class Quote {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Length(2, 100)
    name: string

    @Column()
    @IsInt()
    @Min(0)
    @Max(150)
    age: number

    @Column()
    @Length(2, 100)
    carModel: string

    @Column()
    @IsInt()
    @Min(0)
    @Max(100)
    drivingExpYrs: number

    @Column("decimal", {
      nullable: true,
      precision: 5,
      scale: 2,
    })
    quoteRate: number;

    @Column({
      type: 'text',
      generatedType: 'STORED',
      asExpression: `trim(lower(name)) || '::' || age || '::' || trim(lower("carModel")) || '::' || "drivingExpYrs"`,
    })
    inputKey: string

    @CreateDateColumn({ type: 'timestamptz'})
    createdAt: Date;
}
