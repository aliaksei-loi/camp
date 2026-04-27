import { draftMode } from "next/headers";

import { LivePreviewRefresh } from "@/components/LivePreviewRefresh";
import { getBookingPage } from "@/lib/payload/fetchers";

import { BookingForm } from "./BookingForm";

export default async function BookingPage() {
  const [{ isEnabled: isDraft }, page] = await Promise.all([draftMode(), getBookingPage()]);

  const periodLabel = page.periodLabel ?? "";
  const periodSub = page.periodSub ?? "";
  const heroIntro = page.heroIntro ?? "";
  const consentText =
    page.consentText ??
    "Согласен с условиями участия и политикой обработки персональных данных.";

  return (
    <>
      {isDraft && <LivePreviewRefresh />}

      <section className="booking-hero stripes" data-screen-label="01 Registration Hero">
        <div className="booking-hero-inner">
          <span className="eyebrow">★ регистрация на кемп ★</span>
          <h1>
            Зарегистрируйтесь
            <br />
            на Belcreation.
          </h1>
          {heroIntro && <p>{heroIntro}</p>}
        </div>
      </section>

      <BookingForm
        periodLabel={periodLabel}
        periodSub={periodSub}
        consentText={consentText}
      />
    </>
  );
}
