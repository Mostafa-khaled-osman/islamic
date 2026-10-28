import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './DuasPage.css';

// 10 Comprehensive Categories matching the reference design
const DUAS_CATEGORIES = [
  {
    id: 'morning',
    name: 'أذكار الصباح',
    icon: '🌅',
    subtitle: 'حصّن نفسك وابدأ يومك ببركة الذكر ودعاء المعصوم ﷺ',
    badge: 'نشط',
    tag: 'morning',
    duas: [
      {
        id: 'm1',
        title: 'دعاء الصباح والاستفتاح',
        sub: 'يقال مرة واحدة عند طلوع الفجر',
        arabic: '«أَصْبَحْنَا وَأَصْبَحَ المُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ المُلْكُ وَلَهُ الحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا اليَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا اليَوْمِ وَشَرِّ مَا بَعْدَهُ»',
        source: 'رواه الإمام مسلم (رقم 2723)',
        benefit: 'حفظ ورعاية لليوم كاملاً',
        count: 1,
        highlight: false,
      },
      {
        id: 'm2',
        title: 'سيد الاستغفار',
        isCrown: true,
        sub: 'أعظم صيغ الاستغفار والتوبة',
        arabic: '«اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ»',
        benefitBox: {
          title: 'فضل هذا الذكر:',
          text: '«مَن قالَها مِنَ النَّهارِ مُوقِناً بها، فَماتَ مِن يَومِهِ قَبْلَ أنْ يُمْسِيَ، فَهو مِن أهْلِ الجَنَّةِ، ومَن قالَها مِنَ اللَّيْلِ وهو مُوقِنٌ بها، فَماتَ قَبْلَ أنْ يُصْبِحَ، فَهو مِن أهْلِ الجَنَّةِ» — رواه البخاري.'
        },
        count: 1,
        highlight: true,
        ribbon: 'فضل عظيم',
      },
      {
        id: 'm3',
        title: 'دعاء الحفظ والوقاية من الشرور',
        sub: 'سياج وأمان من كل سوء وضر',
        arabic: '«بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ، وَهُوَ السَّمِيعُ العَلِيمُ»',
        source: 'صحيح أبي داود والترمذي',
        count: 3,
        highlight: false,
      },
      {
        id: 'm4',
        title: 'دعاء العافية والنجاة من الكفر والفقر',
        sub: 'يقال ثلاث مرات صباحاً ومساءً',
        arabic: '«اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لاَ إِلَهَ إِلاَّ أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الكُفْرِ وَالفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ القَبْرِ، لاَ إِلَهَ إِلاَّ أَنْتَ»',
        source: 'سنن أبي داود والنسائي',
        count: 3,
        highlight: false,
      },
      {
        id: 'm5',
        title: 'آية الكرسي',
        sub: 'أعظم آية في كتاب الله',
        arabic: '«اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ»',
        source: 'سورة البقرة (آية 255)',
        benefit: 'من قرأها حين يصبح أجير من الجن حتى يمسي',
        count: 1,
        highlight: false,
      },
      {
        id: 'm6',
        title: 'الإخلاص والمعوذتان',
        sub: 'تكفيك من كل شيء',
        arabic: '«قُلْ هُوَ اللَّهُ أَحَدٌ ۝ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ قُلْ أَعُوذُ بِرَبِّ النَّاسِ»',
        source: 'رواه أبو داود والترمذي',
        benefit: 'تكفيك من كل شيء إذا قلتها ثلاثاً صباحاً ومساءً',
        count: 3,
        highlight: false,
      },
      {
        id: 'm7',
        title: 'الرضا بالله تعالى',
        sub: 'وجبت له الجنة بإذن الله',
        arabic: '«رَضِيتُ بِاللَّهِ رَبّاً، وَبِالإِسْلاَمِ دِيناً، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيّاً»',
        source: 'رواه أبو داود وأحمد',
        benefit: 'من قالها ثلاثاً كان حقاً على الله أن يرضيه يوم القيامة',
        count: 3,
        highlight: false,
      },
      {
        id: 'm8',
        title: 'الاستغاثة برحمة الله',
        sub: 'لصلاح الشأن كله',
        arabic: '«يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ»',
        source: 'صحيح الترغيب والترهيب',
        benefit: 'تفويض الأمر لله وطلب المعونة الدائمة',
        count: 1,
        highlight: false,
      }
    ]
  },
  {
    id: 'evening',
    name: 'أذكار المساء',
    icon: '🌇',
    subtitle: 'حصن نفسك مع غروب الشمس واستقبل ليلتك بطمأنينة وسلام',
    tag: 'evening',
    duas: [
      {
        id: 'e1',
        title: 'دعاء المساء والاستفتاح',
        sub: 'يقال عند غروب الشمس وبداية الليل',
        arabic: '«أَمْسَيْنَا وَأَمْسَى المُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ المُلْكُ وَلَهُ الحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا»',
        source: 'صحيح مسلم',
        benefit: 'حفظ للمسلم طوال ليلته حتى يصبح',
        count: 1,
        highlight: false,
      },
      {
        id: 'e2',
        title: 'الاستعاذة بكلمات الله التامات',
        sub: 'أمان من كل هامة وشر',
        arabic: '«أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ»',
        source: 'رواه مسلم',
        benefit: 'من قالها ثلاثاً لم يضره في تلك الليلة شيء',
        count: 3,
        highlight: true,
        ribbon: 'أمان وحفظ',
      },
      {
        id: 'e3',
        title: 'اللهم بك أمسينا',
        sub: 'ذكر الحمد والتسليم عند حلول المساء',
        arabic: '«اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ»',
        source: 'رواه الترمذي وأبو داود',
        benefit: 'استشعار نعم الله وتجديد التوكل',
        count: 1,
        highlight: false,
      },
      {
        id: 'e4',
        title: 'خواتيم سورة البقرة',
        sub: 'الآيتان الأخيرتان من سورة البقرة',
        arabic: '«آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ»',
        source: 'سورة البقرة (285-286)',
        benefit: 'من قرأهما في ليلة كفتاه',
        count: 1,
        highlight: false,
      }
    ]
  },
  {
    id: 'travel',
    name: 'أدعية السفر والترحال',
    icon: '✈️',
    subtitle: 'أدعية مأثورة لحفظ المسافر وبركة الرحلة وتيسير الطريق',
    tag: 'nabawi',
    duas: [
      {
        id: 't1',
        title: 'دعاء ركوب الدابة والسفر',
        sub: 'يقال عند الشروع في السفر أو ركوب السيارة والطيارة',
        arabic: '«سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ. اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا البِرَّ وَالتَّقْوَى، وَمِنَ العَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ»',
        source: 'رواه مسلم (رقم 1342)',
        benefit: 'تيسير السفر وحفظ الأهل والمال',
        count: 1,
        highlight: true,
        ribbon: 'أمان السفر',
      },
      {
        id: 't2',
        title: 'دعاء الرجوع من السفر',
        sub: 'يقال عند العودة إلى الوطن والديار',
        arabic: '«آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ»',
        source: 'صحيح البخاري ومسلم',
        benefit: 'شكر الله على نعمة العودة سالماً',
        count: 1,
        highlight: false,
      },
      {
        id: 't3',
        title: 'دعاء توديع المسافر',
        sub: 'ما يقوله المقيم للمسافر عند الوداع',
        arabic: '«أَسْتَوْدِعُ اللَّهَ دِينَكَ وَأَمَانَتَكَ وَخَوَاتِيمَ عَمَلِكَ، زَوَّدَكَ اللَّهُ التَّقْوَى، وَغَفَرَ ذَنْبَكَ، وَيَسَّرَ لَكَ الخَيْرَ حَيْثُمَا كُنْتَ»',
        source: 'سنن الترمذي',
        benefit: 'استيداع الحفظ والبركة للمسافر',
        count: 1,
        highlight: false,
      }
    ]
  },
  {
    id: 'exam',
    name: 'أدعية الامتحان والتوفيق',
    icon: '📝',
    subtitle: 'أدعية مباركة لطلب الفهم والتوفيق وتيسير الصعب وإزالة القلق',
    tag: 'quran',
    duas: [
      {
        id: 'ex1',
        title: 'دعاء تيسير الصعب',
        sub: 'يقال عند مواجهة سؤال صعب أو بدء الامتحان',
        arabic: '«اللَّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلاً، وَأَنْتَ تَجْعَلُ الحَزْنَ إِذَا شِئْتَ سَهْلاً»',
        source: 'رواه ابن حبان وصححه الألباني',
        benefit: 'انشراح الصدر وتيسير العسير',
        count: 1,
        highlight: true,
        ribbon: 'تيسير الصعاب',
      },
      {
        id: 'ex2',
        title: 'دعاء طلب الفهم وانشراح الصدر',
        sub: 'دعاء نبي الله موسى عليه السلام',
        arabic: '«رَبِّ اشْرَحْ لِي صَدْرِي ۝ وَيَسِّرْ لِي أَمْرِي ۝ وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي ۝ يَفْقَهُوا قَوْلِي»',
        source: 'سورة طه (25-28)',
        benefit: 'الفصاحة وسرعة الفهم وحسن التعبير',
        count: 1,
        highlight: false,
      },
      {
        id: 'ex3',
        title: 'دعاء زيادة العلم والتوفيق',
        sub: 'طلب الزيادة في العلم النافع',
        arabic: '«رَبِّ زِدْنِي عِلْمًا، اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي وَعَلِّمْنِي مَا يَنْفَعُنِي وَزِدْنِي عِلْمًا»',
        source: 'سورة طه والترمذي',
        benefit: 'بركة الفهم ورسوخ الحفظ',
        count: 1,
        highlight: false,
      }
    ]
  },
  {
    id: 'marriage',
    name: 'أدعية الزواج والأسرة',
    icon: '💍',
    subtitle: 'أدعية لبناء بيت مبارك وسعادة زوجية وذرية صالحة تقر بها الأعين',
    tag: 'quran',
    duas: [
      {
        id: 'w1',
        title: 'دعاء تهنئة الزوجين',
        sub: 'الدعاء المأثور للعروسين بالبركة والوفاق',
        arabic: '«بَارَكَ اللَّهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ»',
        source: 'رواه أبو داود والترمذي وصححه الألباني',
        benefit: 'حصول البركة والخير الدائم بين الزوجين',
        count: 1,
        highlight: true,
        ribbon: 'بركة وسعادة',
      },
      {
        id: 'w2',
        title: 'دعاء طلب الذرية الصالحة وقرة العين',
        sub: 'دعاء عباد الرحمن لصلاح الأسرة',
        arabic: '«رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا»',
        source: 'سورة الفرقان (آية 74)',
        benefit: 'استقرار البيت وصلاح الأبناء وهدوء النفس',
        count: 1,
        highlight: false,
      },
      {
        id: 'w3',
        title: 'دعاء المودة والائتلاف',
        sub: 'لزيادة الألفة والمحبة في الأسرة',
        arabic: '«اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا، وَأَصْلِحْ ذَاتَ بَيْنِنَا، وَاهْدِنَا سُبُلَ السَّلاَمِ، وَنَجِّنَا مِنَ الظُّلُمَاتِ إِلَى النُّورِ»',
        source: 'سنن أبي داود',
        benefit: 'نزع الشحناء وإحلال الود والسكينة',
        count: 1,
        highlight: false,
      }
    ]
  },
  {
    id: 'sick',
    name: 'أدعية المريض والشفاء',
    icon: '🏥',
    subtitle: 'أدعية الشفاء العاجل والرقية المأثورة وتسكين الآلام والأوجاع',
    tag: 'ruqya',
    duas: [
      {
        id: 's1',
        title: 'دعاء عيادة المريض',
        sub: 'ما يقال للمريض عند زيارته ورجاء برئه',
        arabic: '«لاَ بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ، أَسْأَلُ اللَّهَ العَظِيمَ رَبَّ العَرْشِ العَظِيمِ أَنْ يَشْفِيَكَ»',
        source: 'رواه البخاري والترمذي',
        benefit: 'تطييب خاطر المريض وطلب الشفاء من الله',
        count: 7,
        highlight: true,
        ribbon: 'شفاء وعافية',
      },
      {
        id: 's2',
        title: 'الرقية النبوية الشريفة',
        sub: 'رقية جبريل عليه السلام للنبي ﷺ',
        arabic: '«بِسْمِ اللَّهِ أَرْقِيكَ، مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ، مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ، اللَّهُ يَشْفِيكَ، بِسْمِ اللَّهِ أَرْقِيكَ»',
        source: 'صحيح مسلم',
        benefit: 'الرقية من العين والحسد والأسقام',
        count: 3,
        highlight: false,
      },
      {
        id: 's3',
        title: 'دعاء وضع اليد على موضع الألم',
        sub: 'ما يقوله المسلم حين يشتكي وجعاً في جسده',
        arabic: '«بِسْمِ اللَّهِ (ثلاثاً)، أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ (سبع مرات)»',
        source: 'صحيح مسلم',
        benefit: 'تسكين الألم والتوكل الكامل على الله',
        count: 7,
        highlight: false,
      }
    ]
  },
  {
    id: 'rain',
    name: 'أدعية المطر والرعد',
    icon: '🌧️',
    subtitle: 'أدعية مأثورة عند هطول الغيث وسماع الرعد وهبوب الرياح',
    tag: 'nabawi',
    duas: [
      {
        id: 'r1',
        title: 'دعاء نزول المطر',
        sub: 'يقال عند ابتداء سقوط المطر',
        arabic: '«اللَّهُمَّ صَيِّباً نَافِعاً، اللَّهُمَّ سُقْيَا رَحْمَةٍ لاَ سُقْيَا عَذَابٍ وَلاَ بَلاَءٍ وَلاَ هَدْمٍ وَلاَ غَرَقٍ»',
        source: 'صحيح البخاري',
        benefit: 'طلب البركة والنفع العام من الغيث',
        count: 1,
        highlight: true,
        ribbon: 'غيث مبارك',
      },
      {
        id: 'r2',
        title: 'دعاء بعد نزول المطر',
        sub: 'شكر المنعم سبحانه على نعمة المطر',
        arabic: '«مُطِرْنَا بِفَضْلِ اللَّهِ وَرَحْمَتِهِ»',
        source: 'صحيح البخاري ومسلم',
        benefit: 'إقرار بنعمة الله واعتراف بفضله',
        count: 1,
        highlight: false,
      },
      {
        id: 'r3',
        title: 'دعاء سماع الرعد',
        sub: 'ما كان يقوله الصحابة والسلف عند سماع الرعد',
        arabic: '«سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالمَلاَئِكَةُ مِنْ خِيفَتِهِ»',
        source: 'موطأ الإمام مالك',
        benefit: 'تعظيم الله وتسبيحه عند سماع آياته الكونية',
        count: 1,
        highlight: false,
      }
    ]
  },
  {
    id: 'debt',
    name: 'دعاء قضاء الدين وتيسير الرزق',
    icon: '💰',
    subtitle: 'أدعية مأثورة لسداد الديون وزوال الهم والغم وانفراج الكروب',
    tag: 'nabawi',
    duas: [
      {
        id: 'd1',
        title: 'دعاء سداد الدين والغنى بالحلال',
        sub: 'لو كان عليك مثل جبل أحد ديناً أداه الله عنك',
        arabic: '«اللَّهُمَّ اكْفِنِي بِحَلاَلِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ»',
        source: 'رواه الترمذي وحسنه',
        benefit: 'الكفاية بالحلال والقناعة وسداد الديون',
        count: 3,
        highlight: true,
        ribbon: 'سداد وكفاية',
      },
      {
        id: 'd2',
        title: 'دعاء تفريج الهم والحزن',
        sub: 'أعظم دعاء يذهب الله به الهم والحزن ويبدله فرحاً',
        arabic: '«اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ سَمَّيْتَ بِهِ نَفْسَكَ، أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ، أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ، أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ، أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجَلَاءَ حُزْنِي، وَذَهَابَ هَمِّي»',
        benefitBox: {
          title: 'بشارة نبوية:',
          text: '«ما أصاب أحداً هم ولا حزن فقال هذا الدعاء إلا أذهب الله همه وحزنه وأبدله مكانه فرحاً» — رواه أحمد وصححه الألباني.'
        },
        count: 1,
        highlight: false,
      },
      {
        id: 'd3',
        title: 'دعاء الكرب والشدائد',
        sub: 'دعاء ذي النون في بطن الحوت',
        arabic: '«لاَ إِلَهَ إِلاَّ أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ»',
        source: 'سورة الأنبياء والترمذي',
        benefit: 'ما دعا بها مكروب إلا فرج الله عنه',
        count: 3,
        highlight: false,
      }
    ]
  },
  {
    id: 'deceased',
    name: 'أدعية الجنازة والتعزية للميت',
    icon: '🤲',
    subtitle: 'أدعية المغفرة والرحمة للأموات وسؤال الثبات وتعزية أهل المصاب',
    tag: 'nabawi',
    duas: [
      {
        id: 'dec1',
        title: 'دعاء صلاة الجنازة',
        sub: 'الدعاء للميت بالمغفرة الواسعة والرحمة وتبديل الدار',
        arabic: '«اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ، وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهِ مِنَ الخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الأَبْيَضَ مِنَ الدَّنَسِ، وَأَبْدِلْهُ دَاراً خَيْراً مِنْ دَارِهِ، وَأَهْلاً خَيْراً مِنْ أَهْلِهِ، وَأَدْخِلْهُ الجَنَّةَ، وَأَعِذْهُ مِنْ عَذَابِ القَبْرِ وَمِنْ عَذَابِ النَّارِ»',
        source: 'صحيح مسلم (رقم 963)',
        benefit: 'الدعاء الجامع للميت في صلاة الجنازة',
        count: 1,
        highlight: true,
        ribbon: 'رحمة ومغفرة',
      },
      {
        id: 'dec2',
        title: 'دعاء تعزية أهل الميت',
        sub: 'ما يقال لأهل الفقيد تسلية وتثبيتاً لقلوبهم',
        arabic: '«إِنَّ لِلَّهِ مَا أَخَذَ، وَلَهُ مَا أَعْطَى، وَكُلُّ شَيْءٍ عِنْدَهُ بِأَجَلٍ مُسَمًّى، فَلْتَصْبِرْ وَلْتَحْتَسِبْ»',
        source: 'صحيح البخاري ومسلم',
        benefit: 'الصبر والاحتساب ورجاء الأجر العظيم',
        count: 1,
        highlight: false,
      },
      {
        id: 'dec3',
        title: 'دعاء زيارة القبور',
        sub: 'ما يقوله المسلم إذا زار مقابر المسلمين',
        arabic: '«السَّلاَمُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ المُؤْمِنِينَ وَالمُسْلِمِينَ، وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لاَحِقُونَ، نَسْأَلُ اللَّهَ لَنَا وَلَكُمُ العَافِيَةَ»',
        source: 'صحيح مسلم',
        benefit: 'تذكر الآخرة والسلام على الأموات',
        count: 1,
        highlight: false,
      }
    ]
  },
  {
    id: 'home',
    name: 'أدعية دخول وخروج المنزل',
    icon: '🕊️',
    subtitle: 'أدعية مباركة لحفظ البيت وسكانه من الشياطين والوساوس',
    tag: 'nabawi',
    duas: [
      {
        id: 'h1',
        title: 'دعاء الخروج من المنزل',
        sub: 'يقال عند الخروج لحفظ المسافر وقضاء الحوائج',
        arabic: '«بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ، أَوْ أَزِلَّ أَوْ أُزَلَّ، أَوْ أَظْلِمَ أَوْ أُظْلَمَ، أَوْ أَجْهَلَ أَوْ يُجْهَلَ عَلَيَّ»',
        source: 'رواه أبو داود والترمذي',
        benefit: 'يقال له: كفيت وهديت ووقيت وتنحى عنه الشيطان',
        count: 1,
        highlight: true,
        ribbon: 'حفظ وهداية',
      },
      {
        id: 'h2',
        title: 'دعاء دخول المنزل',
        sub: 'ما يقوله المسلم عند ولوج بيته لمنع الشيطان',
        arabic: '«بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا، ثُمَّ لِيُسَلِّمْ عَلَى أَهْلِهِ»',
        source: 'سنن أبي داود',
        benefit: 'إذا دخل وذكر الله قال الشيطان: لا مبيت لكم',
        count: 1,
        highlight: false,
      },
      {
        id: 'h3',
        title: 'دعاء البركة في الدار',
        sub: 'طلب السلامة والخير والبركة في الأهل والمأوى',
        arabic: '«رَبِّ أَنْزِلْنِي مُنْزَلاً مُبَارَكاً وَأَنْتَ خَيْرُ المُنْزِلِينَ»',
        source: 'سورة المؤمنون (آية 29)',
        benefit: 'حلول البركة والأمان والسكينة في المنزل',
        count: 1,
        highlight: false,
      }
    ]
  }
];

const QUICK_FILTERS = [
  { id: 'all', label: 'الكل' },
  { id: 'morning_evening', label: 'أذكار الصباح والمساء' },
  { id: 'quran', label: 'أدعية قرآنية' },
  { id: 'nabawi', label: 'أدعية نبوية' },
  { id: 'ruqya', label: 'الرقية الشرعية' },
];

function DuasPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('morning');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [duaCounts, setDuaCounts] = useState({});
  const [showAll, setShowAll] = useState(false);

  const INITIAL_SHOW_COUNT = 4;
  const DAILY_GOAL = 10;

  // Total Duas across all categories
  const totalDuasCount = useMemo(() => {
    return DUAS_CATEGORIES.reduce((acc, cat) => acc + cat.duas.length, 0);
  }, []);

  // Filter categories based on quick filters or search
  const displayedCategories = useMemo(() => {
    return DUAS_CATEGORIES.filter(cat => {
      if (activeFilter === 'morning_evening') {
        return cat.id === 'morning' || cat.id === 'evening';
      }
      if (activeFilter === 'quran') {
        return cat.tag === 'quran' || cat.duas.some(d => d.source && d.source.includes('سورة'));
      }
      if (activeFilter === 'nabawi') {
        return cat.tag === 'nabawi' || cat.id === 'travel' || cat.id === 'home' || cat.id === 'debt';
      }
      if (activeFilter === 'ruqya') {
        return cat.id === 'sick';
      }
      return true;
    });
  }, [activeFilter]);

  // Current category object
  const currentCategory = useMemo(() => {
    return DUAS_CATEGORIES.find(c => c.id === selectedCategoryId) || DUAS_CATEGORIES[0];
  }, [selectedCategoryId]);

  // Filtered duas for the active category
  const filteredDuas = useMemo(() => {
    if (!currentCategory) return [];
    let list = currentCategory.duas;

    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      list = list.filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.arabic.toLowerCase().includes(q) ||
        (d.sub && d.sub.toLowerCase().includes(q)) ||
        (d.benefit && d.benefit.toLowerCase().includes(q))
      );
    }

    return list;
  }, [currentCategory, searchTerm]);

  // Pagination / slice
  const visibleDuas = useMemo(() => {
    return showAll ? filteredDuas : filteredDuas.slice(0, INITIAL_SHOW_COUNT);
  }, [showAll, filteredDuas]);

  const remainingCount = Math.max(0, filteredDuas.length - INITIAL_SHOW_COUNT);

  // Completed unique duas count
  const completedDuasCount = useMemo(() => {
    return Object.entries(duaCounts).filter(([_, count]) => count > 0).length;
  }, [duaCounts]);

  const progressPercent = Math.min(100, Math.round((completedDuasCount / DAILY_GOAL) * 100));

  // Audio Speech Synthesis
  const handlePlayAudio = useCallback((text, id) => {
    if (!('speechSynthesis' in window)) {
      alert('متصفحك لا يدعم خاصية القراءة الصوتية');
      return;
    }

    if (playingId === id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      setIsPlayingAll(false);
      return;
    }

    window.speechSynthesis.cancel();
    setPlayingId(id);

    // Clean text from guillemets and punctuation
    const cleanText = text.replace(/[«»]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85;

    utterance.onend = () => {
      setPlayingId(null);
    };

    utterance.onerror = () => {
      setPlayingId(null);
    };

    window.speechSynthesis.speak(utterance);
  }, [playingId]);

  // Play All in category
  const handlePlayAll = useCallback(() => {
    if (!('speechSynthesis' in window)) {
      alert('متصفحك لا يدعم خاصية القراءة الصوتية');
      return;
    }

    if (isPlayingAll) {
      window.speechSynthesis.cancel();
      setIsPlayingAll(false);
      setPlayingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    setIsPlayingAll(true);

    const allTexts = filteredDuas.map(d => d.arabic.replace(/[«»]/g, '').trim()).join('. . . ');
    const utterance = new SpeechSynthesisUtterance(allTexts);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85;

    utterance.onend = () => {
      setIsPlayingAll(false);
      setPlayingId(null);
    };

    utterance.onerror = () => {
      setIsPlayingAll(false);
      setPlayingId(null);
    };

    window.speechSynthesis.speak(utterance);
  }, [isPlayingAll, filteredDuas]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Copy to clipboard
  const handleCopy = useCallback((text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  // Share
  const handleShare = useCallback((title, text) => {
    if (navigator.share) {
      navigator.share({
        title,
        text: `${title}\n\n${text}\n\n(عبر موقعنا الإسلامي)`,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${title}\n\n${text}`);
      alert('تم نسخ نص الدعاء للمشاركة!');
    }
  }, []);

  // Counter increment
  const handleIncrement = useCallback((id, target) => {
    setDuaCounts(prev => {
      const current = prev[id] || 0;
      const next = current >= target ? target : current + 1;
      return { ...prev, [id]: next };
    });
  }, []);

  // PDF Print
  const handlePrintPDF = useCallback((e) => {
    e.preventDefault();
    window.print();
  }, []);

  return (
    <div className="duas-page" dir="rtl">
      {/* ================= HERO SECTION ================= */}
      <section className="duas-hero-section">
        <div className="duas-hero-container">
          {/* Top Badge */}
          <div className="duas-hero-badge">
            <span className="duas-hero-badge-dot"></span>
            <span>أكثر من {totalDuasCount} دعاءً مأثوراً ومصححاً مع السند والتخريج</span>
          </div>

          {/* Main Headline */}
          <h1 className="duas-hero-title">
            <span>الأدعية والأذكار</span>
            <span className="duas-hero-hands">🤲</span>
          </h1>

          {/* Subtitle */}
          <p className="duas-hero-subtitle">
            حصن نفسك وأهلك بأدعية مباركة من القرآن الكريم والسنة النبوية الشريفة لكل الأوقات والمناسبات.
          </p>

          {/* Search Box */}
          <div className="duas-search-box">
            <div className="duas-search-input-wrap">
              <i className="fa-solid fa-magnifying-glass duas-search-icon"></i>
              <input
                type="search"
                className="duas-search-input"
                placeholder="ابحث عن دعاء، مناسبة، أو كلمة مفتاحية..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="duas-search-submit-btn" type="button">
              <span>بحث</span>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </div>

          {/* Quick Filter Chips */}
          <div className="duas-quick-chips">
            <span className="duas-chips-label">تصفية سريعة:</span>
            {QUICK_FILTERS.map(f => (
              <button
                key={f.id}
                type="button"
                className={`duas-chip-btn ${activeFilter === f.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveFilter(f.id);
                  if (f.id === 'morning_evening' && selectedCategoryId !== 'morning' && selectedCategoryId !== 'evening') {
                    setSelectedCategoryId('morning');
                  } else if (f.id === 'quran' && selectedCategoryId !== 'exam' && selectedCategoryId !== 'marriage') {
                    setSelectedCategoryId('exam');
                  } else if (f.id === 'ruqya') {
                    setSelectedCategoryId('sick');
                  }
                  setShowAll(false);
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT GRID ================= */}
      <main className="duas-main-container">
        <div className="duas-content-layout">

          {/* RIGHT / MAIN CONTENT COLUMN (Dua Cards) */}
          <div className="duas-cards-column">

            {/* Selected Category Header Banner */}
            {currentCategory && (
              <div className="duas-category-banner">
                <div className="duas-banner-inner">
                  <div className="duas-banner-main-info">
                    <div className="duas-banner-icon-box">
                      {currentCategory.icon}
                    </div>
                    <div className="duas-banner-text">
                      <span className="duas-banner-tag">القسم النشط</span>
                      <h2 className="duas-banner-title">{currentCategory.name}</h2>
                      <p className="duas-banner-desc">{currentCategory.subtitle}</p>
                    </div>
                  </div>

                  {/* Category Audio Play All */}
                  <div className="duas-banner-actions">
                    <button
                      type="button"
                      className={`duas-play-all-btn ${isPlayingAll ? 'playing' : ''}`}
                      onClick={handlePlayAll}
                    >
                      <i className={`fa-solid ${isPlayingAll ? 'fa-circle-stop' : 'fa-circle-play'}`}></i>
                      <span>{isPlayingAll ? 'إيقاف التلاوة' : 'تشغيل الكل صوتياً'}</span>
                    </button>
                  </div>
                </div>

                {/* Banner Meta Footer */}
                <div className="duas-banner-footer">
                  <span>عدد الأذكار المتاحة: <b>{currentCategory.duas.length} ذكراً</b></span>
                  <span>وقت القراءة المقدر: <b>{Math.max(2, Math.round(currentCategory.duas.length * 0.8))} دقائق</b></span>
                </div>
              </div>
            )}

            {/* Dua Cards List */}
            <div className="duas-cards-stack">
              {visibleDuas.map((dua, index) => {
                const currentCount = duaCounts[dua.id] || 0;
                const isCompleted = currentCount >= dua.count;
                const isCopied = copiedId === dua.id;
                const isPlaying = playingId === dua.id;

                return (
                  <article
                    key={dua.id}
                    className={`duas-card ${dua.highlight ? 'highlight-card' : ''}`}
                  >
                    {/* Ribbon badge if highlighted */}
                    {dua.ribbon && (
                      <div className="duas-ribbon-badge">
                        {dua.ribbon}
                      </div>
                    )}

                    {/* Card Top Bar */}
                    <div className="duas-card-top-bar">
                      <div className="duas-card-identity">
                        <span className={`duas-card-badge-num ${dua.highlight ? 'gold-badge' : ''}`}>
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="duas-card-heading">
                            <span>{dua.title}</span>
                            {dua.isCrown && <i className="fa-solid fa-crown text-gold"></i>}
                          </h3>
                          {dua.sub && <span className="duas-card-sub">{dua.sub}</span>}
                        </div>
                      </div>

                      {/* Quick Actions (Audio / Copy / Share) */}
                      <div className="duas-card-quick-actions">
                        <button
                          type="button"
                          className={`duas-action-icon-btn ${isPlaying ? 'active-audio' : ''}`}
                          title={isPlaying ? 'إيقاف الصوت' : 'استماع'}
                          onClick={() => handlePlayAudio(dua.arabic, dua.id)}
                        >
                          <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-volume-high'}`}></i>
                        </button>
                        <button
                          type="button"
                          className={`duas-action-icon-btn ${isCopied ? 'copied' : ''}`}
                          title="نسخ الذكر"
                          onClick={() => handleCopy(dua.arabic, dua.id)}
                        >
                          <i className={`fa-${isCopied ? 'solid fa-check' : 'regular fa-copy'}`}></i>
                        </button>
                        <button
                          type="button"
                          className="duas-action-icon-btn"
                          title="مشاركة"
                          onClick={() => handleShare(dua.title, dua.arabic)}
                        >
                          <i className="fa-solid fa-share-nodes"></i>
                        </button>
                      </div>
                    </div>

                    {/* Dua Arabic Text */}
                    <div className="duas-card-body-text">
                      <p className="duas-arabic-naskh">
                        {dua.arabic}
                      </p>
                    </div>

                    {/* Source & Virtue info box */}
                    {dua.source && (
                      <div className="duas-source-benefit-box">
                        <div className="duas-source-item">
                          <i className="fa-solid fa-book-bookmark"></i>
                          <b>المصدر:</b>
                          <span>{dua.source}</span>
                        </div>
                        {dua.benefit && (
                          <div className="duas-benefit-pill">
                            <i className="fa-solid fa-shield-halved"></i>
                            <span>{dua.benefit}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Special Virtue Highlight Box */}
                    {dua.benefitBox && (
                      <div className="duas-virtue-highlight-box">
                        <div className="duas-virtue-content">
                          <i className="fa-solid fa-star text-gold"></i>
                          <div>
                            <strong>{dua.benefitBox.title}</strong>
                            <span>{dua.benefitBox.text}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Card Bottom Counter / Action */}
                    <div className="duas-card-bottom-bar">
                      <div className="duas-card-repeat-meta">
                        {dua.count > 1 ? (
                          <>
                            <i className="fa-solid fa-repeat text-gold"></i>
                            <span>التكرار المستحب: <b>{dua.count} مرات</b></span>
                          </>
                        ) : (
                          <span>عدد المرات المطلوبة: <b>1</b></span>
                        )}
                      </div>

                      <div className="duas-card-counter-actions">
                        {/* Dot indicator if multi-count */}
                        {dua.count > 1 && (
                          <div className="duas-dot-indicators">
                            {Array.from({ length: dua.count }).map((_, i) => (
                              <span
                                key={i}
                                className={`duas-count-dot ${i < currentCount ? 'filled' : ''}`}
                              ></span>
                            ))}
                          </div>
                        )}

                        {/* Interactive Counter / Completion Button */}
                        <button
                          type="button"
                          className={`duas-counter-trigger-btn ${isCompleted ? 'completed' : ''} ${dua.highlight && isCompleted ? 'gold-btn' : ''}`}
                          onClick={() => handleIncrement(dua.id, dua.count)}
                        >
                          <i className={`fa-solid ${isCompleted ? 'fa-check' : dua.count > 1 ? 'fa-hand-pointer' : 'fa-check'}`}></i>
                          <span>
                            {isCompleted
                              ? `تمت القراءة (${currentCount}/${dua.count})`
                              : dua.count > 1
                              ? `انقر للتسبيح (${currentCount} / ${dua.count})`
                              : `تسجيل قراءة (0 / 1)`}
                          </span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Load More Button */}
            {!showAll && remainingCount > 0 && (
              <div className="duas-load-more-section">
                <button
                  type="button"
                  className="duas-load-more-btn"
                  onClick={() => setShowAll(true)}
                >
                  <span>عرض بقية {currentCategory.name} ({remainingCount} ذكراً متبقياً)</span>
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
              </div>
            )}

            {filteredDuas.length === 0 && (
              <div className="duas-empty-state">
                <i className="fa-solid fa-magnifying-glass"></i>
                <h3>لا توجد نتائج مطابقة لبحثك</h3>
                <p>جرّب البحث بكلمات أخرى أو اختر تصنيفاً من القائمة الجانبية.</p>
              </div>
            )}
          </div>

          {/* LEFT / SIDEBAR COLUMN (Categories & Daily Progress) */}
          <aside className="duas-sidebar-column">
            <div className="duas-sidebar-sticky-card">
              {/* Sidebar Header */}
              <div className="duas-sidebar-header">
                <div className="duas-sidebar-title-wrap">
                  <span className="duas-sidebar-accent-bar"></span>
                  <h2 className="duas-sidebar-title">تصنيفات الأدعية</h2>
                </div>
                <span className="duas-sidebar-badge-total">{displayedCategories.length} أبواب</span>
              </div>

              {/* Categories Navigation */}
              <nav className="duas-category-nav" aria-label="أقسام الأدعية">
                {displayedCategories.map(cat => {
                  const isActive = selectedCategoryId === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`duas-category-nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedCategoryId(cat.id);
                        setShowAll(false);
                      }}
                    >
                      <div className="duas-cat-item-info">
                        <span className="duas-cat-icon">{cat.icon}</span>
                        <span className="duas-cat-name">{cat.name}</span>
                      </div>
                      <div className="duas-cat-item-meta">
                        {isActive && (
                          <span className="duas-cat-active-pill">نشط</span>
                        )}
                        <span className={`duas-cat-count-pill ${isActive ? 'active-count' : ''}`}>
                          {cat.duas.length}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Daily Progress Widget */}
              <div className="duas-daily-goal-box">
                <div className="duas-daily-goal-header">
                  <span className="duas-goal-title">
                    <i className="fa-solid fa-chart-line text-gold"></i>
                    <span>ورد الأذكار لليوم</span>
                  </span>
                  <span className="duas-goal-percentage">{progressPercent}%</span>
                </div>
                <div className="duas-goal-bar-track">
                  <div
                    className="duas-goal-bar-fill"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <p className="duas-goal-desc">
                  {completedDuasCount >= DAILY_GOAL
                    ? '🎉 ما شاء الله! أتممت الورد اليومي بالكامل.'
                    : `أكملت قراءة ${completedDuasCount} أذكار من أصل ${DAILY_GOAL} مستهدفة لهذا اليوم.`}
                </p>
              </div>

              {/* Printable PDF Link */}
              <div className="duas-pdf-download-wrap">
                <a
                  href="#download-pdf"
                  className="duas-pdf-action-link"
                  onClick={handlePrintPDF}
                  title="طباعة أو تحميل كـ PDF"
                >
                  <i className="fa-solid fa-file-pdf"></i>
                  <span>تحميل مطوية أذكار الصباح والمساء (PDF)</span>
                </a>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}

export default DuasPage;
