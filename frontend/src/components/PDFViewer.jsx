import { useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

export default function PDFViewer({ url }) {
  const canvasRef = useRef(null)
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [pdf, setPdf] = useState(null)

  useEffect(() => {
    loadPDF()
  }, [url])

  const loadPDF = async () => {
    try {
      setLoading(true)
      const loadingTask = pdfjsLib.getDocument(url)
      const pdfDocument = await loadingTask.promise
      setPdf(pdfDocument)
      setNumPages(pdfDocument.numPages)
      renderPage(pdfDocument, 1)
    } catch (error) {
      console.error('Error loading PDF:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderPage = async (pdfDoc, pageNum) => {
    try {
      const page = await pdfDoc.getPage(pageNum)
      const viewport = page.getViewport({ scale: 1.5 })
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      canvas.height = viewport.height
      canvas.width = viewport.width

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      }
      await page.render(renderContext).promise
    } catch (error) {
      console.error('Error rendering page:', error)
    }
  }

  useEffect(() => {
    if (pdf && pageNumber) {
      renderPage(pdf, pageNumber)
    }
  }, [pageNumber, pdf])

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1))
  }

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(numPages, prev + 1))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500 dark:text-gray-400">Loading PDF...</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {pageNumber} of {numPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
      <div className="flex justify-center bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>
    </div>
  )
}

