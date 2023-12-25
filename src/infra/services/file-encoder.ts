import ffmpeg from 'fluent-ffmpeg';

function toBufferAsync(ffmpegInstance: any, input: Buffer, options: any): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    ffmpegInstance
      .inputFormat('mp4') // Defina o formato de entrada
      .input(input)
      .videoCodec('libx264') // Defina o codec de vídeo
      .audioCodec( 'aac') // Defina o codec de áudio
      .size('640x480') // Redefina a resolução desejada
      .toBuffer((err: any, buffer: Buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
  });
}

async function redimensionarVideo(bufferDeEntrada: Buffer): Promise<Buffer> {
  const resolucaoDesejada = '854x480'; // Ajuste conforme necessário
  const ffmpegInstance = ffmpeg();

  try {
    const bufferDeSaida = await toBufferAsync(ffmpegInstance, bufferDeEntrada, {
      size: resolucaoDesejada
    });

    return bufferDeSaida;
  } catch (error) {
    console.error('Erro durante o redimensionamento:', error);
    throw error;
  } finally {
    // Certifique-se de encerrar a instância do ffmpeg após o uso
    ffmpegInstance.kill();
  }
}

export { redimensionarVideo };
