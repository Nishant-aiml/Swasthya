import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, CreditCard, ArrowRight } from 'lucide-react';
import { useToast } from '../ui/use-toast';

interface AyushmanVerificationProps {
  onVerificationComplete: (cardNumber: string) => void;
  onError: (error: string) => void;
}

const AyushmanVerification: React.FC<AyushmanVerificationProps> = ({
  onVerificationComplete,
  onError,
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'image/jpeg' && selectedFile.type !== 'image/png') {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a JPEG or PNG image',
          variant: 'destructive',
        });
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please upload an image smaller than 5MB',
          variant: 'destructive',
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleVerify = async () => {
    if (!cardNumber || !file) {
      toast({
        title: 'Missing information',
        description: 'Please provide both card number and card image',
        variant: 'destructive',
      });
      return;
    }

    setIsVerifying(true);
    setVerificationStatus('verifying');

    try {
      // Simulated API call to verify card
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would:
      // 1. Upload the file to your server
      // 2. Verify the card number against Ayushman Bharat API
      // 3. Process the card image for authenticity
      
      if (cardNumber.length !== 10) {
        throw new Error('Invalid card number format');
      }

      setVerificationStatus('success');
      onVerificationComplete(cardNumber);
      toast({
        title: 'Verification successful',
        description: 'Your Ayushman card has been verified',
      });
    } catch (error) {
      setVerificationStatus('error');
      onError(error instanceof Error ? error.message : 'Verification failed');
      toast({
        title: 'Verification failed',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 p-2 rounded-lg">
          <CreditCard className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Ayushman Card Verification</h3>
          <p className="text-sm text-gray-600">Please provide your card details for verification</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <input
            id="cardNumber"
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
            maxLength={10}
            placeholder="Enter your 10-digit Ayushman card number"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Image
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/jpeg,image/png"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG or JPG up to 5MB</p>
            </div>
          </div>
          {file && (
            <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              {file.name}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={handleVerify}
        disabled={isVerifying || !cardNumber || !file}
        className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-white font-medium transition-all
          ${isVerifying
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
          }`}
      >
        {isVerifying ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Verifying...
          </>
        ) : (
          <>
            Verify Card
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      {verificationStatus === 'success' && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
          <CheckCircle className="w-5 h-5" />
          <span>Card verified successfully</span>
        </div>
      )}

      {verificationStatus === 'error' && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span>Verification failed. Please try again</span>
        </div>
      )}

      <div className="text-sm text-gray-500">
        <p>Note: Please ensure that:</p>
        <ul className="list-disc list-inside mt-1">
          <li>The card image is clear and readable</li>
          <li>All corners of the card are visible</li>
          <li>The card number matches the one on the image</li>
        </ul>
      </div>
    </div>
  );
};

export default AyushmanVerification;
