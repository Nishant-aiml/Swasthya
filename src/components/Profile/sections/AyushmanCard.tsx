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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import {
  CreditCard,
  Building2,
  Search,
  MapPin,
  Star,
  Clock,
  Calendar,
  FileText,
  ClipboardList,
  Filter,
} from 'lucide-react';

export default function AyushmanCard() {
  const [activeTab, setActiveTab] = useState('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    specialty: '',
    rating: '',
    service: '',
    waitTime: '',
  });

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="card">Ayushman Card</TabsTrigger>
          <TabsTrigger value="network">Network Facilities</TabsTrigger>
          <TabsTrigger value="claims">Claims & Benefits</TabsTrigger>
        </TabsList>

        {/* Ayushman Card Tab */}
        <TabsContent value="card">
          <div className="space-y-6">
            {/* Digital Card Display */}
            <Card>
              <CardHeader>
                <CardTitle>Digital Ayushman Card</CardTitle>
                <CardDescription>
                  Your digital health insurance card
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Ayushman Bharat</h3>
                      <div className="space-y-2">
                        <p className="text-sm opacity-90">Card No: XXXX-XXXX-XXXX</p>
                        <p className="text-sm opacity-90">Valid Till: 12/2025</p>
                      </div>
                    </div>
                    <CreditCard className="w-12 h-12" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Coverage Details */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits & Coverage</CardTitle>
                <CardDescription>
                  Your insurance coverage details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Coverage Amount</h4>
                      <p className="text-2xl font-bold">₹5,00,000</p>
                      <p className="text-sm text-muted-foreground">Per family per year</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Active Members</h4>
                      <p className="text-2xl font-bold">4</p>
                      <p className="text-sm text-muted-foreground">Family members covered</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Policy Details */}
            <Card>
              <CardHeader>
                <CardTitle>Policy Details</CardTitle>
                <CardDescription>
                  Your policy information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Policy Number</Label>
                      <Input value="AB-2025-1234567" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Policy Type</Label>
                      <Input value="Family Floater" disabled />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Network Facilities Tab */}
        <TabsContent value="network">
          <div className="space-y-6">
            {/* Search Bar */}
            <Card>
              <CardHeader>
                <CardTitle>Find Network Facilities</CardTitle>
                <CardDescription>
                  Search for Ayushman-accepted healthcare facilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      placeholder="Search facilities..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button>
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>

                  {/* Filters */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <Input
                      placeholder="Location"
                      value={selectedFilters.location}
                      onChange={(e) =>
                        setSelectedFilters({ ...selectedFilters, location: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Specialty"
                      value={selectedFilters.specialty}
                      onChange={(e) =>
                        setSelectedFilters({ ...selectedFilters, specialty: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Rating"
                      value={selectedFilters.rating}
                      onChange={(e) =>
                        setSelectedFilters({ ...selectedFilters, rating: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Service"
                      value={selectedFilters.service}
                      onChange={(e) =>
                        setSelectedFilters({ ...selectedFilters, service: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Wait Time"
                      value={selectedFilters.waitTime}
                      onChange={(e) =>
                        setSelectedFilters({ ...selectedFilters, waitTime: e.target.value })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Facility List */}
            {[1, 2, 3].map((facility) => (
              <Card key={facility}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h4 className="font-medium">City Hospital</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>123 Healthcare Street, City</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="w-4 h-4 mr-1" />
                        <span>4.5/5 (200+ reviews)</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Wait time: ~20 mins</span>
                      </div>
                    </div>
                    <Button>
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Claims Tab */}
        <TabsContent value="claims">
          <div className="space-y-6">
            {/* Claim History */}
            <Card>
              <CardHeader>
                <CardTitle>Claim History</CardTitle>
                <CardDescription>
                  Track your insurance claims
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2].map((claim) => (
                    <div
                      key={claim}
                      className="flex justify-between items-center p-4 border rounded-lg"
                    >
                      <div className="space-y-1">
                        <h4 className="font-medium">Claim #{claim}</h4>
                        <p className="text-sm text-muted-foreground">
                          Hospital: City Hospital
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Date: Jan 15, 2025
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹25,000</div>
                        <div className="text-sm text-green-600">Approved</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Treatment Packages */}
            <Card>
              <CardHeader>
                <CardTitle>Treatment Packages</CardTitle>
                <CardDescription>
                  View available treatment packages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((package_) => (
                    <div
                      key={package_}
                      className="p-4 border rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="font-medium">Package Name</h4>
                          <p className="text-sm text-muted-foreground">
                            Coverage: ₹50,000
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Duration: 5 days
                          </p>
                        </div>
                        <Button variant="outline">
                          <FileText className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Claim Processing Status */}
            <Card>
              <CardHeader>
                <CardTitle>Active Claims</CardTitle>
                <CardDescription>
                  Track your ongoing claims
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-medium">Claim #12345</h4>
                        <p className="text-sm text-muted-foreground">
                          Submitted: Jan 10, 2025
                        </p>
                      </div>
                      <div className="text-amber-600">Processing</div>
                    </div>
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-600 h-2 rounded-full w-3/4"></div>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>Submitted</span>
                        <span>Processing</span>
                        <span>Approved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
