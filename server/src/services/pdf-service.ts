import puppeteer, { Browser } from 'puppeteer';

export class PdfService {
  private browser: Browser | null = null;

  async initialize() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }
  }

  async generatePdf(html: string): Promise<Buffer> {
    if (!this.browser) {
      throw new Error('Browser not initialized');
    }

    const page = await this.browser.newPage();

    try {
      // 设置视口大小为A4
      await page.setViewport({
        width: 794,  // A4 宽度 (72 dpi)
        height: 1123, // A4 高度 (72 dpi)
        deviceScaleFactor: 2
      });

      await page.setContent(html);

      // 生成PDF
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        margin: {
          top: '0',
          right: '0',
          bottom: '0',
          left: '0'
        }
      });

      return pdf;
    } finally {
      await page.close();
    }
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

export const pdfService = new PdfService(); 