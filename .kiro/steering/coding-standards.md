---
inclusion: auto
---

# Coding Standards

## Language Rules

### Code Comments and Logs
- All code comments MUST be written in English
- All console.log messages MUST be in English
- All error messages in code MUST be in English

### User Interface
- User-facing text can be in English or Polish only
- UI labels, buttons, and messages should be in Polish for Polish users
- Keep consistency within the same interface

### Chat Responses
- Always respond to the user in the same language they used in their question
- If user writes in Polish, respond in Polish
- If user writes in Russian, respond in Russian
- If user writes in English, respond in English
- Keep the natural conversation flow in the user's language

### Examples

Good:
```typescript
// Initialize tracking session
function getSessionId(): string {
  console.log('Getting session ID');
  // ...
}
```

Bad:
```typescript
// Инициализация сессии трекинга
function getSessionId(): string {
  console.log('Получаем session ID');
  // ...
}
```
