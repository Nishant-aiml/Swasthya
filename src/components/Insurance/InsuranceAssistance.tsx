import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Shield } from 'lucide-react';

export const InsuranceAssistance = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-500" />
            <span className="font-medium">Insurance Assistance</span>
          </div>
          <Button variant="outline" size="sm">
            Get Help
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsuranceAssistance;