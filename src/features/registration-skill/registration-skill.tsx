import boardImg from '@/shared/assets/images/school-board.svg?url';
import { SkillFormUI } from '@/widgets/registration-skill-form';
import { RegistrationUI } from '@/widgets/registrationUi';
import type { RegistrationSkillProps } from './type';

export const RegistrationSkill = ({
  onPrevClick,
  onNextClick,
  defaultValues
}: RegistrationSkillProps) => (
  <RegistrationUI
    imageSrc={boardImg}
    title='Укажите, чем вы готовы поделиться'
    description='Так другие люди смогут увидеть ваши предложения и предложить вам обмен!'
  >
    <SkillFormUI
      prevStepClick={onPrevClick}
      nextStepClick={onNextClick}
      defaultValues={defaultValues}
    />
  </RegistrationUI>
);
