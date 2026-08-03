const { EmbedBuilder } = require("discord.js");
const cron = require("node-cron");

const CHANNEL_ID = "1531350712204787893";

const reminders = [
  {
    title: "🌏 Asia Session OPEN",
    schedule: "0 17 * * 1-5",
    color: 0x3498db,
    description:
      "• Asia Session is now live.\n" +
      "• Focus on liquidity and range development.\n" +
      "• Best pairs: JPY, AUD, NZD.\n" +
      "• Wait for confirmation before entering."
  },
  {
    title: "🌏 Asia Session CLOSED",
    schedule: "0 2 * * 2-6",
    color: 0x95a5a6,
    description:
      "• Asia Session has ended.\n" +
      "• Avoid forcing trades.\n" +
      "• Get ready for London volatility."
  },
  {
    title: "🇬🇧 London Session OPEN",
    schedule: "0 0 * * 2-6",
    color: 0x2ecc71,
    description:
      "• London Session is now live.\n" +
      "• Increased volatility ahead.\n" +
      "• Watch for breakouts and trend continuation."
  },
  {
    title: "🇬🇧 London Session CLOSED",
    schedule: "0 9 * * 2-6",
    color: 0x95a5a6,
    description:
      "• London Session has ended.\n" +
      "• Liquidity may begin slowing.\n" +
      "• Stay disciplined if you're still trading."
  },
  {
    title: "🇺🇸 New York Session OPEN",
    schedule: "0 6 * * 1-5",
    color: 0xe74c3c,
    description:
      "• New York Session is now live.\n" +
      "• Watch for USD news and strong momentum.\n" +
      "• Trade your plan, not your emotions."
  },
  {
    title: "🇺🇸 New York Session CLOSED",
    schedule: "0 15 * * 1-5",
    color: 0x95a5a6,
    description:
      "• New York Session has ended.\n" +
      "• Trading day is complete.\n" +
      "• Journal your trades and prepare for tomorrow."
  }
];

client.once("ready", async () => {
  console.log(`${client.user.tag} is online!`);

  const channel = await client.channels.fetch(CHANNEL_ID);

  reminders.forEach((reminder) => {
    cron.schedule(
      reminder.schedule,
      async () => {
        const embed = new EmbedBuilder()
          .setColor(reminder.color)
          .setTitle(reminder.title)
          .setDescription(reminder.description)
          .setFooter({
            text: "ClassicTrades • Stay Disciplined"
          })
          .setTimestamp();

        await channel.send({
          content: "@everyone",
          embeds: [embed],
          allowedMentions: {
            parse: ["everyone"]
          }
        });

        console.log(`${reminder.title} reminder sent.`);
      },
      {
        timezone: "America/Phoenix"
      }
    );
  });
});
