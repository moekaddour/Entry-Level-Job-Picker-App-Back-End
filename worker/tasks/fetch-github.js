const fetch = require("node-fetch");
var redis = require("redis"),
  client = redis.createClient();

const baseURL = "https://jobs.github.com/positions.json";

async function fetchGithub() {
  let resultCount = 1,
    onPage = 0;
  const allJobs = [];
  while (resultCount > 0) {
    const result = await fetch(`${baseURL}?page=${onPage}`);
    const jobs = await result.json();
    resultCount = jobs.length;
    allJobs.push(...jobs);
    console.log("jobs per page", onPage, jobs.length);
    onPage++;
  }
  console.log("Total Jobs", allJobs.length, "jobs");

  // Filter Algorithm For Junior Postions Only

  const isJunior = allJobs.filter(job => {
    let jobTitle = job.title.toLowerCase();

    if (
      jobTitle.includes("senior") ||
      jobTitle.includes("manager") ||
      jobTitle.includes("sr.") ||
      jobTitle.includes("architect")
    ) {
      return false;
    }
    return true;
  });

  console.log("Junior Positions are", isJunior.length, "jobs");
  // set to redis
  client.set("github", JSON.stringify(isJunior));
}
module.exports = fetchGithub;
