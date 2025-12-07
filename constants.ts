import { Acronym } from './types';

export const INITIAL_ACRONYMS: Acronym[] = [
  // --- Ad Tech & Media ---
  {
    id: 'dsp',
    term: 'DSP',
    expansion: 'Demand-Side Platform',
    definition: 'A system that allows buyers of digital advertising inventory to manage multiple ad exchange and data exchange accounts through one interface.',
    category: 'Ad Tech',
    votes: 45,
    source: 'local'
  },
  {
    id: 'ssp',
    term: 'SSP',
    expansion: 'Supply-Side Platform',
    definition: 'A technology platform to enable web publishers and digital out-of-home (DOOH) media owners to manage their advertising space inventory, fill it with ads, and receive revenue.',
    category: 'Ad Tech',
    votes: 42,
    source: 'local'
  },
  {
    id: 'dmp',
    term: 'DMP',
    expansion: 'Data Management Platform',
    definition: 'A software platform used for collecting and managing data to identify audience segments for targeting.',
    category: 'Ad Tech',
    votes: 67,
    source: 'local'
  },
  {
    id: 'mvpd',
    term: 'MVPD',
    expansion: 'Multichannel Video Programming Distributor',
    definition: 'A service provider that delivers video programming services, usually for a subscription fee (e.g., Comcast, DirecTV).',
    category: 'Ad Tech',
    votes: 55,
    source: 'local'
  },
  {
    id: 'ctv',
    term: 'CTV',
    expansion: 'Connected TV',
    definition: 'A television set connected to the internet via built-in capabilities or through an external device (like Roku or Apple TV), allowing for streaming content.',
    category: 'Ad Tech',
    votes: 92,
    source: 'local'
  },
  {
    id: 'ott',
    term: 'OTT',
    expansion: 'Over-The-Top',
    definition: 'Content providers that distribute streaming media as a standalone product directly to viewers over the internet, bypassing telecommunications, multichannel television, and broadcast television platforms.',
    category: 'Ad Tech',
    votes: 80,
    source: 'local'
  },
  {
    id: 'vcr',
    term: 'VCR',
    expansion: 'Video Completion Rate',
    definition: 'The percentage of all video ad impressions that play through to the end.',
    category: 'Ad Tech',
    votes: 89,
    source: 'local'
  },
  {
    id: 'vast',
    term: 'VAST',
    expansion: 'Video Ad Serving Template',
    definition: 'A script that gives video players information about which ad to play, how the ad should show up, how long it should last, and whether users are able to skip it.',
    category: 'Ad Tech',
    votes: 35,
    source: 'local'
  },
  {
    id: 'vpaid',
    term: 'VPAID',
    expansion: 'Video Player-Ad Interface Definition',
    definition: 'A standard that allows a video ad and a video player to communicate with each other, enabling rich interactive in-stream ad experiences.',
    category: 'Ad Tech',
    votes: 38,
    source: 'local'
  },
  {
    id: 'rtb',
    term: 'RTB',
    expansion: 'Real-Time Bidding',
    definition: 'The buying and selling of online ad impressions through real-time auctions that occur in the time it takes a webpage to load.',
    category: 'Ad Tech',
    votes: 70,
    source: 'local'
  },
  {
    id: 'cpm',
    term: 'CPM',
    expansion: 'Cost Per Mille',
    definition: 'Cost per thousand impressions. The price of 1,000 advertisement impressions on one webpage.',
    category: 'Ad Tech',
    votes: 12,
    source: 'local'
  },

  // --- Marketing ---
  {
    id: 'seo',
    term: 'SEO',
    expansion: 'Search Engine Optimization',
    definition: 'The process of improving the quality and quantity of website traffic to a website or a web page from search engines.',
    category: 'Marketing',
    votes: 75,
    source: 'local'
  },
  {
    id: 'sem',
    term: 'SEM',
    expansion: 'Search Engine Marketing',
    definition: 'A form of Internet marketing that involves the promotion of websites by increasing their visibility in search engine results pages primarily through paid advertising.',
    category: 'Marketing',
    votes: 50,
    source: 'local'
  },
  {
    id: 'ppc',
    term: 'PPC',
    expansion: 'Pay-Per-Click',
    definition: 'An internet advertising model used to drive traffic to websites, in which an advertiser pays a publisher when the ad is clicked.',
    category: 'Marketing',
    votes: 48,
    source: 'local'
  },
  {
    id: 'cpc',
    term: 'CPC',
    expansion: 'Cost Per Click',
    definition: 'The actual price you pay for each click in your pay-per-click (PPC) marketing campaigns.',
    category: 'Marketing',
    votes: 25,
    source: 'local'
  },
  {
    id: 'cpa',
    term: 'CPA',
    expansion: 'Cost Per Action',
    definition: 'A digital advertising pricing model where the advertiser pays for a specific action (like a purchase or a sign-up).',
    category: 'Marketing',
    votes: 40,
    source: 'local'
  },
  {
    id: 'cpl',
    term: 'CPL',
    expansion: 'Cost Per Lead',
    definition: 'An online advertising pricing model, where the advertiser pays for an explicit sign-up from a consumer interested in the advertiser\'s offer.',
    category: 'Marketing',
    votes: 30,
    source: 'local'
  },
  {
    id: 'roas',
    term: 'ROAS',
    expansion: 'Return on Ad Spend',
    definition: 'A marketing metric that measures the efficacy of a digital advertising campaign. ROAS helps online businesses evaluate which methods are working and how they can improve future advertising efforts.',
    category: 'Marketing',
    votes: 98,
    source: 'local'
  },
  {
    id: 'ctr',
    term: 'CTR',
    expansion: 'Click-Through Rate',
    definition: 'The ratio of users who click on a specific link to the number of total users who view a page, email, or advertisement.',
    category: 'Marketing',
    votes: 5,
    source: 'local'
  },
  {
    id: 'cro',
    term: 'CRO',
    expansion: 'Conversion Rate Optimization',
    definition: 'The systematic process of increasing the percentage of website visitors who take a desired action.',
    category: 'Marketing',
    votes: 62,
    source: 'local'
  },
  {
    id: 'crm',
    term: 'CRM',
    expansion: 'Customer Relationship Management',
    definition: 'Technology for managing all your company\'s relationships and interactions with customers and potential customers.',
    category: 'Marketing',
    votes: 20,
    source: 'local'
  },
  {
    id: 'cac',
    term: 'CAC',
    expansion: 'Customer Acquisition Cost',
    definition: 'The cost of winning a customer to purchase a product/service.',
    category: 'Marketing',
    votes: 85,
    source: 'local'
  },
  {
    id: 'ltv',
    term: 'LTV',
    expansion: 'Lifetime Value',
    definition: 'An estimate of the average revenue that a customer will generate throughout their lifespan as a customer. Also known as CLV.',
    category: 'Marketing',
    votes: 88,
    source: 'local'
  },

  // --- Social Media ---
  {
    id: 'ugc',
    term: 'UGC',
    expansion: 'User-Generated Content',
    definition: 'Any form of content, such as images, videos, text, and audio, that has been posted by users on online platforms such as social media and wikis.',
    category: 'Social Media',
    votes: 88,
    source: 'local'
  },
  {
    id: 'smm',
    term: 'SMM',
    expansion: 'Social Media Marketing',
    definition: 'The use of social media platforms and websites to promote a product or service.',
    category: 'Social Media',
    votes: 15,
    source: 'local'
  },
  {
    id: 'fomo',
    term: 'FOMO',
    expansion: 'Fear Of Missing Out',
    definition: 'A psychological phenomenon often used in marketing to create urgency by showing that others are buying or participating in something.',
    category: 'Social Media',
    votes: 10,
    source: 'local'
  },

  // --- Design & Tech ---
  {
    id: 'ui',
    term: 'UI',
    expansion: 'User Interface',
    definition: 'The point of human-computer interaction and communication in a device. This can include display screens, keyboards, a mouse and the appearance of a desktop.',
    category: 'Design',
    votes: 33,
    source: 'local'
  },
  {
    id: 'ux',
    term: 'UX',
    expansion: 'User Experience',
    definition: 'The overall experience of a person using a product such as a website or computer application, especially in terms of how easy or pleasing it is to use.',
    category: 'Design',
    votes: 41,
    source: 'local'
  },
  {
    id: 'api',
    term: 'API',
    expansion: 'Application Programming Interface',
    definition: 'A set of definitions and protocols for building and integrating application software.',
    category: 'Tech',
    votes: 52,
    source: 'local'
  },
  {
    id: 'sdk',
    term: 'SDK',
    expansion: 'Software Development Kit',
    definition: 'A collection of software development tools in one installable package.',
    category: 'Tech',
    votes: 44,
    source: 'local'
  },
  {
    id: 'mvp',
    term: 'MVP',
    expansion: 'Minimum Viable Product',
    definition: 'A version of a product with just enough features to be usable by early customers who can then provide feedback for future product development.',
    category: 'Tech/Product',
    votes: 66,
    source: 'local'
  },
  {
    id: 'sla',
    term: 'SLA',
    expansion: 'Service Level Agreement',
    definition: 'A commitment between a service provider and a client. Particular aspects of the service – quality, availability, responsibilities – are agreed between the service provider and the service user.',
    category: 'Tech/Business',
    votes: 28,
    source: 'local'
  },

  // --- Finance & Business ---
  {
    id: 'roi',
    term: 'ROI',
    expansion: 'Return on Investment',
    definition: 'A performance measure used to evaluate the efficiency or profitability of an investment or compare the efficiency of a number of different investments.',
    category: 'Finance',
    votes: 95,
    source: 'local'
  },
  {
    id: 'ebitda',
    term: 'EBITDA',
    expansion: 'Earnings Before Interest, Taxes, Depreciation, and Amortization',
    definition: 'A measure of a company\'s overall financial performance and is used as an alternative to simple earnings or net income in some circumstances.',
    category: 'Finance',
    votes: 60,
    source: 'local'
  },
  {
    id: 'p&l',
    term: 'P&L',
    expansion: 'Profit and Loss',
    definition: 'A financial statement that summarizes the revenues, costs, and expenses incurred during a specified period.',
    category: 'Finance',
    votes: 49,
    source: 'local'
  },
  {
    id: 'arr',
    term: 'ARR',
    expansion: 'Annual Recurring Revenue',
    definition: 'A metric used by subscription-based businesses to measure the yearly value of a single subscription.',
    category: 'Finance',
    votes: 72,
    source: 'local'
  },
  {
    id: 'mrr',
    term: 'MRR',
    expansion: 'Monthly Recurring Revenue',
    definition: 'Income that a company can reliably anticipate every 30 days.',
    category: 'Finance',
    votes: 71,
    source: 'local'
  },
  {
    id: 'ytd',
    term: 'YTD',
    expansion: 'Year-to-Date',
    definition: 'Refers to the period of time beginning the first day of the current calendar year or fiscal year up to the current date.',
    category: 'Finance',
    votes: 18,
    source: 'local'
  },
  {
    id: 'yoy',
    term: 'YoY',
    expansion: 'Year-over-Year',
    definition: 'A method of evaluating two or more measured events to compare the results at one time period with those of a comparable time period on an annualized basis.',
    category: 'Finance',
    votes: 22,
    source: 'local'
  },
  {
    id: 'mom',
    term: 'MoM',
    expansion: 'Month-over-Month',
    definition: 'Used to measure the change in the value of a specific metric as a percentage of the previous month\'s value.',
    category: 'Finance',
    votes: 21,
    source: 'local'
  },
  {
    id: 'cogs',
    term: 'COGS',
    expansion: 'Cost of Goods Sold',
    definition: 'The direct costs of producing the goods sold by a company.',
    category: 'Finance',
    votes: 36,
    source: 'local'
  },
  {
    id: 'saas',
    term: 'SaaS',
    expansion: 'Software as a Service',
    definition: 'A software licensing and delivery model in which software is licensed on a subscription basis and is centrally hosted.',
    category: 'Business',
    votes: 30,
    source: 'local'
  },
  {
    id: 'b2b',
    term: 'B2B',
    expansion: 'Business-to-Business',
    definition: 'A form of transaction between businesses, such as one involving a manufacturer and wholesaler, or a wholesaler and a retailer.',
    category: 'Business',
    votes: 10,
    source: 'local'
  },
  {
    id: 'b2c',
    term: 'B2C',
    expansion: 'Business-to-Consumer',
    definition: 'The process of selling products and services directly between a business and consumers who are the end-users of its products or services.',
    category: 'Business',
    votes: 10,
    source: 'local'
  },
  {
    id: 'd2c',
    term: 'D2C',
    expansion: 'Direct-to-Consumer',
    definition: 'A business model where a brand sells directly to the end customer without going through a retailer, distributor, or wholesaler.',
    category: 'Business',
    votes: 14,
    source: 'local'
  },
  {
    id: 'kpi',
    term: 'KPI',
    expansion: 'Key Performance Indicator',
    definition: 'A measurable value that demonstrates how effectively a company is achieving key business objectives.',
    category: 'Business',
    votes: 58,
    source: 'local'
  },
  {
    id: 'okr',
    term: 'OKR',
    expansion: 'Objectives and Key Results',
    definition: 'A goal-setting framework for defining and tracking objectives and their outcomes.',
    category: 'Business',
    votes: 59,
    source: 'local'
  },
  {
    id: 'gdpr',
    term: 'GDPR',
    expansion: 'General Data Protection Regulation',
    definition: 'A legal framework that sets guidelines for the collection and processing of personal information from individuals who live in the European Union.',
    category: 'Legal/Privacy',
    votes: 34,
    source: 'local'
  },
  {
    id: 'ccpa',
    term: 'CCPA',
    expansion: 'California Consumer Privacy Act',
    definition: 'A state statute intended to enhance privacy rights and consumer protection for residents of California.',
    category: 'Legal/Privacy',
    votes: 29,
    source: 'local'
  },
  {
    id: 'dau',
    term: 'DAU',
    expansion: 'Daily Active Users',
    definition: 'A metric used to measure the total number of unique users who engage with a product or service on a given day.',
    category: 'Business/Tech',
    votes: 19,
    source: 'local'
  },
  {
    id: 'mau',
    term: 'MAU',
    expansion: 'Monthly Active Users',
    definition: 'A metric used to measure the total number of unique users who engage with a product or service over a 30-day period.',
    category: 'Business/Tech',
    votes: 19,
    source: 'local'
  },
  {
    id: 'arpu',
    term: 'ARPU',
    expansion: 'Average Revenue Per User',
    definition: 'The total revenue divided by the number of subscribers.',
    category: 'Business/Tech',
    votes: 27,
    source: 'local'
  }
];
