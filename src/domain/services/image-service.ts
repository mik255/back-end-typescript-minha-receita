import { FileInputDTO, FileOutputDTO } from "../dto/file-dto";

export interface IImageService {
    uploadImages(file: FileInputDTO[]): Promise<FileOutputDTO[]>;
    uploadSingleImage(file: FileInputDTO): Promise<FileOutputDTO>;
    deleteImage(file: FileOutputDTO): Promise<void>;
}