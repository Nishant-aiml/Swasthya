import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

interface AyushmanVerificationProps {
  onVerify: (cardNumber: string, cardImage: File) => Promise<void>;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function AyushmanVerification({ onVerify, onSuccess, onError }: AyushmanVerificationProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardImage, setCardImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardImage) {
      onError('Please fill in all fields');
      return;
    }

    try {
      await onVerify(cardNumber, cardImage);
      onSuccess();
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Verification failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Ayushman Card Number</Label>
        <Input
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Enter your card number"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardImage">Card Image</Label>
        <Input
          id="cardImage"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setCardImage(file);
          }}
        />
      </div>

      <Button type="submit" className="w-full">
        Verify Card
      </Button>
    </form>
  );
}
