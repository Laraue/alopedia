<template>
  <div class="container page">
    <h1 class="title">Политика конфиденциальности</h1>
    <p class="updated">Действует с {{ date }}</p>

    <div class="text">
      <p>
        Эта политика объясняет, какие данные собирает сайт {{ siteName }} (alopedia.org), зачем и
        как вы можете этим управлять.
      </p>

      <h2>Кто обрабатывает данные</h2>
      <p>
        Персональные данные обрабатывает владелец сайта alopedia.org (далее — «мы»). По всем вопросам
        об обработке данных пишите на
        <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>.
      </p>

      <h2>Какие данные мы собираем</h2>
      <p>
        На сайте нет регистрации и форм: мы не просим вас указывать имя, телефон, адрес электронной
        почты или сведения о здоровье.
      </p>
      <p>При посещении сайта сервис Яндекс Метрика получает:</p>
      <ul>
        <li>cookie-файлы с обезличенным идентификатором браузера;</li>
        <li>IP-адрес и приблизительное местоположение по нему;</li>
        <li>сведения об устройстве и браузере;</li>
        <li>адреса просмотренных страниц, источник перехода, время и действия на сайте.</li>
      </ul>
      <p>
        Запись сеансов (Вебвизор) отключена. Мы видим только общую статистику и не можем установить
        вашу личность.
      </p>
      <p>
        Кроме того, веб-сервер для работы и защиты сайта ведёт технические журналы с IP-адресом и
        временем запросов. Сайт работает через сеть Cloudflare, которая обрабатывает запросы к нему.
      </p>

      <h2>Зачем</h2>
      <ul>
        <li>понимать, какие статьи читают и какие темы нужны;</li>
        <li>находить и исправлять ошибки на сайте;</li>
        <li>обеспечивать работу и безопасность сайта.</li>
      </ul>

      <h2>На каком основании</h2>
      <p>
        Ваше согласие на использование cookie и сбор статистики, которое вы даёте, продолжая
        пользоваться сайтом после уведомления о cookie. Отозвать его можно способами из раздела ниже.
      </p>

      <h2>Кому передаются данные</h2>
      <p>
        Данные статистики обрабатывает ООО «Яндекс» по
        <a
          href="https://yandex.ru/legal/metrica_termsofuse/"
          rel="noopener noreferrer"
          target="_blank"
          >условиям использования Яндекс Метрики</a
        >. Больше никому мы данные не передаём и не продаём.
      </p>

      <h2>Как управлять cookie</h2>
      <ul>
        <li>удалить cookie и запретить их можно в настройках браузера;</li>
        <li>
          отключить Яндекс Метрику на всех сайтах можно
          <a
            href="https://yandex.ru/support/metrica/general/opt-out.html"
            rel="noopener noreferrer"
            target="_blank"
            >блокировщиком от Яндекса</a
          >.
        </li>
      </ul>

      <h2>Ваши права</h2>
      <p>
        Вы можете отозвать согласие, узнать, какие данные о вас обрабатываются, и потребовать их
        удаления. Напишите на <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a> — мы ответим
        в течение 10 рабочих дней.
      </p>

      <h2>Изменения</h2>
      <p>
        Мы можем обновлять эту политику. Актуальная версия всегда на этой странице, дата вверху
        показывает, когда она вступила в силу.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#app'
import { contactEmail, privacyPolicyDate, siteName } from '#layers/core/app/constants/site'

// A calendar day, shown as written in any timezone.
const date = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long', timeZone: 'UTC' }).format(
  new Date(privacyPolicyDate),
)

useSeoMeta({
  description: `Какие данные собирает сайт ${siteName}, зачем и как управлять cookie.`,
  title: 'Политика конфиденциальности',
})
</script>

<style scoped>
.page {
  padding-top: var(--space-8);
}

.title {
  font-size: clamp(1.75rem, 4vw, var(--font-size-4xl));
  letter-spacing: -0.02em;
}

.updated {
  color: var(--color-faint);
  font-size: var(--font-size-sm);
  margin-top: var(--space-3);
}

.text {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-article);
  margin-top: var(--space-8);
  max-width: var(--article-max-width);
}

.text h2 {
  font-size: var(--font-size-2xl);
  margin: var(--space-10) 0 var(--space-3);
}

.text p,
.text ul {
  margin-bottom: var(--space-4);
}

.text ul {
  padding-left: var(--space-6);
}

.text li {
  margin: var(--space-1) 0;
}

.text a {
  color: var(--color-accent-text);
  text-underline-offset: 3px;
}

</style>
