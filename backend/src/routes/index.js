const express = require("express");
const z = require("zod");
const redis = require("../redis");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

const formDataSchema = z.object({
  username: z.string().min(1).max(50),
  language: z.string().min(1).max(50),
  stdin: z.string(),
  sourcecode: z.string().min(1),
  output: z.string(),
});

function validateForm(req, res, next) {
  try {
    const { success } = formDataSchema.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Incorrect Inputs",
        data: formDataSchema.safeParse(req.body),
      });
    }
    next();
  } catch (err) {
    console.log("Error in validate middleware: " + err);
    return res.status(411).json({
      vaidate_middlware_error: err,
    });
  }
}

router.post("/submit-form", validateForm, async (req, res) => {
  const { username, language, stdin, sourcecode, output } = req.body;
  const time = new Date().toISOString();
  try {
    await prisma.formData.create({
      data: {
        username,
        language,
        stdin,
        sourcecode,
        output,
        date: time,
      },
    });
    res.status(200).send("Data is stored in DB");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }

  redis.del("entries_data");
});

router.get("/entries", async (req, res) => {
  try {
    const cachedValue = await redis.get("entries_data");
    if (cachedValue) {
      return res.status(200).send(cachedValue);
    }

    const allEntries = await prisma.formData.findMany();
    console.log(allEntries);
    await redis.set("entries_data", JSON.stringify(allEntries));

    res.status(200).send(allEntries);
  } catch (err) {
    console.log(err);
  }
});

// don't push this to github
router.get("/clean", async (req, res) => {
  const all = await prisma.formData.findMany();
  const cache = await redis.get("entries_data");
  res.json({
    msg: "database is cleaned delete the redis cache now",
    database: all,
    redis: cache,
  });
});

module.exports = router;
