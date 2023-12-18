

export class FileInputDTO {
    nome: string;
    dados: Buffer;
    mimetype: string;
}


export class FileOutputDTO {
   constructor(
    public url: string
   ){}
}