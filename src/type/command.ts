import {
    ChatInputCommandInteraction,
    ContextMenuCommandBuilder,
    MessageContextMenuCommandInteraction,
    SlashCommandBuilder,
    UserContextMenuCommandInteraction
} from "discord.js";

interface UserContextMenuCommand {
    data: Partial<ContextMenuCommandBuilder>;
    exec: (interaction: UserContextMenuCommandInteraction) => void;
}

interface MessageContextMenuCommand {
    data: Partial<ContextMenuCommandBuilder>;
    exec: (interaction: MessageContextMenuCommandInteraction) => void;
}

interface SlashCommand {
    data: Partial<SlashCommandBuilder>;
    exec: (interaction: ChatInputCommandInteraction) => void;
}

type Command = UserContextMenuCommand | MessageContextMenuCommand | SlashCommand;

interface CommandRegisterData {
    clientId: string;
    commands: Command[];
}

interface GuildCommandRegisteringData extends CommandRegisterData {
    guildId: string;
}

export {
    SlashCommand,
    UserContextMenuCommand,
    MessageContextMenuCommand,
    Command,
    CommandRegisterData,
    GuildCommandRegisteringData
};
