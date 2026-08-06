require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const cron = require("node-cron");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const CHANNELS = [
  "1531350712204787893", // Forex News
  "1302408452534173848"  // General Chat
];

async function sendSession(title, description, color) {
  for (const id of CHANNELS) {
    try {
      const channel = await client.channels.fetch(id);

      const embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setFooter({ text: "Classic Trades" })
        .setTimestamp();

      await channel.send({
        content: "@everyone",
        embeds: [embed],
        allowedMentions: { parse: ["everyone"] }
      });
    } catch (err) {
      console.error(err);
    }
  }
}

client.once("ready", () => {
  console.log(`${client.user.tag} is online!`);

  // Asia
  cron.schedule(
    "0 17 * * 0-4",
    () => sendSession(
      "🌏 Asia Session OPEN",
      "Time to watch JPY, AUD & NZD pairs.",
      0x00ff00
    ),
    { timezone: "America/Phoenix" }
  );

  cron.schedule(
    "0 2 * * 1-5",
    () => sendSession(
      "🌏 Asia Session CLOSED",
      "Asia session has closed.",
      0xff0000
    ),
    { timezone: "America/Phoenix" }
  );

  // London
  cron.schedule(
    "0 1 * * 1-5",
    () => sendSession(
      "🇬🇧 London Session OPEN",
      "London session is now live.",
      0x00ff00
    ),
    { timezone: "America/Phoenix" }
  );

  cron.schedule(
    "0 10 * * 1-5",
    () => sendSession(
      "🇬🇧 London Session CLOSED",
      "London session has closed.",
      0xff0000
    ),
    { timezone: "America/Phoenix" }
  );

  // New York
  cron.schedule(
    "0 7 * * 1-5",
    () => sendSession(
      "🇺🇸 New York Session OPEN",
      "New York session is now live.",
      0x00ff00
    ),
    { timezone: "America/Phoenix" }
  );

  cron.schedule(
    "0 16 * * 1-5",
    () => sendSession(
      "🇺🇸 New York Session CLOSED",
      "New York session has closed.",
      0xff0000
    ),
    { timezone: "America/Phoenix" }
  );
});

client.login(process.env.TOKEN);
