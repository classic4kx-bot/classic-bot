require("dotenv").config();

const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const { CronJob } = require("cron");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const CHANNEL_ID = process.env.CHANNEL_ID;

async function send(title, description, color) {
  const channel = await client.channels.fetch(CHANNEL_ID);

  const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setDescription(description)
    .setTimestamp()
    .setFooter({ text: "Classic Trades" });

  await channel.send({
    content: "@everyone",
    embeds: [embed]
  });
}

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  // Sunday Futures Open
  new CronJob(
    "0 15 * * 0",
    () => send("🟢 Futures Market Open", "The CME Futures Market is now OPEN.", "Green"),
    null,
    true,
    "America/Phoenix"
  );

  // NY Session Open
  new CronJob(
    "30 6 * * 1-5",
    () => send("🟢 New York Session Open", "High volume has started.", "Blue"),
    null,
    true,
    "America/Phoenix"
  );

  // NY Session Close
  new CronJob(
    "0 13 * * 1-5",
    () => send("🔴 New York Session Closed", "The New York session has ended.", "Red"),
    null,
    true,
    "America/Phoenix"
  );

  // Maintenance
  new CronJob(
    "0 14 * * 1-5",
    () => send("🟡 CME Maintenance", "Market closed for daily maintenance.\nReopens at 3:00 PM.", "Yellow"),
    null,
    true,
    "America/Phoenix"
  );

  // Reopen
  new CronJob(
    "0 15 * * 1-4,6",
    () => send("🟢 Market Reopened", "The CME Futures Market is back online.", "Green"),
    null,
    true,
    "America/Phoenix"
  );

  // Friday Close
  new CronJob(
    "0 14 * * 5",
    () => send("🔴 Futures Market Closed", "The market is closed for the weekend.\nReopens Sunday at 3:00 PM.", "Red"),
    null,
    true,
    "America/Phoenix"
  );
});

client.login(process.env.TOKEN);
