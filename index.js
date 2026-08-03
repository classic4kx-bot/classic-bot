const cron = require("node-cron");
const { EmbedBuilder } = require("discord.js");

const CHANNEL_ID = "1531350712204787893";

client.once("ready", () => {
  console.log(`${client.user.tag} is online!`);
  console.log("✅ Session reminders loaded.");

  function sendReminder(title, description, color) {
    const channel = client.channels.cache.get(CHANNEL_ID);

    if (!channel) {
      console.log("❌ Channel not found.");
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(color)
      .setFooter({ text: "Classic Trades" })
      .setTimestamp();

    channel.send({
      content: "@everyone",
      embeds: [embed],
      allowedMentions: { parse: ["everyone"] }
    });
  }

  // Asia Open
  cron.schedule("0 17 * * 1-5", () => {
    sendReminder(
      "🌏 Asia Session OPEN",
      "The Asia session is now open.\n\nStay patient and wait for your setup.",
      0x3498db
    );
  }, { timezone: "America/Phoenix" });

  // Asia Close
  cron.schedule("0 2 * * 2-6", () => {
    sendReminder(
      "🌏 Asia Session CLOSED",
      "The Asia session has ended.",
      0x808080
    );
  }, { timezone: "America/Phoenix" });

  // London Open
  cron.schedule("0 0 * * 2-6", () => {
    sendReminder(
      "🇬🇧 London Session OPEN",
      "London is now open. Expect increased volatility.",
      0x2ecc71
    );
  }, { timezone: "America/Phoenix" });

  // London Close
  cron.schedule("0 9 * * 2-6", () => {
    sendReminder(
      "🇬🇧 London Session CLOSED",
      "London has now closed.",
      0x808080
    );
  }, { timezone: "America/Phoenix" });

  // New York Open
  cron.schedule("0 6 * * 1-5", () => {
    sendReminder(
      "🇺🇸 New York Session OPEN",
      "New York is now open. Watch for USD volatility.",
      0xe74c3c
    );
  }, { timezone: "America/Phoenix" });

  // New York Close
  cron.schedule("0 15 * * 1-5", () => {
    sendReminder(
      "🇺🇸 New York Session CLOSED",
      "The New York session has ended. Journal your trades.",
      0x808080
    );
  }, { timezone: "America/Phoenix" });
});
