import express, { Request, Response } from 'express';
import { LikeUseCase } from '../../domain/use-cases/like/like-usecase';
import { GetLikesByPostIdInputDTO, LikeInputDTO } from '../../domain/dto/like-dto';
import { IImageService } from '../../domain/services/image-service';
import { FileInputDTO } from '../../domain/dto/file-dto';
import { v4 as uuidv4 } from 'uuid';
const path = require('path');
class FilesController {
    private imageService: IImageService;

    constructor(imageService: IImageService) {
        this.imageService = imageService;
    }


    async saveImages(req: any, res: Response): Promise<void> {
        try {
            var files = req.files;
            
            var intputDto = files.map((file) => {
                const extension = path.extname(file.originalname)
                return {
                    nome: uuidv4()+`${extension}`,
                    dados: file.buffer,
                    mimetype: file.mimetype,
                };
            });

            var output =await this.imageService.uploadImages(intputDto);
            const likeDto = new LikeInputDTO(
                req.userId,
                req.body.postId,
            );

            res.status(200).json(output);
        } catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).send(error.message);
        }
    }
}


export default FilesController;
