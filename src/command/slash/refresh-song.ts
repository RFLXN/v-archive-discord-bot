import { SlashCommandBuilder } from "discord.js";
import { DjmaxButton, DjmaxPattern } from "v-archive-api-client";
import { SlashCommand } from "../../type/command";
import { fetchSongs } from "../../api/song";
import { SongData, updateSongs } from "../../db/dao/song";
import { PatternData, updatePattern } from "../../db/dao/pattern";

const convertStrButton = (s: "4B" | "5B" | "6B" | "8B"): DjmaxButton => {
    if (s == "4B") return 4;
    if (s == "5B") return 5;
    if (s == "6B") return 6;
    return 8;
};

const convertShortenPattern = (s: "NM" | "HD" | "MX" | "SC"): DjmaxPattern => {
    if (s == "NM") return "NORMAL";
    if (s == "HD") return "HARD";
    if (s == "MX") return "MAXIMUM";
    return "SC";
};

const refreshSong: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("refresh-song")
        .setDescription("refresh song data"),
    exec: async (interaction) => {
        const message = await interaction.reply({
            content: "refreshing song data... this may takes a few minutes",
            fetchReply: true
        });

        let songs;
        try {
            songs = await fetchSongs();
        } catch (e) {
            await message.edit("Error: Failed to fetch song data");
            console.error(e);
            return;
        }

        const songData: SongData[] = [];
        const patternData: PatternData[] = [];

        songs.map((song) => {
            songData.push({
                title: song.title,
                composer: song.composer,
                dlc: song.dlc,
                dlcCode: song.dlcCode,
                name: song.name
            });

            const buttonKeys = Object.keys(song.patterns) as (keyof typeof song.patterns)[];
            buttonKeys.map((buttonKey) => {
                const patterns = song.patterns[buttonKey];
                const button = convertStrButton(buttonKey);

                const patternKeys = Object.keys(patterns) as (keyof typeof patterns)[];
                patternKeys.map((patternKey) => {
                    const pattern = patterns[patternKey];
                    const patternName = convertShortenPattern(patternKey);

                    patternData.push({
                        songTitle: song.title,
                        pattern: patternName,
                        level: pattern.level,
                        floor: pattern?.floor,
                        button
                    });
                });
            });
        });

        try {
            await updateSongs(songData);
            await updatePattern(patternData);
        } catch (e) {
            await message.edit("Error: Failed to save song data");
            console.error(e);
            return;
        }

        await message.edit("Song data refreshed");
    }
};

export default refreshSong;
