const data = [
  { name: "body", inherits: null },
  { name: "dominant", inherits: ["body"] },
  { name: "accent", inherits: null },
  { name: "brand", inherits: null },
  { name: "button", inherits: ["accent"] },
  { name: "buttonSecondary", inherits: ["body"] },
  { name: "navbar", inherits: ["dominant", "body"] },
  { name: "slider", inherits: ["body"] },
  { name: "header", inherits: ["dominant", "body"] },
  { name: "subHeader", inherits: ["header", "dominant", "body"] },
  { name: "event", inherits: ["dominant", "body"] },
  { name: "eventLive", inherits: ["event", "body"] },
  { name: "odd", inherits: ["body"] },
  { name: "oddActive", inherits: ["brand"] },
  { name: "showMore", inherits: ["body"] },
  { name: "marketHeader", inherits: ["body", "header"] },
  { name: "collapse", inherits: ["header", "dominant", "body"] },
  { name: "tab", inherits: ["dominant", "body"] },
  { name: "tabActive", inherits: ["tab", "dominant", "body"] },
  { name: "tabSecondaryActive", inherits: ["tab", "dominant", "body"] },
  { name: "menu_1", inherits: ["dominant", "body"] },
  { name: "menu_2", inherits: ["menu_1", "dominant", "body"] },
  { name: "menu_3", inherits: ["menu_2", "menu_1", "dominant", "body"] },
  { name: "input", inherits: ["dominant", "body"] },
  { name: "inputSecondary", inherits: ["input", "dominant", "body"] },
  { name: "filter", inherits: ["input", "dominant", "body"] },
  { name: "tooltip", inherits: ["dominant", "body"] },
  { name: "modal", inherits: ["dominant", "body"] },
  { name: "betSlip", inherits: ["dominant", "body"] },
  { name: "betSlipStake", inherits: ["betSlip", "dominant", "body"] },
  { name: "betSlipInput", inherits: ["betSlip", "dominant", "body"] },
  { name: "betSlipButton", inherits: ["betSlip", "dominant", "body"] },
  { name: "betSlipHeader", inherits: ["betSlip", "dominant", "body"] },
  { name: "betSlipTab", inherits: ["betSlip", "dominant", "body"] },
  { name: "betSlipTabActive", inherits: ["betSlip", "dominant", "body"] },
  { name: "tmLogo", inherits: ["dominant", "body"] },
];
let builderConfig = {
  light: {
    body: {
      Background: {
        color: "#e5e5e5",
        isActive: true,
        isDark: true,
      },
      Text: {
        color: "#000",
      },
    },
    dominant: {
      Background: {
        isActive: true,
        color: "#999999",
        isDark: true,
      },
      Text: {
        color: "#000",
      },
    },
    accent: {
      Background: {
        color: "#bd5726",
        isActive: true,
      },
      Text: {
        color: "#ffffff",
      },
    },
    brand: {
      Background: {
        color: "#5ea2c9",
        isActive: true,
      },
      Text: {
        color: "#ffffff",
      },
    },
  },
  dark: {
    body: {
      Background: {
        color: "#222222 ",
        isActive: true,
        isDark: false,
      },
      Text: {
        color: "#ffffff",
      },
    },
    accent: {
      Background: {
        color: "#4173a6",
        isActive: true,
      },
      Text: {
        color: "#fff",
      },
    },
    brand: {
      Background: {
        color: "#5b9dcd",
        isActive: true,
      },
      Text: {
        color: "#fff",
      },
    },
  },
  other: {
    body: {
      Background: {
        color: "#2b2b45 ",
        isDark: !tinycolor("#2b2b45").isDark(),
      },
      Text: {
        color: "#fff",
      },
    },
    dominant: {
      Background: {
        color: "#373a59 ",
        isDark: !tinycolor("#373a59").isDark(),
      },
      Text: {
        color: "#fff",
      },
    },
    accent: {
      Background: {
        color: "#9abaa2",
        isDark: !tinycolor("#9abaa2").isDark(),
      },
      Text: {
        color: "#000",
      },
    },
    brand: {
      Background: {
        color: "#c8ab43",
        isDark: !tinycolor("#c8ab43").isDark(),
      },
      Text: {
        color: "#000",
      },
    },
  },
};
