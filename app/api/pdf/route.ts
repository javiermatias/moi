import { NextApiHandler, NextApiResponse } from 'next'
import { NextRequest } from 'next/server'
import puppeteer from 'puppeteer'

export async function GET(req:NextApiHandler, res:NextApiResponse<any>) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
  
    await page.goto('http://localhost:3000')
    await page.emulateMediaType('screen')
  
    const pdfBuffer = await page.pdf({ format: 'A4' })
  
    res.send(pdfBuffer)
  
    await browser.close()
    
}
/*  const Handler: NextApiHandler = async (req, res) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('http://localhost:3000')
  await page.emulateMediaType('screen')

  const pdfBuffer = await page.pdf({ format: 'A4' })

  res.send(pdfBuffer)

  await browser.close()
}

export default Handler;  */