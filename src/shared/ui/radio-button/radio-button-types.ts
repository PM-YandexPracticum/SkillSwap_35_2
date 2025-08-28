export interface IRadioButtonProps {
  label?: string;
  value: string;
  name: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}
