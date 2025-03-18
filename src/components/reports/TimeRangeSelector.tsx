
import { Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TimeRangeSelectorProps {
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
}

const TimeRangeSelector = ({ timeRange, onTimeRangeChange }: TimeRangeSelectorProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Calendar className="h-5 w-5 text-gray-500" />
      <Select value={timeRange} onValueChange={onTimeRangeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="3">Last 3 days</SelectItem>
          <SelectItem value="7">Last 7 days</SelectItem>
          <SelectItem value="14">Last 14 days</SelectItem>
          <SelectItem value="30">Last 30 days</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeRangeSelector;
