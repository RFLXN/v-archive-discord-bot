import { REST, Routes } from "discord.js";
import { CommandRegisterData, GuildCommandRegisteringData } from "../type/command";

const registerCommands = async (rest: REST, data: CommandRegisterData) => {
    const body = data.commands.map((c) => c.data);
    console.log(`Registering commands: Every ${body.length} commands`);

    const names = body.map((b) => b.name);
    console.log(names);

    await rest.put(
        Routes.applicationCommands(data.clientId),
        {
            body
        }
    );
};

const registerGuildCommands = async (rest: REST, data: GuildCommandRegisteringData) => {
    const body = data.commands.map((c) => c.data);
    console.log(`Registering guild commands: ${body.length} commands in guild ${data.guildId}`);

    await rest.put(
        Routes.applicationGuildCommands(data.clientId, data.guildId),
        {
            body
        }
    );
};

export { registerCommands, registerGuildCommands };
