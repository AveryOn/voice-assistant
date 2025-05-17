




## Структура проекта

```bash
VOICE-ASSISTANT/
├── data/
│   └── input.txt         #  Текст для озвучивания voicer-over
├── node_modules/
├── src/
│   ├── cli/
│   │   ├── menu.ts
│   │   └── utils.ts
│   └── modules/
│       ├── voice-over/    # модуль озвучки (текст -> аудио)
│       └── voice-parser/  # модуль парсер (аудио -> текст)
├── scripts/
│   ├── start-record.sh
│   └── stop-record.sh
├── index.ts
```