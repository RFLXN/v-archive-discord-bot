import { DjmaxButton, DjmaxPattern } from "v-archive-api-client";
import {
    And, LessThan, MoreThanOrEqual, Not
} from "typeorm";
import { getRepository } from "../../db";
import { Pattern } from "../entity/pattern";
import { BoardType } from "../../api/scoreboard";

interface PatternData {
    songTitle: number;
    button: DjmaxButton;
    patternType: DjmaxPattern;
    level: number;
    floor?: number;
}

const deletePattern = async () => {
    console.log("Clear patterns");
    const repo = getRepository(Pattern);
    await repo.clear();
};

const insertPattern = async (data: PatternData[]) => {
    const repo = getRepository(Pattern);

    console.log(`Insert ${data.length} patterns`);

    if (data.length > 50) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i <= Math.ceil(data.length / 50); i++) {
            const start = i * 50;
            const end = start + 50;

            if (end >= data.length) {
                const current = data.slice(start);
                console.log(`Insert patterns: ${start} - ${data.length}`);
                await repo.insert(current);
                return;
            }
            const current = data.slice(start, end);
            console.log(`Insert patterns: ${start} - ${end - 1}`);
            await repo.insert(current);
        }
    } else {
        await repo.insert(data);
    }
};

const updatePattern = async (data: PatternData[]) => {
    console.log("Updating patterns");
    await deletePattern();
    await insertPattern(data);
    console.log("Patterns updated");
};

const getPatternNums = async () => {
    const repo = getRepository(Pattern);
    return repo.count();
};

const getButtonPatternNums = async (button: DjmaxButton) => {
    const repo = getRepository(Pattern);
    return repo.count({
        where: {
            button
        }
    });
};

const getBoardPatternNums = async (button: DjmaxButton, board: BoardType) => {
    const repo = getRepository(Pattern);

    if (board == "SC") {
        return repo.count({
            where: {
                button,
                patternType: "SC"
            }
        });
    }

    if (board == "SC5") {
        return repo.count({
            where: {
                button,
                floor: And(MoreThanOrEqual(0), LessThan(6))
            }
        });
    }

    if (board == "SC10") {
        return repo.count({
            where: {
                button,
                floor: And(MoreThanOrEqual(6), LessThan(11))
            }
        });
    }

    if (board == "SC15") {
        return repo.count({
            where: {
                button,
                floor: MoreThanOrEqual(11)
            }
        });
    }

    if (board == "MX") {
        return repo.count({
            where: {
                button,
                level: MoreThanOrEqual(12),
                patternType: Not("SC")
            }
        });
    }

    return repo.count({
        where: {
            button,
            level: LessThan(12),
            patternType: Not("SC")
        }
    });
};

export {
    updatePattern, PatternData, getPatternNums, getButtonPatternNums, getBoardPatternNums
};
