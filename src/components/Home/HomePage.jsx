import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

/* ─────────────────────────────────────────────
   Feature / navigation data — UNCHANGED
   These drive the article cards AND the categories
   sidebar, preserving all existing routing.
───────────────────────────────────────────── */
const features = [
  {
    id: 1,
    title: 'القرآن الكريم',
    icon: '📖',
    description: 'قراءة واستماع القرآن الكريم كاملاً مع التفسير',
    path: '/quran',
    category: 'قرآن',
    readTime: '5 دقائق',
  },
  {
    id: 2,
    title: 'الأحاديث النبوية',
    icon: '📚',
    description: 'مكتبة شاملة للأحاديث الصحيحة مع البحث والفلترة',
    path: '/hadith',
    category: 'حديث',
    readTime: '7 دقائق',
  },
  {
    id: 3,
    title: 'الأدعية',
    icon: '🤲',
    description: 'أدعية لكل المناسبات والمواقف اليومية',
    path: '/duas',
    category: 'أدعية',
    readTime: '3 دقائق',
  },
  {
    id: 4,
    title: 'مواقيت الصلاة',
    icon: '🕌',
    description: 'أوقات الصلاة حسب موقعك مع التنبيهات',
    path: '/prayer-times',
    category: 'عبادات',
    readTime: '2 دقائق',
  },
  {
    id: 5,
    title: 'التسبيح والأذكار',
    icon: '📿',
    description: 'سبحة إلكترونية مع أذكار الصباح والمساء',
    path: '/tasbih',
    category: 'أذكار',
    readTime: '4 دقائق',
  },
  {
    id: 6,
    title: 'الختمة الجماعية',
    icon: '🎯',
    description: 'أنشئ ختمة جماعية وشاركها مع الآخرين',
    path: '/khatmah',
    category: 'قرآن',
    readTime: '6 دقائق',
  },
];

/* Static "most-read" list for the sidebar — presentation only */
const mostRead = [
  { id: 1, title: 'فضائل سورة الكهف يوم الجمعة', date: '١٠ يونيو ٢٠٢٦', featureIndex: 0 },
  { id: 2, title: 'أذكار الصباح والمساء المأثورة', date: '٨ يونيو ٢٠٢٦',  featureIndex: 4 },
  { id: 3, title: 'أحكام الصلاة وأوقاتها', date: '٥ يونيو ٢٠٢٦',  featureIndex: 3 },
  { id: 4, title: 'الأحاديث النبوية الصحيحة', date: '١ يونيو ٢٠٢٦',  featureIndex: 1 },
];

/* Category summary driven by the existing features array */
const categories = [
  { label: 'القرآن الكريم', path: '/quran',        count: 114 },
  { label: 'الأحاديث',     path: '/hadith',       count: 42  },
  { label: 'الأدعية',      path: '/duas',         count: 30  },
  { label: 'العبادات',     path: '/prayer-times', count: 20  },
];

/* ─────────────────────────────────────────────
   Theme options — UNCHANGED (same as original)
───────────────────────────────────────────── */


/* ─── Inline SVG helpers (avoid the global App.css svg transform) ─── */
function IconTag() {
  return (
    <svg className="hp-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg className="hp-icon-svg hp-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg className="hp-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   HomePage component
═══════════════════════════════════════════════ */
function HomePage() {


  /* Featured item is always the first feature card (Quran) */
  const featuredFeature = features[0];

  return (
    <div className="homepage" dir="rtl">

      {/* ════════════════════════════════════════
          HERO — Featured article banner
          Preserves: hero content (h1, basmala, ayah)
          New: blog-feed hero style with overlay
      ════════════════════════════════════════ */}
      <section className="hp-hero" aria-label="القسم الرئيسي">


        {/* Hero banner */}
        <div className="hp-hero-banner" role="img" aria-label="صورة ترحيبية إسلامية">
          <div className="hp-hero-overlay" aria-hidden="true" />
          <div className="hp-hero-content">
            {/* One H1 per page — the site's primary identity */}
            <h1 className="hp-hero-title fade-in">
              بسم الله الرحمن الرحيم
            </h1>
            <p className="hp-hero-ayah fade-in">
              ﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ ﴾
            </p>
            <p className="hp-hero-desc fade-in">
              موقعك الشامل للقرآن الكريم والأحاديث والأدعية وكل ما يحتاجه المسلم في حياته اليومية
            </p>
            <Link
              to={featuredFeature.path}
              className="hp-hero-cta"
              aria-label={`اقرأ المزيد عن ${featuredFeature.title}`}
            >
              استكشف الآن
            </Link>
          </div>

          {/* Slider indicators — visual decoration from new design */}
          <div className="hp-hero-dots" aria-hidden="true">
            <span className="hp-dot hp-dot--active" />
            <span className="hp-dot" />
            <span className="hp-dot" />
          </div>
        </div>

        {/* Curved bottom wave */}
        <div className="hp-hero-wave" aria-hidden="true" />
      </section>

      {/* ════════════════════════════════════════
          MAIN CONTENT + SIDEBAR layout
      ════════════════════════════════════════ */}
      <div className="container hp-body-layout">

        {/* ── Main content ── */}
        <main className="hp-main" id="main-content">

          {/* Section heading */}
          <div className="hp-section-head">
            <h2 className="hp-section-title">ميزات الموقع</h2>
          </div>

          {/* ── Features / Articles grid
              UNCHANGED: Link routing, feature data, animation delay ── */}
          <div className="hp-articles-grid" role="list">
            {features.map((feature, index) => (
              <article
                key={feature.id}
                className="hp-article-card"
                role="listitem"
                style={{ '--delay': `${index * 0.1}s` }}
              >
                {/* Card icon banner (replaces article image) */}
                <div
                  className="hp-card-banner"
                  aria-hidden="true"
                >
                  <span className="hp-card-icon" role="img" aria-label={feature.title}>
                    {feature.icon}
                  </span>
                </div>

                <div className="hp-card-body">
                  {/* Article title → navigates to route */}
                  <h3 className="hp-card-title">
                    <Link
                      to={feature.path}
                      className="hp-card-title-link"
                      aria-label={`انتقل إلى ${feature.title}`}
                    >
                      {feature.title}
                    </Link>
                  </h3>

                  <p className="hp-card-desc">{feature.description}</p>

                  {/* Card meta row */}
                  <footer className="hp-card-meta">
                    <div className="hp-card-category">
                      <IconTag />
                      <span>{feature.category}</span>
                    </div>
                    <div className="hp-card-stats">
                      <span className="hp-card-read-time">
                        <IconClock />
                        {feature.readTime}
                      </span>
                    </div>
                  </footer>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* ── Sidebar ── */}
        <aside className="hp-sidebar" aria-label="الشريط الجانبي">

          {/* Most Read */}
          <section className="hp-sidebar-card" aria-labelledby="most-read-heading">
            <h3 className="hp-sidebar-title" id="most-read-heading">الأكثر قراءة</h3>
            <ul className="hp-most-read-list" role="list">
              {mostRead.map((item) => (
                <li key={item.id} role="listitem">
                  <Link
                    to={features[item.featureIndex].path}
                    className="hp-most-read-item"
                    aria-label={item.title}
                  >
                    {/* Icon thumbnail */}
                    <div className="hp-most-read-thumb" aria-hidden="true">
                      <span>{features[item.featureIndex].icon}</span>
                    </div>
                    <div className="hp-most-read-info">
                      <h4 className="hp-most-read-title">{item.title}</h4>
                      <time className="hp-most-read-date" dateTime={item.date}>
                        {item.date}
                      </time>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Categories */}
          <section className="hp-sidebar-card" aria-labelledby="categories-heading">
            <h3 className="hp-sidebar-title" id="categories-heading">التصنيفات</h3>
            <ul className="hp-categories-list" role="list">
              {categories.map((cat) => (
                <li key={cat.path} role="listitem">
                  <Link
                    to={cat.path}
                    className="hp-category-item"
                    aria-label={`${cat.label} — ${cat.count} عنصر`}
                  >
                    <div className="hp-category-label">
                      <span className="hp-category-icon" aria-hidden="true">
                        <IconBook />
                      </span>
                      <span className="hp-category-name">{cat.label}</span>
                    </div>
                    <span className="hp-category-count" aria-hidden="true">
                      {cat.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      {/* ════════════════════════════════════════
          QURAN VERSE — UNCHANGED content & logic
      ════════════════════════════════════════ */}
      <section className="hp-verse-section" aria-label="آية قرآنية">
        <div className="container">
          <div className="hp-verse-card">
            <div className="hp-verse-decoration" aria-hidden="true">
              <span>✦</span>
            </div>
            <p className="quran-text hp-verse-text">
              ﴿ إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَأَقَامُوا الصَّلَاةَ وَآتَوُا الزَّكَاةَ
              لَهُمْ أَجْرُهُمْ عِندَ رَبِّهِمْ وَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ ﴾
            </p>
            <p className="hp-verse-ref">سورة البقرة — آية ٢٧٧</p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          STATS — UNCHANGED content & logic
      ════════════════════════════════════════ */}
      <section className="hp-stats-section" aria-label="إحصائيات الموقع">
        <div className="container">
          <dl className="hp-stats-grid">
            <div className="hp-stat-item">
              <dt className="hp-stat-label">سورة قرآنية</dt>
              <dd className="hp-stat-number">114</dd>
            </div>
            <div className="hp-stat-item">
              <dt className="hp-stat-label">آية كريمة</dt>
              <dd className="hp-stat-number">6236</dd>
            </div>
            <div className="hp-stat-item">
              <dt className="hp-stat-label">حديث نبوي</dt>
              <dd className="hp-stat-number">1000+</dd>
            </div>
            <div className="hp-stat-item">
              <dt className="hp-stat-label">دعاء</dt>
              <dd className="hp-stat-number">100+</dd>
            </div>
          </dl>
        </div>
      </section>

    </div>
  );
}

export default HomePage;
