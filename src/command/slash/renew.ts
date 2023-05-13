import { SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { NumberBoolean } from "v-archive-api-client";
import { SlashCommand } from "../../type/command";
import { convertShortenPattern, fetchScoreboards } from "../../api/scoreboard";
import { ScoreData, updateScore } from "../../db/dao/score";
import { updateUser } from "../../db/dao/user";

const renew: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("renew")
        .setDescription("renew scoreboard")
        .setNameLocalizations({
            ko: "갱신"
        })
        .setDescriptionLocalizations({
            ko: "점수표를 갱신합니다"
        })
        .addStringOption(
            new SlashCommandStringOption()
                .setName("username")
                .setDescription("username")
                .setNameLocalizations({
                    ko: "유저명"
                })
                .setDescriptionLocalizations({
                    ko: "유저명"
                })
                .setRequired(true)
        ),
    exec: async (interaction) => {
        const username = interaction.options.getString("username", true);

        const message = await interaction.reply({
            content: `Updating ${username}'s scoreboards. This may takes a few minutes.`,
            fetchReply: true
        });

        let scoreboards;

        try {
            scoreboards = await fetchScoreboards(username);
        } catch (e) {
            console.error(e);
            await message.edit("Error: Failed to fetch scoreboards");
            return;
        }

        const processed: ScoreData[] = [];

        scoreboards.map((scoreboard) => {
            scoreboard.floors.map((floor) => {
                floor.patterns.map((pattern) => {
                    if (pattern.score) {
                        const data = {
                            songTitle: pattern.title,
                            button: scoreboard.button,
                            fullCombo: (pattern.maxCombo === 1 ? 1 : 0) as NumberBoolean,
                            score: pattern.score,
                            patternType: convertShortenPattern(pattern.pattern)
                        };
                        processed.push(data);
                    }
                });
            });
        });

        try {
            await updateScore(username, processed);
            await updateUser(username);
        } catch (e) {
            console.error(e);
            await message.edit("Error: Failed to save data");
            return;
        }

        await message.edit("Scoreboards renewed");
    }
};

export default renew;
