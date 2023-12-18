import express from 'express';
import { ImgBufferServiceImpl } from '../../infra/services/image-service-impl';
import multer from 'multer';
import FilesController from '../controllers/files-controller';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const fileRouter = express.Router();

const filesController = new FilesController(
    new ImgBufferServiceImpl()
);

fileRouter.post('/upload', upload.array('files', 5),async (req, res) => {
  await filesController.saveImages(req, res);
});

export default fileRouter;