import {
    Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation
} from "typeorm";
import { DjmaxButton, DjmaxPattern, NumberBoolean } from "v-archive-api-client";
import { User } from "./user";
import { Pattern } from "./pattern";

@Entity("SCORE")
class Score {
    @PrimaryColumn({
        name: "USER_ID",
        type: "integer"
    })
        userId!: number;

    @PrimaryColumn({
        name: "SONG_TITLE",
        type: "integer"
    })
        songTitle!: number;

    @PrimaryColumn({
        name: "BUTTON",
        type: "integer"
    })
        button!: DjmaxButton;

    @PrimaryColumn({
        name: "PATTERN",
        type: "text"
    })
        patternType!: DjmaxPattern;

    @Column({
        name: "SCORE",
        type: "real",
        nullable: false
    })
        score!: number;

    @Column({
        name: "FULL_COMBO",
        type: "integer",
        nullable: false
    })
        fullCombo!: NumberBoolean;

    @ManyToOne(
        () => User,
        (user) => user.scores,
        { onDelete: "CASCADE" }
    )
    @JoinColumn({
        name: "USER_ID",
        referencedColumnName: "id"
    })
        user!: Relation<User>;

    @ManyToOne(
        () => Pattern,
        (pattern) => pattern.scores,
        { onDelete: "CASCADE" }
    )
    @JoinColumn([
        { name: "SONG_TITLE", referencedColumnName: "songTitle" },
        { name: "BUTTON", referencedColumnName: "button" },
        { name: "PATTERN", referencedColumnName: "patternType" }
    ])
        pattern!: Pattern;
}

export { Score };
