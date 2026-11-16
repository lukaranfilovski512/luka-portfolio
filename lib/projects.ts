import dimensions from '@/content/media-dimensions.json'

export type Visual = {
  src: string
  width: number
  height: number
  alt: string
  caption?: string
  source?: string
}

export function visual(src: string, alt: string, caption?: string, source?: string): Visual {
  const size = (dimensions as Record<string, { width: number; height: number }>)[src]
  if (!size) throw new Error(`Image metadata missing: ${src}`)
  return { src, ...size, alt, caption, source }
}

export function img(group: string, number: number, alt: string, caption?: string) {
  return visual(`/projects/${group}/${String(number).padStart(2, '0')}.webp`, alt, caption)
}

export function club(code: string, alt: string, caption?: string) {
  const preferred = `/projects/metalurg/${code}.webp`
  const src = preferred in dimensions ? preferred : `/projects/metalurg/${code}.jpg`
  return visual(src, alt, caption, `https://www.instagram.com/p/${code}/`)
}

export type GallerySection = {
  id: string
  eyebrow: string
  title: string
  text: string
  images: Visual[]
  layout?: 'two' | 'three' | 'wide' | 'posters'
  tone?: 'paper' | 'dark' | 'blue'
}

export type Project = {
  slug: string
  number: string
  title: string
  category: string
  cardDescription: string
  headline: string
  introduction: string
  period: string
  role: string
  scope: string[]
  summary: string
  challenge: string
  directionTitle: string
  direction: string
  decisions: { title: string; text: string }[]
  sections: GallerySection[]
  outcome: { title: string; text: string; metrics?: { value: string; label: string }[]; note?: string }
  credits: string
  featured: boolean
  accent: string
  next: string
}

export const projects: Project[] = [
  {
    slug: 'metalurg-2025', number: '01', title: 'FC Metalurg 2025', category: 'Sports, content & digital',
    cardDescription: 'A growing football club. A complete digital presence.',
    headline: 'Building a club people can follow.',
    introduction: 'An evolving visual and digital presence for an ambitious football club in Skopje, connecting matchday communication, creative content and a dedicated website.',
    period: '2026 — Ongoing', role: 'Visual design, content direction & web development',
    scope: ['Matchday graphics', 'Creative content', 'Digital communication', 'Website design & development'],
    summary: 'Football creates a new story every week. My work for Metalurg connects those stories across the club’s Instagram presence and its own online home, giving supporters a recognisable way to follow the team.',
    challenge: 'The club’s ambition needed to be visible between matches as well as on matchday. The task was to connect practical updates, the character of the team and longer-term club development in a clear, engaging digital presence.',
    directionTitle: 'One club. Many ways to tell its story.',
    direction: 'A clear matchday language carries essential information. More expressive compositions bring personality to announcements and club moments. Real match imagery keeps the communication connected to the people and the football behind it.',
    decisions: [
      { title: 'A recognisable matchday rhythm', text: 'Announcements, lineups and results have distinct jobs, while the club crest, colour and typographic hierarchy keep them connected.' },
      { title: 'Character beyond the score', text: 'Creative compositions and team stories add a more expressive layer to the club’s communication, alongside real football photography.' },
      { title: 'An owned digital home', text: 'The club website brings news, fixtures, results, standings, video and galleries into a place supporters can return to.' },
    ],
    sections: [
      { id: 'matchday', eyebrow: 'The matchday system', title: 'Before the game. Through the game. After the whistle.', text: 'A connected sequence from the Šiševo away match: a distinctive announcement, a readable team sheet and a result-led post built around real match imagery.', layout: 'three', images: [
        club('DfuNTd8s7-L', 'Metalurg away-match announcement with a player in front of a warm, cinematic crowd scene', 'Match announcement · 14 November 2026'),
        club('DfwsT6bsDGj', 'Metalurg starting lineup for the Šiševo away match on white and navy fabric', 'Starting lineup · 15 November 2026'),
        club('Dfw8t5gM7WM', 'Metalurg full-time graphic showing the 0–5 away win against Šiševo', 'Full-time result · 15 November 2026'),
      ] },
      { id: 'stories', eyebrow: 'Creative content', title: 'Room for a club’s personality.', text: 'The creative layer gives the team an identity beyond fixture information. Player-led announcements and the team-bus composition translate the club’s momentum into visual stories.', layout: 'two', tone: 'dark', images: [
        club('DfZUAbzMyHY', 'Creative Metalurg match announcement with players presented as pirates', 'Creative match announcement'),
        club('DfkOkR5spL9', 'Metalurg team-bus creative featuring the squad in a blue-lit interior', 'Team-bus composition'),
      ] },
      { id: 'community', eyebrow: 'People & community', title: 'A team is also the people around it.', text: 'Team moments, supporters and the club’s developing youth story sit alongside the designed graphics. This mix gives the feed space for both information and belonging.', layout: 'two', images: [
        club('DfcX4Z8DM9O', 'Metalurg youth-team group photograph accompanying the club’s academy announcement', 'Youth development announcement · 7 November 2026'),
        club('DffKprcM4ir', 'Metalurg players and staff gathered together at a club partner’s restaurant', 'Team and partner moment · 8 November 2026'),
      ] },
    ],
    outcome: {
      title: 'A small starting audience. A growing connection.',
      text: 'During the initial marketing collaboration, the club reported 512,000 Instagram views in less than a month and an audience growing from around 200 to around 800 followers. Alongside the social work, the live website provides a foundation for the club’s next stage.',
      metrics: [{ value: '512K', label: 'Instagram views in under a month' }, { value: '~4×', label: 'Starting follower audience' }, { value: '~+600', label: 'Net follower growth' }],
      note: 'Instagram performance figures reported by the club. Follower growth refers to the collaboration period; views are not unique reach. The website continues to evolve.',
    },
    credits: 'Visual communication and website: Luka Karanfilovski. Match imagery and team moments from the club’s published media. Creative compositions are shown as designed content.',
    featured: true, accent: '#112e5b', next: 'orevce',
  },
  {
    slug: 'orevce', number: '02', title: 'Orevce', category: 'Packaging & product communication',
    cardDescription: 'One family of cheese. Four clear expressions.',
    headline: 'A coherent family, down to the smallest label.',
    introduction: 'A colour-coded packaging approach for four cheese varieties, bringing product character, readable information and a consistent family resemblance together.',
    period: '2026', role: 'Packaging & visual design',
    scope: ['Packaging design', 'Range differentiation', 'Label artwork', 'Product presentation'],
    summary: 'Orevce’s range is presented as one recognisable family. Sheep, mixed-milk, goat and cow cheese share a common label structure, with colour and illustration helping each variety stand on its own.',
    challenge: 'The design needed to make the relationship between products clear while giving each variety a distinct place in the range. It also had to work beyond a polished mockup, at the level of the actual label and its information.',
    directionTitle: 'Tradition, organised with clarity.',
    direction: 'Pastoral imagery and product illustrations provide character. A repeated label architecture holds the range together, while four colours help distinguish the varieties across the pack and its wider presentation.',
    decisions: [
      { title: 'Colour with a clear job', text: 'Green, blue, gold and red provide a consistent way to distinguish sheep, mixed-milk, goat and cow varieties.' },
      { title: 'A shared label architecture', text: 'The product name, illustration and supporting information occupy consistent positions, preserving family resemblance across the range.' },
      { title: 'Detail beyond the mockup', text: 'Flat label artwork and the circular format show how the design is organised at production-artwork level.' },
    ],
    sections: [
      { id: 'range', eyebrow: 'The range', title: 'Different varieties. The same visual language.', text: 'Each variation follows a common structure, with colour, illustration and the product name doing the work of differentiation.', layout: 'two', images: [
        img('orevce',2,'Orevce sheep cheese packaging in green','Sheep cheese · Green'),
        img('orevce',3,'Orevce mixed-milk cheese packaging in blue','Mixed-milk cheese · Blue'),
        img('orevce',4,'Orevce goat cheese packaging in gold','Goat cheese · Gold'),
        img('orevce',5,'Orevce cow cheese packaging in red','Cow cheese · Red'),
      ] },
      { id: 'artwork', eyebrow: 'Artwork & hierarchy', title: 'The label, outside the presentation.', text: 'The artwork reveals how the same approach handles the product story and supporting details across different label formats.', layout: 'two', images: [
        img('orevce',10,'Flat Orevce cheese label artwork and pack panels','Flat label artwork'),
        img('orevce',11,'Circular Orevce sheep cheese label with product information','Circular label format'),
      ] },
      { id: 'applications', eyebrow: 'Product communication', title: 'A range that carries into the wider picture.', text: 'Presentation mockups extend the packaging direction into a product-focused advertising setting. The emphasis stays on the range and its connection to tradition.', layout: 'wide', images: [img('orevce',7,'Orevce advertising billboard mockup with the four cheese varieties','Advertising application · presentation mockup')] },
    ],
    outcome: { title: 'Four varieties. One recognisable family.', text: 'The result is a cohesive visual family across four varieties, with clear product differentiation and a repeatable label structure that extends into product communication.', metrics: [{ value: '4', label: 'Distinct product varieties' }, { value: '1', label: 'Shared label architecture' }] },
    credits: 'Packaging and visual design: Luka Karanfilovski. Product presentations and advertising applications are shown as mockups.',
    featured: true, accent: '#71932c', next: 'battery-evolution',
  },
  {
    slug: 'battery-evolution', number: '03', title: 'Battery Evolution', category: 'Campaigns & brand communication',
    cardDescription: 'Making technical products clear across brands and channels.',
    headline: 'Clarity for a world of technical products.',
    introduction: 'A connected creative remit across Battery Evolution and its local brand channels, spanning B2B communication, automotive retail, product education and energy solutions.',
    period: '2026 — Ongoing', role: 'Creative direction, visual design & marketing communication',
    scope: ['Campaign visuals', 'B2B communication', 'Product education', 'Retail & energy content'],
    summary: 'Battery Evolution’s communication spans several audiences and product categories. My role brings design and marketing thinking into the presentation of distributor services, automotive batteries and energy products across its local channels.',
    challenge: 'Product specifications, offers and distributor information have different communication needs. The creative work has to make those differences clear while respecting each brand’s existing identity.',
    directionTitle: 'A consistent approach to different communication jobs.',
    direction: 'The work uses information hierarchy to separate the product, its benefit and the next action. B2B material emphasises partnership and distribution; retail creative foregrounds the offer; educational and energy content gives technical detail a more readable structure.',
    decisions: [
      { title: 'Lead with the useful message', text: 'Each layout prioritises the message a particular audience needs, from a product benefit to a distributor opportunity or a retail price.' },
      { title: 'Keep brand voices distinct', text: 'Battery Evolution, EXIDE, Akumulatori.mk and Solar Energy MK retain their own visual context within a connected creative remit.' },
      { title: 'Make detail easier to navigate', text: 'Specifications, icons and supporting information are arranged in repeatable hierarchies that work across product-led formats.' },
    ],
    sections: [
      { id: 'corporate', eyebrow: 'Battery Evolution', title: 'A clear B2B conversation.', text: 'Distributor communication, company positioning and partnership-led messages present the business behind the product range.', layout: 'two', tone: 'blue', images: [
        img('battery-evolution',3,'Battery Evolution visual presenting automotive battery brands','Product-brand communication'),
        img('battery-evolution',23,'Battery Evolution European distribution-network visual','Distribution network'),
        img('battery-evolution',6,'Battery Evolution company introduction and sectors','Company positioning'),
        img('battery-evolution',24,'Battery Evolution partnership invitation','B2B partnership communication'),
      ] },
      { id: 'automotive', eyebrow: 'EXIDE & Akumulatori.mk', title: 'Product, benefit and offer in a readable order.', text: 'Local automotive creative connects product photography with benefits, prices and the context in which a battery is used. The existing manufacturer identities stay intact.', layout: 'two', images: [
        img('exide',8,'EXIDE commercial-vehicle battery promotional visual','EXIDE · Local product communication'),
        img('exide',1,'EXIDE AGM battery offer with two product models','EXIDE · Retail offer'),
        img('akumulatorimk',1,'Akumulatori.mk summer battery campaign','Akumulatori.mk · Seasonal communication'),
        img('akumulatorimk',10,'Akumulatori.mk Rombat Champion product visual','Akumulatori.mk · Product launch communication'),
      ] },
      { id: 'energy', eyebrow: 'Solar Energy MK', title: 'Giving technical energy products room to be understood.', text: 'A separate green-and-yellow context presents solar and storage products with product-led imagery and structured technical benefits.', layout: 'two', images: [
        img('solar-energy',2,'Solar Energy MK Solis hybrid inverter product offer','Hybrid inverter communication'),
        img('solar-energy',4,'Solar Energy MK Dyness Powerbrick Plus visual','Battery-storage product presentation'),
      ] },
    ],
    outcome: { title: 'One creative remit. Several clear brand contexts.', text: 'The selected work demonstrates how a consistent approach to hierarchy can support different commercial messages without flattening the individual brands. It covers digital campaigns, education, retail and B2B communication across four local channels.' },
    credits: 'Creative and design work: Luka Karanfilovski, within the Battery Evolution remit. EXIDE and the other manufacturers are represented in their local distributor and retail context; their existing identities are retained.',
    featured: true, accent: '#25a4dd', next: 'mono-alex',
  },
  {
    slug: 'mono-alex', number: '04', title: 'Mono Alex', category: 'Fashion art direction & digital',
    cardDescription: 'A considered visual world for modern menswear.',
    headline: 'Giving the product a world to belong to.',
    introduction: 'A body of fashion-led visual work for Mono Alex, covering campaign imagery, product presentation, website visuals and the brand’s Instagram communication.',
    period: '2025 — 2026', role: 'Visual design & creative direction',
    scope: ['Campaign imagery', 'Product presentation', 'Website visuals & banners', 'Instagram presentation'],
    summary: 'The project connects clothing and footwear with a more considered visual setting. Across different campaign and product moments, composition, texture and typography help build a recognisable sense of style.',
    challenge: 'Fashion imagery has to balance atmosphere with the product itself. The work needed enough character to carry a campaign while keeping the clothing, footwear and material details visible.',
    directionTitle: 'Product detail, framed with atmosphere.',
    direction: 'Rich colour, controlled interiors and quieter product studies offer different levels of emphasis. The selected work is organised by purpose: expressive campaign images, close product presentation and digital applications across the wardrobe.',
    decisions: [
      { title: 'Let the product lead', text: 'Framing and scale give footwear and fabric a clear place in the composition, even when the surrounding scene is expressive.' },
      { title: 'Build atmosphere with restraint', text: 'Warm materials, deep tones and selective typographic treatment create a more editorial rhythm across the selected visuals.' },
      { title: 'Connect the touchpoints', text: 'Campaign and product visuals support the brand’s website imagery, banners and social presentation as parts of the same creative remit.' },
    ],
    sections: [
      { id: 'footwear', eyebrow: 'Product & material', title: 'The details carry the character.', text: 'Close product scenes put shape, finish and material in focus. The composition leaves room for the footwear to remain the subject.', layout: 'two', images: [
        img('mono-alex',3,'Mono Alex loafers shown above an outstretched hand','Footwear product composition'),
        img('mono-alex',7,'Close view of a person fastening brown Mono Alex shoes','Material and styling detail'),
      ] },
      { id: 'wardrobe', eyebrow: 'Selected wardrobe imagery', title: 'A quieter frame for everyday pieces.', text: 'Product-focused images and styled portraits give different pieces a consistent level of attention. Across the wider engagement, the emphasis stays on product, material and character.', layout: 'two', images: [
        img('mono-alex',12,'Mono Alex jacket presented in a warm interior setting','Outerwear presentation'),
        img('mono-alex',13,'Detail-led Mono Alex casual chinos composition','Chinos product visual'),
      ] },
      { id: 'campaign', eyebrow: 'Campaign applications', title: 'An editorial rhythm across digital formats.', text: 'Typography, product scale and a sense of place help the visuals move between a campaign message and a collection-led invitation.', layout: 'three', images: [
        img('mono-alex',20,'Mono Alex campaign composition with the words Timeless Essential Luxury','Campaign visual'),
        img('mono-alex',21,'Mono Alex footwear against a vivid red background','Footwear campaign detail'),
        img('mono-alex',23,'Mono Alex collection visual with a model beside a tennis court','Collection communication'),
      ] },
    ],
    outcome: { title: 'A more considered way to present the wardrobe.', text: 'The selected body of work brings together fashion imagery, product communication and digital presentation. The case focuses on creative decisions and delivered visuals across the engagement.' },
    credits: 'Visual design, creative direction and image composition: Luka Karanfilovski. The case presents a selected body of digital visual work, including image treatments and AI-assisted compositions, within the existing Mono Alex brand.',
    featured: true, accent: '#7b2024', next: 'merkur',
  },
  {
    slug: 'merkur', number: '05', title: 'Merkur', category: 'Retail campaign design',
    cardDescription: 'Turning seasonal offers into distinct campaign ideas.',
    headline: 'A stronger idea behind the everyday offer.',
    introduction: 'Retail campaign visuals that connect a clear promotional message with expressive product-led ideas, from everyday offers to summer adventures.',
    period: 'Selected campaigns', role: 'Campaign visual design',
    scope: ['Key visuals', 'Retail communication', 'Seasonal campaigns', 'Promotional layouts'],
    summary: 'A varied retail assortment gives a designer many different stories to tell. This selection uses a clear green-and-yellow promotional language alongside more expressive key visuals for seasonal products.',
    challenge: 'Retail creative needs to communicate quickly, but different products call for different kinds of attention. The work balances a recognisable promotional structure with imagery that gives each campaign its own point of interest.',
    directionTitle: 'A clear offer, with an idea worth looking at.',
    direction: 'Bold headlines and selective yellow accents create a consistent hierarchy. Seasonal scenes add a more imaginative product context, while the core retail layouts keep the offer readable and connected to the existing brand.',
    decisions: [
      { title: 'Keep the hierarchy direct', text: 'The campaign headline, product and offer are given distinct levels of emphasis, helping the viewer navigate the message.' },
      { title: 'Give the product a setting', text: 'Outdoor and seasonal products are placed in visual stories that communicate a use, an atmosphere or an invitation.' },
      { title: 'Work within the existing identity', text: 'Green, yellow and a consistent typographic emphasis connect different campaign ideas to Merkur’s established brand context.' },
    ],
    sections: [
      { id: 'retail', eyebrow: 'The promotional language', title: 'A familiar structure with a direct message.', text: 'These layouts use the existing brand palette and a clear type hierarchy to carry different retail messages.', layout: 'three', images: [
        img('merkur',5,'Merkur trade week promotional visual in green and yellow','Trade week campaign'),
        img('merkur',7,'Merkur promotion showing products around a phone','Retail communication'),
        img('merkur',16,'Merkur Tognana product offer in a green setting','Product-led offer'),
      ] },
      { id: 'seasonal', eyebrow: 'Seasonal storytelling', title: 'The product becomes the start of an adventure.', text: 'Summer creative uses larger settings and expressive compositions to give leisure products a stronger visual story.', layout: 'two', tone: 'dark', images: [
        img('merkur',11,'Merkur summer paddleboard campaign in an adventurous water setting','Paddleboard campaign'),
        img('merkur',18,'Merkur roof-rack summer adventure visual with a vehicle','Outdoor campaign'),
        img('merkur',19,'Merkur boat and water-sports promotional composition','Water-sports campaign'),
        img('merkur',20,'Merkur pool product visual in a dramatic summer landscape','Summer product communication'),
      ] },
      { id: 'launch', eyebrow: 'Store communication', title: 'Making a new arrival visible.', text: 'The reveal-led key visual extends the promotional language to a store announcement.', layout: 'wide', images: [img('merkur',1,'Merkur store reveal campaign with green and yellow fabric','Store announcement key visual')] },
    ],
    outcome: { title: 'A flexible campaign language for a varied assortment.', text: 'The work shows a design contribution across promotional layouts and seasonal visual concepts. Direct promotional layouts and expressive seasonal images give different parts of the assortment their own rhythm.' },
    credits: 'Campaign visual design: Luka Karanfilovski. Existing Merkur identity and product context retained. ',
    featured: true, accent: '#009f56', next: 'metalurg-2025',
  },
  {
    slug: 'mowo', number: '06', title: 'MoWo', category: 'Supporting work / Digital campaigns',
    cardDescription: 'Clear messages for a changing phone market.',
    headline: 'Making the next phone decision feel simple.',
    introduction: 'A selected series of digital visuals for MoWo / Mobile World, connecting refurbished-phone communication, trade-in messages and product-led campaign ideas.',
    period: 'Selected work', role: 'Digital visual design',
    scope: ['Campaign visuals', 'Trade-in communication', 'Product-led content'],
    summary: 'The selected visuals combine direct headlines, a recognisable blue and magenta language and expressive product settings. Each message gives one service or product idea a clear place in the composition.',
    challenge: 'Trade-in, refurbished devices and product offers require different explanations. The design gives each message a strong hierarchy while preserving a connected visual character.',
    directionTitle: 'A clear message with a playful edge.',
    direction: 'Large type, product-led imagery and selective colour accents keep the communication direct. More expressive scenes add variation across the series.',
    decisions: [
      { title: 'One message at a time', text: 'The main service or product message is kept at the front of the visual.' },
      { title: 'A recognisable colour language', text: 'Blue and magenta connect different messages across the selection.' },
      { title: 'Product-led compositions', text: 'Phones and their context provide the focal point around which the message is arranged.' },
    ],
    sections: [{ id: 'selected', eyebrow: 'Selected digital work', title: 'A connected series of product and service messages.', text: 'A concise selection from the wider body of work.', layout: 'three', images: [
      img('mowo',7,'MoWo used-iPhone trade-in campaign with blue and magenta type','Trade-in communication'),
      img('mowo',12,'MoWo used-iPhone campaign in a travel setting','Campaign visual'),
      img('mowo',16,'MoWo new-week deals visual in blue and magenta','Retail content'),
      img('mowo',2,'MoWo Phonecheck partner communication','Service communication'),
      img('mowo',3,'MoWo refurbished-phone campaign visual','Refurbished-phone message'),
      img('mowo',13,'MoWo phone instalments campaign','Payment-option communication'),
    ] }],
    outcome: { title: 'A concise look at the wider practice.', text: 'This supporting selection shows how commercial messages and expressive product imagery can share a consistent visual context.' },
    credits: 'Digital visual design: Luka Karanfilovski. Existing MoWo / Mobile World branding retained.',
    featured: false, accent: '#2747af', next: 'metalurg-2025',
  },
]

export const featuredProjects = projects.filter(project => project.featured)
export const getProject = (slug: string) => projects.find(project => project.slug === slug)

export const marks = [
  { name: 'Moto Kapitol', description: 'A dynamic mark and wordmark system, with Latin and Cyrillic variations.', images: [img('moto-kapitol',1,'Moto Kapitol logo variations in yellow, black and white','Primary mark and wordmark variations'),img('moto-kapitol',2,'Moto Kapitol Latin and Cyrillic logo treatments','Latin and Cyrillic treatments')] },
  { name: 'Sky City Deluxe', description: 'An architectural mark and wordmark for a property-focused identity.', images: [img('sky-city',2,'Sky City Deluxe logo in gold and silver variations','Mark and wordmark'),img('sky-city',3,'Sky City Deluxe logo on a building-sign presentation','Signage presentation mockup')] },
]
