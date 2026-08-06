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

  // 🌏 Asia Session
  cron.schedule(
    "0 17 * * 0-4",
    () => sendSession(
      "🌏 Asia Session OPEN",
      "📈 **Focus Markets**\n• JPY\n• AUD\n• NZD\n\n⚠️ Liquidity begins building. Watch for early session setups and avoid forcing trades.",
      0x00ff00
    ),
    { timezone: "America/Phoenix" }
  );

  cron.schedule(
    "0 2 * * 1-5",
    () => sendSession(
      "🌏 Asia Session CLOSED",
      "📉 The Asia session has ended.\n\nPrepare for increased volatility as the London session approaches.",
      0xff0000
    ),
    { timezone: "America/Phoenix" }
  );

  // 🇬🇧 London Session
  cron.schedule(
    "0 1 * * 1-5",
    () => sendSession(
      "🇬🇧 London Session OPEN",
      "📈 **Focus Markets**\n• GBP\n• EUR\n\n⚠️ One of the highest volatility sessions. Watch for liquidity sweeps, breakouts, and trend continuation.",
      0x00ff00
    ),
    { timezone: "America/Phoenix" }
  );

  cron.schedule(
    "0 10 * * 1-5",
    () => sendSession(
      "🇬🇧 London Session CLOSED",
      "📉 The London session has ended.\n\nAttention now shifts to the New York session.",
      0xff0000
    ),
    { timezone: "America/Phoenix" }
  );

  // 🇺🇸 New York Session
  cron.schedule(
    "0 7 * * 1-5",
    () => sendSession(
      "🇺🇸 New York Session OPEN",
      "📈 **Focus Markets**\n• USD\n• XAUUSD (Gold)\n• US Indices\n\n⚠️ Expect strong volatility, especially during the London and New York overlap.",
      0x00ff00
    ),
    { timezone: "America/Phoenix" }
  );

  cron.schedule(
    "0 16 * * 1-5",
    () => sendSession(
      "🇺🇸 New York Session CLOSED",
      "📉 The trading day has ended.\n\n📝 Review your trades, journal your results, and prepare for tomorrow's opportunities.",
      0xff0000
    ),
    { timezone: "America/Phoenix" }
  );
});

client.login(process.env.TOKEN);
