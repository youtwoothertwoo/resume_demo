import express from 'express';
import cors from 'cors';
import pdfRoutes from './routes/pdf';
import { pdfService } from './services/pdf-service';

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 路由
app.use('/api', pdfRoutes);

// 错误处理中间件
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// 初始化 PDF 服务并启动服务器
async function startServer() {
  try {
    await pdfService.initialize();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// 优雅关闭
process.on('SIGTERM', async () => {
  await pdfService.cleanup();
  process.exit(0);
});

startServer(); 