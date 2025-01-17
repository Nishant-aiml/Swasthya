import React from 'react';

interface TabsProps {
  value: string;
  defaultValue?: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabContext = React.createContext<TabContextValue | undefined>(undefined);

export function Tabs({ value, defaultValue, onValueChange, children, className = '' }: TabsProps) {
  const [selectedValue, setSelectedValue] = React.useState(value || defaultValue || '');

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange(newValue);
  };

  return (
    <TabContext.Provider value={{ value: selectedValue, onValueChange: handleValueChange }}>
      <div className={className}>{children}</div>
    </TabContext.Provider>
  );
}

export function TabsList({ children, className = '' }: TabsListProps) {
  return (
    <div className={`inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className = '', onClick }: TabsTriggerProps) {
  const context = React.useContext(TabContext);
  if (!context) {
    throw new Error('TabsTrigger must be used within a Tabs component');
  }

  const { value: selectedValue, onValueChange } = context;
  const isSelected = value === selectedValue;

  return (
    <button
      className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
        isSelected
          ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
      } ${className}`}
      onClick={() => {
        onValueChange(value);
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = '' }: TabsContentProps) {
  const context = React.useContext(TabContext);
  if (!context) {
    throw new Error('TabsContent must be used within a Tabs component');
  }

  const { value: selectedValue } = context;
  const isSelected = value === selectedValue;

  if (!isSelected) {
    return null;
  }

  return (
    <div className={`focus:outline-none ${className}`} tabIndex={0}>
      {children}
    </div>
  );
}