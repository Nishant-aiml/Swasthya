import React, { useState } from 'react';
import { Watch, Activity, Heart, Moon, Zap, BarChart2, RefreshCw } from 'lucide-react';

interface WearableDevice {
  id: string;
  name: string;
  type: string;
  connected: boolean;
  lastSync?: Date;
}

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  icon: React.ElementType;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

export default function WearableSync() {
  const [devices, setDevices] = useState<WearableDevice[]>([
    {
      id: 'fitbit-1',
      name: 'Fitbit Sense',
      type: 'Fitbit',
      connected: true,
      lastSync: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
    },
    {
      id: 'apple-watch-1',
      name: 'Apple Watch Series 7',
      type: 'Apple Watch',
      connected: false
    },
    {
      id: 'garmin-1',
      name: 'Garmin Venu',
      type: 'Garmin',
      connected: false
    }
  ]);

  const [metrics, setMetrics] = useState<HealthMetric[]>([
    {
      id: 'steps',
      name: 'Steps',
      value: 8439,
      unit: 'steps',
      icon: Activity,
      trend: 'up',
      color: 'bg-blue-500'
    },
    {
      id: 'heart-rate',
      name: 'Heart Rate',
      value: 72,
      unit: 'bpm',
      icon: Heart,
      trend: 'stable',
      color: 'bg-red-500'
    },
    {
      id: 'sleep',
      name: 'Sleep',
      value: 7.5,
      unit: 'hours',
      icon: Moon,
      trend: 'down',
      color: 'bg-indigo-500'
    },
    {
      id: 'calories',
      name: 'Calories',
      value: 1850,
      unit: 'kcal',
      icon: Zap,
      trend: 'up',
      color: 'bg-orange-500'
    }
  ]);

  const [syncing, setSyncing] = useState(false);

  const handleConnect = (deviceId: string) => {
    setDevices(devices.map(device =>
      device.id === deviceId
        ? { ...device, connected: !device.connected, lastSync: new Date() }
        : device
    ));
  };

  const handleSync = async () => {
    setSyncing(true);
    // Simulate sync delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update last sync time for connected devices
    setDevices(devices.map(device =>
      device.connected ? { ...device, lastSync: new Date() } : device
    ));
    
    // Simulate updating metrics with new data
    setMetrics(metrics.map(metric => ({
      ...metric,
      value: metric.value + Math.floor(Math.random() * 10 - 5),
      trend: Math.random() > 0.5 ? 'up' : 'down'
    })));
    
    setSyncing(false);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-500 rotate-45';
      case 'down':
        return 'text-red-500 -rotate-45';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Watch className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold">Wearable Integration</h2>
        </div>
        <button
          onClick={handleSync}
          disabled={!devices.some(d => d.connected) || syncing}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing...' : 'Sync Now'}
        </button>
      </div>

      {/* Connected Devices */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Devices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className={`p-4 rounded-lg border-2 transition-colors ${
                device.connected ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{device.name}</h4>
                <button
                  onClick={() => handleConnect(device.id)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    device.connected
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {device.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
              <p className="text-sm text-gray-600">{device.type}</p>
              {device.lastSync && (
                <p className="text-xs text-gray-500 mt-2">
                  Last synced: {device.lastSync.toLocaleTimeString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Health Metrics */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Health Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${metric.color}`}>
                  <metric.icon className="h-5 w-5 text-white" />
                </div>
                <BarChart2 className={`h-5 w-5 ${getTrendIcon(metric.trend)}`} />
              </div>
              <h4 className="font-medium text-gray-900">{metric.name}</h4>
              <div className="mt-1 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {metric.value}
                </p>
                <p className="ml-2 text-sm text-gray-500">{metric.unit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}