import React, { useState } from 'react';
import { Activity, TrendingUp, TrendingDown, AlertTriangle, Calendar, FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface HealthMetric {
  id: string;
  name: string;
  category: string;
  currentValue: number;
  unit: string;
  normalRange: {
    min: number;
    max: number;
  };
  history: {
    date: Date;
    value: number;
  }[];
  trend: 'up' | 'down' | 'stable';
  status: 'normal' | 'warning' | 'critical';
}

interface HealthReport {
  id: string;
  title: string;
  date: Date;
  category: string;
  summary: string;
  recommendations: string[];
  metrics: string[];
}

export default function HealthHistoryAnalysis() {
  const [metrics] = useState<HealthMetric[]>([
    {
      id: '1',
      name: 'Blood Pressure',
      category: 'Vitals',
      currentValue: 128,
      unit: 'mmHg',
      normalRange: { min: 90, max: 120 },
      history: [
        { date: new Date('2024-03-01'), value: 118 },
        { date: new Date('2024-02-15'), value: 122 },
        { date: new Date('2024-02-01'), value: 125 },
      ],
      trend: 'up',
      status: 'warning'
    },
    {
      id: '2',
      name: 'Blood Sugar',
      category: 'Vitals',
      currentValue: 95,
      unit: 'mg/dL',
      normalRange: { min: 70, max: 100 },
      history: [
        { date: new Date('2024-03-01'), value: 92 },
        { date: new Date('2024-02-15'), value: 88 },
        { date: new Date('2024-02-01'), value: 85 },
      ],
      trend: 'up',
      status: 'normal'
    }
  ]);

  const [reports] = useState<HealthReport[]>([
    {
      id: '1',
      title: 'Quarterly Health Assessment',
      date: new Date('2024-03-01'),
      category: 'General',
      summary: 'Overall health status is good with some areas needing attention',
      recommendations: [
        'Monitor blood pressure regularly',
        'Maintain current exercise routine',
        'Consider reducing salt intake'
      ],
      metrics: ['Blood Pressure', 'Blood Sugar', 'Cholesterol']
    }
  ]);

  const [expandedMetrics, setExpandedMetrics] = useState<string[]>([]);

  const toggleMetricExpansion = (id: string) => {
    setExpandedMetrics(prev =>
      prev.includes(id)
        ? prev.filter(metricId => metricId !== id)
        : [...prev, id]
    );
  };

  const getStatusColor = (status: HealthMetric['status']) => {
    switch (status) {
      case 'normal':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
    }
  };

  const getTrendIcon = (trend: HealthMetric['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-5 w-5 text-red-500" />;
      case 'down':
        return <TrendingDown className="h-5 w-5 text-green-500" />;
      case 'stable':
        return <Activity className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900">Health History Analysis</h2>
        <p className="text-sm text-gray-500 mt-1">
          Track your health metrics and view historical trends
        </p>
      </div>

      {/* Metrics Overview */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Health Metrics</h3>
        
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="border rounded-lg hover:border-blue-500 transition-colors"
          >
            <div
              className="p-4 cursor-pointer"
              onClick={() => toggleMetricExpansion(metric.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    metric.status === 'normal' ? 'bg-green-100' :
                    metric.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    <Activity className={`h-5 w-5 ${getStatusColor(metric.status)}`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{metric.name}</h4>
                    <p className="text-sm text-gray-500">{metric.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      {metric.currentValue} {metric.unit}
                    </div>
                    <div className="text-sm text-gray-500">
                      Range: {metric.normalRange.min}-{metric.normalRange.max} {metric.unit}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(metric.trend)}
                    {expandedMetrics.includes(metric.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {expandedMetrics.includes(metric.id) && (
                <div className="mt-4 border-t pt-4">
                  <h5 className="text-sm font-medium text-gray-900 mb-3">History</h5>
                  <div className="space-y-2">
                    {metric.history.map((record, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-500">
                          {record.date.toLocaleDateString()}
                        </span>
                        <span className="font-medium">
                          {record.value} {metric.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Health Reports */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Health Reports</h3>
        
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{report.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{report.category}</p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {report.date.toLocaleDateString()}
                </div>
              </div>

              <p className="mt-4 text-gray-600">{report.summary}</p>

              {report.recommendations.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium text-gray-900 mb-2">
                    Recommendations
                  </h5>
                  <ul className="space-y-2">
                    {report.recommendations.map((recommendation, index) => (
                      <li
                        key={index}
                        className="flex items-start text-sm text-gray-600"
                      >
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        {recommendation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {report.metrics.map((metric, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
                <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
                  <FileText className="h-4 w-4 mr-1" />
                  View Full Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Report Button */}
      <div className="mt-8 flex justify-center">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Generate New Health Report
        </button>
      </div>
    </div>
  );
} 