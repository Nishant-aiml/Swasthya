import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string(),
  gender: z.string(),
  bloodType: z.string(),
  maritalStatus: z.string(),
  occupation: z.string(),
  
  // Contact Information
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  
  // Medical History
  currentMedications: z.string(),
  allergies: z.string(),
  chronicConditions: z.string(),
  previousSurgeries: z.string(),
  familyHistory: z.string(),
  
  // Lifestyle Information
  smoking: z.boolean(),
  alcohol: z.boolean(),
  exercise: z.string(),
  diet: z.string(),
  
  // Emergency Contacts
  emergencyName: z.string(),
  emergencyRelation: z.string(),
  emergencyPhone: z.string(),
  
  // Vaccination Records
  vaccinations: z.string(),
  
  // Insurance Information
  insuranceProvider: z.string(),
  insuranceNumber: z.string(),
  
  // Consent
  consentToTreat: z.boolean(),
  privacyPolicy: z.boolean(),
});

interface PatientRegistrationProps {
  onSubmit?: (formData: any) => Promise<void>;
}

const PatientRegistration = ({ onSubmit }: PatientRegistrationProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      smoking: false,
      alcohol: false,
      consentToTreat: false,
      privacyPolicy: false,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    if (onSubmit) {
      onSubmit(values);
    }
    // Handle form submission
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Enter your basic personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Medical History */}
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
              <CardDescription>
                Provide your medical history details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="currentMedications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Medications</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List any medications you are currently taking"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allergies</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List any allergies"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="chronicConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chronic Conditions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List any chronic conditions"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Lifestyle Information */}
          <Card>
            <CardHeader>
              <CardTitle>Lifestyle Information</CardTitle>
              <CardDescription>
                Information about your lifestyle and habits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="smoking"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Smoking</FormLabel>
                        <FormDescription>
                          Do you smoke?
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="alcohol"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Alcohol</FormLabel>
                        <FormDescription>
                          Do you consume alcohol?
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="exercise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exercise Routine</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your exercise routine"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
              <CardDescription>
                Person to contact in case of emergency
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="emergencyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contact name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emergencyRelation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter relationship" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emergencyPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contact phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Consent */}
          <Card>
            <CardHeader>
              <CardTitle>Consent</CardTitle>
              <CardDescription>
                Please read and accept the following
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="consentToTreat"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Consent to Treat</FormLabel>
                      <FormDescription>
                        I consent to medical treatment and the release of information for treatment, payment, and healthcare operations.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="privacyPolicy"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Privacy Policy</FormLabel>
                      <FormDescription>
                        I have read and agree to the privacy policy and terms of service.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button">
              Save as Draft
            </Button>
            <Button type="submit">
              Submit Registration
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PatientRegistration;
