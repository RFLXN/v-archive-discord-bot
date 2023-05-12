import {
    Column, Entity, OneToMany, PrimaryColumn
} from "typeorm";
import { Pattern } from "./pattern";

@Entity("SONG")
class Song {
    @PrimaryColumn({
        type: "integer",
        name: "TITLE"
    })
        title!: number;

    @Column({
        type: "text",
        name: "NAME"
    })
        name!: string;

    @Column({
        type: "text",
        name: "COMPOSER"
    })
        composer!: string;

    @Column({
        type: "text",
        name: "DLC"
    })
        dlc!: string;

    @Column({
        type: "text",
        name: "DLC_CODE"
    })
        dlcCode!: string;

    @OneToMany(
        () => Pattern,
        (pattern) => pattern.song
    )

        patterns!: Pattern[];
}

export { Song };
