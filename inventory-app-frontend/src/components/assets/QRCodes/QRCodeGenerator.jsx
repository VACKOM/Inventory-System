import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { Box ,Button} from '@mui/material';
import Header from '../../Header';

const QRCodeGenerator = () => {
  const qrRef = useRef();  // Reference to the QR code element
  const location = useLocation();

  // Extract query parameters (use URLSearchParams to read the query string)
  const queryParams = new URLSearchParams(location.search);
  const qrcode = queryParams.get('qrcode'); // This will get the 'qrcode' parameter

  if (!qrcode) {
    // Handle the case where qrcode is not available
    return <div>No QR Code data available!</div>;
  }

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=600,height=600');
    printWindow.document.write('<html><head><title>Print QR Code</title>');
    printWindow.document.write('<style>body { text-align: center; }</style>');  // Optional styling
    printWindow.document.write('</head><body>');
    printWindow.document.write('<div>' + qrRef.current.innerHTML + '</div>');  // Capture QR code DOM for printing
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="QR Code Generator" subtitle="Welcome to your QR Code Generator" />
      </Box>

      <div ref={qrRef}>
        <h2>QR Code Generator</h2>
        <QRCode size={300} bgColor="white" fgColor="black" value={qrcode} />
        <p>{qrcode}</p>
      </div>
      <Box display="flex"  mt="20px">
              <Button onClick={handlePrint} color="secondary" variant="contained">
              Print QR Code
              </Button>
            </Box>
    </Box>
  );
};

export default QRCodeGenerator;
