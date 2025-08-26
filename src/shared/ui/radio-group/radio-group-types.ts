export interface IRadioGroupProps {
  options: {
    value: string;
    label: string;
  }[];
  name: string;
  selectedValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  groupTitle?: string;
}
