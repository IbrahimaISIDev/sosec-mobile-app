declare module '@react-native-community/datetimepicker' {
    import { ComponentClass } from 'react';
    import { ViewProps } from 'react-native';
  
    export type IOSMode = 'date' | 'time' | 'datetime' | 'countdown';
    export type AndroidMode = 'date' | 'time';
    export type Display = 'default' | 'spinner' | 'calendar' | 'clock';
    
    export type Event = {
      type: string;
      nativeEvent: {
        timestamp?: number;
        utcOffset?: number;
      };
    };
  
    export type DateTimePickerProps = ViewProps & {
      value: Date;
      mode?: IOSMode | AndroidMode;
      display?: Display;
      onChange?: (event: Event, date?: Date) => void;
      minimumDate?: Date;
      maximumDate?: Date;
      locale?: string;
      is24Hour?: boolean;
      neutralButtonLabel?: string;
      minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30;
      timeZoneOffsetInMinutes?: number;
      timeZoneOffsetInSeconds?: number;
      dayOfWeekFormat?: string;
      textColor?: string;
      accentColor?: string;
      themeVariant?: 'light' | 'dark';
    };
  
    const DateTimePicker: ComponentClass<DateTimePickerProps>;
    export default DateTimePicker;
  }