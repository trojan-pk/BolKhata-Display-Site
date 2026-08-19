/* ============================================================================
   Content
   Every figure below is real arithmetic, not filler. The day book balances:
   opening 18,400 + in 14,750 − out 8,440 = closing 24,710.
   ========================================================================= */

/** Pakistani rupees, written the way an invoice writes them. */
export const rupees = (n: number) =>
  `Rs. ${new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(n)}`;

/** The single trading day every demonstration on the site refers to. */
export const day = { full: "Wednesday, 18 August", short: "18 Aug" };

/* ---- Hero demo: three spoken lines and what the agent makes of them ----- */

export type Utterance = {
  /** what the owner says, in the words they'd use with a customer */
  speech: string;
  /** the posting the agent produces */
  entry: {
    kind: string;
    party: string;
    account: string;
    amount: number;
    /** money in, money out, or booked against a party's credit */
    direction: "in" | "out" | "receivable";
    note: string;
  };
  balanceFrom: number;
  balanceTo: number;
};

export const utterances: Utterance[] = [
  {
    speech: "Bilal paid four thousand five hundred toward last month's bill.",
    entry: {
      kind: "Receipt",
      party: "Bilal Traders",
      account: "Bank · Invoice #1042",
      amount: 4500,
      direction: "in",
      note: "Settles Rs. 4,500 of Rs. 12,500 outstanding.",
    },
    balanceFrom: 18400,
    balanceTo: 22900,
  },
  {
    speech: "Sixty kilos of rice from Karim Wholesale, eighteen hundred, cash.",
    entry: {
      kind: "Purchase",
      party: "Karim Wholesale",
      account: "Inventory · Grains",
      amount: 1800,
      direction: "out",
      note: "Supplier matched from 14 prior purchases.",
    },
    balanceFrom: 22900,
    balanceTo: 21100,
  },
  {
    speech: "Ayesha took two crates on credit, three thousand two hundred.",
    entry: {
      kind: "Credit sale",
      party: "Ayesha Khan",
      account: "Receivables · net 30",
      amount: 3200,
      direction: "receivable",
      note: "Due 17 September. No cash movement.",
    },
    balanceFrom: 21100,
    balanceTo: 21100,
  },
];

/* ---- How it works: a genuine sequence, so it earns a stepped treatment -- */

export const steps = [
  {
    step: "Speak",
    title: "Describe the transaction",
    body:
      "One sentence in plain language, at the counter, while the customer is still standing there. No form to open and no fields to fill.",
  },
  {
    step: "Resolve",
    title: "The agent resolves it",
    body:
      "It identifies the party, the amount, the direction the money moved, and the account it belongs in. Where something is genuinely ambiguous, it asks a single question.",
  },
  {
    step: "Post",
    title: "It posts and reconciles",
    body:
      "The entry lands in a double-entry ledger. Balances update, receivables begin their clock, and the day is reconciled before you close.",
  },
];

/* ---- What it handles --------------------------------------------------- */

export const capabilities = [
  {
    title: "Credit and receivables",
    body: "Who owes what, since when, and what to send when you follow up.",
  },
  {
    title: "Daily cash close",
    body: "A summary of the day, checked line by line against every entry.",
  },
  {
    title: "Expenses and purchases",
    body: "Categorised as you speak, with the supplier remembered for next time.",
  },
  {
    title: "Party statements",
    body: "A clean statement for any customer, ready to send without editing.",
  },
  {
    title: "Payment reminders",
    body: "Drafted for review. Nothing sends until you approve it.",
  },
  {
    title: "Tax-ready exports",
    body: "Books your accountant can open without calling you first.",
  },
  {
    title: "Multilingual speech",
    body: "Understands the language you trade in, including mixed sentences.",
  },
  {
    title: "Offline capture",
    body: "Recorded at the counter, posted as soon as you are back online.",
  },
];

/* ---- Oversight --------------------------------------------------------- */

export const oversight = [
  {
    title: "Every entry cites its source",
    body:
      "Open any posting to read the sentence that created it, word for word, beside the entry it produced.",
  },
  {
    title: "Corrections are spoken too",
    body:
      "Say what was wrong. The agent re-posts and records the correction in the audit trail rather than overwriting the original.",
  },
  {
    title: "Large entries wait for approval",
    body:
      "Set an amount above which nothing posts automatically. Entries over the threshold are held, with the reason shown.",
  },
  {
    title: "The ledger is yours to take",
    body:
      "Export the complete book whenever you like, in formats that will outlast any single application — including this one.",
  },
];

/* ---- Day book ---------------------------------------------------------- */

export type LedgerRow = {
  time: string;
  kind: string;
  party: string;
  account: string;
  out?: number;
  in?: number;
  balance: number;
  /** false for entries the agent posted on a schedule rather than from speech */
  voice: boolean;
  /** true when the entry does not move cash, so the balance holds */
  noCash?: boolean;
};

export const openingBalance = 18400;

export const dayBook: LedgerRow[] = [
  {
    time: "09:41",
    kind: "Receipt",
    party: "Bilal Traders",
    account: "Bank · Invoice #1042",
    in: 4500,
    balance: 22900,
    voice: true,
  },
  {
    time: "10:05",
    kind: "Purchase",
    party: "Karim Wholesale",
    account: "Inventory · Grains",
    out: 1800,
    balance: 21100,
    voice: true,
  },
  {
    time: "11:20",
    kind: "Credit sale",
    party: "Ayesha Khan",
    account: "Receivables · net 30",
    balance: 21100,
    voice: true,
    noCash: true,
  },
  {
    time: "12:00",
    kind: "Expense",
    party: "—",
    account: "Shop rent · recurring",
    out: 6000,
    balance: 15100,
    voice: false,
  },
  {
    time: "15:32",
    kind: "Receipt",
    party: "Usman Ali",
    account: "Cash",
    in: 2250,
    balance: 17350,
    voice: true,
  },
  {
    time: "17:08",
    kind: "Expense",
    party: "—",
    account: "Fuel and travel",
    out: 640,
    balance: 16710,
    voice: true,
  },
  {
    time: "19:15",
    kind: "Receipt",
    party: "Nadia Stores",
    account: "Bank",
    in: 8000,
    balance: 24710,
    voice: true,
  },
];

export const dayTotals = {
  in: dayBook.reduce((t, r) => t + (r.in ?? 0), 0),
  out: dayBook.reduce((t, r) => t + (r.out ?? 0), 0),
  closing: dayBook[dayBook.length - 1].balance,
  receivables: 3200,
  entries: dayBook.length,
};
