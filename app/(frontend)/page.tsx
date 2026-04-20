import Link from "next/link";

import { CmsImage } from "@/components/CmsImage";
import {
  getActivities,
  getFaqs,
  getLodges,
  getPlans,
  getReviews,
  getShifts,
} from "@/lib/payload/fetchers";

export default async function HomePage() {
  const [faqs, activities, shifts, plans, lodges, reviews] = await Promise.all([
    getFaqs(),
    getActivities(),
    getShifts(),
    getPlans(),
    getLodges(),
    getReviews(),
  ]);

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
            {lodges.map((l, i) => {
              const image = typeof l.image === "object" ? l.image : null;
              const tagStyle =
                l.tagBg || l.tagColor
                  ? { background: l.tagBg ?? undefined, color: l.tagColor ?? undefined }
                  : undefined;
              return (
                <div key={l.id} className="lodge">
                  <div className="lodge-img" data-ph={l.mood ?? "tent"} data-seed={11 + i}>
                    <CmsImage media={image} fill sizes="400px" />
                    {l.tag && (
                      <span className="lodge-tag" style={tagStyle}>
                        {l.tag}
                      </span>
                    )}
                  </div>
                  <div className="lodge-body">
                    <h4 className="lodge-name">{l.name}</h4>
                    <p className="lodge-meta">{l.meta}</p>
                    <div className="lodge-price">
                      <strong>{l.price}</strong>
                      <span className="lodge-link">Выбрать</span>
                    </div>
                  </div>
                </div>
              );
            })}
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
            {shifts.map((s) => (
              <Shift
                key={s.id}
                num={s.num}
                dates={[s.datesLine1, s.datesLine2]}
                theme={s.theme}
                spotsTotal={s.spotsTotal ?? 42}
                left={s.spotsLeft ?? 0}
                soldOut={s.soldOut ?? false}
              />
            ))}
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
            {plans.map((p) => (
              <Plan
                key={p.id}
                eyebrow={p.eyebrow}
                name={p.name}
                price={p.price}
                perUnit={p.perUnit ?? "р / человек"}
                nights={p.nights ?? "за смену · 10 дней"}
                items={p.items.map((i) => i.text)}
                featured={p.featured ?? false}
                btnClass={p.btnClass ?? undefined}
              />
            ))}
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
            {reviews.map((r, i) => {
              const avatar = typeof r.authorPhoto === "object" ? r.authorPhoto : null;
              const stars = "★".repeat(r.rating ?? 5);
              return (
                <div key={r.id} className="review">
                  <div className="review-stars">{stars}</div>
                  <p className="review-text">{r.text}</p>
                  <div className="review-author">
                    <div className="review-avatar" data-ph={r.mood ?? "kids"} data-seed={51 + i}>
                      <CmsImage media={avatar} fill sizes="64px" />
                    </div>
                    <div>
                      <div className="review-name">{r.authorName}</div>
                      <div>{r.authorMeta}</div>
                    </div>
                  </div>
                </div>
              );
            })}
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

type ShiftProps = {
  num: number;
  dates: [string, string];
  theme: string;
  spotsTotal: number;
  left: number;
  soldOut: boolean;
};

function Shift({ num, dates, theme, spotsTotal, left, soldOut }: ShiftProps) {
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
        <span>{spotsTotal} мест</span>
        {soldOut ? <span className="spots-sold">sold out</span> : <span className="spots-left">свободно {left}</span>}
      </div>
    </div>
  );
}

type PlanProps = {
  eyebrow: string;
  name: string;
  price: string;
  perUnit?: string;
  nights?: string;
  items: string[];
  featured?: boolean;
  btnClass?: string;
};

function Plan({ eyebrow, name, price, perUnit, nights, items, featured, btnClass }: PlanProps) {
  return (
    <div className={`plan ${featured ? "featured" : ""}`}>
      {featured && <span className="plan-ribbon">★ любимый выбор</span>}
      <div className="plan-eyebrow">{eyebrow}</div>
      <h3 className="plan-name">{name}</h3>
      <div className="plan-price">
        {price} <span>{perUnit ?? "р / человек"}</span>
      </div>
      <div className="plan-nights">{nights ?? "за смену · 10 дней"}</div>
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
