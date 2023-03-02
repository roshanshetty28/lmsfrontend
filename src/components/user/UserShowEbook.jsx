import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { getEbook } from "../../features/user/userSlice"
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import "./UserShowEbook.css"

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const ShowEbook = () => {
  const { bookId } = useParams()
  const dispatch = useDispatch()
  const [pdf, setPdf] = useState('')
  const { ebook, isLoading } = useSelector((state) => state.user)
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }
  function previousPage() {
    changePage(-1);
  }
  function nextPage() {
    changePage(1);
  }
  useEffect(() => {
    dispatch(getEbook(bookId))
  }, [])
  useEffect(() => {
    setPdf(ebook)
  }, [ebook])

  return (<>
    {isLoading === true ?
      <Box sx={{ width: '100%', top: '50%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress thickness={1} size={200} /></Box> :
      <div>
        <Document
          className="document"
          file={pdf}
          onContextMenu={(e) => e.preventDefault()}
          options={{ workerSrc: "/pdf.worker.js" }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page className="page" pageNumber={pageNumber} />
        </Document>
        <div class="pagination">
          <p className="info">
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
          <div className="buttons">
            <Button variant="contained" type="button" disabled={pageNumber <= 1} onClick={previousPage}>
              Previous
            </Button>
            <Button
              variant="contained"
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    }
  </>
  )
}

export default ShowEbook