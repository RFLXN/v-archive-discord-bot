import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { DjmaxButton } from "v-archive-api-client";
import { getUser } from "../../../db/dao/user";
import { getScores } from "../../../db/dao/score";
import { getPatternNums } from "../../../db/dao/pattern";
import { createEmbedDescription, createTierString } from "./description";
import { fetchAllTier } from "../../../api/tier";

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
        const tiers = await fetchAllTier(username);

        let tierString = "";

        const buttons: DjmaxButton[] = [4, 5, 6, 8];
        for (const buttonKey of buttons) {
            const tier = tiers[buttonKey];
            if (tier) {
                tierString += `${createTierString(buttonKey, tier)}\n`;
            } else {
                tierString += `${buttonKey}B Tier: None\n`;
            }
        }

        const description = tierString + createEmbedDescription(username, totalPatterns, scores);
        embed = new EmbedBuilder().setDescription(description)
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
