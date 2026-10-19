// Story data for the SDMT management panel walkthrough (/pages/baibu-cinema/panel/).
// Screens are the real panel rendered with fictional demo data. Every claim here is
// taken from the panel's own code (sdmt-cms), so keep it in step with that repo.

/** A captured screen. Coordinates are CSS px of the page rendered 1440 px wide. */
export type PanelScreen = {
  src: string;
  /** Full page height at 1440 px wide */
  height: number;
  /** Path shown in the frame's address bar */
  url: string;
  alt: string;
};

export type Box = { x: number; y: number; w: number; h: number };

export type Beat = {
  screen: keyof typeof SCREENS;
  /** Element to ring, if any */
  spot?: Box;
  /** Short English label pinned to the ring */
  label: string;
  /** Page y the frame scrolls to (defaults to centring the spot) */
  focus?: number;
  body: string;
};

export type Chapter = { num: string; kicker: string; title: string; beats: Beat[] };

const S = '/assets/projects/sdmt-panel';

export const SCREENS = {
  dashboard: { src: `${S}/dashboard.webp`, height: 930, url: 'panel', alt: 'The panel overview: cash balance, payments waiting, new applications and the next event, with open tasks and announcements below' },
  siteEvent: { src: `${S}/site-event.webp`, height: 2317, url: 'etkinlikler/kisa-film-gecesi', alt: 'A published event page on the club site with poster, date, venue, price and a seat reservation form' },
  event: { src: `${S}/event.webp`, height: 2287, url: 'panel/etkinlikler/kisa-film-gecesi', alt: 'An event in the panel: confirmed seats against capacity, payments waiting, check-ins and ticket revenue, a door check-in box and the registration list' },
  ticket: { src: `${S}/site-ticket.webp`, height: 1391, url: 'kayit/••••••••••••', alt: 'A private ticket page showing the event, the attendee and a QR code' },
  finance: { src: `${S}/finance.webp`, height: 1213, url: 'panel/finans', alt: 'The cash ledger: balance, total income and spend, and a list of entries with one voided entry struck through' },
  tasks: { src: `${S}/tasks.webp`, height: 1110, url: 'panel/gorevler', alt: 'The tasks page with tasks grouped by status and assigned to team members' },
  announcements: { src: `${S}/announcements.webp`, height: 1722, url: 'panel/duyurular', alt: 'Announcements, each marked public or crew only, the first pinned with a poster image' },
  applications: { src: `${S}/applications.webp`, height: 1599, url: 'panel/basvurular', alt: 'The applications inbox with status, private notes and an email reply sent from the panel' },
  members: { src: `${S}/members.webp`, height: 1239, url: 'panel/uyeler', alt: 'The members page listing accounts with role, team and active or inactive status' },
  audit: { src: `${S}/audit.webp`, height: 900, url: 'panel/kayitlar', alt: 'The audit log: who changed what and when, such as a payment confirmed or a role changed' },
  account: { src: `${S}/account.webp`, height: 900, url: 'panel/hesap', alt: 'The account page with two-step sign-in switched on' },
  films: { src: `${S}/films.webp`, height: 900, url: 'panel/filmler', alt: 'The films list with drafts and published short films, video source and crew count' },
} satisfies Record<string, PanelScreen>;

export const INTRO = {
  title: 'INSIDE\nTHE PANEL',
  kicker: 'SDMT · Management panel walkthrough',
  lede: 'The public site is what students see. Behind it runs the panel the whole club works from: events and tickets, money, people and permissions. Follow one film night from the first draft to the door.',
  note: 'Every name, number and account in these screens is fictional demo data. The interface is the real panel, in its original Turkish.',
};

export const CHAPTERS: Chapter[] = [
  {
    num: '01',
    kicker: 'Before',
    title: 'Life in the group chat',
    beats: [
      {
        screen: 'dashboard',
        label: 'One place for the whole club',
        body: 'Events, payments, applications and team tasks used to live in group chats and spreadsheets, so every screening night depended on a few people remembering everything. The brief: one place the whole club can run from, safe enough to trust with money and personal details.',
      },
    ],
  },
  {
    num: '02',
    kicker: 'Call time',
    title: 'The overview',
    beats: [
      {
        screen: 'dashboard',
        spot: { x: 308, y: 179, w: 1088, h: 170 },
        label: 'Live numbers',
        body: 'Signing in opens on the day’s call sheet. Management sees the cash balance, payments waiting for approval, new applications and the next event at a glance, with their own open tasks and the latest announcements below.',
      },
      {
        screen: 'dashboard',
        spot: { x: 12, y: 83, w: 240, h: 436 },
        label: 'Menu by role',
        body: 'The menu changes with the role: a crew member sees 4 sections, management 9 and the executive board all 11. Hiding a link is only a convenience. Every page checks the role again on the server, and the database enforces it too.',
      },
    ],
  },
  {
    num: '03',
    kicker: 'Opening night',
    title: 'Publishing an event',
    beats: [
      {
        screen: 'siteEvent',
        spot: { x: 651, y: 744, w: 625, h: 232 },
        label: 'Published from the panel',
        focus: 0,
        body: 'An event starts as a draft in the panel: poster, date, venue, capacity and price. Publishing gives it its own page on the club site, and the team opens registration when they’re ready.',
      },
      {
        screen: 'siteEvent',
        spot: { x: 833, y: 1135, w: 443, h: 649 },
        label: 'Sign-up, checked on the server',
        body: 'Students reserve a seat right on the page. The form is validated on the server, rate-limited and set with a trap for bots, and seats are counted under a database lock, so a sold-out night can’t be oversold.',
      },
    ],
  },
  {
    num: '04',
    kicker: 'Tickets, please',
    title: 'From sign-up to the door',
    beats: [
      {
        screen: 'event',
        spot: { x: 308, y: 272, w: 1088, h: 126 },
        label: 'One screen per event',
        focus: 0,
        body: 'Every event gets its own control room: seats confirmed against capacity, payments still waiting, who has checked in and ticket revenue so far.',
      },
      {
        screen: 'event',
        spot: { x: 1067, y: 863, w: 155, h: 48 },
        label: 'Approve payment',
        body: 'Paid by bank transfer? One click confirms it. The ticket email goes out on its own and the income is booked in the cash ledger exactly once. Cancel a registration and its income is voided automatically.',
      },
      {
        screen: 'ticket',
        spot: { x: 821, y: 397, w: 224, h: 224 },
        label: 'Private ticket page',
        focus: 0,
        body: 'Each registrant gets a ticket page at an unguessable address, with a QR code. Bank details for paying appear only here, never on a public page, and the page is kept out of search engines and caches.',
      },
      {
        screen: 'event',
        spot: { x: 308, y: 439, w: 1088, h: 222 },
        label: 'Door check-in',
        body: 'On the night, the door team opens the event on a phone and scans tickets with the camera. A valid ticket checks in instantly, a ticket that’s already been used is flagged with the time it was scanned, and a code field covers the moments the camera won’t cooperate.',
      },
      {
        screen: 'event',
        spot: { x: 1069, y: 192, w: 149, h: 56 },
        label: 'Attendee list',
        focus: 0,
        body: 'The attendee list exports to a spreadsheet for the venue or the university office.',
      },
    ],
  },
  {
    num: '05',
    kicker: 'Follow the money',
    title: 'The cash ledger',
    beats: [
      {
        screen: 'finance',
        spot: { x: 308, y: 203, w: 1088, h: 126 },
        label: 'Balance, income, spend',
        focus: 0,
        body: 'Every lira in and out goes into one ledger, sorted into tickets, sponsorship, equipment, venue, printing and more. The balance and totals update as entries go in.',
      },
      {
        screen: 'finance',
        spot: { x: 310, y: 612, w: 1084, h: 62 },
        label: 'Voided, never deleted',
        body: 'Entries can’t be edited or deleted, not even by the board. A mistake is voided and entered again, so the history stays honest and anyone on the management team can follow it.',
      },
      {
        screen: 'finance',
        spot: { x: 1220, y: 123, w: 184, h: 56 },
        label: 'Export for reports',
        focus: 0,
        body: 'The whole ledger exports to a spreadsheet when the treasurer needs to report to the university.',
      },
    ],
  },
  {
    num: '06',
    kicker: 'The crew',
    title: 'People and work',
    beats: [
      {
        screen: 'tasks',
        spot: { x: 308, y: 270, w: 1088, h: 400 },
        label: 'Tasks by team',
        focus: 0,
        body: 'Tasks go to people and teams with due dates, and move from to-do to “on set” to done. Everyone finds their own open tasks on the overview the moment they sign in.',
      },
      {
        screen: 'announcements',
        spot: { x: 520, y: 845, w: 115, h: 40 },
        label: 'Public or crew only',
        body: 'Announcements either go public, straight onto the club homepage, or stay inside the crew. Important ones can be pinned and carry an image.',
      },
      {
        screen: 'applications',
        spot: { x: 330, y: 1263, w: 736, h: 274 },
        label: 'Reply in place',
        body: 'Membership applications and messages from the site’s join form land in one inbox. The team moves each one from new to accepted, keeps private notes and replies by email without leaving the panel.',
      },
      {
        screen: 'members',
        spot: { x: 330, y: 330, w: 1066, h: 120 },
        label: 'Invite-only accounts',
        focus: 0,
        body: 'There’s no public sign-up. The executive board opens accounts from the panel and new members set their own password from a one-time email link. Roles change in one place, and people who leave are switched off, not deleted.',
      },
    ],
  },
  {
    num: '07',
    kicker: 'Behind the scenes',
    title: 'Built to be trusted',
    beats: [
      {
        screen: 'account',
        spot: { x: 868, y: 139, w: 528, h: 200 },
        label: 'Two-step sign-in',
        focus: 0,
        body: 'Every account can add authenticator-app sign-in. Once it’s on, the database itself refuses any session that hasn’t passed the second step, so a stolen password alone gets nowhere.',
      },
      {
        screen: 'audit',
        spot: { x: 310, y: 205, w: 1084, h: 330 },
        label: 'Audit log',
        focus: 0,
        body: 'Changes to accounts, events, payment details, registrations, the ledger and applications are recorded by the database itself, with contact details left out. Only the executive board can read the log.',
      },
      {
        screen: 'audit',
        label: 'Tested like an attacker',
        focus: 0,
        body: 'Before any database change ships, an automated test builds the schema in memory and tries to break the rules as five different visitors: anonymous, a self-registered stranger, a crew member, management and the executive board.',
      },
    ],
  },
  {
    num: '08',
    kicker: 'Encore',
    title: 'The films',
    beats: [
      {
        screen: 'films',
        spot: { x: 308, y: 477, w: 1088, h: 258 },
        label: 'Films and credits',
        focus: 0,
        body: 'The club’s short films are run from here too: video link, poster, synopsis and full cast and crew credits. Publish one and it appears on the public site; feature one and it leads the homepage. No code, no developer needed.',
      },
    ],
  },
];

export const FACTS = [
  { value: '11', label: 'Panel sections, one sign-in' },
  { value: '3', label: 'Roles, enforced by the database' },
  { value: '6', label: 'Tables with an automatic audit trail' },
  { value: '5', label: 'Attacker profiles in the test suite' },
];
