import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Label } from '../../ui/Label';
import { Switch } from '../../ui/Switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/Select';
import { Button } from '../../ui/Button';
import { Bell, Lock, Palette, Globe, Shield } from 'lucide-react';

export function SettingsPreferences() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings & Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Language Preferences</Label>
          <Select defaultValue="en">
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिंदी</SelectItem>
              <SelectItem value="te">తెలుగు</SelectItem>
              <SelectItem value="ta">தமிழ்</SelectItem>
              <SelectItem value="kn">ಕನ್ನಡ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-semibold">Notification Settings</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Appointment Reminders</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>Medication Reminders</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>Health Tips</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>Lab Results</Label>
              <Switch />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-semibold">Privacy Controls</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Profile Visibility</Label>
              <Select defaultValue="private">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="doctors">Doctors Only</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label>Data Sharing</Label>
              <Switch />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-semibold">Account Security</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Two-Factor Authentication</Label>
              <Switch />
            </div>
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-semibold">Theme Customization</Label>
          <Select defaultValue="light">
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

        <div className="flex space-x-2">
          <Button className="flex-1">Save Settings</Button>
          <Button variant="outline" className="flex-1">Reset to Default</Button>
        </div>
      </CardContent>
    </Card>
  );
}
