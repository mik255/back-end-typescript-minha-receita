import { FileInputDTO, FileOutputDTO } from "../../domain/dto/file-dto";
import { IImageService } from "../../domain/services/image-service";
import * as fs from 'fs';
import * as fsPromisses from 'fs/promises';
export class ImgBufferServiceImpl implements IImageService {
    uploadImages(fileInputs: FileInputDTO[]): Promise<FileOutputDTO[]> {
        const promises = fileInputs.map((fileInput) => {
            return new Promise<FileOutputDTO>((resolve, reject) => {
                const time = new Date().getTime();
            
                const filename = `${time}_${fileInput.nome}`;
                const path = `uploads/${filename}`;

                // Salvar o arquivo no sistema de arquivos
                fs.writeFile(path, fileInput.dados, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        const fileOutput = new FileOutputDTO(path);
                        resolve(fileOutput);
                    }
                });
            });
        });

        return Promise.all(promises);
    }
    uploadSingleImage(fileInput: FileInputDTO): Promise<FileOutputDTO> {
        return new Promise<FileOutputDTO>((resolve, reject) => {
            const time = new Date().getTime();
            const filename = `${time}_${fileInput.nome}`;
            const path = `uploads/${filename}`;

            // Salvar o arquivo no sistema de arquivos
            fs.writeFile(path, fileInput.dados, (err) => {
                if (err) {
                    reject(err);
                } else {
                    const fileOutput = new FileOutputDTO(path);
                    resolve(fileOutput);
                }
            });
        });
    }
    async deleteImage(file: FileOutputDTO): Promise<void> {
        try {
            const path = file.url;

            // Verifique se o arquivo existe antes de tentar excluí-lo
            const fileExists = await fsPromisses.access(path).then(() => true).catch(() => false);

            if (fileExists) {
                // Exclua o arquivo
                await fsPromisses.unlink(path);
                console.log(`Arquivo ${path} excluído com sucesso.`);
            } else {
                console.log(`Arquivo ${path} não encontrado.`);
            }

        } catch (error) {
            console.error(`Erro ao excluir o arquivo`, error);
            throw error;
        }
    }

}


