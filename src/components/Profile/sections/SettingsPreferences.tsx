import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Switch } from '@/components/ui/Switch';
import { 
  Bell, 
  Globe, 
  Lock, 
  Moon, 
  Shield, 
  Smartphone,
  Languages,
  Eye,
  KeyRound,
  Palette
} from 'lucide-react';

export default function SettingsPreferences() {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');

  return (
    <div className="space-y-6">
      {/* Language Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Language Preferences</CardTitle>
          <CardDescription>
            Choose your preferred language and region settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Display Language</Label>
              <Select defaultValue={language}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="bn">Bengali</SelectItem>
                  <SelectItem value="te">Telugu</SelectItem>
                  <SelectItem value="ta">Tamil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Region Format</Label>
              <Select defaultValue="in">
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in">India</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>
            Manage your notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: 'Appointment Reminders',
                description: 'Get notified about upcoming appointments',
                icon: <Bell className="w-4 h-4" />,
              },
              {
                title: 'Medication Reminders',
                description: 'Reminders for taking medications',
                icon: <Bell className="w-4 h-4" />,
              },
              {
                title: 'Health Updates',
                description: 'Updates about your health records',
                icon: <Bell className="w-4 h-4" />,
              },
              {
                title: 'Mobile Notifications',
                description: 'Push notifications on your phone',
                icon: <Smartphone className="w-4 h-4" />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {item.icon}
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
                <Switch />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Privacy Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy Controls</CardTitle>
          <CardDescription>
            Manage your privacy settings and data sharing preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: 'Profile Visibility',
                description: 'Control who can see your profile',
                icon: <Eye className="w-4 h-4" />,
              },
              {
                title: 'Data Sharing',
                description: 'Manage how your data is shared',
                icon: <Shield className="w-4 h-4" />,
              },
              {
                title: 'Third-party Access',
                description: 'Control third-party app access',
                icon: <Lock className="w-4 h-4" />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {item.icon}
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
                <Switch />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account Security */}
      <Card>
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
          <CardDescription>
            Manage your account security settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Two-Factor Authentication</Label>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Enable 2FA</h4>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security
                  </p>
                </div>
                <Switch />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Change Password</Label>
              <div className="space-y-2">
                <Input type="password" placeholder="Current password" />
                <Input type="password" placeholder="New password" />
                <Input type="password" placeholder="Confirm new password" />
              </div>
              <Button className="mt-2">Update Password</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme Customization */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Customization</CardTitle>
          <CardDescription>
            Customize the appearance of your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Theme Mode</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Color Scheme</Label>
              <div className="grid grid-cols-5 gap-2">
                {['blue', 'green', 'purple', 'orange', 'pink'].map((color) => (
                  <div
                    key={color}
                    className={`w-10 h-10 rounded-full bg-${color}-500 cursor-pointer`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
