import { ChatInputCommandInteraction, TextChannel } from "discord.js";
import { SlashCommand } from "../type/command";
import renew from "./slash/renew";
import refreshSong from "./slash/refresh-song";
import overview from "./slash/overview";

const commands: SlashCommand[] = [
    renew,
    refreshSong,
    overview
];

const handleSlashCommand = async (interaction: ChatInputCommandInteraction) => {
    const { commandName } = interaction;
    const command = commands.find((c) => c.data.name == commandName);

    if (!command) {
        await interaction.reply("Invalid command.");
        return;
    }

    const start = new Date();
    console.log(
        `Run slash command: ${commandName} (${interaction.id})`
        + `\n\tin guild: ${interaction.guild?.name} (${interaction.guild?.id})`
        + `\n\tin channel: ${(interaction.channel as TextChannel).name} (${interaction.channel?.id})`
        + `\n\tby user: ${interaction.user.tag} (${interaction.user.id})`
    );
    try {
        await command.exec(interaction);
    } catch (e) {
        console.error(e);
    }
    const end = new Date();
    const diffSec = ((end.valueOf() - start.valueOf()) / 1000).toFixed(3);

    console.log(
        `Slash command executed: ${commandName} (${interaction.id})`
        + `\n\ttime spent: ${diffSec} sec`
    );
};

export { commands, handleSlashCommand };
