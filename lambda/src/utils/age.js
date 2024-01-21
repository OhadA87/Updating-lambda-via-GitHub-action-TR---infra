export function getBirthdayTimestamp(years, months) {
  const currentDate = new Date();
  const birthdayDate = new Date(
    currentDate.getFullYear() - years,
    currentDate.getMonth() - months,
  );

  return birthdayDate.getTime();
}

export function getAgeByTimeStamp(timestamp) {
  const currentDate = new Date();
  const birthdayDate = new Date(timestamp);

  let years = currentDate.getFullYear() - birthdayDate.getFullYear();
  let months = currentDate.getMonth() - birthdayDate.getMonth();

  if (
    currentDate.getMonth() < birthdayDate.getMonth() ||
    (currentDate.getMonth() === birthdayDate.getMonth() &&
      currentDate.getDate() < birthdayDate.getDate())
  ) {
    years--;
    months += 12;
  }

  return { years, months };
}
