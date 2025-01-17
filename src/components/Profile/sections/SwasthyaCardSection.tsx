import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import SwasthyaCard from '../SwasthyaCard';

export function SwasthyaCardSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Swasthya Card</CardTitle>
      </CardHeader>
      <CardContent>
        <SwasthyaCard />
      </CardContent>
    </Card>
  );
}
