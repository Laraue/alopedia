# Working rules

- Never run `pnpm install`, `pnpm i`, or `pnpm add`; the user installs dependencies.
- Don't run any commands to run checks until I ask you to.
- Do not use the `in` operator for runtime checks or type narrowing. Use a typed discriminator,
  status field, or an explicit type-safe helper instead.
- Everything a visitor sees is in Russian. Section URLs are English, content slugs are Russian
  transliteration (see ARCHITECTURE.md).
- Medical content: no dosing advice beyond the official labeling, cite sources, every medical page
  shows the disclaimer.
