# Turystyczna Korona Tatr

Prywatna, statyczna strona Mateusza Kosowskiego i Artura Urbaniaka służąca do
dokumentowania drogi po odznakę Turystyczna Korona Tatr.

Strona główna zawiera:

- opis projektu i progi odznaki,
- odnośniki do profili obu uczestników,
- oficjalny wykaz 60 szczytów i przełęczy,
- wyszukiwarkę, filtry oraz podsumowanie statusów wejść.

## Uzupełnianie postępów

Potwierdzone wejścia są przechowywane w `js/main.js` w obiekcie
`completedPlaces`. Aby oznaczyć miejsce jako zdobyte, dodaj jego numer z wykazu
do zbioru `mateusz` lub `artur`.

```js
const completedPlaces = {
  mateusz: new Set([1, 12]),
  artur: new Set([1]),
};
```

Wykaz miejsc pochodzi z regulaminu Polskiego Towarzystwa Tatrzańskiego:
https://www.ptt.org.pl/odznaka-turystyczna-korona-tatr/
