import {
    Column, Entity, OneToMany, PrimaryGeneratedColumn
} from "typeorm";
import { Score } from "./score";

@Entity("USER")
class User {
    @PrimaryGeneratedColumn(
        "increment",
        {
            name: "ID",
            type: "integer"
        }
    )
        id!: number;

    @Column({
        name: "USERNAME",
        type: "text",
        nullable: false,
        unique: true
    })
        username!: string;

    @Column({
        name: "LAST_UPDATE",
        type: "integer",
        nullable: false
    })
        rawLastUpdate!: number;

    @OneToMany(
        () => Score,
        (score) => score.user
    )
        scores!: Score[];

    public get lastUpdate() {
        return new Date(this.rawLastUpdate);
    }
}

export { User };
