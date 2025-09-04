import userImg from '@/shared/assets/images/user-info.svg?url';
import { UserFormUI } from '@/widgets/registration-user-form';
import { RegistrationUI } from '@/widgets/registrationUi';
import type { RegistrationUserProps } from './type';

export const RegistrationUser = ({
  onPrevClick,
  onNextClick,
  defaultValues
}: RegistrationUserProps) => (
  <RegistrationUI
    imageSrc={userImg}
    title='Расскажите немного о себе'
    description='Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена'
  >
    <UserFormUI
      prevStepClick={onPrevClick}
      nextStepClick={onNextClick}
      defaultValues={defaultValues}
    />
  </RegistrationUI>
);
