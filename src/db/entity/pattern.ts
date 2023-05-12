import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, Relation
} from "typeorm";
import { DjmaxButton, DjmaxPattern } from "v-archive-api-client";
import { Song } from "./song";
import { Score } from "./score";

@Entity("PATTERN")
class Pattern {
    @PrimaryColumn({
        type: "integer",
        name: "SONG_TITLE"
    })
        songTitle!: number;

    @PrimaryColumn({
        type: "integer",
        name: "BUTTON"
    })
        button!: DjmaxButton;

    @PrimaryColumn({
        type: "text",
        name: "PATTERN"
    })
        pattern!: DjmaxPattern;

    @Column({
        name: "LEVEL",
        type: "integer"
    })
        level!: number;

    @Column({
        name: "FLOOR",
        type: "real"
    })
        floor?: number;

    @ManyToOne(
        () => Song,
        (song) => song.patterns,
        { onDelete: "CASCADE" }
    )
    @JoinColumn({
        name: "SONG_TITLE",
        referencedColumnName: "title"
    })
        song!: Relation<Song>;

    @OneToMany(
        () => Score,
        (score) => score.pattern
    )
        scores!: Score[];
}

export { Pattern };
