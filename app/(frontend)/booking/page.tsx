"use client";

import Link from "next/link";
import { useState } from "react";

const INTERESTS = [
  "Гончарка",
  "Музыка у костра",
  "Баня",
  "Байдарки",
  "Йога",
  "Лесные мастерские",
  "Детская программа",
  "Тишина и чтение",
];

const SOURCES = ["Instagram", "Рекомендация друзей", "Telegram", "Поисковик", "Другое"];

type Form = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  adults: number;
  kids: number;
  babies: number;
  interests: Set<string>;
  notes: string;
  source: string;
};

export default function BookingPage() {
  const [form, setForm] = useState<Form>({
    name: "",
    surname: "",
    email: "",
    phone: "",
    adults: 1,
    kids: 0,
    babies: 0,
    interests: new Set(),
    notes: "",
    source: SOURCES[0],
  });
  const [submitted, setSubmitted] = useState(false);

  const step = (k: "adults" | "kids" | "babies", dir: number) => {
    setForm((f) => {
      const next = Math.max(0, f[k] + dir);
      return { ...f, [k]: k === "adults" ? Math.max(1, next) : next };
    });
  };

  const toggleInterest = (i: string) => {
    setForm((f) => {
      const interests = new Set(f.interests);
      if (interests.has(i)) interests.delete(i);
      else interests.add(i);
      return { ...f, interests };
    });
  };

  const total = form.adults + form.kids + form.babies;

  return (
    <>
      <section className="booking-hero stripes" data-screen-label="01 Registration Hero">
        <div className="booking-hero-inner">
          <span className="eyebrow">★ регистрация на кемп ★</span>
          <h1>
            Зарегистрируйтесь
            <br />
            на Belcreation.
          </h1>
          <p>
            Одна регистрация — участие в кемпе на все 24 дня. Никаких смен и пакетов: единая программа, общая атмосфера,
            одна большая палаточная семья. Оставьте анкету — мы свяжемся в течение часа.
          </p>
        </div>
      </section>

      <div className="booking-main">
        <div className="booking-wrap">
          <div className={`booking-form-col ${submitted ? "thanks-mode" : ""}`}>
            {submitted ? (
              <div className="thanks">
                <div className="big-sticker">
                  <svg width="64" height="64">
                    <use href="#ic-heart" />
                  </svg>
                </div>
                <h2>
                  ура, {form.name || "друг"}!
                  <br />
                  вы зарегистрированы
                </h2>
                <p>
                  Мы отправили подтверждение на <strong>{form.email || "your@mail.by"}</strong>. В течение часа пришлём
                  большое письмо: что взять, как добраться, программа первого дня, контакт куратора.
                </p>
                <div className="thanks-meta">
                  <div>
                    <div className="tm-lbl">Кемп</div>
                    <div className="tm-val">07 — 30 июня</div>
                  </div>
                  <div>
                    <div className="tm-lbl">Участники</div>
                    <div className="tm-val">{total} чел</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
                  <Link href="/" className="btn ghost">
                    На главную
                  </Link>
                  <Link href="/gallery" className="btn">
                    Полистать галерею
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="dates-band">
                  <svg width="40" height="40" style={{ flex: "none" }}>
                    <use href="#ic-tent" />
                  </svg>
                  <div style={{ flex: 1 }}>
                    <div className="big">07 июня — 30 июня 2026</div>
                    <div className="sm">24 дня у озера · приезд и отъезд в любой день · единая стоимость</div>
                  </div>
                </div>

                <div className="section-head">
                  <span className="num">1</span> Кто регистрируется
                </div>
                <p className="form-sub">
                  Контактное лицо — тот, с кем мы будем переписываться и высылать подтверждение.
                </p>
                <div className="field-row">
                  <div className="field">
                    <label>Имя</label>
                    <input
                      type="text"
                      autoComplete="given-name"
                      enterKeyHint="next"
                      placeholder="Алёна"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label>Фамилия</label>
                    <input
                      type="text"
                      autoComplete="family-name"
                      enterKeyHint="next"
                      placeholder="Маркевич"
                      value={form.surname}
                      onChange={(e) => setForm({ ...form, surname: e.target.value })}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field">
                    <label>Email</label>
                    <input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      enterKeyHint="next"
                      placeholder="you@mail.by"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label>Телефон / Telegram</label>
                    <input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      enterKeyHint="done"
                      placeholder="+375 29 123 45 67"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="section-head">
                  <span className="num">2</span> Сколько вас
                </div>
                <p className="form-sub">
                  Регистрируем всех, кто приедет вместе с вами. Семьи и компании — одной анкетой.
                </p>

                <Counter label="Взрослые" meta="от 17 лет" value={form.adults} onStep={(d) => step("adults", d)} />
                <Counter label="Дети" meta="3–16 лет" value={form.kids} onStep={(d) => step("kids", d)} />
                <Counter
                  label="Малыши"
                  meta="до 2 лет — бесплатно"
                  value={form.babies}
                  onStep={(d) => step("babies", d)}
                />

                <div className="section-head">
                  <span className="num">3</span> Что вас интересует
                </div>
                <p className="form-sub">
                  Отметьте направления — мы учтём это, когда будем собирать программу вашей недели.
                </p>
                <div className="chip-group">
                  {INTERESTS.map((i) => (
                    <label
                      key={i}
                      className={`chip ${form.interests.has(i) ? "on" : ""}`}
                      onClick={() => toggleInterest(i)}
                    >
                      <input type="checkbox" checked={form.interests.has(i)} readOnly /> {i}
                    </label>
                  ))}
                </div>

                <div className="field" style={{ marginTop: 22 }}>
                  <label>Особые пожелания (еда, аллергии, размещение)</label>
                  <textarea
                    rows={3}
                    placeholder="Например: приедем 12 июня на 10 дней, у сына аллергия на орехи, своя палатка"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  />
                </div>

                <div className="field">
                  <label>Откуда узнали о нас?</label>
                  <select
                    value={form.source}
                    onChange={(e) => setForm({ ...form, source: e.target.value })}
                  >
                    {SOURCES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="submit-row">
                  <p className="terms-line">
                    Нажимая «Зарегистрироваться», вы соглашаетесь с <a href="#">условиями участия</a>. Оплата участия —
                    при заезде, предоплата не требуется.
                  </p>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      setSubmitted(true);
                      requestAnimationFrame(() => {
                        const el = document.querySelector(".booking-main");
                        if (el instanceof HTMLElement) {
                          window.scrollTo({ top: el.offsetTop - 40, behavior: "smooth" });
                        }
                      });
                    }}
                  >
                    Зарегистрироваться ✦
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="booking-summary-col">
            <div className="summary-title">Ваша регистрация</div>
            <SumLine lbl="Кемп" val="Belcreation · лето 2026" />
            <SumLine lbl="Даты" val="07 июня — 30 июня" />
            <SumLine lbl="Длительность" val="до 24 дней" />
            <SumLine lbl="Участники" val={`${form.adults} взр · ${form.kids} дет · ${form.babies} мал`} />
            <SumLine lbl="Место" val="озеро Нарочь" />

            <div className="includes-title">в участие входит</div>
            <ul className="includes-list">
              <li>проживание на территории лагеря</li>
              <li>3-разовое питание у общего костра</li>
              <li>все активности и мастерские</li>
              <li>баня, сауна, лодки, байдарки</li>
              <li>трансфер из Минска по графику</li>
            </ul>

            <div className="summary-sticker">
              <svg width="36" height="36">
                <use href="#ic-heart" />
              </svg>
              <span>Отмена регистрации бесплатно до 1 мая. После — возвращаем 50%.</span>
            </div>
          </div>
        </div>

        <div className="trust-row">
          <TrustCard icon="ic-star" strong="4.9 / 5" span="по 312 отзывам" />
          <TrustCard icon="ic-tent" strong="7 лет" span="в кемпинге · 1 800 семей" />
          <TrustCard icon="ic-heart" strong="76%" span="возвращаются на второе лето" />
          <TrustCard icon="ic-leaf" strong="Эко-стандарт" span="без пластика, без спешки" />
        </div>
      </div>
    </>
  );
}

type CounterProps = { label: string; meta: string; value: number; onStep: (dir: number) => void };

function Counter({ label, meta, value, onStep }: CounterProps) {
  return (
    <div className="count-card">
      <div>
        <div className="c-name">{label}</div>
        <div className="c-meta">{meta}</div>
      </div>
      <div className="counter">
        <button type="button" onClick={() => onStep(-1)}>
          −
        </button>
        <span className="counter-val">{value}</span>
        <button type="button" onClick={() => onStep(1)}>
          +
        </button>
      </div>
    </div>
  );
}

function SumLine({ lbl, val }: { lbl: string; val: string }) {
  return (
    <div className="summary-line">
      <span className="lbl">{lbl}</span>
      <span className="val">{val}</span>
    </div>
  );
}

function TrustCard({ icon, strong, span }: { icon: string; strong: string; span: string }) {
  return (
    <div className="t-card">
      <svg width="44" height="44">
        <use href={`#${icon}`} />
      </svg>
      <strong>{strong}</strong>
      <span>{span}</span>
    </div>
  );
}
