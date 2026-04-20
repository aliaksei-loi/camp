import type { Metadata } from "next";

import { CmsImage } from "@/components/CmsImage";
import { getTeamMembers } from "@/lib/payload/fetchers";

export const metadata: Metadata = {
  title: "Belcreation — о нас",
};

export default async function AboutPage() {
  const team = await getTeamMembers();

  return (
    <>
      <section className="about-hero" data-screen-label="01 О нас — заголовок">
        <span className="eyebrow">★ о нас ★</span>
        <h1>
          Мы — это семья, <span className="inline-img" data-ph="kids" data-seed="71" /> которая однажды
          <br />
          поехала в лес и забыла <span className="inline-img" data-ph="campfire" data-seed="72" /> вернуться.
        </h1>
        <p>Belcreation вырос из отпуска 2019 года, который затянулся на семь лет.</p>
      </section>

      <div className="about-photo">
        <div className="about-photo-card" data-ph="lake" data-seed="70">
          <div className="stripes-overlay" />
          <div className="caption-sticker">первое лето, 2019</div>
        </div>
      </div>

      <section className="story" data-screen-label="02 История">
        <h3>Как всё началось.</h3>
        <p>
          Летом 2019-го Катя и Артём уехали с двумя детьми на Нарочь на две недели. Поставили палатку, сварили суп,
          посидели у костра. Потом пришли друзья. Потом — друзья друзей. К концу августа вокруг костра сидело 20
          человек, и все говорили: «а давайте ещё в следующем году».
        </p>
        <p className="pull">
          Оказалось, что взрослым тоже очень нужны каникулы. Такие, чтобы не было расписания, не было wi-fi и никто не
          спрашивал, чем накормить ребёнка.
        </p>
        <h3>Что мы делаем сейчас.</h3>
        <p>
          Belcreation — это <em>шесть смен по 10 дней</em> каждое лето, на берегу озера Нарочь. У нас 40 палаток и
          домиков, команда из 14 человек, два повара, ботаник, инструктор по каноэ и детская команда из педагогов, а не
          аниматоров.
        </p>
        <p>
          Мы не хотим быть отелем. Мы хотим быть местом, где дети учатся собирать чернику, а родители —{" "}
          <em>не делать ничего</em> и не чувствовать за это вину.
        </p>
        <h3>Чего мы не делаем.</h3>
        <p>
          У нас нет анимации в костюмах, аквапарка, мини-клуба и «шведского стола». У нас нет коучинговых программ,
          бизнес-завтраков и нетворкинга. Если вы ищете отель — нам не по пути, и это честно.
        </p>
      </section>

      <section className="values" data-screen-label="03 Принципы">
        <div className="values-inner">
          <div className="values-head">
            <p className="eyebrow">★ во что мы верим ★</p>
            <h2>Четыре простых принципа.</h2>
          </div>
          <div className="values-grid">
            <Value num={1} title={["Медленно — это", "нормально."]}
              text="Дети имеют право скучать. Родители — просто сидеть на одеяле и молчать. У нас нет «обязательной программы» — всё добровольно." />
            <Value num={2} title={["Природа учит", "лучше экрана."]}
              text="Wi-fi — только в лаундже, 18:00–22:00. В остальное время — живые костры, мокрый мох под ногами и первые светлячки." />
            <Value num={3} title={["Малое — значит", "уютное."]}
              text="Мы берём 80 человек за смену, не больше. К четвёртому дню все знают друг друга по имени. К десятому — обнимаются на прощание." />
          </div>
        </div>
      </section>

      <section className="team-band" data-screen-label="04 Команда">
        <div className="team-inner">
          <div className="team-head">
            <p className="eyebrow">★ кто мы ★</p>
            <h2>Команда Belcreation.</h2>
          </div>
          <div className="team-grid">
            {team.map((m, i) => {
              const photo = typeof m.photo === "object" ? m.photo : null;
              return (
                <div key={m.id} className="team-card">
                  <div className="team-img" data-ph="kids" data-seed={81 + i}>
                    <CmsImage media={photo} fill sizes="280px" />
                  </div>
                  <div className="team-body">
                    <h4 className="team-name">{m.name}</h4>
                    <div className="team-role">{m.role}</div>
                    <p className="team-bio">{m.bio}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="numbers" data-screen-label="05 Цифры">
        <div className="numbers-inner">
          <Number val="7" label="лет в лесу" />
          <Number val="1 802" label="семьи у нас побывали" />
          <Number val="76 %" label="возвращаются на второе лето" />
          <Number val="0" label="wi-fi-роутеров в палатках" />
        </div>
      </section>

      <section className="manifesto" data-screen-label="06 Манифест">
        <div className="manifesto-inner">
          мы не делаем <span>отпуск мечты</span>.<br />
          мы делаем <span>лето, которое помнится</span>,<br />
          когда через десять лет ваш ребёнок
          <br />
          будет рассказывать <span>«а помнишь, как мы тогда…»</span>.
        </div>
      </section>
    </>
  );
}

function Value({ num, title, text }: { num: number; title: [string, string]; text: string }) {
  return (
    <div className="value-card">
      <div className="value-num">{num}</div>
      <h4>
        {title[0]}
        <br />
        {title[1]}
      </h4>
      <p>{text}</p>
    </div>
  );
}

function Number({ val, label }: { val: string; label: string }) {
  return (
    <div className="num-card">
      <div className="num-val">{val}</div>
      <div className="num-lbl">{label}</div>
    </div>
  );
}
