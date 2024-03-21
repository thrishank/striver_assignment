const Redis = require("ioredis");

const redis = new Redis(
  "rediss://default:fc16b6445f0b4c7399689a59ab883f58@apn1-large-malamute-34064.upstash.io:34064"
);

module.exports = redis;
