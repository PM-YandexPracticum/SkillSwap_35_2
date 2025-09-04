import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { TUser, TSkill } from '@/api/types';
import { useSelector, useDispatch } from '@/app/store/store';
import { categoriesList } from '@/entities/categories/categories-slice';
import {
  skillsState,
  registerNewSkillThunk
} from '@/entities/skills/skills-slice';
import { usersList, registerUserThunk } from '@/entities/user/user-slice';

import { RegistrationLogin } from '@/features/registration-login';
import { RegistrationSkill } from '@/features/registration-skill';
import { RegistrationUser } from '@/features/registration-user';
import { fileToBase64 } from '@/shared/lib/images-converter';
import { pickSubcategoriesByIds } from '@/shared/lib/mapping-helpers';
import type { LoginFormFields } from '@/widgets/registration-login-form/type';
import type { SkillFormFields } from '@/widgets/registration-skill-form/type';
import type { UserFormFields } from '@/widgets/registration-user-form/type';
import { SkillPreviewModal } from '@/widgets/skill-preview-modal';

import styles from './Registration.module.scss';

type Step = 1 | 2 | 3;
type RegistrationSteps = {
  step1?: LoginFormFields;
  step2?: UserFormFields;
  step3?: SkillFormFields;
};

export const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<RegistrationSteps>({});
  const [showModal, setShowModal] = useState(false);
  const allCategories = useSelector(categoriesList);
  const allSkills = useSelector(skillsState);
  const allUsers = useSelector(usersList);

  const convertSkillImages = async (files: File[]) =>
    Promise.all(files.map((file) => fileToBase64(file)));

  const handleNext = (
    data: LoginFormFields | UserFormFields | SkillFormFields
  ) => {
    const stepKey = `step${step}` as keyof RegistrationSteps;
    setFormData((prev) => ({ ...prev, [stepKey]: data }));

    if (step === 3) {
      setShowModal(true);
    } else {
      setStep((prev) => (prev + 1) as Step);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  const handleConfirm = async () => {
    const wantToLearn = pickSubcategoriesByIds(
      allCategories,
      formData.step2?.subcategories ?? []
    );
    const nextUserId = `user_id_00${allUsers.length + 1}`;
    const nextSkillId = `skill_id_00${allSkills.length + 1}`;

    let profileBase64 = '';
    const profileFile = formData.step2?.profileImage;
    if (profileFile && 'name' in profileFile && 'type' in profileFile) {
      profileBase64 = await fileToBase64(profileFile as File);
    }
    let skillImages: string[] = [];
    if (formData.step3?.images?.length) {
      skillImages = await convertSkillImages(formData.step3.images);
    }

    const newUser: TUser = {
      id: String(nextUserId),
      email: formData.step1?.email ?? '',
      password: formData.step1?.password ?? '',
      name: formData.step2?.name ?? '',
      gender: formData.step2?.gender ?? '',
      location: formData.step2?.location ?? '',
      birthDate: formData.step2?.birthDate ?? '',
      bio: '',
      profileImage: profileBase64 ?? ''
    };

    const newSkill: TSkill = {
      skillId: String(nextSkillId),
      canTeach: {
        skillName: formData.step3?.skillName ?? '',
        categoryId: Number(formData.step3?.categoryId) ?? 0,
        subcategoryId: Number(formData.step3?.subcategoryId) ?? 0
      },
      wantToLearn,
      skillOwner: {
        id: newUser.id,
        name: newUser.name,
        profileImage: newUser.profileImage,
        gender: newUser.gender,
        location: newUser.location,
        birthDate: newUser.birthDate,
        bio: newUser.bio
      },
      requestStatus: 'none',
      images: skillImages ?? [],
      description: formData.step3?.description ?? '',
      favorite: {
        likeStatus: false,
        likeOwners: []
      },
      updatedAt: new Date().toISOString(),
      swapOwner: null,
      swapDate: null
    };
    // если видно выводы в консоль - раскомментируйте navigate
    // тут же можно использовать location
    console.log('Final user:', newUser);
    console.log('Final skill:', newSkill);

    dispatch(registerUserThunk(newUser));
    dispatch(registerNewSkillThunk(newSkill));
    setShowModal(false);
    setFormData({});
    //navigate(-1);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEdit = () => {
    setShowModal(false);
    setStep(3);
  };

  return (
    <>
      <div className={styles.statusbar}>
        <p className={styles.heading}>Шаг {step} из 3</p>
        <div className={styles.bar}>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`${styles.step} ${s <= step ? styles.active : ''}`}
            />
          ))}
        </div>
      </div>
      {step === 1 && (
        <RegistrationLogin
          onNextClick={handleNext}
          defaultValues={formData.step1}
        />
      )}
      {step === 2 && (
        <RegistrationUser
          onPrevClick={handleBack}
          onNextClick={handleNext}
          defaultValues={formData.step2}
        />
      )}
      {step === 3 && (
        <RegistrationSkill
          onPrevClick={handleBack}
          onNextClick={handleNext}
          defaultValues={formData.step3}
        />
      )}

      {showModal && formData.step3 && (
        <SkillPreviewModal
          formData={formData.step3}
          onClose={handleCloseModal}
          onEdit={handleEdit}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};
