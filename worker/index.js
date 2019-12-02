let CronJob = require("cron").CronJob;
let fetchGithub = require("./tasks/fetch-github");

new CronJob("* * * * *", fetchGithub, null, true, "America/Los_Angeles");
