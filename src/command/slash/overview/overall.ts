import { ChatInputCommandInteraction } from "discord.js";
import { getUser } from "../../../db/dao/user";
import { getScores } from "../../../db/dao/score";
import { getPatternNums } from "../../../db/dao/pattern";
import { createEmbed } from "./embed";

const doOverall = async (interaction: ChatInputCommandInteraction, username: string) => {
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
        const scores = await getScores(username);
        const totalPatterns = await getPatternNums();

        embed = createEmbed(username, totalPatterns, scores)
            .setTitle(`All buttons overall: ${username}`)
            .setURL(`https://v-archive.net/archive/${username}/board`)
            .setTimestamp(user.lastUpdate)
            .setFooter({ text: "Last update" });
    } catch (e) {
        console.error(e);
        await interaction.reply("Error: Failed to create overview");
        return;
    }

    await deferred.edit({
        embeds: [embed]
    });
};

export default doOverall;
