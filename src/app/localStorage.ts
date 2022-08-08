// Инициализация localStorage если он пустой
if (localStorage.length === 0) {
  localStorage.setItem("currentSign", "");
  localStorage.setItem("currentTimezone", "");
  localStorage.setItem("text_0", "Текст записи");
  localStorage.setItem("sign_0", "Подпись автора");
  localStorage.setItem("tz_0", "Africa/Abidjan");
  localStorage.setItem("date_0", "2022-08-07T20:21:44.115170+00:00");
  localStorage.setItem("text_1", "Текст записи");
  localStorage.setItem("sign_1", "Подпись автора");
  localStorage.setItem("tz_1", "Africa/Abidjan");
  localStorage.setItem("date_1", "2022-08-07T20:21:44.115170+00:00");
}

// Получение количества записей из localStorage
const getStorageNotesCount = () => {
  return (localStorage.length - 2) / 4; // localStorage имеет два ключа для подписи и часового пояса, а также каждая запись имеет 4 ключа
};

// Получение записей из localStorage
export const getStorageNotes = () => {
  let notes = [];
  for (let i = 0; i < getStorageNotesCount(); i++) {
    notes.push({
      text: localStorage.getItem("text_" + i),
      sign: localStorage.getItem("sign_" + i),
      tz: localStorage.getItem("tz_" + i),
      date: localStorage.getItem("date_" + i),
    });
  }
  return notes;
};

// Добавление записи в localStorage
export const addStorageNote = (note: {
  text: string;
  sign: string;
  tz: string;
  date: string;
}) => {
  const notesCount = getStorageNotesCount();
  localStorage.setItem("text_" + notesCount, note.text);
  localStorage.setItem("sign_" + notesCount, note.sign);
  localStorage.setItem("tz_" + notesCount, note.tz);
  localStorage.setItem("date_" + notesCount, note.date);
};
