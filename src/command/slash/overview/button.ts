import { ChatInputCommandInteraction } from "discord.js";
import { DjmaxButton } from "v-archive-api-client";
import { BoardType, convertBoardToLevelRange } from "../../../api/scoreboard";
import { getUser } from "../../../db/dao/user";
import { getBoardPatternNums, getButtonPatternNums } from "../../../db/dao/pattern";
import { getBoardScores, getButtonScores } from "../../../db/dao/score";
import { createEmbed } from "./embed";

const doButton = async (
    interaction: ChatInputCommandInteraction,
    username: string,
    button: DjmaxButton,
    board: BoardType
) => {
    const user = await getUser(username);

    if (!user) {
        await interaction.reply(
            `Invalid username '${username}'`
            + "\ndo '/renew' for renew user"
        );
        return;
    }

    const deferred = await interaction.deferReply();

    let embed;
    try {
        let totalPatterns = 0;
        let scores;
        if (board == "OVERALL") {
            totalPatterns = await getButtonPatternNums(button);
            scores = await getButtonScores(username, button);
        } else {
            totalPatterns = await getBoardPatternNums(button, board);
            scores = await getBoardScores(username, button, board);
        }

        embed = createEmbed(username, totalPatterns, scores)
            .setTitle(`${button}B ${convertBoardToLevelRange(board)}: ${username}`)
            .setTimestamp(user.lastUpdate)
            .setFooter({ text: "Last update" });

        if (board == "OVERALL" || board == "11") {
            embed
                .setURL(`https://v-archive.net/archive/${username}/board`);
        } else {
            embed
                .setURL(`https://v-archive.net/archive/${username}/board/${button}/${board}`);
        }
    } catch (e) {
        console.error(e);
        await deferred.edit("Error: Failed to create overview");
        return;
    }

    await deferred.edit({
        embeds: [embed]
    });
};

export default doButton;
