import { useState, useRef, useEffect } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import styles from './dropdown.module.scss';
import { Checkbox } from '../checkbox/checkbox';

/*import { ReactComponent as Cross } from '../../shared/assets/icons/cross.svg';
import { ReactComponent as ChevronDown } from '../../shared/assets/icons/chevron-down.svg';
import { ReactComponent as ChevronUp } from '../../shared/assets/icons/chevron-up.svg';
*/

import Cross from '../../assets/icons/cross.svg';
import ChevronDown from '../../assets/icons/chevron-down.svg';
import ChevronUp from '../../assets/icons/chevron-up.svg';

import { useOutsideClickClose } from './hooks/useOutsideClickClose';

export type DropdownOptionType = {
  value: string;
  label: string;
  className?: string;
  optionClassName?: string;
};

export type DropdownProps = {
  options: DropdownOptionType[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  onClose?: () => void;
  title?: string;
  placeholder?: string;
  className?: string;
  error?: boolean;
  helperMessage?: string;
  type?: 'select' | 'multiple' | 'searchable';
};

export const Dropdown: React.FC<DropdownProps> = ({
  type = 'select',
  options,
  onChange,
  onClose,
  title,
  placeholder = 'Выберите категорию',
  error,
  helperMessage,
  className,
  value
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  //const rootRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null!);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOptions, setSelectedValues] = useState<string[]>([]);

  //закрыть при клике на внешнее поле
  useOutsideClickClose({
    isOpen,
    rootRef: ref as React.RefObject<HTMLDivElement>,
    onClose,
    onChange: setIsOpen
  });

  //Переключает состояние открытия/закрытия выпадающего списка
  const handleDisplayClickToToggleDropdown: MouseEventHandler<
    HTMLDivElement
  > = () => {
    setIsOpen((isCurrentlyOpen) => !isCurrentlyOpen);
  };

  useEffect(() => {
    const normalizeSelectedValues = () => {
      if (!value) {
        return [];
      }
      return Array.isArray(value) ? value : [value];
    };

    setSelectedValues(normalizeSelectedValues());
  }, [value]);

  const filteredOptionsBySearch = options.filter((option) => {
    const searchTerm = searchQuery.toLowerCase();
    const optionLabel = option.label.toLowerCase();
    return optionLabel.includes(searchTerm);
  });

  const handleOptionSelection = (optionValue: string) => {
    if (type === 'multiple') {
      // Для множественного выбора: добавляем или удаляем значение
      const newValues = selectedOptions.includes(optionValue)
        ? selectedOptions.filter((v) => v !== optionValue)
        : [...selectedOptions, optionValue];

      setSelectedValues(newValues);
      onChange?.(newValues);
    } else {
      const newValue = selectedOptions[0] === optionValue ? '' : optionValue;
      setSelectedValues(newValue ? [newValue] : []);
      onChange?.(newValue);
      setIsOpen(false);
      // Для поискового режима обновляем поле ввода
      if (type === 'searchable') {
        setSearchQuery(
          newValue ? options.find((o) => o.value === newValue)?.label || '' : ''
        );
      }
    }
  };

  const handleClearSelection = (event: React.MouseEvent) => {
    event.stopPropagation();

    setSelectedValues([]);
    setSearchQuery('');

    const clearedValue = type === 'multiple' ? [] : '';
    onChange?.(clearedValue);
  };

  const getItemsText = () => {
    if (selectedOptions.length === 0) return placeholder;

    if (type === 'multiple') {
      return selectedOptions
        .map((value) => options.find((o) => o.value === value)?.label || value)
        .join(', ');
    }

    const selectedOption = options.find((o) => o.value === selectedOptions[0]);
    return selectedOption?.label || placeholder;
  };

  const renderInputField = () => {
    const hasSelectedOptions = selectedOptions.length > 0;
    const inputClassName = getInputClass(hasSelectedOptions);

    return type === 'searchable'
      ? renderSearchableInput(inputClassName, hasSelectedOptions)
      : renderStaticInput(inputClassName);
  };

  // Вспомогательная функция для получения классов
  const getInputClass = (hasSelectedOptions: boolean) =>
    clsx(
      styles.dropdownInput,
      !hasSelectedOptions && styles.placeholder,
      hasSelectedOptions && styles.selected
    );

  // Рендер инпута
  const renderSearchableInput = (
    inputClassName: string,
    hasSelectedOptions: boolean
  ) => (
    <input
      type='text'
      placeholder={placeholder}
      value={isOpen ? searchQuery : getItemsText()}
      onChange={(e) => setSearchQuery(e.target.value)}
      className={inputClassName}
      autoFocus={isOpen}
      onClick={handledropdownInputClick(hasSelectedOptions)}
      readOnly={!isOpen}
    />
  );

  // Рендер статического инпута
  const renderStaticInput = (inputClassName: string) => (
    <div
      className={inputClassName}
      onClick={handleDisplayClickToToggleDropdown}
    >
      {getItemsText()}
    </div>
  );

  // Обработчик клика для поискового инпута
  const handledropdownInputClick =
    (hasSelectedOptions: boolean) => (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isOpen) {
        setIsOpen(true);
        if (hasSelectedOptions) {
          setSearchQuery(getItemsText());
        }
      }
    };

  const renderDropdownIcon = () => {
    // условия для отображения кнопки очистки
    const hasContentToClear =
      searchQuery.length > 0 || selectedOptions.length > 0;
    const shouldShowClearButton = hasContentToClear && isOpen;

    // кнопка очистки
    if (shouldShowClearButton) {
      return (
        <button
          className={styles.clearButton}
          onClick={handleClearSelection}
          type='button'
          aria-label='Очистить выбор'
        >
          <img src={Cross} alt='cross' />
        </button>
      );
    }

    // В зависимости от состояния открытия показываем соответствующую иконку
    return isOpen ? (
      <img src={ChevronUp} alt='ChevronUp' />
    ) : (
      <img src={ChevronDown} alt='ChevronDown' />
    );
  };

  const renderOptionsList = () => {
    // Если вариантов для выбора нет, показываем сообщение
    if (filteredOptionsBySearch.length === 0) {
      return <div className={styles.notFound}>Ничего не найдено</div>;
    }

    // Преобразуем массив вариантов в список элементов
    return filteredOptionsBySearch.map((option) => {
      // Проверяем, выбран ли текущий вариант
      const isOptionSelected = selectedOptions.includes(option.value);

      return (
        <li
          key={option.value}
          className={clsx(
            styles.selectItem,

            isOptionSelected && styles.selected
          )}
          // Обработчик клика по элементу
          onClick={() => handleOptionSelection(option.value)}
        >
          {/* Для множественного выбора показываем чекбокс */}
          {type === 'multiple' && (
            <div className={styles.hiddenCheckbox}>
              <Checkbox
                name={`option-${option.value}`}
                value={option.value}
                checked={isOptionSelected}
                // Обработчик изменения состояния
                onChange={() => handleOptionSelection(option.value)}
                variant='tick'
              />
            </div>
          )}

          {/* Текстовая метка варианта выбора */}
          <span className={styles.optionText}>{option.label}</span>
        </li>
      );
    });
  };

  return (
    <div
      className={clsx(styles.dropdownContainer, className)}
      ref={dropdownRef}
    >
      {title && <div className={styles.title}>{title}</div>}

      <div
        className={clsx(styles.dropdownContent, error && styles.error)}
        style={{ zIndex: isOpen ? 10 : undefined }}
      >
        <div
          className={clsx(styles.dropdownHeader, isOpen && styles.withBorder)}
        >
          {renderInputField()}
          {renderDropdownIcon()}
        </div>

        {isOpen && <ul className={styles.selectMenu}>{renderOptionsList()}</ul>}
      </div>

      {helperMessage && (
        <span className={clsx(styles.helperMessage, error && styles.errorText)}>
          {helperMessage}
        </span>
      )}
    </div>
  );
};
