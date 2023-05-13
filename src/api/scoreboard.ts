import vArchiveApi, {
    Board,
    DjmaxButton,
    DjmaxPattern,
    DjmaxShortenPattern,
    ScoreboardResponse
} from "v-archive-api-client";

const buttons: DjmaxButton[] = [4, 5, 6, 8];

const boards: Board[] = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11",
    "MX", "SC5", "SC10", "SC15"
];

type BoardType = "OVERALL" | "11" | "MX" | "SC" | "SC5" | "SC10" | "SC15";

const convertBoardToLevelRange = (board: BoardType) => {
    if (board == "OVERALL") return "Overall (All levels)";
    if (board == "11") return "Low levels (1~11)";
    if (board == "MX") return "MAXIMUM (12~15)";
    if (board == "SC") return "All SC";
    if (board == "SC5") return "SC 1~5";
    if (board == "SC10") return "SC 6~10";
    return "SC 11~15";
};

const convertShortenPattern = (pattern: DjmaxShortenPattern): DjmaxPattern => {
    if (pattern == "NM") return "NORMAL";
    if (pattern == "HD") return "HARD";
    if (pattern == "MX") return "MAXIMUM";
    return "SC";
};

const fetchScoreboard = async (userName: string, button: DjmaxButton, board: Board) => {
    console.log(`Fetching scoreboard: ${userName} / ${button}B / ${board}`);

    return vArchiveApi.scoreboard({
        nickname: userName,
        board,
        button
    });
};

const fetchScoreboards = async (userName: string) => {
    const scoreboards: ScoreboardResponse[] = [];
    console.log(`Fetching all scoreboards: ${userName}`);

    for (const button of buttons) {
        for (const board of boards) {
            try {
                const res = await fetchScoreboard(userName, button, board);
                scoreboards.push(res);
            } catch (e) {
                console.error(e);
            }
        }
    }

    console.log(`Scoreboards fetched: ${userName}`);

    return scoreboards;
};

export {
    fetchScoreboards, fetchScoreboard, BoardType, convertBoardToLevelRange, convertShortenPattern
};
