import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Shield, Upload, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';

const ayushmanCardSchema = z.object({
  cardNumber: z.string().min(10, "Card number must be at least 10 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  dateOfBirth: z.string(),
  gender: z.enum(["male", "female", "other"]),
  address: z.string().min(5, "Address must be at least 5 characters"),
  mobileNumber: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  photoId: z.string().min(1, "Photo ID is required"),
});

type AyushmanCardForm = z.infer<typeof ayushmanCardSchema>;

interface AyushmanCardProps {
  isVerified?: boolean;
  cardDetails?: {
    cardNumber: string;
    name: string;
    validUntil: string;
    status: 'active' | 'pending' | 'expired';
  };
  onVerify?: (details: AyushmanCardForm) => void;
}

export default function AyushmanCard({
  isVerified,
  cardDetails,
  onVerify
}: AyushmanCardProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const form = useForm<AyushmanCardForm>({
    resolver: zodResolver(ayushmanCardSchema),
  });

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    setIsUploading(false);
    // Reset progress after completion
    setTimeout(() => setUploadProgress(0), 500);
  };

  const onSubmit = (data: AyushmanCardForm) => {
    onVerify?.(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-500" />
          Ayushman Card
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isVerified && cardDetails ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">Verified Ayushman Card</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Card Number</p>
                <p className="font-medium">{cardDetails.cardNumber}</p>
              </div>
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium">{cardDetails.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Valid Until</p>
                <p className="font-medium">{cardDetails.validUntil}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <Badge
                  variant={
                    cardDetails.status === 'active'
                      ? 'success'
                      : cardDetails.status === 'pending'
                      ? 'warning'
                      : 'destructive'
                  }
                >
                  {cardDetails.status}
                </Badge>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <span>Your Ayushman Card is not verified</span>
            </div>

            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Upload className="h-4 w-4" />
                    Verify Card
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Verify Ayushman Card</DialogTitle>
                    <DialogDescription>
                      Enter your Ayushman card details for verification
                    </DialogDescription>
                  </DialogHeader>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="dateOfBirth"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date of Birth</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender</FormLabel>
                              <FormControl>
                                <select
                                  {...field}
                                  className="w-full rounded-md border border-gray-300 p-2"
                                >
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="other">Other</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="mobileNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mobile Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-2">
                        <Label>Upload Documents</Label>
                        <div className="border-2 border-dashed rounded-lg p-4 text-center">
                          <Input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleUpload(file);
                            }}
                            id="document-upload"
                          />
                          <Label
                            htmlFor="document-upload"
                            className="cursor-pointer flex flex-col items-center gap-2"
                          >
                            <Upload className="h-8 w-8 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              Click to upload or drag and drop
                            </span>
                            <span className="text-xs text-gray-400">
                              Supported formats: PDF, JPG, PNG
                            </span>
                          </Label>
                        </div>
                        {isUploading && (
                          <Progress value={uploadProgress} className="h-2" />
                        )}
                      </div>

                      <DialogFooter>
                        <Button type="submit">Submit for Verification</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <HelpCircle className="h-4 w-4" />
                    Apply for Card
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Apply for Ayushman Card</DialogTitle>
                    <DialogDescription>
                      Follow these steps to apply for your Ayushman Card
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Eligibility Criteria</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        <li>Below Poverty Line (BPL) families</li>
                        <li>Families listed in SECC database</li>
                        <li>Previously enrolled RSBY beneficiaries</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Required Documents</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        <li>Aadhaar Card</li>
                        <li>Ration Card</li>
                        <li>Income Certificate</li>
                        <li>Passport size photographs</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Application Process</h4>
                      <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                        <li>Visit nearest Common Service Centre (CSC)</li>
                        <li>Submit required documents</li>
                        <li>Fill application form</li>
                        <li>Receive acknowledgment slip</li>
                        <li>Track application status online</li>
                      </ol>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => window.open('https://pmjay.gov.in/apply', '_blank')}
                    >
                      Visit Official Website
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
