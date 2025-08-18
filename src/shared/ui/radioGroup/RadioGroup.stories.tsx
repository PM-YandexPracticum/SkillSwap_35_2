import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioGroup } from './radioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Shared/UI/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs']
};

export default meta;

export const Gender: StoryObj<typeof RadioGroup> = {
  render: () => {
    const [gender, setGender] = useState('any');
    return (
      <RadioGroup
        groupTitle='Пол автора'
        options={[
          { value: 'any', label: 'Не имеет значения' },
          { value: 'male', label: 'Мужской' },
          { value: 'female', label: 'Женский' }
        ]}
        name='author-gender'
        selectedValue={gender}
        onChange={setGender}
      />
    );
  }
};
