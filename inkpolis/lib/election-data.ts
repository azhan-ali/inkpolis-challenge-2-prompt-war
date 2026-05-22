export type Country = "india" | "usa" | "uk";

export interface ElectionStage {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  description: string;
  keyFacts: string[];
  duration: string;
}

export interface CountryData {
  name: string;
  flag: string;
  system: string;
  stages: ElectionStage[];
}

export const electionData: Record<Country, CountryData> = {
  india: {
    name: "India",
    flag: "🇮🇳",
    system: "Parliamentary Democracy",
    stages: [
      {
        id: "voter-registration",
        icon: "✍️",
        title: "Voter Registration",
        subtitle: "Enroll & get your voter ID",
        color: "#1a3a5c",
        duration: "Ongoing / before election",
        description:
          "Every Indian citizen aged 18+ can register to vote. The Election Commission of India (ECI) maintains the electoral rolls. You can register online at voters.eci.gov.in or visit your local BLO (Booth Level Officer).",
        keyFacts: [
          "Age 18+ on the qualifying date",
          "Must be Indian citizen",
          "Register at voters.eci.gov.in",
          "Voter ID card (EPIC) is issued",
          "Can also use Aadhaar to link",
        ],
      },
      {
        id: "model-code",
        icon: "📋",
        title: "Model Code of Conduct",
        subtitle: "Rules kick in for parties",
        color: "#6c3483",
        duration: "From announcement to results",
        description:
          "Once elections are announced, the Model Code of Conduct (MCC) kicks in. Political parties and candidates must follow strict rules — no use of government resources for campaigns, no hate speech, no bribery.",
        keyFacts: [
          "Announced by ECI with election schedule",
          "Bans misuse of government machinery",
          "Free and fair campaigning rules",
          "Candidates must file asset declarations",
          "Violations can lead to disqualification",
        ],
      },
      {
        id: "nomination",
        icon: "📝",
        title: "Nomination",
        subtitle: "Candidates file their papers",
        color: "#27ae60",
        duration: "~2 weeks before voting",
        description:
          "Candidates file nomination papers with the Returning Officer. They must pay a security deposit and submit details of assets, criminal record, and educational qualifications. Nominations are scrutinized and can be rejected.",
        keyFacts: [
          "Security deposit: ₹25,000 (Lok Sabha)",
          "Must submit asset declaration",
          "Criminal record must be disclosed",
          "Scrutiny date follows nomination",
          "Can withdraw within 2 days of scrutiny",
        ],
      },
      {
        id: "campaign",
        icon: "📣",
        title: "Campaigning",
        subtitle: "Parties make their case",
        color: "#f39c12",
        duration: "Until 48hrs before polling",
        description:
          "Parties and candidates campaign across the country — rallies, door-to-door visits, TV ads, social media. Campaigning must stop 48 hours before polling day (this is called the 'campaign silence' period).",
        keyFacts: [
          "48-hour silence period before voting",
          "Campaign spending limits enforced",
          "ECI monitors paid news",
          "Booth-level agents are appointed",
          "NOTA option exists for voters",
        ],
      },
      {
        id: "voting",
        icon: "🗳️",
        title: "Voting Day",
        subtitle: "Citizens cast their votes",
        color: "#c0392b",
        duration: "Polling day(s)",
        description:
          "Voters visit their assigned polling booth with their Voter ID. They use Electronic Voting Machines (EVMs) to cast their vote. A Voter-Verified Paper Audit Trail (VVPAT) confirms the vote. Indelible ink is applied to the finger.",
        keyFacts: [
          "EVMs used since 2004 nationwide",
          "VVPAT provides paper trail",
          "Indelible ink prevents double voting",
          "Can vote only at assigned booth",
          "Postal ballot for eligible persons",
        ],
      },
      {
        id: "counting",
        icon: "📊",
        title: "Vote Counting",
        subtitle: "Every vote tallied",
        color: "#1a3a5c",
        duration: "Counting day (after polling ends)",
        description:
          "ECI officials count votes from EVMs at designated counting centers. Agents of each candidate observe the count. Results are declared constituency by constituency. The ECI announces final results.",
        keyFacts: [
          "Counting starts on ECI-announced date",
          "Candidates' agents observe counting",
          "EVM results are tallied round by round",
          "VVPAT sample verification done",
          "Results declared on ECI website live",
        ],
      },
      {
        id: "results",
        icon: "🏆",
        title: "Results & Government Formation",
        subtitle: "Democracy delivers its verdict",
        color: "#27ae60",
        duration: "Post-counting",
        description:
          "The party/coalition with a majority (272+ seats in Lok Sabha) is invited to form the government. The leader is sworn in as Prime Minister by the President of India. The cabinet is formed within days.",
        keyFacts: [
          "Majority = 272 of 543 Lok Sabha seats",
          "President invites majority leader",
          "PM sworn in at Rashtrapati Bhavan",
          "Cabinet formation follows",
          "Opposition forms shadow government",
        ],
      },
    ],
  },

  usa: {
    name: "United States",
    flag: "🇺🇸",
    system: "Federal Presidential Republic",
    stages: [
      {
        id: "voter-registration",
        icon: "✍️",
        title: "Voter Registration",
        subtitle: "Sign up to vote in your state",
        color: "#1a3a5c",
        duration: "Varies by state",
        description:
          "Voter registration requirements vary by state. Most states require registration weeks before Election Day. Some states allow same-day registration. You register with your state or county election office.",
        keyFacts: [
          "Age 18+ by Election Day",
          "Must be a U.S. citizen",
          "Deadlines vary by state (15-30 days prior)",
          "Some states allow same-day registration",
          "Register at vote.gov",
        ],
      },
      {
        id: "primaries",
        icon: "🥊",
        title: "Primaries & Caucuses",
        subtitle: "Parties pick their candidates",
        color: "#6c3483",
        duration: "Spring of election year",
        description:
          "Before the general election, each major party holds primaries (or caucuses in some states) to choose their presidential nominee. Voters choose among candidates within their party.",
        keyFacts: [
          "Held state by state (Jan–June)",
          "Delegates are awarded to candidates",
          "Open or closed primaries (varies by state)",
          "Iowa caucuses and NH primary are first",
          "Delegates confirmed at party conventions",
        ],
      },
      {
        id: "conventions",
        icon: "🎪",
        title: "Party Conventions",
        subtitle: "Official nomination of candidates",
        color: "#27ae60",
        duration: "Summer of election year",
        description:
          "Each major party holds a national convention where delegates officially nominate their presidential and vice-presidential candidates. The nominee delivers their acceptance speech.",
        keyFacts: [
          "Democratic & Republican conventions held",
          "VP running mate announced",
          "Platform (policy agenda) adopted",
          "Nominee acceptance speech is major event",
          "Usually held July–August",
        ],
      },
      {
        id: "campaign",
        icon: "📣",
        title: "General Campaign",
        subtitle: "The race to November",
        color: "#f39c12",
        duration: "Summer through November",
        description:
          "Presidential candidates campaign across all 50 states, focusing heavily on 'swing states.' Presidential debates, fundraising, and advertising dominate. Early voting and mail-in ballots open in many states.",
        keyFacts: [
          "3 Presidential debates typically held",
          "Electoral College determines winner (538 votes)",
          "270 electoral votes needed to win",
          "Swing states are campaign hotspots",
          "Citizens United allows unlimited PAC spending",
        ],
      },
      {
        id: "voting",
        icon: "🗳️",
        title: "Election Day",
        subtitle: "First Tuesday after first Monday in November",
        color: "#c0392b",
        duration: "Election Day + early voting period",
        description:
          "Americans vote at polling places or by mail. Methods vary by state — paper ballots, optical scanners, or touchscreen machines. Results flow in throughout election night as polls close across time zones.",
        keyFacts: [
          "Always first Tue after first Mon in Nov",
          "Polling hours vary by state",
          "Mail-in voting widely available",
          "Voter ID laws vary by state",
          "Exit polls released after polls close",
        ],
      },
      {
        id: "electoral-college",
        icon: "🏛️",
        title: "Electoral College",
        subtitle: "Electors cast official votes",
        color: "#1a3a5c",
        duration: "Mid-December",
        description:
          "Electors (one per Congressional district + 2 senators per state) meet in their state capitals to officially cast their electoral votes. Most states are winner-take-all. Results are sent to Congress.",
        keyFacts: [
          "538 total electoral votes",
          "270 needed to win presidency",
          "Electors meet in December",
          "Maine & Nebraska split electoral votes",
          "Congress certifies results January 6",
        ],
      },
      {
        id: "inauguration",
        icon: "🏆",
        title: "Inauguration",
        subtitle: "A new president is sworn in",
        color: "#27ae60",
        duration: "January 20",
        description:
          "On January 20th, the President-elect is inaugurated at the U.S. Capitol, taking the oath of office. This peaceful transfer of power is a cornerstone of American democracy.",
        keyFacts: [
          "January 20 following election year",
          "Chief Justice administers oath",
          "Inaugural address sets presidency's tone",
          "Vice President sworn in first",
          "Outgoing president departs the White House",
        ],
      },
    ],
  },

  uk: {
    name: "United Kingdom",
    flag: "🇬🇧",
    system: "Parliamentary Constitutional Monarchy",
    stages: [
      {
        id: "dissolution",
        icon: "📜",
        title: "Dissolution of Parliament",
        subtitle: "Parliament dissolved, election called",
        color: "#1a3a5c",
        duration: "Up to 5 years between elections",
        description:
          "The Prime Minister requests the Monarch to dissolve Parliament. Under the Dissolution and Calling of Parliament Act 2022, elections must be held within 25 working days of dissolution. Candidates and parties begin preparing immediately.",
        keyFacts: [
          "Parliament dissolves automatically after 5 years",
          "PM can call early election",
          "Fixed-term Parliament Act was repealed in 2022",
          "25 working days to polling day",
          "By-elections fill individual seat vacancies",
        ],
      },
      {
        id: "registration",
        icon: "✍️",
        title: "Voter Registration",
        subtitle: "Register to vote online or by post",
        color: "#6c3483",
        duration: "12 working days before polling",
        description:
          "UK citizens (and qualifying Commonwealth/Irish citizens) aged 18+ can register at gov.uk/register-to-vote. Individual Electoral Registration (IER) means you register personally, not as a household.",
        keyFacts: [
          "Age 18+ on polling day",
          "Must be UK/qualifying citizen",
          "Register at gov.uk/register-to-vote",
          "Deadline is 12 working days before election",
          "Photo ID now required to vote (since 2023)",
        ],
      },
      {
        id: "nomination",
        icon: "📝",
        title: "Candidate Nominations",
        subtitle: "Anyone can stand for Parliament",
        color: "#27ae60",
        duration: "During the campaign period",
        description:
          "Candidates submit nomination papers to the local Returning Officer. They pay a £500 deposit (returned if they get 5%+ of votes). Any UK citizen aged 18+ can stand, with some exceptions.",
        keyFacts: [
          "£500 deposit required",
          "Returned if candidate wins 5%+ of votes",
          "Must be UK citizen aged 18+",
          "Certain public officials cannot stand",
          "Candidates need 10 proposers from constituency",
        ],
      },
      {
        id: "campaign",
        icon: "📣",
        title: "Campaigning",
        subtitle: "Parties pitch their manifestos",
        color: "#f39c12",
        duration: "~4-6 weeks",
        description:
          "Political parties publish manifestos outlining their policies. Candidates canvass door-to-door, hold public meetings, and use social media. TV debates between party leaders are a key feature.",
        keyFacts: [
          "Manifestos published by parties",
          "Strict spending limits per candidate",
          "BBC & ITV host leaders' debates",
          "Purdah period: civil service goes neutral",
          "Campaign spending declared post-election",
        ],
      },
      {
        id: "voting",
        icon: "🗳️",
        title: "Polling Day",
        subtitle: "Usually a Thursday",
        color: "#c0392b",
        duration: "7am – 10pm on polling day",
        description:
          "Voters go to their local polling station (usually a school or community hall) with their photo ID. They receive a ballot paper and mark their choice with a pencil cross. First Past the Post (FPTP) system is used.",
        keyFacts: [
          "Polls open 7am to 10pm",
          "Photo ID required since 2023",
          "Paper ballot, pencil cross",
          "First Past the Post voting system",
          "Exit poll released at 10pm sharp",
        ],
      },
      {
        id: "counting",
        icon: "📊",
        title: "Counting",
        subtitle: "An all-night counting event",
        color: "#1a3a5c",
        duration: "Through the night",
        description:
          "Counting begins immediately after polls close. Most results come in overnight. Counting officers oversee the count with party agents watching. The famous 10pm exit poll gives the first indication of results.",
        keyFacts: [
          "Counting starts at 10pm",
          "Results declared constituency by constituency",
          "Returning Officer announces each result",
          "Candidates must be present for declaration",
          "BBC/ITV cover results through the night",
        ],
      },
      {
        id: "government",
        icon: "🏆",
        title: "Government Formation",
        subtitle: "The King invites the winner to govern",
        color: "#27ae60",
        duration: "Day after election",
        description:
          "The leader of the party with a majority of seats (326+) is invited by the King to form a government and become Prime Minister. They travel to Buckingham Palace, then to 10 Downing Street to begin governing.",
        keyFacts: [
          "326+ seats = majority (of 650)",
          "King invites majority party leader",
          "PM moves into 10 Downing Street",
          "Cabinet appointed within days",
          "Leader's Questions begins in Parliament",
        ],
      },
    ],
  },
};

export const roles = [
  {
    id: "voter",
    icon: "🧑‍💼",
    title: "The Voter",
    color: "#1a3a5c",
    description: "Experience democracy from a citizen's perspective",
    journey: [
      { step: "Register to vote", detail: "Find your polling station, get your voter ID" },
      { step: "Research candidates", detail: "Read manifestos, watch debates, compare policies" },
      { step: "Cast your ballot", detail: "Visit polling station, mark your choice" },
      { step: "Stay informed", detail: "Follow results, hold elected officials accountable" },
    ],
  },
  {
    id: "candidate",
    icon: "🎤",
    title: "The Candidate",
    color: "#6c3483",
    description: "Step into the shoes of someone running for office",
    journey: [
      { step: "Decide to run", detail: "Determine eligibility, build a team, set your message" },
      { step: "File nomination", detail: "Submit papers, pay deposit, declare assets" },
      { step: "Campaign actively", detail: "Door-knocking, rallies, debates, social media" },
      { step: "Win or concede", detail: "Accept results gracefully, either take office or support winner" },
    ],
  },
  {
    id: "officer",
    icon: "⚖️",
    title: "Election Officer",
    color: "#27ae60",
    description: "Guard the integrity of the democratic process",
    journey: [
      { step: "Prepare voter rolls", detail: "Maintain accurate voter registration lists" },
      { step: "Set up polling stations", detail: "Arrange booths, EVMs/ballot papers, staff" },
      { step: "Oversee voting day", detail: "Verify voter IDs, manage queues, prevent fraud" },
      { step: "Count & certify", detail: "Tally votes accurately, announce results officially" },
    ],
  },
];

export const myths = [
  {
    myth: "Your vote doesn't matter — big parties always win.",
    fact: "Many elections are decided by just hundreds or thousands of votes. Every single vote is counted and can change history.",
    country: "all",
  },
  {
    myth: "EVMs (electronic voting machines) are easily hacked.",
    fact: "Indian EVMs are standalone machines with no internet or Bluetooth connection. They cannot be hacked remotely. VVPAT provides a physical paper trail.",
    country: "india",
  },
  {
    myth: "The Electoral College makes your popular vote meaningless.",
    fact: "Your state's popular vote determines which candidate gets your state's electoral votes. Voting still directly affects the outcome.",
    country: "usa",
  },
  {
    myth: "You need complex documents to vote in the UK.",
    fact: "You just need one approved photo ID — like a passport or driving licence. If you don't have one, you can apply for a free Voter Authority Certificate.",
    country: "uk",
  },
  {
    myth: "Only politicians can become candidates.",
    fact: "Any eligible citizen can run for office! You just need to meet basic requirements like age and citizenship — no prior political experience needed.",
    country: "all",
  },
  {
    myth: "Voting is too complicated for ordinary people.",
    fact: "Elections are designed to be accessible to all citizens. Voter helplines, multilingual assistance, and accessible polling stations exist to help everyone participate.",
    country: "all",
  },
];
