import { DjmaxButton, DjmaxPattern, NumberBoolean } from "v-archive-api-client";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import {
    And, LessThan, MoreThanOrEqual, Not
} from "typeorm";
import { getRepository } from "../../db";
import { Score } from "../entity/score";
import { addUser, getUserId } from "./user";
import { BoardType } from "../../api/scoreboard";

interface ScoreData {
    songTitle: number;
    button: DjmaxButton;
    patternType: DjmaxPattern;
    score: number;
    fullCombo: NumberBoolean;
}

const deleteScore = async (userId: number) => {
    console.log(`Clear score: ${userId}`);
    const repo = getRepository(Score);
    return repo.delete({
        userId
    });
};

const insertScore = async (userId: number, data: ScoreData[]) => {
    const repo = getRepository(Score);
    const processed: QueryDeepPartialEntity<Score>[] = data.map((score) => ({
        userId,
        score: score.score,
        patternType: score.patternType,
        fullCombo: score.fullCombo,
        songTitle: score.songTitle,
        button: score.button
    }));

    console.log(`Insert ${userId}'s ${processed.length} scores.`);

    if (processed.length > 50) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < Math.ceil(processed.length / 50); i++) {
            const start = i * 50;
            const end = start + 50;

            if (end >= processed.length) {
                const current = processed.slice(start);
                console.log(`Insert scores: ${userId} / ${start} - ${processed.length}`);
                await repo.upsert(current, {
                    conflictPaths: ["userId", "songTitle", "button", "patternType"],
                    upsertType: "on-conflict-do-update",
                    skipUpdateIfNoValuesChanged: true
                });
                return;
            }

            const current = processed.slice(start, end);
            console.log(`Insert scores: ${userId} / ${start} - ${end - 1}`);
            await repo.upsert(current, {
                conflictPaths: ["userId", "songTitle", "button", "patternType"],
                upsertType: "on-conflict-do-update",
                skipUpdateIfNoValuesChanged: true
            });
        }
    } else {
        await repo.insert(processed);
    }
};

const updateScore = async (username: string, data: ScoreData[]) => {
    let userId = await getUserId(username);
    if (!userId) {
        const user = await addUser(username);
        userId = user?.id;
    }

    if (!userId) return false;

    console.log(`Updating scores: ${username} (${userId})`);
    await deleteScore(userId);
    await insertScore(userId, data);
    console.log(`Scores updated: ${username} (${userId})`);

    return true;
};

const getScores = async (username: string) => {
    const userId = await getUserId(username);

    if (!userId) return [];

    const repo = getRepository(Score);
    return repo.find({
        where: {
            userId,
            pattern: {

            }
        },
        relations: ["pattern"]
    });
};

const getButtonScores = async (username: string, button: DjmaxButton) => {
    const userId = await getUserId(username);

    if (!userId) return [];

    const repo = getRepository(Score);

    return repo.find({
        where: {
            userId,
            button
        },
        relations: ["pattern"]
    });
};

const getBoardScores = async (username: string, button: DjmaxButton, board: BoardType) => {
    const userId = await getUserId(username);

    if (!userId) return [];

    const repo = getRepository(Score);
    if (board == "SC") {
        return repo.find({
            where: {
                button,
                pattern: {
                    patternType: "SC",
                    button
                }
            },
            relations: ["pattern"]
        });
    }

    if (board == "SC5") {
        return repo.find({
            where: {
                button,
                pattern: {
                    floor: And(MoreThanOrEqual(0), LessThan(6)),
                    button
                }
            },
            relations: ["pattern"]
        });
    }

    if (board == "SC10") {
        return repo.find({
            where: {
                button,
                pattern: {
                    floor: And(MoreThanOrEqual(6), LessThan(11)),
                    button
                }
            },
            relations: ["pattern"]
        });
    }

    if (board == "SC15") {
        return repo.find({
            where: {
                button,
                pattern: {
                    floor: MoreThanOrEqual(11),
                    button
                }
            },
            relations: ["pattern"]
        });
    }

    if (board == "MX") {
        return repo.find({
            where: {
                button,
                pattern: {
                    level: MoreThanOrEqual(12),
                    patternType: Not("SC"),
                    button
                }
            },
            relations: ["pattern"]
        });
    }

    return repo.find({
        where: {
            button,
            pattern: {
                level: LessThan(12),
                patternType: Not("SC"),
                button
            }
        },
        relations: ["pattern"]
    });
};

export {
    updateScore, ScoreData, getScores, getButtonScores, getBoardScores
};
