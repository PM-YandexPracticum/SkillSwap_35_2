import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './main-layout';

// Имитация страницы SkillsPage
const DummySkillsPage = () => (
  <div style={{ display: 'flex', gap: '2rem', padding: '2rem' }}>
    {/* Sidebar */}
    <aside style={{ width: '250px', background: '#f0f0f0', padding: '1rem' }}>
      <h3>Фильтры</h3>
      <ul>
        <li>Категория 1</li>
        <li>Категория 2</li>
        <li>Категория 3</li>
      </ul>
    </aside>

    {/* Каталог карточек навыков */}
    <section
      style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem'
      }}
    >
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            textAlign: 'center'
          }}
        >
          Навык {i + 1}
        </div>
      ))}
    </section>
  </div>
);

const meta: Meta<typeof MainLayout> = {
  title: 'Layouts/MainLayout',
  component: MainLayout
};

export default meta;
type Story = StoryObj<typeof MainLayout>;

export const Default: Story = {
  render: () => (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<DummySkillsPage />} />{' '}
          {/* Outlet рендерит DummySkillsPage */}
        </Route>
      </Routes>
    </MemoryRouter>
  )
};
