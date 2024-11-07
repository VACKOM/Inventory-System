import React from 'react';
import QrScanner from 'react-qr-scanner';

const QRCodeScanner = ({ onScan }) => {
  const handleScan = (data) => {
    if (data) {
      onScan(data.text);  // `data.text` contains the scanned QR data
    }
  };

  const handleError = (error) => {
    console.error("QR Code Scan Error: ", error);
  };

  return (
    <div>
      <h2>Scan QR Code</h2>
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default QRCodeScanner;