import { getEvents, createEvent } from "../../../lib/event";
import multer from "multer";
import path from "path";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join("public", "uploads", "images");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.originalname + "-" + Date.now() + ext);
  },
});
const upload = multer({ storage: storage });

export default async function getEventsHandler(req, res) {
  if (req.method === "GET") {
    try {
      const events = await getEvents();
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  } else if (req.method === "POST") {
    upload.single("eventImage")(req, res, async (error) => {
      if (error instanceof multer.MulterError) {
        console.error(error);
        return res.status(500).json({ message: error.message });
      } else if (error) {
        console.error(error);
        return res.status(500).json({ message: "File upload failed" });
      }

      const event = {
        eventName: req.body.eventName,
        eventDate: req.body.eventDate,
        eventTime: req.body.eventTime,
        eventLocation: req.body.eventLocation,
        eventStatus: req.body.eventStatus,
        maxAttendees: Number(req.body.maxAttendees),
        eventPrice: Number(req.body.eventPrice),
        eventImgUrl: req.file ? `/uploads/images/${req.file.filename}` : "",
        eventOrg: req.body.eventOrg,
        eventDescription: req.body.eventDescription,
      };

      try {
        const createdEvent = await createEvent(event);
        res.status(201).json(createdEvent);
      } catch (err) {
        console.error(err);
        if (req.file) {
          fs.unlink(
            `public/uploads/images/${req.file.filename}`,
            (unlinkErr) => {
              if (unlinkErr) {
                console.error("Error deleting file", unlinkErr);
              }
            }
          );
        }
        res.status(400).json({ message: err.message });
      }
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
