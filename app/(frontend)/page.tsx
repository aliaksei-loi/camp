import Link from "next/link";

import { getActivities, getFaqs } from "@/lib/payload/fetchers";

export default async function HomePage() {
  const [faqs, activities] = await Promise.all([getFaqs(), getActivities()]);

  return (
    <>
      {/* HERO */}
      <section className="hero hero-v1" data-screen-label="01 Hero">
        <div className="hero-card">
          <div className="hero-photo stripes">
            <div
              data-ph="tent"
              data-seed="3"
              style={{
                position: "absolute",
                inset: 0,
                backgroundSize: "cover",
                backgroundPosition: "center",
                mixBlendMode: "multiply",
                opacity: 0.82,
              }}
            />
          </div>
          <div className="hero-right">
            <span className="hero-tag">✦ семейный кемпинг у озера ✦</span>
            <h1 className="hero-title">
              лето,
              <br />
              костёр &amp;<br />
              босиком.
            </h1>
            <p className="hero-desc">
              Belcreation — это три недели в лесу для всей семьи. Палатки на берегу Нарочи, завтрак на траве, сотни
              звёзд, программы для детей и ни одного будильника. Ничего лишнего — только лето.
            </p>
            <div className="hero-ctas">
              <Link href="/booking" className="btn">
                Зарегистрироваться на смену
              </Link>
              <Link href="#accom" className="btn ghost">
                Посмотреть домики →
              </Link>
            </div>
          </div>
          <div className="hero-sticker">
            <div className="sticker">
              Места
              <br />
              на лето
              <br />— 40%
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="intro belt" data-screen-label="02 Intro">
        <div className="container">
          <p className="eyebrow">новая парадигма отдыха</p>
          <h2 className="intro-head">
            Мы собираем семьи{" "}
            <svg width="44" height="44" style={{ verticalAlign: "-10px" }}>
              <use href="#ic-tent" />
            </svg>{" "}
            у костра, на берегу озера{" "}
            <svg width="44" height="44" style={{ verticalAlign: "-10px" }}>
              <use href="#ic-canoe" />
            </svg>{" "}
            и отпускаем их обратно в город немного счастливее.
          </h2>
          <p className="intro-sub">
            6 смен по 10 дней · палатки, домики и глэмпинг · занятия для детей от 3 до 16 · свободное расписание для
            родителей · никакого wi-fi в лесу, только в лаундже.
          </p>

          <div className="quiz-box">
            <span className="quiz-pill">прежде чем листать дальше</span>
            <h3 className="quiz-title">Не уверены, что кемпинг подойдёт вашей семье?</h3>
            <Link href="#faq" className="btn">
              Пройти короткий тест
            </Link>
            <svg className="arrow-left" viewBox="0 0 120 80" fill="none">
              <path
                d="M4 12 C 30 8 60 28 84 50 C 92 58 100 62 110 60"
                stroke="#B94A2A"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="2 6"
              />
              <path
                d="M104 68 L 112 60 L 104 54"
                stroke="#B94A2A"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <svg className="arrow-right" viewBox="0 0 120 80" fill="none">
              <path
                d="M4 12 C 30 8 60 28 84 50 C 92 58 100 62 110 60"
                stroke="#B94A2A"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="2 6"
              />
              <path
                d="M104 68 L 112 60 L 104 54"
                stroke="#B94A2A"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="band" style={{ background: "var(--c-lemon)" }} data-screen-label="03 Три столпа">
        <p className="band-title">★ что мы делаем лучше всего ★</p>
        <div className="cards-grid">
          <div className="card">
            <svg className="card-icon" viewBox="0 0 64 64">
              <use href="#ic-tent" />
            </svg>
            <div className="card-eyebrow">домики и палатки</div>
            <h3 className="card-title">
              Место,
              <br />
              которое пахнет сосной
            </h3>
            <p className="card-text">
              Четыре типа размещения — от классической палатки до утеплённого домика с печкой. Мы сами выбрали каждое
              место, проверили каждый матрас, и на каждой лужайке оставили немного дикости.
            </p>
            <Link href="#accom" className="btn ghost">
              Смотреть →
            </Link>
          </div>
          <div className="card" style={{ background: "var(--c-blue)" }}>
            <svg className="card-icon" viewBox="0 0 64 64">
              <use href="#ic-fire" />
            </svg>
            <div className="card-eyebrow">программы</div>
            <h3 className="card-title">
              Дни, которые
              <br />
              не забываются
            </h3>
            <p className="card-text">
              Утренние заплывы, керамика, сбор трав, вечерние сказки, ночные кинопросмотры. Есть программа для детей
              3–6, 7–11, подростков 12–16 и раздельная — для взрослых.
            </p>
            <Link href="#activities" className="btn ghost">
              Активности →
            </Link>
          </div>
          <div className="card" style={{ background: "var(--c-salmon)" }}>
            <svg className="card-icon" viewBox="0 0 64 64">
              <use href="#ic-heart" />
            </svg>
            <div className="card-eyebrow">комьюнити</div>
            <h3 className="card-title">
              Люди,
              <br />
              которых хочется обнять
            </h3>
            <p className="card-text">
              Мы собираем не больше 80 человек за смену. Достаточно, чтобы было весело. Мало, чтобы каждого запомнить по
              имени. К концу недели — новые друзья у вашего ребёнка и у вас.
            </p>
            <Link href="/about" className="btn ghost">
              О нас →
            </Link>
          </div>
        </div>
      </section>

      {/* ACCOMMODATIONS */}
      <section className="accom" id="accom" data-screen-label="04 Размещение">
        <div className="accom-inner">
          <div className="accom-head">
            <div>
              <p className="eyebrow">где вы будете спать</p>
              <h2 className="accom-title">
                Размещение
                <br />
                на четыре лада.
              </h2>
            </div>
            <p className="accom-desc">
              Выбирайте по настроению: от простой палатки «как в детстве» до домика с печкой и душем. Бельё, спальники и
              подушки — мы.
            </p>
          </div>
          <div className="accom-grid">
            <Lodge mood="tent" seed={11} name="Палатка «Сосна»" meta="до 4 человек · деревянный настил · матрасы-пенка" price="от 140 р / ночь" tag="★ Популярно" />
            <Lodge mood="lake" seed={12} name="Глэмпинг «Озеро»" meta="до 3 человек · кровать, свет, розетка · у воды" price="от 210 р / ночь" />
            <Lodge mood="forest" seed={13} name="Домик «Грибок»" meta="до 5 человек · печка-буржуйка · душ рядом" price="от 280 р / ночь" />
            <Lodge
              mood="sunset"
              seed={14}
              name="Шатёр «Большая семья»"
              meta="до 8 человек · высокие стены · отдельная зона"
              price="от 360 р / ночь"
              tag="Новое"
              tagStyle={{ background: "var(--c-lime)", color: "var(--c-rust)" }}
            />
            <Lodge mood="dune" seed={15} name="Домик-студия «Тишина»" meta="для двоих · свой санузел · вид на рассвет" price="от 320 р / ночь" />
            <Lodge mood="meadow" seed={16} name="Своя палатка" meta="место под собственную палатку · вода и душ" price="от 60 р / ночь" />
          </div>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section className="activities" id="activities" data-screen-label="05 Активности">
        <div className="activities-inner">
          <div className="activities-head">
            <p className="eyebrow">★ чем занят день ★</p>
            <h2>
              Маленькие приключения,
              <br />
              большие воспоминания.
            </h2>
          </div>
          <div className="act-grid">
            {activities.map((a) => (
              <Activity key={a.id} icon={a.icon} name={a.name} desc={a.description} />
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="schedule" id="schedule" data-screen-label="06 Смены">
        <div className="schedule-inner">
          <div className="schedule-head">
            <div>
              <p className="eyebrow">лето 2026</p>
              <h2>
                шесть смен.
                <br />
                выбирайте свою.
              </h2>
            </div>
            <Link href="/booking" className="btn cream">
              Зарегистрироваться
            </Link>
          </div>
          <div className="shifts">
            <Shift num={1} dates={["07 — 16", "июня"]} theme="Open smena — знакомство" left={6} />
            <Shift num={2} dates={["18 — 27", "июня"]} theme="Творческая — ремёсла" left={14} />
            <Shift num={3} dates={["29 июня —", "08 июля"]} theme="Водная — сапы, каноэ" left={3} />
            <Shift num={4} dates={["10 — 19", "июля"]} theme="Большая семейная" soldOut />
            <Shift num={5} dates={["21 — 30", "июля"]} theme="Музыкальная — квартирники" left={18} />
            <Shift num={6} dates={["01 — 10", "августа"]} theme="Дикая — походы и астро" left={22} />
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section className="gallery" id="gallery" data-screen-label="07 Галерея">
        <div className="gallery-inner">
          <div className="gallery-head">
            <p className="eyebrow">★ прошлое лето ★</p>
            <h2>
              Так выглядит один
              <br />
              обычный день у нас.
            </h2>
          </div>
          <div className="gallery-grid">
            <div className="g1" data-ph="lake" data-seed="31" />
            <div className="g2" data-ph="tent" data-seed="32" />
            <div className="g3" data-ph="campfire" data-seed="33" />
            <div className="g4" data-ph="meadow" data-seed="34" />
            <div className="g5" data-ph="forest" data-seed="35" />
            <div className="g6" data-ph="sunset" data-seed="36" />
            <div className="g7" data-ph="kids" data-seed="37" />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="pricing" data-screen-label="08 Цены">
        <div className="pricing-inner">
          <div className="pricing-head">
            <p className="eyebrow">★ пакеты ★</p>
            <h2>
              Цены,
              <br />
              от которых не больно.
            </h2>
            <p>
              Всё включено, без скрытых платежей: проживание, питание 3 раза в день, программы для детей, вечерние
              мероприятия, баня, чай с травами.
            </p>
          </div>
          <div className="plans">
            <Plan
              eyebrow="базовый"
              name="Палаточник"
              price="1 400"
              items={[
                "Палатка «Сосна» или своя",
                "Питание 3 раза в день",
                "Все программы и активности",
                "Костёр, баня, трансфер из Минска",
              ]}
              btnClass="ghost"
            />
            <Plan
              featured
              eyebrow="всё включено"
              name="Семейный"
              price="2 200"
              items={[
                "Глэмпинг или домик «Грибок»",
                "Всё из пакета «Палаточник»",
                "Детская программа с сопровождением",
                "Индивидуальная керамика + фото-пакет",
              ]}
            />
            <Plan
              eyebrow="с комфортом"
              name="Приватный"
              price="3 400"
              items={[
                "Студия «Тишина» или шатёр",
                "Всё из «Семейного»",
                "Персональный каноэ-тур на рассвете",
                "Массаж, сауна по расписанию",
              ]}
              btnClass="ghost"
            />
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews" data-screen-label="09 Отзывы">
        <div className="reviews-inner">
          <div className="reviews-head">
            <p className="eyebrow">★ пишут семьи ★</p>
            <h2>
              «Мы уже плачем
              <br />и хотим вернуться.»
            </h2>
          </div>
          <div className="reviews-grid">
            <Review
              text="Первый раз привезли детей в кемпинг — боялась, что будет тяжело. В итоге старший (9 лет) выучил имена всех деревьев, младшая (4) впервые ела суп сама. Мы вернёмся обязательно."
              mood="kids"
              seed={51}
              name="Алёна М."
              meta="Минск · 2 детей"
            />
            <Review
              text="Мы ездили втроём (я, муж, подросток). Думали — подростку будет скучно. Его первая фраза на обратной дороге: «Я хочу сюда в августе снова». Всё."
              mood="sunset"
              seed={52}
              name="Ирина П."
              meta="Гродно · семья"
            />
            <Review
              text="Отдельное спасибо команде — они заметили, что мой ребёнок стеснялся, и мягко подвели его к группе. К концу смены он вёл квест сам. Это дорогого стоит."
              mood="forest"
              seed={53}
              name="Денис К."
              meta="Брест · папа"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq" data-screen-label="10 FAQ">
        <div className="faq-inner">
          <div className="faq-head">
            <p className="eyebrow">★ вопросы и ответы ★</p>
            <h2>
              Что вы скорее всего
              <br />
              хотите спросить.
            </h2>
          </div>
          <div className="faq-list">
            {faqs.map((f) => (
              <Faq key={f.id} q={f.question} a={f.answer} open={f.open ?? false} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

type LodgeProps = {
  mood: string;
  seed: number;
  name: string;
  meta: string;
  price: string;
  tag?: string;
  tagStyle?: React.CSSProperties;
};

function Lodge({ mood, seed, name, meta, price, tag, tagStyle }: LodgeProps) {
  return (
    <div className="lodge">
      <div className="lodge-img" data-ph={mood} data-seed={seed}>
        {tag && (
          <span className="lodge-tag" style={tagStyle}>
            {tag}
          </span>
        )}
      </div>
      <div className="lodge-body">
        <h4 className="lodge-name">{name}</h4>
        <p className="lodge-meta">{meta}</p>
        <div className="lodge-price">
          <strong>{price}</strong>
          <span className="lodge-link">Выбрать</span>
        </div>
      </div>
    </div>
  );
}

function Activity({ icon, name, desc }: { icon: string; name: string; desc: string }) {
  return (
    <div className="act">
      <svg className="act-ico" viewBox="0 0 64 64">
        <use href={`#${icon}`} />
      </svg>
      <div className="act-name">{name}</div>
      <div className="act-desc">{desc}</div>
    </div>
  );
}

type ShiftProps = { num: number; dates: [string, string]; theme: string; left?: number; soldOut?: boolean };

function Shift({ num, dates, theme, left, soldOut }: ShiftProps) {
  return (
    <div className="shift">
      <div className="shift-num">{num}</div>
      <div className="shift-dates">
        {dates[0]}
        <br />
        {dates[1]}
      </div>
      <div className="shift-theme">{theme}</div>
      <div className="shift-spots">
        <span>42 места</span>
        {soldOut ? <span className="spots-sold">sold out</span> : <span className="spots-left">свободно {left}</span>}
      </div>
    </div>
  );
}

type PlanProps = {
  eyebrow: string;
  name: string;
  price: string;
  items: string[];
  featured?: boolean;
  btnClass?: string;
};

function Plan({ eyebrow, name, price, items, featured, btnClass }: PlanProps) {
  return (
    <div className={`plan ${featured ? "featured" : ""}`}>
      {featured && <span className="plan-ribbon">★ любимый выбор</span>}
      <div className="plan-eyebrow">{eyebrow}</div>
      <h3 className="plan-name">{name}</h3>
      <div className="plan-price">
        {price} <span>р / человек</span>
      </div>
      <div className="plan-nights">за смену · 10 дней</div>
      <ul className="plan-list">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
      <Link href="/booking" className={`btn ${btnClass ?? ""}`} style={{ width: "100%" }}>
        Выбрать пакет
      </Link>
    </div>
  );
}

type ReviewProps = { text: string; mood: string; seed: number; name: string; meta: string };

function Review({ text, mood, seed, name, meta }: ReviewProps) {
  return (
    <div className="review">
      <div className="review-stars">★★★★★</div>
      <p className="review-text">{text}</p>
      <div className="review-author">
        <div className="review-avatar" data-ph={mood} data-seed={seed} />
        <div>
          <div className="review-name">{name}</div>
          <div>{meta}</div>
        </div>
      </div>
    </div>
  );
}

function Faq({ q, a, open }: { q: string; a: string; open?: boolean }) {
  return (
    <details className="faq-item" open={open}>
      <summary>
        {q}
        <span className="faq-toggle">+</span>
      </summary>
      <div className="faq-body">{a}</div>
    </details>
  );
}
