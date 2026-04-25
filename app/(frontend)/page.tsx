import { draftMode } from "next/headers";
import Link from "next/link";

import { CmsImage } from "@/components/CmsImage";
import { LivePreviewRefresh } from "@/components/LivePreviewRefresh";
import { ScheduleAccordion } from "@/components/ScheduleAccordion";
import {
  getActivities,
  getFaqs,
  getHome,
  getLodges,
  getReviews,
  getSchedule,
  getShifts,
} from "@/lib/payload/fetchers";

export default async function HomePage() {
  const [{ isEnabled: isDraft }, home, schedule, faqs, activities, shifts, lodges, reviews] = await Promise.all([
    draftMode(),
    getHome(),
    getSchedule(),
    getFaqs(),
    getActivities(),
    getShifts(),
    getLodges(),
    getReviews(),
  ]);

  const hero = home.hero ?? {};
  const intro = home.intro ?? {};
  const quizBox = home.quizBox ?? {};
  const pillarsBand = home.pillarsBand ?? { pillars: [] };
  const accomHead = home.accomHead ?? {};
  const activitiesHead = home.activitiesHead ?? {};
  const galleryStrip = home.galleryStrip ?? { tiles: [] };
  const reviewsHead = home.reviewsHead ?? {};
  const faqHead = home.faqHead ?? {};
  const vis = home.sectionVisibility ?? {};

  const heroImage = typeof hero.image === "object" ? hero.image : null;

  return (
    <>
      {isDraft && <LivePreviewRefresh />}
      {/* HERO */}
      <section className="hero hero-v1" data-screen-label="01 Hero">
        <div className="hero-card">
          <div className="hero-photo">
            <CmsImage
              media={heroImage}
              fill
              sizes="800px"
              fallback={
                <div
                  data-ph="tent"
                  data-seed="3"
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                />
              }
            />
          </div>
          <div className="hero-right">
            {hero.tag && <span className="hero-tag">{hero.tag}</span>}
            <h1 className="hero-title">
              {hero.titleLine1}
              {hero.titleLine2 && (
                <>
                  <br />
                  {hero.titleLine2}
                </>
              )}
              {hero.titleLine3 && (
                <>
                  <br />
                  {hero.titleLine3}
                </>
              )}
            </h1>
            {hero.description && <p className="hero-desc">{hero.description}</p>}
            <div className="hero-ctas">
              {hero.ctaPrimaryLabel && hero.ctaPrimaryHref && (
                <Link href={hero.ctaPrimaryHref} className="btn">
                  {hero.ctaPrimaryLabel}
                </Link>
              )}
              {hero.ctaSecondaryLabel && hero.ctaSecondaryHref && (
                <Link href={hero.ctaSecondaryHref} className="btn ghost">
                  {hero.ctaSecondaryLabel}
                </Link>
              )}
            </div>
          </div>
          {(hero.stickerLine1 || hero.stickerLine2 || hero.stickerLine3) && (
            <div className="hero-sticker">
              <div className="sticker">
                {hero.stickerLine1}
                {hero.stickerLine2 && (
                  <>
                    <br />
                    {hero.stickerLine2}
                  </>
                )}
                {hero.stickerLine3 && (
                  <>
                    <br />
                    {hero.stickerLine3}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* INTRO */}
      {!vis.hideIntro && (
      <section className="intro belt" data-screen-label="02 Intro">
        <div className="container">
          {intro.eyebrow && <p className="eyebrow">{intro.eyebrow}</p>}
          <h2 className="intro-head">
            {intro.headPart1}
            {intro.headIcon1 && (
              <>
                {" "}
                <svg width="44" height="44" style={{ verticalAlign: "-10px" }}>
                  <use href={`#${intro.headIcon1}`} />
                </svg>
              </>
            )}{" "}
            {intro.headPart2}
            {intro.headIcon2 && (
              <>
                {" "}
                <svg width="44" height="44" style={{ verticalAlign: "-10px" }}>
                  <use href={`#${intro.headIcon2}`} />
                </svg>
              </>
            )}{" "}
            {intro.headPart3}
          </h2>
          {intro.sub && <p className="intro-sub">{intro.sub}</p>}

          <div className="quiz-box">
            {quizBox.pill && <span className="quiz-pill">{quizBox.pill}</span>}
            {quizBox.title && <h3 className="quiz-title">{quizBox.title}</h3>}
            {quizBox.ctaLabel && quizBox.ctaHref && (
              <Link href={quizBox.ctaHref} className="btn">
                {quizBox.ctaLabel}
              </Link>
            )}
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

      )}

      {/* THREE PILLARS */}
      {!vis.hidePillars && (
      <section className="band" style={{ background: "var(--c-lemon)" }} data-screen-label="03 Три столпа">
        {pillarsBand.title && <p className="band-title">{pillarsBand.title}</p>}
        <div className="cards-grid">
          {pillarsBand.pillars.map((p, i) => (
            <div
              key={p.id ?? i}
              className="card"
              style={p.bgColor ? { background: p.bgColor } : undefined}
            >
              {p.icon && (
                <svg className="card-icon" viewBox="0 0 64 64">
                  <use href={`#${p.icon}`} />
                </svg>
              )}
              {p.eyebrow && <div className="card-eyebrow">{p.eyebrow}</div>}
              <h3 className="card-title">
                {p.titleLine1}
                {p.titleLine2 && (
                  <>
                    <br />
                    {p.titleLine2}
                  </>
                )}
              </h3>
              {p.text && <p className="card-text">{p.text}</p>}
              {p.ctaLabel && p.ctaHref && (
                <Link href={p.ctaHref} className="btn ghost">
                  {p.ctaLabel}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      )}

      {/* ACCOMMODATIONS */}
      {!vis.hideAccom && (
      <section className="accom" id="accom" data-screen-label="04 Размещение">
        <div className="accom-inner">
          <div className="accom-head">
            <div>
              {accomHead.eyebrow && <p className="eyebrow">{accomHead.eyebrow}</p>}
              <h2 className="accom-title">
                {accomHead.titleLine1}
                {accomHead.titleLine2 && (
                  <>
                    <br />
                    {accomHead.titleLine2}
                  </>
                )}
              </h2>
            </div>
            {accomHead.description && <p className="accom-desc">{accomHead.description}</p>}
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

      )}

      {/* ACTIVITIES */}
      {!vis.hideActivities && (
      <section className="activities" id="activities" data-screen-label="05 Активности">
        <div className="activities-inner">
          <div className="activities-head">
            {activitiesHead.eyebrow && <p className="eyebrow">{activitiesHead.eyebrow}</p>}
            <h2>
              {activitiesHead.titleLine1}
              {activitiesHead.titleLine2 && (
                <>
                  <br />
                  {activitiesHead.titleLine2}
                </>
              )}
            </h2>
          </div>
          <div className="act-grid">
            {activities.map((a) => (
              <Activity key={a.id} icon={a.icon} name={a.name} desc={a.description} />
            ))}
          </div>
        </div>
      </section>

      )}

      {/* SCHEDULE */}
      {!vis.hideSchedule && (
      <section className="schedule" id="schedule" data-screen-label="06 Расписание">
        <div className="schedule-inner">
          <div className="schedule-head">
            <div>
              {schedule.eyebrow && <p className="eyebrow">{schedule.eyebrow}</p>}
              <h2>
                {schedule.titleLine1}
                {schedule.titleLine2 && (
                  <>
                    <br />
                    {schedule.titleLine2}
                  </>
                )}
              </h2>
            </div>
            <div className="schedule-head-right">
              {schedule.periodLabel && (
                <p className="schedule-period">{schedule.periodLabel}</p>
              )}
              {schedule.ctaLabel && schedule.ctaHref && (
                <Link href={schedule.ctaHref} className="btn cream">
                  {schedule.ctaLabel}
                </Link>
              )}
            </div>
          </div>
          <ScheduleAccordion
            days={schedule.days ?? []}
            trackKidsLabel={schedule.trackKidsLabel ?? "Малыши"}
            trackOlderLabel={schedule.trackOlderLabel ?? "Старшие"}
          />
        </div>
      </section>

      )}

      {/* GALLERY STRIP */}
      {!vis.hideGallery && (
      <section className="gallery" id="gallery" data-screen-label="07 Галерея">
        <div className="gallery-inner">
          <div className="gallery-head">
            {galleryStrip.eyebrow && <p className="eyebrow">{galleryStrip.eyebrow}</p>}
            <h2>
              {galleryStrip.titleLine1}
              {galleryStrip.titleLine2 && (
                <>
                  <br />
                  {galleryStrip.titleLine2}
                </>
              )}
            </h2>
          </div>
          <div className="gallery-grid">
            {galleryStrip.tiles.map((tile, i) => {
              const image = typeof tile.image === "object" ? tile.image : null;
              const cls = `g${i + 1}`;
              return (
                <div
                  key={tile.id ?? i}
                  className={cls}
                  data-ph={tile.mood ?? "lake"}
                  data-seed={31 + i}
                  style={{ position: "relative" }}
                >
                  <CmsImage media={image} fill sizes="400px" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      )}

      {/* REVIEWS */}
      {!vis.hideReviews && (
      <section className="reviews" data-screen-label="09 Отзывы">
        <div className="reviews-inner">
          <div className="reviews-head">
            {reviewsHead.eyebrow && <p className="eyebrow">{reviewsHead.eyebrow}</p>}
            <h2>
              {reviewsHead.titleLine1}
              {reviewsHead.titleLine2 && (
                <>
                  <br />
                  {reviewsHead.titleLine2}
                </>
              )}
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

      )}

      {/* FAQ */}
      {!vis.hideFaq && (
      <section className="faq" id="faq" data-screen-label="10 FAQ">
        <div className="faq-inner">
          <div className="faq-head">
            {faqHead.eyebrow && <p className="eyebrow">{faqHead.eyebrow}</p>}
            <h2>
              {faqHead.titleLine1}
              {faqHead.titleLine2 && (
                <>
                  <br />
                  {faqHead.titleLine2}
                </>
              )}
            </h2>
          </div>
          <div className="faq-list">
            {faqs.map((f) => (
              <Faq key={f.id} q={f.question} a={f.answer} open={f.open ?? false} />
            ))}
          </div>
        </div>
      </section>
      )}
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
