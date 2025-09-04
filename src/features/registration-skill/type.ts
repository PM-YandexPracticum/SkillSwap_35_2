import type { SkillFormFields } from '@/widgets/registration-skill-form/type';

export type RegistrationSkillProps = {
  onNextClick: (values: SkillFormFields) => void;
  onPrevClick: () => void;
  defaultValues?: SkillFormFields;
};
