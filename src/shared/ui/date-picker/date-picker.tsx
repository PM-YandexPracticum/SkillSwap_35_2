import { ru } from 'date-fns/locale';
import { useState } from 'react';
import { DayPicker, MonthCaption } from 'react-day-picker';
import { Input } from '@/shared/ui/input/input';
import CalendarIcon from '@icons/calendar.svg';
import ChevronDownIcon from '@icons/chevron-down.svg';
import 'react-day-picker/dist/style.css';
import styles from './date-picker.module.scss';

interface IDatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}
export const DatePicker = ({ value, onChange }: IDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [temp, setTemp] = useState<Date | undefined>();

  const handleConfirm = () => {
    onChange(temp); // отправляем дату в форму
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTemp(value); // откатываем
    setIsOpen(false);
  };

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.datePickerWrapper}>
      <Input
        label='Дата рождения'
        placeholder='дд.мм.гггг'
        value={value ? value.toLocaleDateString('ru-RU') : 'дд.мм.гггг'}
        icon={<CalendarIcon />}
        iconStyleOverride={{ right: '20px' }}
        onClick={toggleOpen}
      />
      {isOpen && (
        <div className={styles.calendarDropdown}>
          <DayPicker
            mode='single'
            locale={ru}
            selected={temp}
            onSelect={setTemp}
            fromYear={1900}
            toYear={new Date().getFullYear()}
            captionLayout='dropdown'
            components={{
              Chevron: (props) => {
                if (
                  props.orientation === 'left' ||
                  props.orientation === 'right'
                ) {
                  // скрываем только стрелки переключения месяцев
                  return <span />;
                }
                return <ChevronDownIcon />; // остальные (например в выпадашках) оставляем как есть
              }
            }}
            classNames={{
              root: styles.calendar,
              nav: 'hidden',
              months: styles.months,
              month_caption: styles.caption,
              caption_label: styles.captionLabel,
              dropdowns: styles.dropdowns,
              head_row: styles.headRow,
              head_cell: styles.headCell,
              row: styles.row,
              cell: styles.cell,
              day: styles.day,
              day_selected: styles.daySelected,
              day_today: styles.dayToday,
              day_outside: styles.dayOutside
            }}
          />

          <div className='flex justify-between mt-3'>
            <button
              type='button'
              onClick={handleCancel}
              className='px-4 py-2 rounded-lg border border-green-500 text-green-600'
            >
              Отменить
            </button>
            <button
              type='button'
              onClick={handleConfirm}
              className='px-4 py-2 rounded-lg bg-green-500 text-white'
            >
              Выбрать
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
