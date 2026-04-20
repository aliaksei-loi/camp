import Link from "next/link";

export function Footer() {
  return (
    <>
      <section className="cta-strip">
        <h3>Лес уже ждёт. Присоединяйтесь.</h3>
        <p>
          Каждое лето у нас 6 смен, и места всегда заканчиваются к маю. Зарегистрируйтесь на свою смену прямо сейчас —
          даже если ещё не выбрали даты.
        </p>
        <Link href="/booking" className="btn cream lg">
          Зарегистрироваться
        </Link>
      </section>
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">belcreation</div>
            <p style={{ maxWidth: 360, opacity: 0.8, fontSize: 14 }}>
              Семейный кемпинг на берегу озера. Три смены в июне, три в июле-августе. Палатки, домики, костры, долгие
              разговоры под звёздами.
            </p>
          </div>
          <div>
            <h4>Навигация</h4>
            <ul>
              <li>
                <Link href="/">Главная</Link>
              </li>
              <li>
                <Link href="/about">О нас</Link>
              </li>
              <li>
                <Link href="/#accom">Размещение</Link>
              </li>
              <li>
                <Link href="/booking">Регистрация</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Контакты</h4>
            <ul>
              <li>+375 29 123 45 67</li>
              <li>hello@belcreation.camp</li>
              <li>Минская обл., оз. Нарочь</li>
            </ul>
          </div>
          <div>
            <h4>Мы в сети</h4>
            <ul>
              <li>Telegram</li>
              <li>Instagram</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 BELCREATION CAMP · СДЕЛАНО С ЛЮБОВЬЮ</span>
          <span>★ МИНСК — НАРОЧЬ ★</span>
        </div>
      </footer>
    </>
  );
}
