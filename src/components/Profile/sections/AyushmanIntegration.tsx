import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Label } from '../../ui/Label';
import { CreditCard, FileText, Hospital, History } from 'lucide-react';

export function AyushmanIntegration() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ayushman Card Integration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center space-x-4">
            <CreditCard className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Digital Ayushman Card</h3>
              <p className="text-sm text-gray-500">Card Number: XXXX-XXXX-XXXX</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Benefits and Coverage</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Annual Coverage</p>
                <p className="text-2xl font-bold">₹5,00,000</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Family Members</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Recent Claims</Label>
            <div className="space-y-2">
              {[
                { date: '2024-12-15', hospital: 'City Hospital', amount: '₹25,000', status: 'Approved' },
                { date: '2024-11-20', hospital: 'Metro Clinic', amount: '₹15,000', status: 'Processing' }
              ].map((claim, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-medium">{claim.hospital}</p>
                    <p className="text-sm text-gray-500">{claim.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{claim.amount}</p>
                    <p className={`text-sm ${
                      claim.status === 'Approved' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {claim.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Policy Details</Label>
            <div className="space-y-2">
              <div className="flex justify-between p-2 border rounded">
                <span>Policy Number</span>
                <span className="font-medium">AY-2024-123456</span>
              </div>
              <div className="flex justify-between p-2 border rounded">
                <span>Valid Until</span>
                <span className="font-medium">31 Dec 2025</span>
              </div>
              <div className="flex justify-between p-2 border rounded">
                <span>Coverage Type</span>
                <span className="font-medium">Family Floater</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="flex items-center justify-center">
            <FileText className="w-4 h-4 mr-2" />
            View Policy
          </Button>
          <Button variant="outline" className="flex items-center justify-center">
            <History className="w-4 h-4 mr-2" />
            Claim History
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
