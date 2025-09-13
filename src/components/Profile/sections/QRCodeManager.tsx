import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/ToastNotification';
import { QRCodeSVG } from 'qrcode.react';
import { dummyPersonalInfo } from '@/data/profile-data';

interface QRData {
  id: string;
  name: string;
  bloodGroup: string;
  emergencyContact: string;
  allergies: string[];
  medications: string[];
  insuranceId?: string;
}

const dummyQRData: QRData = {
  id: dummyPersonalInfo.id,
  name: dummyPersonalInfo.name,
  bloodGroup: dummyPersonalInfo.bloodGroup,
  emergencyContact: dummyPersonalInfo.emergencyContact,
  allergies: ['Penicillin', 'Peanuts'],
  medications: ['Metformin 500mg', 'Aspirin 81mg'],
  insuranceId: 'INS123456789'
};

export default function QRCodeManager() {
  const [showScannedData, setShowScannedData] = useState(false);
  const [scannedData, setScannedData] = useState<QRData | null>(null);

  const handleDownloadQR = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'medical-qr-code.png';
      link.href = url;
      link.click();
    }
  };

  const handleScanQR = () => {
    // Simulating QR code scan with dummy data
    setScannedData(dummyQRData);
    setShowScannedData(true);
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Medical QR Code</h2>
        <div className="space-x-2">
          <Button onClick={handleScanQR}>Scan QR Code</Button>
          <Button onClick={handleDownloadQR}>Download QR Code</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Your Medical QR Code</h3>
          <div className="flex justify-center">
            <QRCodeSVG
              value={JSON.stringify(dummyQRData)}
              size={200}
              level="H"
              includeMargin
            />
          </div>
          <p className="mt-4 text-sm text-center text-muted-foreground">
            Show this QR code to healthcare providers for quick access to your medical information
          </p>
        </div>

        {showScannedData && scannedData && (
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Scanned Medical Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Patient Name</label>
                <p className="mt-1">{scannedData.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Blood Group</label>
                <p className="mt-1">{scannedData.bloodGroup}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Emergency Contact</label>
                <p className="mt-1">{scannedData.emergencyContact}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Allergies</label>
                <ul className="mt-1 list-disc list-inside">
                  {scannedData.allergies.map((allergy, index) => (
                    <li key={index}>{allergy}</li>
                  ))}
                </ul>
              </div>
              <div>
                <label className="text-sm font-medium">Current Medications</label>
                <ul className="mt-1 list-disc list-inside">
                  {scannedData.medications.map((medication, index) => (
                    <li key={index}>{medication}</li>
                  ))}
                </ul>
              </div>
              {scannedData.insuranceId && (
                <div>
                  <label className="text-sm font-medium">Insurance ID</label>
                  <p className="mt-1">{scannedData.insuranceId}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
