
import { FileInputDTO, FileOutputDTO } from "../../domain/dto/file-dto";
import { IImageService } from "../../domain/services/image-service";
import * as fsPromisses from 'fs/promises';
import { redimensionarVideo } from "./file-encoder";


export class ImgBase64ServiceImpl implements IImageService {
    async uploadImages(fileInputs: FileInputDTO[]): Promise<FileOutputDTO[]> {
        const promises = fileInputs.map(async (fileInput) => {
            const time = new Date().getTime();
            const filename = `${time}_${fileInput.nome}`;
            const path = `uploads/${filename}.png`;

            var buffer = await redimensionarVideo(fileInput.dados);
            await fsPromisses.writeFile(path, buffer);
       
            const fileOutput = new FileOutputDTO(path);
            return fileOutput;
        });

        return Promise.all(promises);
    }

    async uploadSingleImage(fileInput: FileInputDTO): Promise<FileOutputDTO> {
        const time = new Date().getTime();
        const filename = `${time}_${fileInput.nome}`;
        const path = `uploads/${filename}.png`;

        // Salvar o arquivo no sistema de arquivos
        await fsPromisses.writeFile(path, fileInput.dados, 'base64');

        const fileOutput = new FileOutputDTO(path);
        return fileOutput;
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
