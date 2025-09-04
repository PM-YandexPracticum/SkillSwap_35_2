export function formatAge(birthDate: string): string {
  if (!birthDate) return '';

  const today = new Date();
  const [year, month, day] = birthDate.split('-').map(Number);
  const birth = new Date(year, month - 1, day);

  let age = today.getFullYear() - birth.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() >= birth.getDate());

  if (!hasBirthdayPassed) {
    age--;
  }

  const lastDigit = age % 10;
  const lastTwoDigits = age % 100;
  let suffix = 'лет';
  if (lastTwoDigits < 11 || lastTwoDigits > 14) {
    if (lastDigit === 1) suffix = 'год';
    else if (lastDigit >= 2 && lastDigit <= 4) suffix = 'года';
  }

  return `${age} ${suffix}`;
}
