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
      eyebrow: "ventajas en obra",
      footnote: "230V / 400V · normativa REBT al día · aviso de avería 24/7",
      cardWork: {
        title: "Instalaciones que pasan la inspección a la primera",
        description:
          "Cableado nuevo, ampliaciones y cuadros dados de alta, con la normativa siempre al día.",
        statusLabel: "Boletín incluido",
      },
      cardStats: {
        number: "02",
        title: "Un solo técnico",
        subtitle: "de la primera llamada al boletín final",
        stat1Label: "años de oficio",
        stat1Value: "12",
        stat2Label: "instalaciones",
        stat2Value: "600+",
        text: "Sin subcontratas ni intermediarios: quien coge el teléfono es quien abre el cuadro.",
      },
      cardRegions: {
        label: "cobertura",
        heading: "Marbella y alrededores.",
        tags: ["Marbella", "Puerto Banús", "San Pedro", "Nueva Andalucía", "Elviria"],
      },
    },
    quiz: {
      heading: "¿Qué necesitas? Te lo decimos en 45 segundos.",
      hint: "Tarda menos de 1 minuto",
      steps: [
        {
          question: "¿Qué tipo de inmueble es?",
          options: [
            { label: "Piso o vivienda", tag: "Vivienda" },
            { label: "Casa unifamiliar", tag: "Vivienda" },
            { label: "Local u oficina", tag: "Negocio" },
            { label: "Obra nueva, sin acabar", tag: "Obra" },
          ],
        },
        {
          question: "¿Qué necesitas hacer?",
          options: [
            { label: "Instalación nueva", tag: "Instalación" },
            { label: "Domótica y automatización", tag: "Domótica" },
            { label: "Cuadro y protecciones", tag: "Cuadro" },
            { label: "Avería o reparación urgente", tag: "Avería" },
          ],
        },
        {
          question: "¿Qué superficie tiene?",
          options: [
            { label: "Menos de 50 m²", tag: "Compacto" },
            { label: "50–100 m²", tag: "Medio" },
            { label: "100–200 m²", tag: "Amplio" },
            { label: "Más de 200 m²", tag: "Grande" },
          ],
        },
        {
          question: "¿Cuándo quieres empezar?",
          options: [
            { label: "Es urgente", tag: "Urgente" },
            { label: "Esta semana", tag: "Semana" },
            { label: "Este mes", tag: "Mes" },
            { label: "Todavía comparando", tag: "Comparando" },
          ],
        },
      ],
      final: {
        heading: "Cuéntanos cómo contactarte",
        subtitle:
          "Te llamamos hoy mismo con un presupuesto orientativo, sin compromiso.",
        namePlaceholder: "Nombre",
        phonePlaceholder: "Teléfono o WhatsApp",
        submit: "Enviar solicitud",
        submitting: "Enviando…",
        consent:
          "Al enviar, aceptas que te contactemos sobre tu solicitud.",
        errorName: "Escribe tu nombre",
        errorPhone: "Revisa el número de teléfono",
      },
      thanks: {
        badge: "solicitud recibida",
        heading: "Gracias, ya lo tenemos",
        subtitle:
          "Te llamamos en breve para concretar los detalles y darte un presupuesto orientativo.",
      },
      back: "atrás",
      next: "siguiente",
      pick: "elegir",
    },
    about: {
      eyebrow: "quién hay detrás",
      heading: "Un técnico, no una centralita.",
      subtitle:
        "Marbella, España. Aquí se coge el teléfono, se pasa presupuesto y se abre el cuadro — la misma persona, de principio a fin.",
      founder: {
        name: "Javier Molina",
        role: "electricista autorizado, Marbella",
      },
      quoteKicker: "en primera persona",
      quote:
        "No dejo una instalación que no pondría en mi propia casa. Por eso reviso cada cuadro yo mismo antes de cerrarlo.",
      paragraph:
        "Hago instalaciones nuevas, domótica, cuadros y averías para viviendas, locales y comunidades en Marbella y alrededores. Cada aviso lo atiendo yo, sin subcontratas ni intermediarios entre tú y el trabajo.",
      pillars: [
        { title: "Un solo técnico" },
        { title: "Todo con boletín" },
        { title: "Presupuesto cerrado" },
        { title: "Cobertura en Marbella" },
      ],
    },
    contacts: {
      eyebrow: "contacto directo",
      heading: "Escríbeme o pide el presupuesto.",
      badge: "respondo en 15 minutos",
      statusLine: "Marbella y alrededores · 09:00–20:00",
      quizLink: "¿Prefieres el cuestionario de 45 segundos?",
      channels: {
        call: { label: "Teléfono", note: "Llamada directa, sin centralita" },
        whatsapp: { label: "WhatsApp", note: "La forma más rápida de escribirme" },
        email: { label: "Email", note: "Para presupuestos por escrito" },
      },
      form: {
        nameLabel: "Nombre",
        namePlaceholder: "¿Cómo te llamas?",
        phoneLabel: "Teléfono",
        phonePlaceholder: "+34 6XX XXX XXX",
        taskLabel: "¿Qué necesitas? (opcional)",
        taskPlaceholder: "Cuéntame brevemente el trabajo",
        submit: "Calcular presupuesto",
        submitting: "Enviando…",
        errorName: "Escribe tu nombre (mínimo 2 letras)",
        errorPhone: "Formato: +34 seguido de 9 dígitos",
        consentPrefix: "Al enviar, aceptas el ",
        consentLinkText: "tratamiento de tus datos",
        consentSuffix: " para poder contactarte.",
      },
      thanks: {
        heading: "Recibido, gracias",
        subtitle: "Te contacto en breve para concretar el presupuesto.",
        whatsappCta: "O escríbeme ya por WhatsApp",
      },
    },
    footer: {
      cities: ["Marbella", "Puerto Banús", "San Pedro", "Nueva Andalucía", "Elviria"],
      tagline:
        "Salida de urgencia 24/7 · electricista colegiado · sin pagos ocultos.",
      phoneLabel: "teléfono",
      callCta: "Llamar",
      whatsappCta: "WhatsApp",
      addressLabel: "zona de trabajo",
      address: "Marbella, España",
      copyright: "© 2026 Voltia",
      nif: "NIF 12345678A",
      privacyLink: "política de privacidad",
      legalLink: "aviso legal",
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
      eyebrow: "advantages on the job",
      footnote: "230V / 400V · code-compliant wiring · 24/7 call-out for faults",
      cardWork: {
        title: "Installations that pass inspection on the first try",
        description:
          "New wiring, extensions and registered panels, always up to code.",
        statusLabel: "Paperwork included",
      },
      cardStats: {
        number: "02",
        title: "One technician",
        subtitle: "from the first call to the final paperwork",
        stat1Label: "years in the trade",
        stat1Value: "12",
        stat2Label: "installations",
        stat2Value: "600+",
        text: "No subcontractors, no middlemen: whoever answers the phone is the one who opens the panel.",
      },
      cardRegions: {
        label: "coverage",
        heading: "Marbella and surrounding areas.",
        tags: ["Marbella", "Puerto Banús", "San Pedro", "Nueva Andalucía", "Elviria"],
      },
    },
    quiz: {
      heading: "What do you need? We'll tell you in 45 seconds.",
      hint: "Takes under a minute",
      steps: [
        {
          question: "What kind of property is it?",
          options: [
            { label: "Apartment or flat", tag: "Home" },
            { label: "Detached house", tag: "Home" },
            { label: "Office or storefront", tag: "Business" },
            { label: "New build, unfinished", tag: "New build" },
          ],
        },
        {
          question: "What do you need done?",
          options: [
            { label: "New installation", tag: "Installation" },
            { label: "Smart home automation", tag: "Automation" },
            { label: "Panel & protection", tag: "Panel" },
            { label: "Urgent repair or fault", tag: "Repair" },
          ],
        },
        {
          question: "What's the floor area?",
          options: [
            { label: "Under 50 m²", tag: "Compact" },
            { label: "50–100 m²", tag: "Medium" },
            { label: "100–200 m²", tag: "Spacious" },
            { label: "Over 200 m²", tag: "Large" },
          ],
        },
        {
          question: "When do you want to start?",
          options: [
            { label: "It's urgent", tag: "Urgent" },
            { label: "This week", tag: "This week" },
            { label: "This month", tag: "This month" },
            { label: "Still comparing", tag: "Comparing" },
          ],
        },
      ],
      final: {
        heading: "Tell us how to reach you",
        subtitle:
          "We'll call you today with a ballpark quote, no strings attached.",
        namePlaceholder: "Name",
        phonePlaceholder: "Phone or WhatsApp",
        submit: "Send request",
        submitting: "Sending…",
        consent: "By sending, you agree to be contacted about your request.",
        errorName: "Enter your name",
        errorPhone: "Check your phone number",
      },
      thanks: {
        badge: "request received",
        heading: "Thanks, we've got it",
        subtitle:
          "We'll call you shortly to nail down the details and give you a ballpark quote.",
      },
      back: "back",
      next: "next",
      pick: "select",
    },
    about: {
      eyebrow: "who's behind it",
      heading: "One technician, not a call center.",
      subtitle:
        "Marbella, Spain. The person who picks up the phone, quotes the job and opens the panel is the same one, start to finish.",
      founder: {
        name: "Javier Molina",
        role: "licensed electrician, Marbella",
      },
      quoteKicker: "in his own words",
      quote:
        "I won't leave an installation I wouldn't put in my own home. That's why I check every panel myself before closing the job.",
      paragraph:
        "I handle new wiring, smart-home automation, panels and repairs for homes, businesses and communities in Marbella and surrounding areas. Every call-out is mine to handle — no subcontractors between you and the work.",
      pillars: [
        { title: "One technician" },
        { title: "Always certified" },
        { title: "Fixed quote" },
        { title: "Marbella coverage" },
      ],
    },
    contacts: {
      eyebrow: "direct contact",
      heading: "Write to me or get a quote.",
      badge: "I reply within 15 minutes",
      statusLine: "Marbella and surroundings · 09:00–20:00",
      quizLink: "Prefer the 45-second questionnaire?",
      channels: {
        call: { label: "Phone", note: "Direct call, no call center" },
        whatsapp: { label: "WhatsApp", note: "The fastest way to reach me" },
        email: { label: "Email", note: "For written quotes" },
      },
      form: {
        nameLabel: "Name",
        namePlaceholder: "What's your name?",
        phoneLabel: "Phone",
        phonePlaceholder: "+34 6XX XXX XXX",
        taskLabel: "What do you need? (optional)",
        taskPlaceholder: "Briefly describe the job",
        submit: "Get a quote",
        submitting: "Sending…",
        errorName: "Enter your name (min 2 letters)",
        errorPhone: "Format: +34 followed by 9 digits",
        consentPrefix: "By sending, you accept the ",
        consentLinkText: "processing of your data",
        consentSuffix: " so we can contact you.",
      },
      thanks: {
        heading: "Got it, thank you",
        subtitle: "I'll reach out shortly to work out the quote.",
        whatsappCta: "Or message me now on WhatsApp",
      },
    },
    footer: {
      cities: ["Marbella", "Puerto Banús", "San Pedro", "Nueva Andalucía", "Elviria"],
      tagline:
        "24/7 emergency call-out · licensed electrician · no hidden fees.",
      phoneLabel: "phone",
      callCta: "Call",
      whatsappCta: "WhatsApp",
      addressLabel: "service area",
      address: "Marbella, Spain",
      copyright: "© 2026 Voltia",
      nif: "Tax ID 12345678A",
      privacyLink: "privacy policy",
      legalLink: "legal notice",
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
      eyebrow: "преимущества в работе",
      footnote: "230В / 400В · монтаж по нормам REBT · выезд на аварию 24/7",
      cardWork: {
        title: "Проводка, которая проходит проверку с первого раза",
        description:
          "Новые линии, расширения сети и щиты с документами — по действующим нормам.",
        statusLabel: "С документами",
      },
      cardStats: {
        number: "02",
        title: "Один мастер",
        subtitle: "от первого звонка до итоговых документов",
        stat1Label: "лет в профессии",
        stat1Value: "12",
        stat2Label: "объектов",
        stat2Value: "600+",
        text: "Без субподрядчиков и посредников: кто берёт трубку, тот и открывает щит.",
      },
      cardRegions: {
        label: "зона работы",
        heading: "Марбелья и окрестности.",
        tags: ["Марбелья", "Пуэрто-Банус", "Сан-Педро", "Нуэва-Андалусия", "Эльвирия"],
      },
    },
    quiz: {
      heading: "Что нужно? Скажем за 45 секунд.",
      hint: "Займёт меньше минуты",
      steps: [
        {
          question: "Какой это объект?",
          options: [
            { label: "Квартира", tag: "Жильё" },
            { label: "Частный дом", tag: "Жильё" },
            { label: "Офис или помещение", tag: "Бизнес" },
            { label: "Новостройка без отделки", tag: "Новостройка" },
          ],
        },
        {
          question: "Что нужно сделать?",
          options: [
            { label: "Новая проводка", tag: "Проводка" },
            { label: "Умный дом и автоматизация", tag: "Умный дом" },
            { label: "Щит и защита", tag: "Щит" },
            { label: "Авария, нужен срочный ремонт", tag: "Авария" },
          ],
        },
        {
          question: "Какая площадь?",
          options: [
            { label: "До 50 м²", tag: "Компактно" },
            { label: "50–100 м²", tag: "Средне" },
            { label: "100–200 м²", tag: "Просторно" },
            { label: "Более 200 м²", tag: "Крупно" },
          ],
        },
        {
          question: "Когда хотите начать?",
          options: [
            { label: "Срочно", tag: "Срочно" },
            { label: "На этой неделе", tag: "Неделя" },
            { label: "В этом месяце", tag: "Месяц" },
            { label: "Пока сравниваю", tag: "Сравниваю" },
          ],
        },
      ],
      final: {
        heading: "Как с вами связаться",
        subtitle:
          "Перезвоним сегодня же и назовём примерную стоимость, без обязательств.",
        namePlaceholder: "Имя",
        phonePlaceholder: "Телефон или WhatsApp",
        submit: "Отправить заявку",
        submitting: "Отправляем…",
        consent: "Отправляя заявку, вы соглашаетесь на обработку данных.",
        errorName: "Введите имя",
        errorPhone: "Проверьте номер телефона",
      },
      thanks: {
        badge: "заявка принята",
        heading: "Спасибо, заявка у нас",
        subtitle:
          "Перезвоним в ближайшее время, уточним детали и назовём стоимость.",
      },
      back: "назад",
      next: "далее",
      pick: "выбрать",
    },
    about: {
      eyebrow: "кто за этим стоит",
      heading: "Один мастер, а не колл-центр.",
      subtitle:
        "Марбелья, Испания. Трубку берёт, смету считает и щит открывает один и тот же человек — от начала до конца.",
      founder: {
        name: "Хавьер Молина",
        role: "электрик с лицензией, Марбелья",
      },
      quoteKicker: "от первого лица",
      quote:
        "Не оставляю проводку, которую не поставил бы в собственном доме. Поэтому каждый щит проверяю лично, прежде чем закрыть объект.",
      paragraph:
        "Занимаюсь новой проводкой, умным домом, щитами и авариями в квартирах, домах и офисах в Марбелье и окрестностях. Каждый вызов веду сам, без субподрядчиков между вами и работой.",
      pillars: [
        { title: "Один мастер" },
        { title: "Всё с документами" },
        { title: "Смета без сюрпризов" },
        { title: "Работаю по Марбелье" },
      ],
    },
    contacts: {
      eyebrow: "прямая связь",
      heading: "Напишите мне или закажите смету.",
      badge: "отвечаю за 15 минут",
      statusLine: "Марбелья и окрестности · 09:00–20:00",
      quizLink: "Хотите пройти опрос за 45 секунд?",
      channels: {
        call: { label: "Телефон", note: "Прямой звонок, без колл-центра" },
        whatsapp: { label: "WhatsApp", note: "Самый быстрый способ написать" },
        email: { label: "Email", note: "Для сметы в письменном виде" },
      },
      form: {
        nameLabel: "Имя",
        namePlaceholder: "Как вас зовут?",
        phoneLabel: "Телефон",
        phonePlaceholder: "+34 6XX XXX XXX",
        taskLabel: "Что нужно сделать? (необязательно)",
        taskPlaceholder: "Опишите вкратце задачу",
        submit: "Рассчитать смету",
        submitting: "Отправляем…",
        errorName: "Введите имя (минимум 2 буквы)",
        errorPhone: "Формат: +34 и 9 цифр",
        consentPrefix: "Отправляя форму, вы соглашаетесь с ",
        consentLinkText: "обработкой данных",
        consentSuffix: ", чтобы мы могли с вами связаться.",
      },
      thanks: {
        heading: "Заявка получена, спасибо",
        subtitle: "Свяжусь в ближайшее время, чтобы уточнить смету.",
        whatsappCta: "Или напишите сразу в WhatsApp",
      },
    },
    footer: {
      cities: ["Марбелья", "Пуэрто-Банус", "Сан-Педро", "Нуэва-Андалусия", "Эльвирия"],
      tagline:
        "Аварийный выезд 24/7 · электрик с лицензией · без скрытых платежей.",
      phoneLabel: "телефон",
      callCta: "Позвонить",
      whatsappCta: "WhatsApp",
      addressLabel: "зона работы",
      address: "Марбелья, Испания",
      copyright: "© 2026 Voltia",
      nif: "NIF 12345678A",
      privacyLink: "политика конфиденциальности",
      legalLink: "правовая информация",
    },
  },
};
