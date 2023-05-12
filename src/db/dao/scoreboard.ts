/*
import {
    Board, DjmaxButton, DjmaxPattern, NumberBoolean
} from "v-archive-api-client";
import { getRepository } from "../../db";
import { omitProperty } from "../../util/omit";
import { addUser, getUserId } from "./user";

interface ScoreboardData {
    board: Board;
    button: DjmaxButton;
    floor?: number;
    title: number;
    name: string;
    composer: string;
    score?: number;
    maxCombo?: NumberBoolean;
    dlc: string;
    dlcCode: string;
    pattern: DjmaxPattern;
}

const deleteScoreboards = async (userId: number) => {
    console.log(`Clear scoreboard: ${userId}`);
    const repo = getRepository(Scoreboard);
    return repo.delete({
        user: {
            id: userId
        }
    });
};

const insertScoreboards = async (userId: number, data: ScoreboardData[]) => {
    const repo = getRepository(Scoreboard);

    console.log(`Insert scoreboards: ${userId} / ${data.length}`);

    const processed = data.map((d) => omitProperty({
        user: {
            id: userId
        },
        rawMaxCombo: d.maxCombo,
        ...d
    }, "maxCombo"));

    // Paginated insert for SQLite variable maximum limit
    if (processed.length > 10) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i <= Math.ceil(processed.length / 50); i++) {
            const start = i * 50;
            const end = start + 50;
            console.log(`${start} / ${end}`);
            if (end >= processed.length) {
                const current = processed.slice(start);
                console.log(current.map((c) => c.title));
                await repo.insert(current);
                return;
            }
            const current = processed.slice(start, end);
            console.log(current.map((c) => c.title));
            await repo.insert(current);
        }
    } else {
        await repo.insert(processed);
    }
};

const updateScoreboards = async (username: string, data: ScoreboardData[]) => {
    let userId = await getUserId(username);

    if (!userId) {
        console.log(`New user: ${username}`);
        const user = await addUser(username);
        userId = user?.id;
    }

    if (!userId) {
        return false;
    }

    console.log(`Updating scoreboards: ${username} (${userId})`);

    await deleteScoreboards(userId);
    await insertScoreboards(userId, data);

    return true;
};

export { updateScoreboards, ScoreboardData };
*/
