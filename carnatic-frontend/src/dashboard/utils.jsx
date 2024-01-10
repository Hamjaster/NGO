import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useReactToPrint } from 'react-to-print'

export const donwloadPDf = (pdfRef) => {
    // const input = pdfRef.current
    // html2canvas(input)
    //     .then((canvas) => {
    //         const imgData = canvas.toDataURL('image/png');
    //         const pdf = new jsPDF();
    //         const pdfHeight = pdf.internal.pageSize.getHeight()
    //         const pdfWidth = pdf.internal.pageSize.getWidth()
    //         const imgWidth = canvas.width
    //         const imgHeight = canvas.height
    //         const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
    //         const imgX = (pdfWidth - imgWidth * ratio) / 2
    //         const imgY = 30
    //         pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    //         // pdf.output('dataurlnewwindow');
    //         pdf.save("database.pdf");
    //     })
    //     ;



}
