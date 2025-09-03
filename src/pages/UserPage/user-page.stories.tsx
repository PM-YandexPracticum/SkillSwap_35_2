import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { UserPage } from './user-page';

// Mock компоненты для контента страниц
const MockProfileContent = () => (
  <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
    <h2>Страница профиля</h2>
    <p>Здесь будет контент страницы профиля пользователя</p>
  </div>
);

const MockRequestsContent = () => (
  <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
    <h2>Мои заявки</h2>
    <p>Здесь будет список заявок пользователя</p>
  </div>
);

const MockExchangesContent = () => (
  <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
    <h2>Мои обмены</h2>
    <p>Здесь будет история обменов пользователя</p>
  </div>
);

// Декоратор для роутинга
const withRouter = (Story: any, { parameters }: any) => {
  const initialRoute = parameters?.initialRoute || '/profile';

  return (
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path='/*' element={<Story />}>
          <Route path='profile' element={<MockProfileContent />} />
          <Route path='requests' element={<MockRequestsContent />} />
          <Route path='exchanges' element={<MockExchangesContent />} />
          <Route path='favourites' element={<div>Избранное</div>} />
          <Route path='skills' element={<div>Навыки</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

const meta: Meta<typeof UserPage> = {
  title: 'Pages/UserPage',
  component: UserPage,
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof UserPage>;

// Базовая история
export const Default: Story = {
  parameters: {
    initialRoute: '/profile'
  }
};

// История с активной страницей заявок
export const OnRequestsPage: Story = {
  parameters: {
    initialRoute: '/requests'
  }
};

// История с активной страницей обменов
export const OnExchangesPage: Story = {
  parameters: {
    initialRoute: '/exchanges'
  }
};

// История с активной страницей избранного
export const OnFavouritesPage: Story = {
  parameters: {
    initialRoute: '/favourites'
  }
};

// История с активной страницей навыков
export const OnSkillsPage: Story = {
  parameters: {
    initialRoute: '/skills'
  }
};

// Альтернативная версия с моками компонентов (если нужно изолировать)
export const WithMockComponents: Story = {
  parameters: {
    initialRoute: '/profile'
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/profile']}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              height: '80px',
              background: '#2c3e50',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              padding: '0 20px',
              marginBottom: '20px'
            }}
          >
            Mock Header
          </div>
          <div
            style={{ display: 'flex', flex: 1, gap: '20px', padding: '0 20px' }}
          >
            <div
              style={{
                width: '324px',
                background: '#ecf0f1',
                borderRadius: '12px',
                padding: '20px',
                flexShrink: 0
              }}
            >
              Mock Sidebar
            </div>
            <main
              style={{
                flex: 1,
                background: '#f5f5f5',
                borderRadius: '12px',
                padding: '20px'
              }}
            >
              <MockProfileContent />
            </main>
          </div>
          <div
            style={{
              height: '60px',
              background: '#34495e',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '20px'
            }}
          >
            Mock Footer
          </div>
        </div>
      </MemoryRouter>
    )
  ]
};
