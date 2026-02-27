const fs = require('fs');

const updateEs = () => {
  const es = JSON.parse(fs.readFileSync('src/content/i18n/es.json', 'utf8'));

  es.hero = {
    title: "Desarrollamos aplicaciones personalizadas para tu negocio",
    tagline: "Tecnología que impulsa tu empresa en la era de la IA.",
    description: "Ahorra tiempo y dinero automatizando procesos con soluciones tecnológicas e Inteligencia Artificial.",
    cta: "Quiero ahorrar tiempo y dinero",
    learnMore: "Habla con un experto",
    badge: "IA · Automatización · Desarrollo"
  };

  es.socialProof = {
    text: "Nuestro equipo ha trabajado con empresas como:"
  };

  es.about = {
    label: "01 — Acerca de",
    title: "Más que una agencia, tu equipo de desarrollo",
    description: "Nacimos porque vivimos en carne propia los dolores de no tener buena tecnología. Entendemos lo frustrante que es.",
    content: "Creamos tecnología de punta, escalable y totalmente personalizada. Vamos más allá de ser solo una agencia; nos convertimos en tu equipo de outsourcing tecnológico (Tech Outsourcing).",
    pillars: "Entendemos tu negocio, sentimos tus dolores como nuestros:",
    pillarItems: [
      {
        name: "Soluciones Personalizadas",
        description: "Proponemos soluciones basadas estrictamente en tus necesidades."
      },
      {
        name: "A la Vanguardia",
        description: "Estamos al día con la investigación y el desarrollo de nuevas tecnologías."
      },
      {
        name: "Es Necesidad, no Lujo",
        description: "Tener software adaptado a tu negocio es indispensable para sobrevivir y crecer."
      }
    ]
  };

  es.solutions = {
    label: "02 — Servicios",
    titlePrefix: "Dinnartec",
    titleHighlight: "Solutions",
    subtitle: "Creamos software a la medida de tu negocio.",
    description: "Hacemos un diagnóstico completo para levantar los problemas actuales y prever los del futuro. Creamos un plan de acción y nos encargamos de toda la implementación.",
    tagline: "En un mundo que cambia rápido, nos mantenemos a la vanguardia, actualizando y mejorando tu software.",
    cta: "Hablemos",
    steps: {
      diagnosis: {
        title: "Diagnóstico",
        description: "Analizamos tu operación para crear un plan de acción concreto e identificar oportunidades."
      },
      sprint: {
        title: "Implementación",
        description: "Ejecutamos el desarrollo y las integraciones, listos para tu negocio."
      },
      support: {
        title: "Evolución Continua",
        description: "Mantenemos, ajustamos y estamos a la vanguardia actualizando tu software."
      }
    },
    examples: {
      title: "Ejemplos de lo que podemos construir:",
      items: [
        "Apps nativas (iOS y Android)",
        "Plataformas de gestión de procesos y operaciones",
        "Integraciones de sistemas y analítica de datos"
      ]
    }
  };

  es.pricing = {
    label: "03 — Precios",
    title: "Planes & Precios",
    subtitle: "Ten tu app funcionando en menos de 3 meses.",
    diagnosis: {
      name: "Por Proyecto",
      description: "Diagnóstico inicial seguido de una implementación a medida.",
      cta: "Comenzar Diagnóstico",
      tiers: {
        diagnosis: {
          name: "Diagnóstico",
          price: "$500",
          duration: "Precio fijo",
          description: "Entendemos tu problema y creamos la hoja de ruta.",
          features: [
            "Entendimiento del negocio",
            "Levantamiento de problemas actuales y futuros",
            "Hoja de ruta tecnológica",
            "Plan de acción y estimación"
          ]
        },
        implementation: {
          name: "Implementación",
          price: "Desde $1,500",
          duration: "Variable",
          description: "El valor final se define con lo que salga en el diagnóstico.",
          features: [
            "Implementación del plan de acción",
            "Desarrollo de software a la medida",
            "Pruebas y aseguramiento de calidad",
            "Lanzamiento y capacitaciones"
          ]
        }
      }
    },
    retainer: {
      name: "Tech Outsourcing",
      description: "Tu equipo de tecnología tercerizado que crece con tu negocio.",
      cta: "Armar mi equipo",
      tiers: {
        base: {
          name: "Equipo Base",
          price: "Desde $3,000/mes",
          duration: "Mensual",
          description: "Incluye un PM y un Developer.",
          features: [
            "1 Project Manager dedicado",
            "1 Developer Senior",
            "Soporte y desarrollo continuo",
            "Escalable según las necesidades"
          ]
        }
      }
    },
    note: "Todos los precios en USD."
  };

  es.factory = {
    label: "04 — Productos",
    titlePrefix: "Dinnartec",
    titleHighlight: "Factory",
    subtitle: "Productos propios creados y listos para usar.",
    description: "Construimos software que el mercado necesita.",
    content: "Toma ventaja de nuestras plataformas establecidas y acelera tus resultados con soluciones probadas.",
    status: "Explora nuestros productos:",
    badge: "Disponibles",
    products: [
      {
        name: "Trives",
        description: "Plataforma integral para el manejo de servicios y comunidades.",
        link: "#trives",
        screenshot: "https://placehold.co/600x400/171717/ededed?text=Trives"
      },
      {
        name: "AF Colombia",
        description: "Plataforma completa para el manejo del backoffice, contabilidad y finanzas.",
        link: "#afcolombia",
        screenshot: "https://placehold.co/600x400/171717/ededed?text=AF+Colombia"
      },
      {
        name: "Real Estate OS",
        description: "Plataforma para manejo de venta de bienes raíces, CRM y más.",
        link: "#realestate",
        screenshot: "https://placehold.co/600x400/171717/ededed?text=Real+Estate+OS"
      }
    ]
  };

  es.contact.form = {
    name: "Nombre",
    whatsapp: "WhatsApp",
    message: "Cuéntanos qué quieres construir o qué problema tienes",
    submit: "Abrir WhatsApp",
    success: "Redirigiendo a WhatsApp...",
    error: "Error"
  };

  // Remove old properties like packages or sprint/retainer from top level if needed
  delete es.pricing.sprint; // Was Silver
  delete es.pricing.packages;

  fs.writeFileSync('src/content/i18n/es.json', JSON.stringify(es, null, 2));
}

const updateEn = () => {
  const en = JSON.parse(fs.readFileSync('src/content/i18n/en.json', 'utf8'));

  en.hero = {
    title: "We develop custom applications for your business",
    tagline: "Technology that drives your company in the AI era.",
    description: "Save time and money by automating processes with tech solutions and Artificial Intelligence.",
    cta: "I want to save time and money",
    learnMore: "Talk to an expert",
    badge: "AI · Automation · Development"
  };

  en.socialProof = {
    text: "Our team has worked with companies like:"
  };

  en.about = {
    label: "01 — About",
    title: "More than an agency, your tech team",
    description: "We started because we experienced firsthand the pain of not having good technology. We know how frustrating it is.",
    content: "That's why we create cutting-edge, scalable, and fully personalized technology. We go beyond being just an agency; we become your outsourced tech team (Tech Outsourcing).",
    pillars: "We understand your business, we feel your pain as our own:",
    pillarItems: [
      {
        name: "Custom Solutions",
        description: "We propose solutions based strictly on your exact needs."
      },
      {
        name: "At the Forefront",
        description: "We are up-to-date with the research and development of new technologies."
      },
      {
        name: "A Necessity, Not a Luxury",
        description: "Having software adapted to your business is indispensable to survive and grow today."
      }
    ]
  };

  en.solutions = {
    label: "02 — Services",
    titlePrefix: "Dinnartec",
    titleHighlight: "Solutions",
    subtitle: "We build software tailored to your business.",
    description: "We run a complete diagnosis to find current problems and foresee future ones. We create an action plan and take care of the entire implementation.",
    tagline: "In a fast-changing world, we stay ahead, constantly updating and upgrading your software.",
    cta: "Let's talk",
    steps: {
      diagnosis: {
        title: "Diagnosis",
        description: "We analyze your operation to create a concrete action plan and identify opportunities."
      },
      sprint: {
        title: "Implementation",
        description: "We execute the development and integrations, ready for your business."
      },
      support: {
        title: "Continuous Evolution",
        description: "We maintain, adjust, and stay at the forefront updating your software."
      }
    },
    examples: {
      title: "Examples of what we can build:",
      items: [
        "Native Apps (iOS and Android)",
        "Process and operations management platforms",
        "Systems integrations and data analytics"
      ]
    }
  };

  en.pricing = {
    label: "03 — Pricing",
    title: "Plans & Pricing",
    subtitle: "Have your app running in less than 3 months.",
    diagnosis: {
      name: "By Project",
      description: "Initial diagnosis followed by a custom implementation.",
      cta: "Start Diagnosis",
      tiers: {
        diagnosis: {
          name: "Diagnosis",
          price: "$500",
          duration: "Fixed price",
          description: "We understand your problem and create the roadmap.",
          features: [
            "Business understanding",
            "Current and future problems assessment",
            "Technology roadmap",
            "Action plan and estimation"
          ]
        },
        implementation: {
          name: "Implementation",
          price: "From $1,500",
          duration: "Variable",
          description: "The final value is defined by the outcome of the diagnosis.",
          features: [
            "Action plan implementation",
            "Custom software development",
            "Testing and quality assurance",
            "Launch and training"
          ]
        }
      }
    },
    retainer: {
      name: "Tech Outsourcing",
      description: "Your outsourced tech team that scales with your business.",
      cta: "Build my team",
      tiers: {
        base: {
          name: "Core Team",
          price: "From $3,000/mo",
          duration: "Monthly",
          description: "Includes a PM and a Developer.",
          features: [
            "1 Dedicated Project Manager",
            "1 Senior Developer",
            "Support and continuous development",
            "Scalable based on your needs"
          ]
        }
      }
    },
    note: "All prices in USD."
  };

  en.factory = {
    label: "04 — Products",
    titlePrefix: "Dinnartec",
    titleHighlight: "Factory",
    subtitle: "Our own products, built and ready to scale.",
    description: "We build software that the market needs.",
    content: "Take advantage of our established platforms and accelerate your results with proven solutions.",
    status: "Explore our products:",
    badge: "Available",
    products: [
      {
        name: "Trives",
        description: "Comprehensive platform for services and community management.",
        link: "#trives",
        screenshot: "https://placehold.co/600x400/171717/ededed?text=Trives"
      },
      {
        name: "AF Colombia",
        description: "Complete solution for back-office, accounting, and finance management.",
        link: "#afcolombia",
        screenshot: "https://placehold.co/600x400/171717/ededed?text=AF+Colombia"
      },
      {
        name: "Real Estate OS",
        description: "Platform for real estate sales management, CRM, and more.",
        link: "#realestate",
        screenshot: "https://placehold.co/600x400/171717/ededed?text=Real+Estate+OS"
      }
    ]
  };

  en.contact.form = {
    name: "Name",
    whatsapp: "WhatsApp",
    message: "Tell us what you want to build or what problem you have",
    submit: "Open WhatsApp",
    success: "Redirecting to WhatsApp...",
    error: "Error"
  };

  delete en.pricing.sprint;
  delete en.pricing.packages;

  fs.writeFileSync('src/content/i18n/en.json', JSON.stringify(en, null, 2));
}

updateEs();
updateEn();
console.log('JSON files updated successfully');
