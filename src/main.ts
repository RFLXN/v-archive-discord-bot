import { config } from "dotenv";
import {
    ChatInputCommandInteraction,
    Client,
    IntentsBitField,
    MessageContextMenuCommandInteraction,
    REST,
    UserContextMenuCommandInteraction
} from "discord.js";
import { registerCommands } from "./command/register";
import { Command } from "./type/command";
import { commands as slashCommands, handleSlashCommand } from "./command/slash";
import { closeDB, connectDB, isDbExist } from "./db";
import { initDB } from "./db/init";

// load .env file
config();

if (!process.env.DISCORD_TOKEN || process.env.DISCORD_TOKEN == "") {
    console.error("Invalid discord bot token.");
    process.exit(1);
}

if (!(await isDbExist())) {
    await initDB();
}

process.on("exit", async () => {
    await closeDB();
});

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

const rest = new REST();
rest.setToken(process.env.DISCORD_TOKEN);

client.on("ready", async (c) => {
    console.log(`Bot logged in as ${c.user.tag} (ID: ${c.user.id})`);

    const commands: Command[] = [...slashCommands];
    await registerCommands(rest, {
        clientId: c.application.id,
        commands
    });

    await connectDB();
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {
        const i = interaction as ChatInputCommandInteraction;
        await handleSlashCommand(i);
    }
    if (interaction.isUserContextMenuCommand()) {
        const i = interaction as UserContextMenuCommandInteraction;
    }
    if (interaction.isMessageContextMenuCommand()) {
        const i = interaction as MessageContextMenuCommandInteraction;
    }
});

try {
    await client.login(process.env.DISCORD_TOKEN);
} catch (e) {
    console.error(e);
    process.exit(1);
}
