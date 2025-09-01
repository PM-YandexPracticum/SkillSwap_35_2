import { ru } from 'date-fns/locale';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input/input';
import CalendarIcon from '@icons/calendar.svg';
import 'react-day-picker/dist/style.css';
import styles from './date-picker.module.scss';
import type { IDatePickerProps } from './type';

export const DatePicker = ({ value, onChange }: IDatePickerProps) => {
  const parseDate = (str: string) => {
    const [year, month, day] = str.split('-').map(Number);
    return new Date(year, month - 1, day); // month - 1, потому что 0 = январь
  };
  const initialDate = value ? parseDate(value) : undefined;
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate
  ); // черновой выбор
  const [confirmedDate, setConfirmedDate] = useState<Date | undefined>(
    initialDate
  ); // окончательно выбранная
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Мемоизируем отображаемую дату
  const displayDate: string = useMemo(() => {
    const dateToShow =
      selectedDate || confirmedDate || (value ? parseDate(value) : undefined);
    return dateToShow ? dateToShow.toLocaleDateString('ru-RU') : '';
  }, [selectedDate, confirmedDate, value]);

  // Обработчик выбора дня
  const handleSelect = useCallback((date?: Date) => {
    setSelectedDate(date);
  }, []);

  // Подтверждение даты
  const handleConfirm = useCallback(() => {
    setConfirmedDate(selectedDate);
    setIsOpen(false);
    if (onChange && selectedDate) {
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dd = String(selectedDate.getDate()).padStart(2, '0');
      onChange(`${yyyy}-${mm}-${dd}`);
    } else if (onChange) {
      onChange(undefined);
    }
    // if (onChange) {
    //   onChange(selectedDate);
    // }
  }, [selectedDate, onChange]);

  // Отмена чернового выбора
  const handleCancel = useCallback(() => {
    if (confirmedDate) {
      setSelectedDate(confirmedDate);
    } else {
      setSelectedDate(undefined);
    }
  }, [confirmedDate, setSelectedDate]);

  // Закрытие календаря при клике вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        if (confirmedDate) {
          setSelectedDate(confirmedDate);
        } else {
          // иначе откатываем к входящему value
          setSelectedDate(value ? parseDate(value) : undefined);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value, confirmedDate]);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.datePickerWrapper}>
      <Input
        ref={inputRef}
        label='Дата рождения'
        placeholder='дд.мм.гггг'
        value={displayDate}
        icon={<CalendarIcon />}
        iconStyleOverride={{ right: '20px' }}
        onClick={toggleOpen}
      />
      {isOpen && (
        <div ref={calendarRef} className={styles.calendarDropdown}>
          <DayPicker
            showOutsideDays
            fixedWeeks
            mode='single'
            locale={ru}
            selected={selectedDate}
            onSelect={handleSelect}
            startMonth={new Date(1900, 0)}
            endMonth={new Date()}
            hideNavigation
            captionLayout='dropdown'
            classNames={{
              root: styles.calendar,
              months: styles.months,
              month_caption: styles.caption,
              caption_label: styles.captionLabel,
              dropdowns: styles.dropdowns,
              dropdown_month: styles.monthsDropdown,
              weekdays: styles.weekdays,
              weekday: styles.weekday,
              week: styles.week,
              outside: styles.dayOutside,
              day: styles.day,
              day_button: styles.dayButton,
              selected: styles.daySelected,
              today: styles.dayToday
            }}
          />

          <div className={styles.actionButtonsWrapper}>
            <Button
              buttonType='secondary'
              text='Отменить'
              onClick={handleCancel}
            />
            <Button
              buttonType='primary'
              text='Выбрать'
              onClick={handleConfirm}
            />
          </div>
        </div>
      )}
    </div>
  );
};
