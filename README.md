# Turystyczna Korona Tatr

Statyczna strona służąca do dokumentowania postępów Mateusza Kosowskiego i
Artura Urbaniaka w zdobywaniu Turystycznej Korony Tatr.

## Założenia projektu

Aby ograniczyć koszty, projekt korzysta z bezpłatnego hostingu obsługującego
wyłącznie statyczne pliki HTML, CSS i JavaScript. Nie ma backendu ani bazy
danych — wszystkie informacje są przechowywane w plikach projektu i
uporządkowanych katalogach. Wprowadzając zmiany, zachowuj istniejącą strukturę,
nazewnictwo i stylistykę.

# Instrukcja - Dodawanie nowego wejścia

Dodając kolejny szczyt lub przełęcz:

1. Upewnij się, że masz wszystkie potrzebne dane: uczestnika, nazwę i wysokość
   miejsca, kraj, datę zdobycia, przebieg trasy, dystans, sumę podejść oraz sumę
   zejść. Nie zgaduj brakujących informacji.
2. Używaj wyłącznie kwadratowych zdjęć `.webp` (`1:1`). Umieść je w osobnym,
   jasno nazwanym katalogu danego uczestnika i miejsca.
3. Na stronie głównej zaktualizuj kafelek uczestnika: liczbę zdobytych punktów,
   procent i pasek postępu. W wykazie 60 miejsc oznacz właściwy punkt jako
   zdobyty przez daną osobę.
4. Na profilu uczestnika zaktualizuj wszystkie statystyki i dodaj jeden nowy
   katalog wyprawy. Katalogi ułóż według daty zdobycia — od najstarszego do
   najnowszego — i połącz je z odpowiednimi podstronami.
5. Utwórz podstronę na wzór istniejących wpisów. Każdy wpis umieszczaj w osobnym
   katalogu według schematu `entries/<uczestnik>/<miejsce>/index.html`.
   Zachowaj ten sam styl, układ, nazewnictwo plików, galerię i pełnoekranowy
   podgląd zdjęć. Uzupełnij komplet danych wyprawy oraz dodaj rzeczowe opisy
   alternatywne i podpisy zdjęć.
6. Na końcu sprawdź spójność statystyk, kolejność wpisów, linki, wszystkie
   zdjęcia oraz widok desktopowy i mobilny.
