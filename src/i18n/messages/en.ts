/*
  영어 — 한국어 원본(`ko.ts`)을 옮긴 것. 개발 도구로 옮김 · 원어민 검토 전.
  이름은 앱의 영어 화면과 같은 말을 쓴다(Ddoring Budget · My ledger · Family ledger · Trip ledger · Inbox · Settle up).
  한국어 원본에 없는 사실 둘을 더 적었다 — 내 · 가족 가계부는 원화로만 적고, 결제 알림은 한국 카드사 · 은행 앱만 읽는다.
  한국 밖의 사람이 읽고 오해하지 않게 하려는 것이다.
*/
import type { Messages } from "./ko";

export const en: Messages = {
  site: {
    name: "Ddoring Budget",
    title: "Ddoring Budget — Shared family budget, personal ledger and trip expense splitting",
    description:
      "A shared budget for couples and families, a personal ledger only you see, and a trip ledger that records foreign-currency spending and settles up — all in one app. Budgets, fixed costs, assets and card payment alerts. It shows your money without judging it.",
    shareAlt: "Ddoring Budget — Me, family, trips: three ledgers in one app",
    alternateNames: ["또링 가계부", "Ddoring", "Ttoring Budget"],
    keywords: [
      "Ddoring Budget",
      "budget app",
      "family budget app",
      "couples budget app",
      "shared budget",
      "personal expense tracker",
      "travel expense tracker",
      "trip expense splitting",
      "settle up with friends",
      "fixed costs",
      "monthly budget",
    ],
    featureList: [
      "Shared budget for couples and families",
      "Personal ledger with a monthly budget",
      "Monthly and yearly stats, spending breakdown",
      "Trip ledger with foreign currencies and settle up",
      "Fixed costs and recurring items",
      "Bank accounts, cards and cash",
      "Card payment alerts inbox (Android, Korean card and bank apps)",
      "Excel export and home screen widget",
    ],
  },
  common: {
    skipToMain: "Skip to main content",
    mainNav: "Main menu",
    themeToggle: "Switch light and dark",
    logo: "Ddoring Budget logo",
    language: "Language",
    contact: "Contact",
    help: "Help",
  },
  nav: { ledgers: "Ledgers", features: "Features" },
  legal: {
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    accountDeletion: "Delete account",
    licenses: "Open source licenses",
  },
  platforms: {
    android: { name: "Android", pending: "in beta", storeLabel: "Get it for Android" },
    ios: { name: "iOS", pending: "coming soon", storeLabel: "Get it for iOS" },
  },
  hero: {
    kindsLabel: "Ledger types",
    kinds: { personal: "Me", family: "Family", trip: "Trips" },
    titleFirst: "Me, family, trips:",
    titleEm: "three ledgers",
    titleAfterEm: "",
    titleLast: " in one app",
    lede: "A personal ledger just for you, a shared ledger couples and families settle together, and a trip ledger that records foreign currencies and settles up. It shows your spending without judging it.",
    helpLink: "Read the help ›",
    alts: {
      trip: "Trip ledger example. Daily spending on an Osaka trip, shown in yen and won.",
      family:
        "Family ledger summary example. Total spending for September and the items that changed this month.",
      personal:
        "My ledger records example. ₩578,400 left in the budget and spending grouped by day.",
    },
    chipBudget: "Left in budget",
    chipFree: "A budget app that doesn't nag",
  },
  marquee: {
    label: "What Ddoring Budget does",
    items: {
      budget: "Monthly budget · what's left",
      calendar: "Records on a calendar",
      inbox: "Payment alerts inbox",
      familyFixed: "Family fixed costs",
      familyCalendar: "Family calendar",
      currency: "Foreign currency · today's rate",
      settlement: "Trip settle up",
      assets: "Accounts · cards · cash",
      recurring: "Recurring items",
      tags: "Tags · date notes",
      glance: "Stats at a glance",
      excel: "Export to Excel",
      widget: "Home screen widget",
      theme: "Dark mode · accent colors",
    },
  },
  ledgers: {
    eyebrow: "Three ledgers",
    title: { before: "For each person, ", em: "apart and together", after: "" },
    lede: "Pick the ledger you need inside one app. They never mix.",
    personal: {
      label: "My ledger",
      title: "Small spending is mine alone",
      lede: "Type the amount and save. Set a budget and watch what's left as you spend. Nothing here is shown to your family.",
      points: [
        "Monthly budget, what's left, and records on a calendar",
        "Stats for total spending, income, savings and investments at a glance",
        "Bank accounts, cards and cash, plus recurring items and subscriptions",
        "Tags, date notes and a month that starts on your payday",
      ],
      alts: [
        "My ledger calendar example. Each day shows that day's spending and income.",
        "My ledger assets example. Accounts, cards and cash grouped by type under total assets.",
      ],
    },
    family: {
      label: "Family ledger",
      title: "Only the agreed items, once a month",
      lede: "Enter fixed costs like rent, maintenance fees, phone bills and insurance once, and they're filled in every month. Fix only the lines that changed, submit, and the family's month comes together on one page.",
      points: [
        "A reason field opens only on lines whose amount differs from last month — filling it in is optional",
        "Gathers what each member submitted into the family's summary and trends",
        "See together on the family calendar when fixed costs go out",
        "Even with an invite code, the family owner has to approve new members",
      ],
      alts: [
        "Family ledger entry example. The maintenance fee rose ₩14,000 from last month, so the reason field is open.",
        "Family ledger monthly stats example. October's total spending with the items that changed and the difference.",
      ],
    },
    trip: {
      label: "Trip ledger",
      title: "Record in local currency, settle up at the end",
      lede: "A trip ledger just for you, one per trip. Record in yen, dollars or euros and see the amount in Korean won at today's rate.",
      points: [
        "A trip budget and what's left — setting one is optional",
        "Add companions by name, even without the app, and split what you paid together",
        "Settle up shows who should send how much to whom",
        "Bring your share of the trip into My ledger",
      ],
      alts: [
        "Trip ledger records example. Daily spending on an Osaka trip, shown in yen and won.",
        "Trip stats example. Money spent on the trip, what's left in the budget, and who should send how much to whom.",
      ],
    },
  },
  stats: {
    eyebrow: "Stats",
    title: { before: "This month and this year, ", em: "at a glance", after: "" },
    lede: "It shows what you spent without judging it. The judgment is yours.",
    railLabel: "Stats screen examples",
    cards: {
      glance: {
        label: "Monthly",
        title: "Your month on one page",
        text: "Total spending, income, savings, investments and what's left of the budget on one screen.",
        alt: "Monthly stats example. October's total spending of ₩1,225,700 with income, savings, investments, the monthly budget and what's left.",
      },
      spend: {
        label: "Spending breakdown",
        title: "Where it went",
        text: "See where you spent on a donut by category, or split by card and cash, or by week.",
        alt: "Spending breakdown example. A category donut with what's left of the budget in the middle, and each category's share and amount below.",
      },
      yearly: {
        label: "Yearly",
        title: "The flow of a year",
        text: "Follow spending and income over the last 12 months as a line chart. Pick a category to see just that.",
        alt: "Yearly stats example. Total spending, income and savings for the last 12 months, with monthly spending drawn as a line next to an average line.",
      },
      family: {
        label: "Family stats",
        title: "Where the family's income goes",
        text: "Gathers members' records to show how total income split into spending, savings and investments.",
        alt: "Family yearly stats example. Total spending and income for the last 12 months, and a bar splitting total income into spending, savings, investments and what's left.",
      },
    },
  },
  features: {
    eyebrow: "Features",
    title: { before: "Only what you need, ", em: "switched on when you want", after: "" },
    lede: "Just the amount is enough. Turn on the rest whenever you like.",
    inbox: {
      label: "Payment alerts inbox · Android",
      title: "Collect card and bank alerts",
      text: "Payment alerts from the apps you pick pile up in the inbox. You choose whether to add each one and in which category. You can also have chosen apps recorded automatically. Works with Korean card, bank and pay apps. Alert text never leaves your phone.",
      alts: [
        "Payment alerts inbox example. Alerts from several cards are waiting, and you pick a category to add each.",
        "My ledger records example. Records that came from alerts have a bell mark.",
      ],
    },
    assets: {
      label: "Assets",
      title: "Accounts, cards, cash",
      text: "Account balances are counted from linked records. Cards show only this month's amount due.",
      alt: "Assets example (dark). Total assets with a list of accounts, cards and cash.",
    },
    small: {
      excel: {
        title: "Export to Excel",
        text: "Download My ledger, family and trip ledgers as Excel files.",
      },
      widget: {
        title: "Home screen widget",
        text: "See this month's numbers without opening the app.",
      },
      offline: {
        title: "Works offline",
        text: "My ledger saves on your phone first and uploads once you're connected.",
      },
    },
    subscriptions: {
      label: "Subscriptions",
      title: "Monthly and yearly subscriptions in one place",
      text: "Add a subscription as a recurring item and it's recorded in My ledger on the billing day. Yearly plans are recorded in their billing month, and you can see your active services and the yearly total on one screen. You can add subscriptions to family fixed costs too.",
      alts: [
        "Recurring items example. Money going out each month, payments still due this month, and recurring items like a music plan and photo storage.",
        "Subscribed services example. The yearly total for 7 subscriptions, split into monthly and yearly plans.",
      ],
    },
    theme: {
      label: "Display",
      title: "Dark mode and six accent colors",
      text: "Choose light or dark and the accent color you like.",
      pickerLabel: "Accent color preview",
      accents: {
        blue: "Blue",
        green: "Green",
        purple: "Purple",
        pink: "Pink",
        beige: "Beige",
        mono: "Mono",
      },
      alts: [
        "Monthly stats example with the pink accent. October's total spending and the monthly budget.",
        "Spending breakdown example in dark mode. A category donut and the list below.",
      ],
    },
  },
  promises: {
    eyebrow: "Promises",
    title: "A ledger that only shows",
    lede: "Nobody keeps using a budget app that nags. So here's what we decided not to do.",
    items: [
      {
        title: "No judging your spending",
        text: "No “you spent too much”, no scores, grades or rankings. Just records and stats — the judgment is yours.",
      },
      {
        title: "No guessing categories",
        text: "We don't set categories from the store name alone. You choose where each one goes.",
      },
      {
        title: "Your details stay yours",
        text: "The family only sees the fixed costs you agreed on. What you bought stays in each person's own ledger.",
      },
      {
        title: "Alert text stays on your phone",
        text: "Alerts are read only on your phone. Only the records you add to your ledger reach the server.",
      },
    ],
    care: {
      title: "Your records are yours",
      items: [
        "Everything is tied to your account, so it's all there when you sign in on a new phone.",
        "You can download your ledgers as Excel files at any time.",
      ],
      deletionBefore:
        "Leaving deletes your account and records. What's deleted and what stays is explained in ",
      deletionAfter: ".",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions?",
    items: [
      {
        question: "Can couples use it as a shared budget?",
        answer:
          "Yes. Create a family ledger and send the invite code — only people the family owner approves can join and record together. Enter fixed costs like rent, maintenance fees, phone bills and insurance once, and they're filled in every month, so you only fix what changed.",
      },
      {
        question: "If I use the family ledger, can my family see all my spending?",
        answer:
          "No. The family only sees the fixed costs you agreed on and the monthly settlement. Small spending like coffee or taxis goes in My ledger, and only you see My ledger.",
      },
      {
        question: "Can it split trip expenses?",
        answer:
          "Yes. Add the people you traveled with as companions by name and record who paid what, and settle up shows who should send how much to whom. Record in the local currency like yen, dollars or euros, and you'll also see the amount in Korean won at today's rate.",
      },
      {
        question: "Does it import card payments automatically?",
        answer:
          "On Android, it collects payment alerts from the Korean card, bank and pay apps you choose into an inbox. You decide whether to add each one and in which category, and you can have chosen apps recorded automatically. It doesn't read text messages, and alert text never leaves your phone.",
      },
      {
        question: "Which currency does it use?",
        answer:
          "My ledger and family ledgers are recorded in Korean won. Trip ledgers are recorded in the currency of the trip, and the amount in won is shown at today's rate.",
      },
      {
        question: "Can I use it on iPhone?",
        answer: "The Android app is on Google Play. The iOS app is coming soon.",
      },
      {
        question: "Can I keep a copy of my records?",
        answer:
          "Yes. You can download My ledger, family ledgers and trip ledgers as Excel files. Leaving deletes your account and records.",
      },
    ],
    moreBefore: "For more on how to use it, see ",
    moreAfter: ".",
  },
  closing: {
    title: { before: "All your money, ", em: "in one place", after: "" },
    lede: "Me, family, trips — three ledgers in one Ddoring Budget.",
    helpLink: "Want to know how it works? Read the help ›",
  },
};
