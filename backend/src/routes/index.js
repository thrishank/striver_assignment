const express = require("express");
const z = require("zod");
const redis = require("../redis");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

// Zod Schema to validate the submitted input
const formDataSchema = z.object({
  username: z.string().min(1).max(50),
  language: z.string().min(1).max(50),
  stdin: z.string(),
  sourcecode: z.string().min(1),
  output: z.string(),
});

// A middleware to check if the date coming from the user aligns with the zod schema or not
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

// Route to get the data from the user submitted form and store it in the database
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

  // deleteing the redis cached data. Since the cached data is outdated
  redis.del("entries_data");
});

// Route to get all the data stored in the database
router.get("/entries", async (req, res) => {
  try {
    const cachedValue = await redis.get("entries_data"); // getting the data from redis
    if (cachedValue) {
      return res.status(200).send(cachedValue);
    }

    const allEntries = await prisma.formData.findMany();

    await redis.set("entries_data", JSON.stringify(allEntries)); // caching the data in redis

    res.status(200).send(allEntries);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
