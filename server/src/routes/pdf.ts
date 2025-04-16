import { Router, Request, Response } from 'express';
import { pdfService } from '../services/pdf-service';

const router = Router();

router.post('/export-pdf', async (req: Request, res: Response) => {
  try {
    const { html } = req.body;
    
    if (!html) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    const pdf = await pdfService.generatePdf(html);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.send(pdf);
  } catch (error) {
    console.error('PDF generation failed:', error);
    res.status(500).json({ error: 'PDF generation failed' });
  }
});

export default router; 