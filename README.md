# By Karanfilovski — Portfolio 2.0

Нова изработка на портфолиото на Luka Karanfilovski, врз основа на доставениот Next.js проект и одобрениот план.

## Што е вклучено

Почетна страница, пет главни case studies, дополнителен проект MoWo, Selected Marks, About, Contact, преглед на слики со тастатура, мобилна навигација, PDF профил, SEO metadata, social previews, sitemap и robots.

Главните case studies се FC Metalurg 2025, Orevce, Battery Evolution, Mono Alex и Merkur.

Сликите за Металург се преземени од јавните Instagram објави преку поврзаниот Windsor.ai пристап. Во `content/metalurg-posts.json` се зачувани јавните линкови, датумите и текстовите. Во самиот сајт сликите се локални, без зависност од привремени Instagram CDN адреси.

## Локално стартување

Потребен е Node.js 20.9 или понов. Препорачано: Node.js 22 LTS.

```bash
npm ci
npm run dev
```

Отвори ја адресата што ќе ја прикаже терминалот, обично `http://localhost:3000`.

## Продукциска проверка

```bash
npm run typecheck
npm run build
npm start
```

## GitHub и Vercel

Во коренот на GitHub repository треба да се наоѓаат `package.json`, `app`, `components`, `lib`, `content` и `public`.

Не прикачувај `node_modules`, `.next`, `.env` или привремени фајлови. `.gitignore` е вклучен.

На Vercel избери **Next.js**. Build command: `npm run build`. Output directory: стандардната Next.js поставка. Не се потребни environment variables за оваа изработка.

Доменот во SEO metadata е `https://www.bykaranfilovski.com`. Ако проектот добие друг главен домен, смени го `url` во `lib/site.ts`.

Овој проект е подготвен за GitHub. Не е поврзан со repository и не ја заменува автоматски постојната објавена верзија.

## Уредување содржина

- `lib/projects.ts`: текстови, редослед, слики и кредити за проектите.
- `lib/site.ts`: контакти, линкови и искуство.
- `app/globals.css`: визуелни правила и мобилен распоред.
- `public/projects`: оригинални визуели од доставените материјали и јавниот клубски профил.
- `content/media-dimensions.json`: димензии на сликите. При нова слика додади ги нејзините димензии.

Во `CONTENT_NOTES.md` се наведени изворите и неколкуте податоци што треба да се усогласат со точниот ангажман пред јавна објава.

## Контакт

Директните email, телефон и LinkedIn линкови се активни. Формуларот подготвува email во апликацијата на посетителот; не тврди дека испратил порака и не бара серверска email услуга. Копчето за копирање email работи преку clipboard на HTTPS и localhost.

Manrope се вчитува локално. Лиценцата е во `public/fonts/OFL.txt`.
