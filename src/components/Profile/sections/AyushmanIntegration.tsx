import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { HeartPulse, CreditCard, CheckCircle, AlertTriangle } from 'lucide-react';

interface AyushmanIntegrationProps {
  onVerify: (cardNumber: string) => Promise<boolean>;
}

export default function AyushmanIntegration({ onVerify }: AyushmanIntegrationProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (!cardNumber.trim()) {
      setError('Please enter your Ayushman card number');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const verified = await onVerify(cardNumber);
      setIsVerified(verified);
      if (!verified) {
        setError('Invalid card number. Please check and try again.');
      }
    } catch (err) {
      setError('Failed to verify card. Please try again later.');
      setIsVerified(false);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Ayushman Card Integration</h2>
        <p className="text-gray-600">
          Link your Ayushman card to access healthcare benefits
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <HeartPulse className="h-5 w-5 text-blue-500" />
            <div>
              <h3 className="font-medium">Ayushman Bharat</h3>
              <p className="text-sm text-gray-600">
                Universal health coverage for all citizens
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Card Number</label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter your Ayushman card number"
                className="flex-1"
              />
              <Button
                onClick={handleVerify}
                disabled={isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
            {error && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                {error}
              </p>
            )}
          </div>

          {isVerified && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
              <CheckCircle className="h-5 w-5" />
              <span>Card verified successfully!</span>
            </div>
          )}

          <div className="space-y-3 mt-6">
            <h4 className="font-medium">Benefits</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Cashless treatment at empaneled hospitals
              </li>
              <li className="flex items-center gap-2">
                <HeartPulse className="h-4 w-4" />
                Coverage up to ₹5 lakhs per family per year
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Access to quality healthcare services
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
