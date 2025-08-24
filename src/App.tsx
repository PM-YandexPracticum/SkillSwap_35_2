import { UserOfferUI } from './shared/ui/user-offer/user-offer';

function App() {
  const props = {
    skillName: 'Игра на барабанах',
    categoryName: 'Творчество и искусство',
    subcategoryName: 'Видеомонтаж',
    description:
      'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры',
    images: [
      '/db/images/swap_01.jpg',
      '/db/images/swap_02.jpg',
      '/db/images/swap_03.jpg',
      '/db/images/swap_04.jpg'
    ],
    requestStatus: 'none',
    justAdded: false,
    isLiked: false
  };
  return (
    <>
      <h1>Skill swap project</h1>
      <UserOfferUI {...props} />
    </>
  );
}

export default App;
