import type { Translations } from "./types";

export const translations: Translations = {
  es: {
    meta: { htmlLang: "es" },
    header: {
      logo: "voltia",
      nav: ["servicios", "proyectos", "contacto"],
      cta: "pedir presupuesto",
    },
    hero: {
      badge: "electricista autónomo · colegiado",
      titleLine1: "La corriente,",
      titleLine2: "bajo control.",
      subtitle:
        "Instalaciones, domótica y mantenimiento eléctrico para viviendas y locales. Un solo técnico, de principio a fin, sin intermediarios.",
      stats: [
        { value: "12", label: "años de oficio" },
        { value: "600+", label: "instalaciones entregadas" },
      ],
    },
    features: {
      eyebrow: "lo que hacemos",
      heading: "Servicios pensados para durar.",
      cta: "saber más",
      items: [
        {
          title: "Instalaciones eléctricas",
          description:
            "Cableado nuevo, ampliaciones y boletines, con la normativa siempre al día.",
        },
        {
          title: "Domótica y automatización",
          description:
            "Ilumina, climatiza y controla tu casa entera desde el móvil.",
        },
        {
          title: "Cuadros y protecciones",
          description:
            "Cuadros certificados que cortan antes de que falle nada.",
        },
        {
          title: "Mantenimiento y averías",
          description:
            "Revisiones periódicas y respuesta rápida ante cualquier avería.",
        },
      ],
    },
    quiz: {
      eyebrow: "diagnóstico rápido",
      heading: "¿Qué necesitas? Te lo decimos en 45 segundos.",
      steps: [
        {
          question: "¿Qué necesitas resolver?",
          options: [
            "Instalación nueva",
            "Domótica y automatización",
            "Cuadro eléctrico y protecciones",
            "Avería o reparación urgente",
            "Aún no lo sé, quiero asesoría",
          ],
        },
        {
          question: "¿Qué tipo de inmueble es?",
          options: [
            "Piso o vivienda",
            "Casa unifamiliar",
            "Local u oficina",
            "Obra nueva, sin acabar",
          ],
        },
        {
          question: "¿Qué superficie tiene?",
          options: [
            "Menos de 50 m²",
            "50–100 m²",
            "100–200 m²",
            "Más de 200 m²",
          ],
        },
        {
          question: "¿Qué es lo más importante para ti?",
          options: [
            "El precio más ajustado",
            "La rapidez",
            "La garantía y el acabado",
            "El boletín en regla",
          ],
        },
        {
          question: "¿Cuándo quieres empezar?",
          options: [
            "Es urgente",
            "Esta semana",
            "Este mes",
            "Todavía comparando",
          ],
        },
      ],
      final: {
        eyebrow: "último paso",
        heading: "Cuéntanos cómo contactarte",
        subtitle:
          "Te llamamos hoy mismo con un presupuesto orientativo, sin compromiso.",
        phonePlaceholder: "Teléfono",
        emailPlaceholder: "Correo electrónico",
        commentPlaceholder: "Cuéntanos algo más (opcional)",
        submit: "Enviar solicitud",
        submitting: "Enviando…",
        consent:
          "Al enviar, aceptas que te contactemos sobre tu solicitud.",
        errorPhone: "Revisa el número de teléfono",
        errorEmail: "Revisa el correo electrónico",
      },
      thanks: {
        badge: "solicitud recibida",
        heading: "Gracias, ya lo tenemos",
        subtitle:
          "Te llamamos en breve para concretar los detalles y darte un presupuesto orientativo.",
      },
      back: "atrás",
      next: "siguiente",
    },
    about: {
      eyebrow: "quién hay detrás",
      heading: "Un técnico, no una centralita.",
      subtitle:
        "Costa del Sol. Aquí se coge el teléfono, se pasa presupuesto y se abre el cuadro — la misma persona, de principio a fin.",
      founder: {
        name: "Javier Molina",
        role: "electricista fundador",
        since: "en el oficio desde 2014",
      },
      quoteKicker: "en primera persona",
      quote:
        "No dejo una instalación que no pondría en mi propia casa. Por eso reviso cada cuadro yo mismo antes de cerrarlo.",
      paragraph1:
        "Hago instalaciones nuevas, domótica, cuadros y averías para viviendas, locales y comunidades en toda la Costa del Sol. Cada aviso lo atiendo yo, sin subcontratas ni intermediarios entre tú y el trabajo.",
      paragraph2:
        "El presupuesto y el plazo quedan cerrados antes de tocar un solo cable. Y si algo falla después, la llamada me llega a mí, no a un centralita.",
      pillars: [
        {
          title: "Un solo técnico",
          text: "De la primera visita al boletín final, siempre la misma persona. Nada de subcontratas de última hora.",
        },
        {
          title: "Todo con boletín",
          text: "Instalaciones dadas de alta y con la normativa de Industria al día, sin sorpresas en la inspección.",
        },
        {
          title: "Presupuesto cerrado",
          text: "Precio y plazo por escrito antes de empezar. Lo que se firma es lo que se paga.",
        },
        {
          title: "Cobertura Costa del Sol",
          text: "Me desplazo a toda la zona, con hueco para urgencias fuera de horario.",
        },
      ],
    },
    contacts: {
      eyebrow: "hablemos",
      heading: "Cuéntame qué necesitas",
      subtitle:
        "Llamada, WhatsApp o correo — respondo yo directamente, el mismo día.",
      channels: [
        {
          label: "llamada",
          value: "+34 602 684 006",
          note: "de lunes a sábado, 8:00–20:00",
        },
        {
          label: "whatsapp",
          value: "+34 602 684 006",
          note: "fotos del cuadro o la avería, respuesta rápida",
        },
        {
          label: "correo",
          value: "info@voltia.es",
          note: "presupuestos, boletines y documentación",
        },
      ],
      place: {
        kicker: "zona de trabajo",
        area: "Costa del Sol, España",
        note: "Sin oficina física — trabajo desplazándome directamente a cada dirección. El mapa de cobertura lo añadimos en breve.",
        hoursLabel: "horario",
        hours: "lun–sáb, 8:00–20:00",
        mapLabel: "urgencias",
        mapNote: "servicio 24/7 para averías",
      },
    },
  },
  en: {
    meta: { htmlLang: "en" },
    header: {
      logo: "voltia",
      nav: ["services", "projects", "contact"],
      cta: "get a quote",
    },
    hero: {
      badge: "independent electrician · licensed",
      titleLine1: "Power,",
      titleLine2: "under control.",
      subtitle:
        "Wiring, smart-home automation and electrical upkeep for homes and businesses. One technician, start to finish, no middlemen.",
      stats: [
        { value: "12", label: "years in the trade" },
        { value: "600+", label: "installations delivered" },
      ],
    },
    features: {
      eyebrow: "what we do",
      heading: "Services built to last.",
      cta: "learn more",
      items: [
        {
          title: "Wiring & installations",
          description:
            "New circuits, extensions and certified paperwork, done right.",
        },
        {
          title: "Smart home automation",
          description:
            "Control lighting, heating and every device from your phone.",
        },
        {
          title: "Panels & protection",
          description:
            "Certified switchboards that cut power before anything fails.",
        },
        {
          title: "Maintenance & repairs",
          description:
            "Scheduled check-ups and fast response when something breaks.",
        },
      ],
    },
    quiz: {
      eyebrow: "quick diagnosis",
      heading: "What do you need? We'll tell you in 45 seconds.",
      steps: [
        {
          question: "What do you need solved?",
          options: [
            "New installation",
            "Smart home automation",
            "Panel & protection",
            "Urgent repair or fault",
            "Not sure yet, I need advice",
          ],
        },
        {
          question: "What kind of property is it?",
          options: [
            "Apartment or flat",
            "Detached house",
            "Office or storefront",
            "New build, unfinished",
          ],
        },
        {
          question: "What's the floor area?",
          options: [
            "Under 50 m²",
            "50–100 m²",
            "100–200 m²",
            "Over 200 m²",
          ],
        },
        {
          question: "What matters most to you?",
          options: [
            "The tightest price",
            "Speed",
            "Warranty and finish",
            "Certified paperwork",
          ],
        },
        {
          question: "When do you want to start?",
          options: ["It's urgent", "This week", "This month", "Still comparing"],
        },
      ],
      final: {
        eyebrow: "last step",
        heading: "Tell us how to reach you",
        subtitle:
          "We'll call you today with a ballpark quote, no strings attached.",
        phonePlaceholder: "Phone number",
        emailPlaceholder: "Email address",
        commentPlaceholder: "Anything else to add (optional)",
        submit: "Send request",
        submitting: "Sending…",
        consent: "By sending, you agree to be contacted about your request.",
        errorPhone: "Check your phone number",
        errorEmail: "Check your email address",
      },
      thanks: {
        badge: "request received",
        heading: "Thanks, we've got it",
        subtitle:
          "We'll call you shortly to nail down the details and give you a ballpark quote.",
      },
      back: "back",
      next: "next",
    },
    about: {
      eyebrow: "who's behind it",
      heading: "One technician, not a call center.",
      subtitle:
        "Costa del Sol. The person who picks up the phone, quotes the job and opens the panel is the same one, start to finish.",
      founder: {
        name: "Javier Molina",
        role: "founding electrician",
        since: "in the trade since 2014",
      },
      quoteKicker: "in his own words",
      quote:
        "I won't leave an installation I wouldn't put in my own home. That's why I check every panel myself before closing the job.",
      paragraph1:
        "I handle new wiring, smart-home automation, panels and repairs for homes, businesses and communities across the Costa del Sol. Every call-out is mine to handle — no subcontractors between you and the work.",
      paragraph2:
        "The quote and the timeline are locked in before a single cable is touched. And if something goes wrong afterwards, the call comes to me, not a call center.",
      pillars: [
        {
          title: "One technician",
          text: "From the first visit to the final paperwork, always the same person. No last-minute subcontractors.",
        },
        {
          title: "Always certified",
          text: "Installations registered and up to code, so nothing surprises you at inspection.",
        },
        {
          title: "Fixed quote",
          text: "Price and timeline in writing before work starts. What you sign is what you pay.",
        },
        {
          title: "Costa del Sol coverage",
          text: "I travel across the whole area, with room for out-of-hours emergencies.",
        },
      ],
    },
    contacts: {
      eyebrow: "let's talk",
      heading: "Tell me what you need",
      subtitle:
        "Call, WhatsApp or email — I answer personally, the same day.",
      channels: [
        {
          label: "call",
          value: "+34 602 684 006",
          note: "Monday to Saturday, 8:00–20:00",
        },
        {
          label: "whatsapp",
          value: "+34 602 684 006",
          note: "send photos of the panel or fault, quick reply",
        },
        {
          label: "email",
          value: "info@voltia.es",
          note: "quotes, paperwork and certified documents",
        },
      ],
      place: {
        kicker: "service area",
        area: "Costa del Sol, Spain",
        note: "No physical office — I travel directly to each address. Coverage map coming soon.",
        hoursLabel: "hours",
        hours: "Mon–Sat, 8:00–20:00",
        mapLabel: "emergencies",
        mapNote: "24/7 for faults and outages",
      },
    },
  },
  ru: {
    meta: { htmlLang: "ru" },
    header: {
      logo: "voltia",
      nav: ["услуги", "проекты", "контакты"],
      cta: "рассчитать смету",
    },
    hero: {
      badge: "частный электрик · с лицензией",
      titleLine1: "Электричество",
      titleLine2: "под контролем.",
      subtitle:
        "Монтаж проводки, умный дом и обслуживание электросетей в домах и офисах. Один мастер от начала до конца, без посредников.",
      stats: [
        { value: "12", label: "лет в профессии" },
        { value: "600+", label: "сданных объектов" },
      ],
    },
    features: {
      eyebrow: "чем занимаемся",
      heading: "Услуги, которые служат долго.",
      cta: "подробнее",
      items: [
        {
          title: "Монтаж проводки",
          description:
            "Новые линии и расширения сети — вся документация по нормативам.",
        },
        {
          title: "Умный дом",
          description:
            "Управляйте светом, отоплением и техникой прямо с телефона.",
        },
        {
          title: "Щиты и защита",
          description:
            "Сертифицированные щиты, которые отключаются раньше аварии.",
        },
        {
          title: "Обслуживание и ремонт",
          description:
            "Плановые проверки и быстрый выезд при любой поломке.",
        },
      ],
    },
    quiz: {
      eyebrow: "быстрая диагностика",
      heading: "Что нужно? Скажем за 45 секунд.",
      steps: [
        {
          question: "Что нужно решить?",
          options: [
            "Новая проводка",
            "Умный дом и автоматизация",
            "Электрощит и защита",
            "Авария, нужен срочный ремонт",
            "Пока не знаю, нужна консультация",
          ],
        },
        {
          question: "Какой это объект?",
          options: [
            "Квартира",
            "Частный дом",
            "Офис или помещение",
            "Новостройка без отделки",
          ],
        },
        {
          question: "Какая площадь?",
          options: [
            "До 50 м²",
            "50–100 м²",
            "100–200 м²",
            "Более 200 м²",
          ],
        },
        {
          question: "Что важнее всего?",
          options: [
            "Самая низкая цена",
            "Скорость",
            "Гарантия и качество",
            "Документы и допуски по нормам",
          ],
        },
        {
          question: "Когда хотите начать?",
          options: ["Срочно", "На этой неделе", "В этом месяце", "Пока сравниваю"],
        },
      ],
      final: {
        eyebrow: "последний шаг",
        heading: "Как с вами связаться",
        subtitle:
          "Перезвоним сегодня же и назовём примерную стоимость, без обязательств.",
        phonePlaceholder: "Телефон",
        emailPlaceholder: "Электронная почта",
        commentPlaceholder: "Комментарий (по желанию)",
        submit: "Отправить заявку",
        submitting: "Отправляем…",
        consent: "Отправляя заявку, вы соглашаетесь на обработку данных.",
        errorPhone: "Проверьте номер телефона",
        errorEmail: "Проверьте электронную почту",
      },
      thanks: {
        badge: "заявка принята",
        heading: "Спасибо, заявка у нас",
        subtitle:
          "Перезвоним в ближайшее время, уточним детали и назовём стоимость.",
      },
      back: "назад",
      next: "далее",
    },
    about: {
      eyebrow: "кто за этим стоит",
      heading: "Один мастер, а не колл-центр.",
      subtitle:
        "Коста-дель-Соль, Испания. Трубку берёт, смету считает и щит открывает один и тот же человек — от начала до конца.",
      founder: {
        name: "Хавьер Молина",
        role: "электрик-основатель",
        since: "в профессии с 2014 года",
      },
      quoteKicker: "от первого лица",
      quote:
        "Не оставляю проводку, которую не поставил бы в собственном доме. Поэтому каждый щит проверяю лично, прежде чем закрыть объект.",
      paragraph1:
        "Занимаюсь новой проводкой, умным домом, щитами и авариями в квартирах, домах и офисах по всей Коста-дель-Соль. Каждый вызов веду сам, без субподрядчиков между вами и работой.",
      paragraph2:
        "Смета и сроки фиксируются до того, как тронут первый провод. А если что-то пойдёт не так позже — звонок идёт мне, а не в колл-центр.",
      pillars: [
        {
          title: "Один мастер",
          text: "От первого визита до итоговых документов — всегда один и тот же человек. Никаких субподрядчиков в последний момент.",
        },
        {
          title: "Всё с документами",
          text: "Работы оформлены и соответствуют нормативам — без сюрпризов при проверке.",
        },
        {
          title: "Смета без сюрпризов",
          text: "Цена и срок фиксируются письменно до начала работ. Сколько договорились — столько и платите.",
        },
        {
          title: "Работаю по всей Коста-дель-Соль",
          text: "Выезжаю по всему региону, есть возможность приехать и во внеурочное время.",
        },
      ],
    },
    contacts: {
      eyebrow: "на связи",
      heading: "Расскажите, что нужно",
      subtitle:
        "Звонок, WhatsApp или почта — отвечаю лично, в тот же день.",
      channels: [
        {
          label: "звонок",
          value: "+34 602 684 006",
          note: "с понедельника по субботу, 8:00–20:00",
        },
        {
          label: "whatsapp",
          value: "+34 602 684 006",
          note: "пришлите фото щита или поломки — отвечу быстро",
        },
        {
          label: "почта",
          value: "info@voltia.es",
          note: "сметы, документы и боллетины",
        },
      ],
      place: {
        kicker: "зона работы",
        area: "Коста-дель-Соль, Испания",
        note: "Офиса нет — выезжаю напрямую по каждому адресу. Карту зоны покрытия добавим позже.",
        hoursLabel: "часы работы",
        hours: "пн–сб, 8:00–20:00",
        mapLabel: "аварии",
        mapNote: "выезд 24/7 при авариях",
      },
    },
  },
};
