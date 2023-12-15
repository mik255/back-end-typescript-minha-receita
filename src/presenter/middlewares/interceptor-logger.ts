const interceptorLogger = (req, res, next) => {
    const startTime = Date.now();
  
    // Registra as informações iniciais
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  
    // Intercepta o final da requisição
    res.on('finish', () => {
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
  
      // Registra as informações finais
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} ${res.statusCode} - ${elapsedTime}ms`);
    });
    // Continue com a execução normal da rota
    next();
  };
  
export default interceptorLogger;
  