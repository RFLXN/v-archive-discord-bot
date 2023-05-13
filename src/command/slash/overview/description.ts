import { DjmaxButton, TierResponse } from "v-archive-api-client";
import { Score } from "../../../db/entity/score";

const createEmbedDescription = (username: string, totalPatterns: number, scores: Score[]) => {
    console.log(scores);

    const sorted = scores
        .sort((a, b) => {
            if (!b?.pattern?.floor && !a?.pattern?.floor) {
                return b.pattern.level - a.pattern.level;
            }
            return (b?.pattern?.floor ?? 0) - (a?.pattern?.floor ?? 0);
        });

    const totalPerfectScores = scores
        .filter((score) => score.score == 100);
    const highestPerfect = totalPerfectScores[0]?.pattern?.floor
        ? `Floor: ${totalPerfectScores[0].pattern.floor}` : totalPerfectScores[0]?.pattern.level
            ? `Level: ${totalPerfectScores[0].pattern.level}` : undefined;
    const totalPerfect = totalPerfectScores.length;

    const totalMaxComboScores = scores.filter((score) => score.fullCombo == 1);
    const highestMaxCombo = totalMaxComboScores[0]?.pattern?.floor
        ? `Floor: ${totalMaxComboScores[0].pattern.floor}` : totalMaxComboScores[0]?.pattern.level
            ? `Level: ${totalMaxComboScores[0].pattern.level}` : undefined;
    const totalMaxCombo = totalMaxComboScores.length;

    const totalOver999Scores = scores.filter((score) => score.score >= 99.9);
    const highestOver999 = totalOver999Scores[0]?.pattern?.floor
        ? `Floor: ${totalOver999Scores[0].pattern.floor}` : totalOver999Scores[0]?.pattern.level
            ? `Level: ${totalOver999Scores[0].pattern.level}` : undefined;
    const totalOver999 = totalOver999Scores.length;

    const totalOver995Scores = scores.filter((score) => score.score >= 99.5);
    const highestOver995 = totalOver995Scores[0]?.pattern?.floor
        ? `Floor: ${totalOver995Scores[0].pattern.floor}` : totalOver995Scores[0]?.pattern.level
            ? `Level: ${totalOver995Scores[0].pattern.level}` : undefined;
    const totalOver995 = totalOver995Scores.length;

    const totalOver99Scores = scores.filter((score) => score.score >= 99);
    const highestOver99 = totalOver99Scores[0]?.pattern?.floor
        ? `Floor: ${totalOver99Scores[0].pattern.floor}` : totalOver99Scores[0]?.pattern.level
            ? `Level: ${totalOver99Scores[0].pattern.level}` : undefined;
    const totalOver99 = totalOver99Scores.length;

    const totalOver97Scores = scores.filter((score) => score.score >= 97);
    const highestOver97 = totalOver97Scores[0]?.pattern?.floor
        ? `Floor: ${totalOver97Scores[0].pattern.floor}` : totalOver97Scores[0]?.pattern.level
            ? `Level: ${totalOver97Scores[0].pattern.level}` : undefined;
    const totalOver97 = totalOver97Scores.length;

    const highestClear = sorted[0]?.pattern?.floor
        ? `Floor: ${sorted[0].pattern.floor}` : sorted[0]?.pattern.level
            ? `Level: ${sorted[0].pattern.level}` : undefined;
    const totalClear = sorted.length;

    return `Perfect: ${totalPerfect} / ${totalPatterns}`
        + ` (${((totalPerfect / totalPatterns) * 100).toFixed(2)}%)`
        + ` ${highestPerfect ? `[Highest ${highestPerfect}]` : ""}`
        + `\nMax Combo: ${totalMaxCombo} / ${totalPatterns}`
        + ` (${((totalMaxCombo / totalPatterns) * 100).toFixed(2)}%)`
        + ` ${highestMaxCombo ? `[Highest ${highestMaxCombo}]` : ""}`
        + `\nOver 99.9: ${totalOver999} / ${totalPatterns}`
        + ` (${((totalOver999 / totalPatterns) * 100).toFixed(2)}%)`
        + ` ${highestOver999 ? `[Highest ${highestOver999}]` : ""}`
        + `\nOver 99.5: ${totalOver995} / ${totalPatterns}`
        + ` (${((totalOver995 / totalPatterns) * 100).toFixed(2)}%)`
        + ` ${highestOver995 ? `[Highest ${highestOver995}]` : ""}`
        + `\nOver 99: ${totalOver99} / ${totalPatterns}`
        + ` (${((totalOver99 / totalPatterns) * 100).toFixed(2)}%)`
        + ` ${highestOver99 ? `[Highest ${highestOver99}]` : ""}`
        + `\nOver 97: ${totalOver97} / ${totalPatterns}`
        + ` (${((totalOver97 / totalPatterns) * 100).toFixed(2)}%)`
        + ` ${highestOver97 ? `[Highest ${highestOver97}]` : ""}`
        + `\nClear: ${totalClear} / ${totalPatterns}`
        + ` (${((totalClear / totalPatterns) * 100).toFixed(2)}%)`
        + ` ${highestClear ? `[Highest ${highestClear}]` : ""}`;
};

const createTierString = (button: DjmaxButton, tier: TierResponse) => `${button}B Tier: ${tier.tier.name}`
        + ` (Point: ${tier.tierPoint} / Top50: ${tier.top50sum})`;

export { createEmbedDescription, createTierString };
