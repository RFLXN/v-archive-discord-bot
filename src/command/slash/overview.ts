import { SlashCommandBuilder, SlashCommandStringOption, SlashCommandSubcommandBuilder } from "discord.js";
import { DjmaxButton } from "v-archive-api-client";
import { SlashCommand } from "../../type/command";
import doOverall from "./overview/overall";
import doButton from "./overview/button";
import { BoardType } from "../../api/scoreboard";

const createUsernameOption = () => new SlashCommandStringOption()
    .setName("username")
    .setDescription("username")
    .setNameLocalizations({
        ko: "유저명"
    })
    .setDescriptionLocalizations({
        ko: "유저명"
    })
    .setRequired(true);

const createBoardChoices = () => [
    { name: "Overall", value: "OVERALL" },
    { name: "Low levels (1~11)", value: "11" },
    { name: "MAXIMUM (12~15)", value: "MX" },
    { name: "All SC", value: "SC" },
    { name: "SC 1~5", value: "SC5" },
    { name: "SC 6~10", value: "SC10" },
    { name: "SC 11~15", value: "SC15" }
];

const createBoardOption = () => new SlashCommandStringOption()
    .setName("board")
    .setDescription("overview board type")
    .setNameLocalizations({
        ko: "성과표"
    })
    .setDescriptionLocalizations({
        ko: "성과표 종류"
    })
    .setRequired(true)
    .addChoices(...createBoardChoices());

const overview: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("overview")
        .setDescription("get user's overview")
        .setNameLocalizations({
            ko: "개요"
        })
        .setDescriptionLocalizations({
            ko: "개요를 출력합니다"
        })
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("overall")
                .setDescription("Overall (All buttons)")
                .addStringOption(createUsernameOption())
                .setNameLocalizations({
                    ko: "전체"
                })
                .setDescriptionLocalizations({
                    ko: "전체 개요"
                })
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("4b")
                .setDescription("4 buttons")
                .addStringOption(createUsernameOption())
                .addStringOption(createBoardOption())
                .setNameLocalizations({
                    ko: "4버튼"
                })
                .setDescriptionLocalizations({
                    ko: "4B 개요"
                })
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("5b")
                .setDescription("5 buttons")
                .addStringOption(createUsernameOption())
                .addStringOption(createBoardOption())
                .setNameLocalizations({
                    ko: "5버튼"
                })
                .setDescriptionLocalizations({
                    ko: "5B 개요"
                })
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("6b")
                .setDescription("6 buttons")
                .addStringOption(createUsernameOption())
                .addStringOption(createBoardOption())
                .setNameLocalizations({
                    ko: "6버튼"
                })
                .setDescriptionLocalizations({
                    ko: "6B 개요"
                })
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("8b")
                .setDescription("8 buttons")
                .addStringOption(createUsernameOption())
                .addStringOption(createBoardOption())
                .setNameLocalizations({
                    ko: "8버튼"
                })
                .setDescriptionLocalizations({
                    ko: "8B 개요"
                })
        ),
    exec: async (interaction) => {
        const cmd = interaction.options.getSubcommand(true);
        const username = interaction.options.getString("username", true);

        if (cmd == "overall") {
            await doOverall(interaction, username);
            return;
        }

        const board = interaction.options.getString("board", true) as BoardType;

        let button: DjmaxButton;
        if (cmd.startsWith("4")) {
            button = 4;
        } else if (cmd.startsWith("5")) {
            button = 5;
        } else if (cmd.startsWith("6")) {
            button = 6;
        } else {
            button = 8;
        }

        await doButton(interaction, username, button, board);
    }
};

export default overview;
