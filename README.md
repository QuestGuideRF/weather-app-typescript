# Погода в терминале (TypeScript)

Консольное приложение для текущей погоды и прогноза на 5 дней. Используется бесплатный API [Open-Meteo](https://open-meteo.com/) без API-ключа.

## Запуск

Нужны Node.js 20+ и npm.

```bash
npm install
npm start -- --city Москва
npm start -- --city Москва --forecast
npm start -- --add-favorite Казань
npm start -- --favorites
```

Для проверки TypeScript: `npm run typecheck`. Данные избранных городов сохраняются локально в домашней папке пользователя.

## Состав

- `index.ts` — разбор команд и вывод в консоль.
- `api.ts` — геокодирование и прогноз Open-Meteo.
- `formatter.ts` — форматирование погодных данных.
- `storage.ts` — сохранение избранных городов.
- `package.json` и `tsconfig.json` — зависимости и сборка.

Для получения погоды требуется интернет. Установку и работу во всех операционных системах пока не проверяли.

---

Автор: legenda  
Telegram: [@LEGENDA_SD](https://t.me/LEGENDA_SD)
