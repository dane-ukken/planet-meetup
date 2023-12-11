import {
  getEventById,
  updateEventById,
  deleteEventById,
} from "../../../lib/event";
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

export default async function getEventByIdHandler(req, res) {
  const {
    query: { id },
    method,
    body,
  } = req;

  if (method == "GET") {
    try {
      const event = await getEventById(id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.status(200).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  } else if (method == "PUT") {
    upload.single("eventImage")(req, res, async (error) => {
      if (error instanceof multer.MulterError) {
        console.error(error);
        return res.status(500).json({ message: error.message });
      } else if (error) {
        console.error(error);
        return res.status(500).json({ message: "File upload failed" });
      }

      let eventUpdate = {
        eventName: req.body.eventName,
        eventDate: req.body.eventDate,
        eventTime: req.body.eventTime,
        eventLocation: req.body.eventLocation,
        eventStatus: req.body.eventStatus,
        eventPrice: Number(req.body.eventPrice),
        eventDescription: req.body.eventDescription,
      };

      let oldImagePath = null;
      if (req.file) {
        eventUpdate.eventImgUrl = `/uploads/images/${req.file.filename}`;
        oldImagePath = path.join("public", req.body.eventImgUrl);
      } else {
        eventUpdate.eventImgUrl = req.body.eventImgUrl;
      }

      try {
        const updatedEvent = await updateEventById(id, eventUpdate);

        if (oldImagePath && fs.existsSync(oldImagePath)) {
          fs.unlink(oldImagePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting old image file", unlinkErr);
            }
          });
        }
        res.status(200).json(updatedEvent);
      } catch (err) {
        console.error(err);

        if (req.file) {
          const newImagePath = path.join(
            "public",
            `/uploads/images/${req.file.filename}`
          );
          fs.unlink(newImagePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting new file", unlinkErr);
            }
          });
        }
        res.status(400).json({ message: err.message });
      }
    });
  } else if (method === "DELETE") {
    try {
      const existingEvent = await deleteEventById(id);
      if (!existingEvent) {
        return res.status(404).json({ message: "Event not found" });
      }

      const imagePath = existingEvent.eventImgUrl;
      if (imagePath) {
        const fullPath = path.join("public", imagePath);
        if (fs.existsSync(fullPath)) {
          fs.unlink(fullPath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting image file", unlinkErr);
            }
          });
        }
      }

      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
