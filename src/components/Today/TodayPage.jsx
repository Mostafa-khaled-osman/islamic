import React, { useState, useEffect } from 'react';
import './TodayPage.css';

/* ── Assets from design ── */
const ASSETS = {
  heroCalligraphy: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByP9ea4K1U9NxTiQGI7a6bM1dXD0maf5adTUn5Gu9sPEeL2F_z9fYX8Y_r1P1TAI_2tIWQSg7ujx7u18g01dZC2Y68O-0OiRXZnGb5R8u3t1VSd8LTA_BL-qEWFCI-cGUqgKXmOPZnyPSKJuukR8YfJYUJobHu1SQFkwUhuRjlW6UMTjhTrQgpDEcv9KFemjVvRO-2dRPB99O_0I9eUCq46I7SnGjFQLAqAs6o3W0Lez9Xy8VPL6eylMBgNI4StTc5Qis6W0JWZsc',
  heroPattern: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRE-Gz-YfYWdMp1OmoRK8A7inpHEdZEyY54kAAJxNjdgdiuARiqayMxoeDpRSzNaaVMQogFMnRILsK-xI5_gqVE1g7-Na78oJbZNC5HEBe7T8RLaAkK48RdM9ByZQkxyfLxVXWnaHV6N-R4REh59pSc5oNBAXJvgQNaTQKM5qpU5JbJdFiN5-on2vhWI-JlKFfnEO0N3qo2ePejkrU6J9RLU5HAbOlIwue05AK0da0nm03NK1B3nzHsqRfs5Lq6JCp80NTqKz9Irs',
  cardPattern: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOhnQ8cHEKbSAtlGD6zJ8uhas8ePqInUv6M-bHi3zx38loJPB47CXaWPVlS3HuD0DFkJfWOA4OuL4Ce5n0P6Nw0mLKJRWlAylPr1r1jSgkZbL4vnKqpSE0Vk86oAeBSsKkzbIZ56m8jf1fSD-tFrHzL1bxHGSHKEkUFjUE8Tx63LQ0hIlSeuxJ53PEY-CdVJLYwtq_IbqPuv4QSmetTvBwFfHRENqfrtNbWT-IJhLD3aqmmKWnJFNyT3GufJcX26ub98Wpfko-cqU',
  icons: {
    ayah: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAapj5HUAfaImrW-YtDIbEIZxR2LQHk42gkzZyqqcvjJgDe368M67kkJE2jEWnlrUD46l_4N479Q9B_cNur2e3hc7b1q8voSPhFDZcFMLy2pie_dO4NjXFT7v4eiT17WAQxqKEzhoYkLYFAUlz6tPrpX8UEDt84I_0LmRxyZi93wXZnR9whjsc9SS3n-WtOqc5j7e56HH2ZoQNo4kO-j46V94KNIX8TEOKSkhB-TRfPZcjjBz1IFj6ifqHc-izIaIBLMojq07vWy2M',
    hadith: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmXttaXyYsJfbXsDvc6gtE1obw45LFYtUgT0wrQv_8rWB0htCzlBJXW8MVhMuY4wZmn17w9WeUsYdS77uS-fC6IVQqVnA8twdZ097vk5Hjtd_vhyLYGxQbm3yABRLlBEL3HOIv2pnH2NnmTbM3J1CjODAU5n8ZyJVgh9rSE73529wzKdi2j0K8PULAP6Z400TqPE_wyqUymvJpyFpx_QPBzUCsYuy3MG1mJ0Em2oxzlpF2aoGDD1tJZ33rDsBx4ZaxYYOy8ciXu4g',
    dhikr: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5uzIUTkOSdmrGAG-f_Sw8qSQ_nxNkJJgi5byCkZbGbEFJsKRCoDVIgPhEG6mcHdzbhQ8QPJrcCRtUxyNq1iE4_uCourn4UYtjYpmuHN6vk1cvz2ws21kCI2OMaxlFUCuHz1aCnuvR5QjwE1z-kSDmmXfWaSmflGcfRWR-3C3LgdwuyB9ELs1v0Caqxf7DsrM8zV8XX2np0hOCGM8CY-vXk2ICC2uWFYBMKCbkMPXABe1a--XkptvgU7Ba-f-ZJcyjnqchE3FUa18',
    dua: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiYsi6ZsQ2hqNajLOquOuV0PbypYJkmAiEbS0CLipAPLB0cbCvME-fXtEfsNPyIwvgRgRkxtb92oYwv-W1UJ2krXOQSCewrAz_p7qhX47vOqE1XV1KJDCo6j1QeN4CfP4XjXSATYq5cXGsgXN9aW6TnpiAdLjAvILe13jyhlJI6REitK0K4ZKa3sPDf5ZFRC8pEp9L0oHMqiX8XEoqdHGwEzqvegRbDQtevZ5FiE303v_JAROZwOwJjVOFDdBszck72zFRptqmFCY'
  }
};

/* Curated daily content with English translations matching the design */
const DAILY_VERSES = [
  {
    arabic: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ",
    english: "Do not despair of the mercy of Allah.",
    surah: "يوسف",
    ayah: 87
  },
  {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    english: "Indeed, with hardship comes ease.",
    surah: "الشرح",
    ayah: 6
  },
  {
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
    english: "So remember Me; I will remember you.",
    surah: "البقرة",
    ayah: 152
  },
  {
    arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
    english: "And say: My Lord, increase me in knowledge.",
    surah: "طه",
    ayah: 114
  },
  {
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",
    english: "Our Lord, give us in this world that which is good and in the Hereafter that which is good.",
    surah: "البقرة",
    ayah: 201
  },
  {
    arabic: "وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ",
    english: "And my success is not but through Allah.",
    surah: "هود",
    ayah: 88
  }
];

const DAILY_HADITHS = [
  {
    arabic: "تبسُّمك في وجه أخيك صدقة",
    english: "Your smile in the face of your brother is charity.",
    source: "رواه أبو ذر الغفاري - سنن الترمذي"
  },
  {
    arabic: "خير الناس أنفعهم للناس",
    english: "The best of people are those who are most beneficial to people.",
    source: "رواه الطبراني - صحيح الجامع"
  },
  {
    arabic: "الكلمة الطيبة صدقة",
    english: "A good word is a charitable act.",
    source: "صحيح البخاري وصحيح مسلم"
  },
  {
    arabic: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه",
    english: "None of you truly believes until he loves for his brother what he loves for himself.",
    source: "صحيح البخاري ومسلم"
  }
];

const DAILY_ADHKAR = [
  {
    arabic: "أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ",
    benefit: "التأكيد على الإسلام والتوحيد",
    count: 1
  },
  {
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ: عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ",
    benefit: "أجر عظيم يعادل أضعاف الذكر المعتاد",
    count: 3
  },
  {
    arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
    benefit: "صلاح الشأن كله وطلب معونة الله وتوفيقه",
    count: 1
  }
];

const DAILY_DUAS = [
  {
    title: "دعاء زيارة المريض",
    arabic: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ",
    english: "No harm, it is a purification, if Allah wills.",
    benefit: "تطييب خاطر المريض"
  },
  {
    title: "دعاء تفريج الهم",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ",
    english: "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice.",
    benefit: "تفريج الكرب وزوال الهم وقضاء الدين"
  },
  {
    title: "دعاء الخروج من المنزل",
    arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    english: "In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.",
    benefit: "كفيت ووقيت وهديت وتنحى عنه الشيطان"
  }
];

function TodayPage() {
  const [content, setContent] = useState({
    ayah: DAILY_VERSES[0],
    hadith: DAILY_HADITHS[0],
    dhikr: DAILY_ADHKAR[0],
    dua: DAILY_DUAS[0]
  });

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    setContent({
      ayah: DAILY_VERSES[dayOfYear % DAILY_VERSES.length],
      hadith: DAILY_HADITHS[dayOfYear % DAILY_HADITHS.length],
      dhikr: DAILY_ADHKAR[dayOfYear % DAILY_ADHKAR.length],
      dua: DAILY_DUAS[dayOfYear % DAILY_DUAS.length]
    });
  }, []);

  return (
    <div className="today-page" dir="rtl">
      {/* ── Hero Section ── */}
      <section className="today-hero">
        <div className="today-hero-pattern" aria-hidden="true" />
        <div className="today-hero-content">
          <img
            src={ASSETS.heroCalligraphy}
            alt="المحتوى اليومي المميز"
            className="today-hero-calligraphy"
          />
          <p className="today-hero-subtitle">ابدأ يومك بذكر الله</p>
        </div>
      </section>

      {/* ── Main Content: Cards Grid ── */}
      <main className="today-container">
        <div className="today-cards-grid">

          {/* Card 1: Ayah of the Day */}
          <article className="today-card">
            <header className="today-card-header">
              <h2 className="today-card-title">آية اليوم</h2>
              <img src={ASSETS.icons.ayah} alt="آية اليوم" className="today-card-icon" />
            </header>
            <div className="today-card-body">
              <p className="today-arabic-text today-arabic-large">
                {content.ayah.arabic}
              </p>
              {content.ayah.english && (
                <p className="today-translation">
                  {content.ayah.english}
                </p>
              )}
            </div>
            <footer className="today-card-meta">
              سورة {content.ayah.surah} - الآية {content.ayah.ayah}
            </footer>
          </article>

          {/* Card 2: Hadith of the Day */}
          <article className="today-card">
            <header className="today-card-header">
              <h2 className="today-card-title">حديث اليوم</h2>
              <img src={ASSETS.icons.hadith} alt="حديث اليوم" className="today-card-icon" />
            </header>
            <div className="today-card-body">
              <p className="today-arabic-text">
                {content.hadith.arabic}
              </p>
              {content.hadith.english && (
                <p className="today-translation">
                  {content.hadith.english}
                </p>
              )}
            </div>
            <footer className="today-card-meta">
              {content.hadith.source}
            </footer>
          </article>

          {/* Card 3: Dhikr of the Day */}
          <article className="today-card">
            <header className="today-card-header">
              <h2 className="today-card-title">ذكر اليوم</h2>
              <img src={ASSETS.icons.dhikr} alt="ذكر اليوم" className="today-card-icon" />
            </header>
            <div className="today-card-body">
              <p className="today-arabic-text today-arabic-dhikr">
                {content.dhikr.arabic}
              </p>
              {content.dhikr.benefit && (
                <div className="today-benefit-box">
                  <span className="today-benefit-label">الفائدة:</span>
                  <span className="today-benefit-text">{content.dhikr.benefit}</span>
                </div>
              )}
            </div>
            <footer className="today-count-pill">
              عدد المرات: {content.dhikr.count}
            </footer>
          </article>

          {/* Card 4: Dua of the Day */}
          <article className="today-card">
            <header className="today-card-header">
              <h2 className="today-card-title">دعاء اليوم</h2>
              <img src={ASSETS.icons.dua} alt="دعاء اليوم" className="today-card-icon" />
            </header>
            <div className="today-card-body">
              {content.dua.title && (
                <p className="today-dua-category">{content.dua.title}</p>
              )}
              <p className="today-arabic-text today-arabic-large">
                {content.dua.arabic}
              </p>
              {content.dua.english && (
                <p className="today-translation">
                  {content.dua.english}
                </p>
              )}
              {content.dua.benefit && (
                <div className="today-benefit-box today-benefit-mt-auto">
                  <span className="today-benefit-label">الفائدة:</span>
                  <span className="today-benefit-text">{content.dua.benefit}</span>
                </div>
              )}
            </div>
          </article>

        </div>
      </main>
    </div>
  );
}

export default TodayPage;
