import type { Metadata } from "next";
import { Fragment } from "react";

import { CmsImage } from "@/components/CmsImage";
import { getAboutPage, getTeamMembers } from "@/lib/payload/fetchers";

export const metadata: Metadata = {
  title: "Belcreation — о нас",
};

export default async function AboutPage() {
  const [about, team] = await Promise.all([getAboutPage(), getTeamMembers()]);

  const hero = about.hero ?? {};
  const photoCard = about.photoCard ?? {};
  const valuesHead = about.valuesHead ?? {};
  const teamHead = about.teamHead ?? {};
  const photoCardImage = typeof photoCard.image === "object" ? photoCard.image : null;

  return (
    <>
      <section className="about-hero" data-screen-label="01 О нас — заголовок">
        {hero.eyebrow && <span className="eyebrow">{hero.eyebrow}</span>}
        <h1>
          {hero.titlePart1}
          <span className="inline-img" data-ph="kids" data-seed="71" />
          {hero.titlePart2}
          <br />
          <span className="inline-img" data-ph="campfire" data-seed="72" />
          {hero.titlePart3}
        </h1>
        {hero.sub && <p>{hero.sub}</p>}
      </section>

      <div className="about-photo">
        <div className="about-photo-card" data-ph="lake" data-seed="70">
          <CmsImage media={photoCardImage} fill sizes="800px" />
          <div className="stripes-overlay" />
          {photoCard.caption && <div className="caption-sticker">{photoCard.caption}</div>}
        </div>
      </div>

      <section className="story" data-screen-label="02 История">
        {about.storySections.map((s) => (
          <Fragment key={s.id ?? s.heading}>
            <h3>{s.heading}</h3>
            {s.pullQuote && <p className="pull">{s.pullQuote}</p>}
            <p>{s.body}</p>
          </Fragment>
        ))}
      </section>

      <section className="values" data-screen-label="03 Принципы">
        <div className="values-inner">
          <div className="values-head">
            {valuesHead.eyebrow && <p className="eyebrow">{valuesHead.eyebrow}</p>}
            {valuesHead.title && <h2>{valuesHead.title}</h2>}
          </div>
          <div className="values-grid">
            {about.values.map((v) => (
              <Value
                key={v.id ?? v.num}
                num={v.num}
                titleLine1={v.titleLine1}
                titleLine2={v.titleLine2 ?? ""}
                text={v.text}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="team-band" data-screen-label="04 Команда">
        <div className="team-inner">
          <div className="team-head">
            {teamHead.eyebrow && <p className="eyebrow">{teamHead.eyebrow}</p>}
            {teamHead.title && <h2>{teamHead.title}</h2>}
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
          {about.numbers.map((n) => (
            <div key={n.id ?? n.value} className="num-card">
              <div className="num-val">{n.value}</div>
              <div className="num-lbl">{n.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="manifesto" data-screen-label="06 Манифест">
        <div className="manifesto-inner">
          {about.manifesto.map((seg, i) =>
            seg.emphasized ? (
              <span key={seg.id ?? i}>{seg.text}</span>
            ) : (
              <Fragment key={seg.id ?? i}>{renderWithBreaks(seg.text)}</Fragment>
            ),
          )}
        </div>
      </section>
    </>
  );
}

function renderWithBreaks(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => (
    <Fragment key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </Fragment>
  ));
}

function Value({
  num,
  titleLine1,
  titleLine2,
  text,
}: {
  num: number;
  titleLine1: string;
  titleLine2: string;
  text: string;
}) {
  return (
    <div className="value-card">
      <div className="value-num">{num}</div>
      <h4>
        {titleLine1}
        {titleLine2 && (
          <>
            <br />
            {titleLine2}
          </>
        )}
      </h4>
      <p>{text}</p>
    </div>
  );
}
