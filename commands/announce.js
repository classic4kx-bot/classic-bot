const {
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("announce")
    .setDescription("Create an announcement")

    .addStringOption(option =>
      option
        .setName("title")
        .setDescription("Announcement title")
        .setRequired(true)
    )

    .addStringOption(option =>
      option
        .setName("message")
        .setDescription("Announcement message")
        .setRequired(true)
    )

    .addBooleanOption(option =>
      option
        .setName("everyone")
        .setDescription("Ping everyone?")
    ),

  async execute(interaction) {
    const title = interaction.options.getString("title");
    const message = interaction.options.getString("message");
    const everyone = interaction.options.getBoolean("everyone") ?? false;

    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`📢 ${title}`)
      .setDescription(message)
      .setFooter({ text: "Classic Trades" })
      .setTimestamp();

    await interaction.reply({
      content: everyone ? "@everyone" : "",
      embeds: [embed],
      allowedMentions: {
        parse: everyone ? ["everyone"] : []
      }
    });
  }
};
