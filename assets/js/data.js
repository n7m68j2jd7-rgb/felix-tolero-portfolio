/* ==========================================================
   data.js - projects, capabilities and experience.
   Captions and links come from the project files and the
   copy deck; roles and dates come from the CV.
   ========================================================== */
window.PROJECTS = [
{
  id:'podcast', idx:'01', span:'c7 t12 m12', ratio:'16/10', peek:'16/9',
  title:'Podcast Video Editing',
  client:'7 shows / multi-client',
  desc:'Full episode edits, multi-camera cuts, branded thumbnails and highlight reels for seven independent shows on YouTube.',
  tags:['Premiere Pro','Multi-cam','Thumbnails','YouTube'],
  cover:'assets/work/podcast/impact-society-ep5.webp',
  items:[
    {src:'assets/work/podcast/wealth-district-ep4.webp',      cap:'The Wealth District, Ep. 4 - with Alane',                     href:'https://www.youtube.com/watch?v=FL5wBFC-E_A&t=202s'},
    {src:'assets/work/podcast/gentlemans-playbook-ep6.webp',  cap:"The Gentleman’s Playbook, Ep. 6 - hosted by Rod Warner",      href:'https://www.youtube.com/watch?v=o3rA8Hgdihs&t=1502s'},
    {src:'assets/work/podcast/dream-motivates-rod-warner.webp',cap:"Dream Motivates Show - The Man Behind the Se7en S's",        href:'https://www.youtube.com/watch?v=xWKcqe5zFk8'},
    {src:'assets/work/podcast/impact-society-ep8.webp',       cap:'Impact Society, Ep. 8 - hosted by Patrick Wilbanks',          href:'https://www.youtube.com/watch?v=1mrFQG44J0o&t=204s'},
    {src:'assets/work/podcast/impact-society-ep5.webp',       cap:'Impact Society, Ep. 5 - hosted by Patrick Wilbanks',          href:'https://www.youtube.com/watch?v=lXwOnQviAKo&t=3s'},
    {src:'assets/work/podcast/pretty-powerful-ep10.webp',     cap:'Pretty Powerful Podcast, Ep. 10 - with M Layne & Tammy',      href:'https://www.youtube.com/watch?v=2uWD08sw9qw&t=1029s'},
    {src:'assets/work/podcast/pretty-powerful-ep11.webp',     cap:'Pretty Powerful Podcast, Ep. 11 - with Miss J',               href:'https://www.youtube.com/watch?v=FFQN2dHC-lA'}
  ]
},
{
  id:'rodwarner', idx:'02', span:'c5 t6 m12', ratio:'1/1',
  title:'Author Brand Campaign',
  client:'Rod Warner',
  desc:'A social set for an author, speaker and psychotherapist - book launches, credibility posts and campaign teasers in one consistent gold-on-black system.',
  tags:['Social','Book launch','Photoshop','1080x1080'],
  cover:'assets/work/rodwarner/rw-01-real-people-real-stories.webp',
  items:[
    {src:'assets/work/rodwarner/rw-01-real-people-real-stories.webp', cap:'Real People, Real Stories, Real Results'},
    {src:'assets/work/rodwarner/rw-02-unlock-true-confidence.webp',   cap:'Unlock True Confidence, Connection and Purpose'},
    {src:'assets/work/rodwarner/rw-03-guided-by-experience.webp',     cap:'Guided by Experience, Rooted in Truth'},
    {src:'assets/work/rodwarner/rw-04-many-lives-changed.webp',       cap:'Many Lives Changed. Yours Could Be Next.'},
    {src:'assets/work/rodwarner/rw-05-decades-of-trust.webp',         cap:'Decades of Trust. Thousands of Stories.'},
    {src:'assets/work/rodwarner/rw-06-se7en-ss.webp',                 cap:"The Se7en S's to Getting Any Woman - book promo"},
    {src:'assets/work/rodwarner/rw-07-unshackled.webp',               cap:'Unshackled: A Journey to Mental Wellness for Black Men'},
    {src:'assets/work/rodwarner/rw-08-about-rod.webp',                cap:'About Rod - profile card'},
    {src:'assets/work/rodwarner/rw-09-challenge-to-clarity.webp',     cap:'From Challenge to Clarity'}
  ]
},
{
  id:'impact', idx:'03', span:'c5 t6 m12', ratio:'1/1',
  title:'Impact Society',
  client:'Social media campaign',
  desc:'A six-post financial-literacy campaign built on one blue identity - city skylines, portrait crops and a fixed type hierarchy so the set reads as a series.',
  tags:['Campaign','Finance','Series design','Social'],
  cover:'assets/work/impact/01-your-family-deserves-more.webp',
  items:[
    {src:'assets/work/impact/01-your-family-deserves-more.webp',      cap:'Your Family Deserves More Than Just a Paycheck'},
    {src:'assets/work/impact/02-smarter-money-stronger-future.webp',  cap:'Smarter Money, Stronger Future'},
    {src:'assets/work/impact/03-lets-build-your-plan.webp',           cap:"Let's Build Your Plan"},
    {src:'assets/work/impact/04-financial-literacy.webp',             cap:'Financial Literacy'},
    {src:'assets/work/impact/05-changing-generations.webp',           cap:'Changing Generations'},
    {src:'assets/work/impact/06-your-greatest-success.webp',          cap:'Your Greatest Success'}
  ]
},
{
  id:'arctowers', idx:'04', span:'c7 t12 m12', ratio:'16/10',
  title:'Real Estate Marketing',
  client:'ArcTowers, Cebu City',
  desc:'Amenity features, unit showcases, commercial-space ads and a Halloween open-house set, all following the developer brand guidelines.',
  tags:['Real estate','Event','Brand guidelines','OJT'],
  cover:'assets/work/arctowers/05-halloween-open-house-purple.webp',
  items:[
    {src:'assets/work/arctowers/01-study-lounge.webp',                cap:'Study Lounge'},
    {src:'assets/work/arctowers/02-amenities-6th-floor.webp',         cap:'Amenities - 6th Floor'},
    {src:'assets/work/arctowers/03-amenities-23rd-floor.webp',        cap:'Amenities - 23rd Floor'},
    {src:'assets/work/arctowers/04-bedroom-retreat.webp',             cap:'Bedroom Retreat'},
    {src:'assets/work/arctowers/05-halloween-open-house-purple.webp', cap:'Halloween Open House - purple'},
    {src:'assets/work/arctowers/06-halloween-open-house-blue.webp',   cap:'Halloween Open House - blue'},
    {src:'assets/work/arctowers/07-commercial-shopping.webp',         cap:'Commercial Space - Shopping'},
    {src:'assets/work/arctowers/08-commercial-professional.webp',     cap:'Commercial Space - Professional'},
    {src:'assets/work/arctowers/09-commercial-family.webp',           cap:'Commercial Space - Family'}
  ]
},
{
  id:'deck', idx:'05', span:'c8 t12 m12', ratio:'16/10', peek:'16/9',
  title:'Brand Acceleration Deck',
  client:'Johnny Wimbrey',
  desc:'A 25-slide sales deck for a 12-month mastermind - cover to close, with a gold-on-charcoal system, cut-out portraits, comparison slides, pricing and testimonials.',
  tags:['Presentation','25 slides','Sales deck','Layout'],
  cover:'assets/work/deck/slide-01.webp',
  items:[
    {src:'assets/work/deck/slide-01.webp', cap:'01 - Johnny Wimbrey, PhD (cover)'},
    {src:'assets/work/deck/slide-02.webp', cap:'02 - Become the Visible Go-To Thought Leader'},
    {src:'assets/work/deck/slide-03.webp', cap:'03 - The Shift'},
    {src:'assets/work/deck/slide-04.webp', cap:'04 - Credibility'},
    {src:'assets/work/deck/slide-05.webp', cap:'05 - Who This Is For'},
    {src:'assets/work/deck/slide-06.webp', cap:'06 - Proof & Facts'},
    {src:'assets/work/deck/slide-07.webp', cap:'07 - Before / After'},
    {src:'assets/work/deck/slide-08.webp', cap:'08 - The Opportunity'},
    {src:'assets/work/deck/slide-09.webp', cap:'09 - Program Overview'},
    {src:'assets/work/deck/slide-10.webp', cap:'10 - Position'},
    {src:'assets/work/deck/slide-11.webp', cap:'11 - Get Published: Best-Selling Series Author'},
    {src:'assets/work/deck/slide-12.webp', cap:'12 - Publish'},
    {src:'assets/work/deck/slide-13.webp', cap:'13 - Promote'},
    {src:'assets/work/deck/slide-14.webp', cap:'14 - Support'},
    {src:'assets/work/deck/slide-15.webp', cap:'15 - Value Breakdown'},
    {src:'assets/work/deck/slide-16.webp', cap:'16 - Investment'},
    {src:'assets/work/deck/slide-17.webp', cap:'17 - Bonuses'},
    {src:'assets/work/deck/slide-18.webp', cap:'18 - Testimonial: Coach to Expert'},
    {src:'assets/work/deck/slide-19.webp', cap:'19 - Testimonial: Industry Dealmaker'},
    {src:'assets/work/deck/slide-20.webp', cap:'20 - Testimonial: Speaker & Panelist'},
    {src:'assets/work/deck/slide-21.webp', cap:'21 - Larry Winget Principle'},
    {src:'assets/work/deck/slide-22.webp', cap:'22 - Why It Works'},
    {src:'assets/work/deck/slide-23.webp', cap:'23 - Transformation Summary'},
    {src:'assets/work/deck/slide-24.webp', cap:'24 - Brand Acceleration Mastermind'},
    {src:'assets/work/deck/slide-25.webp', cap:'25 - Your Legacy Awaits'}
  ]
},
{
  id:'ucredesign', idx:'06', span:'c4 t12 m12', ratio:'4/5', tall:true,
  title:'UC Website Redesign',
  client:'University of Cebu',
  desc:'A high-fidelity redesign concept for the university site - four full page layouts covering the homepage, news, campuses and basic education.',
  tags:['UI/UX','Figma','Web design','4 pages'],
  cover:'assets/work/ucredesign/01-homepage.webp',
  items:[
    {src:'assets/work/ucredesign/01-homepage.webp',           cap:'Homepage'},
    {src:'assets/work/ucredesign/02-homepage-news-events.webp',cap:'Homepage - News & Events'},
    {src:'assets/work/ucredesign/03-campuses.webp',           cap:'Campuses'},
    {src:'assets/work/ucredesign/04-basic-education.webp',    cap:'Basic Education'}
  ]
},
{
  id:'sisters', idx:'07', span:'c7 t6 m12', ratio:'4/3', pos:'center top',
  title:'Survivor Awareness Set',
  client:'Sisters Network Dallas',
  desc:'Awareness and community graphics for an African-American breast cancer survivorship organisation - eleven posts in a pink-and-white system built for clarity.',
  tags:['Non-profit','Awareness','Community','Social'],
  cover:'assets/work/sisters/sisters-10.webp',
  items:[
    {src:'assets/work/sisters/sisters-01.webp', cap:"United Survivors - Empowering Black Women's Health"},
    {src:'assets/work/sisters/sisters-03.webp', cap:'Who We Are'},
    {src:'assets/work/sisters/sisters-04.webp', cap:'Join Us In This Fight'},
    {src:'assets/work/sisters/sisters-05.webp', cap:'Attention - monthly survivor meetings'},
    {src:'assets/work/sisters/sisters-06.webp', cap:'Strength Begins With Shared Survivor Knowledge'},
    {src:'assets/work/sisters/sisters-07.webp', cap:'A Safe Space For Survivor Voices'},
    {src:'assets/work/sisters/sisters-09.webp', cap:'Turning Survivor Strength Into Power'},
    {src:'assets/work/sisters/sisters-10.webp', cap:'Building Hope Beyond Breast Cancer'},
    {src:'assets/work/sisters/sisters-15.webp', cap:'In Unity There Is Strength'},
    {src:'assets/work/sisters/sisters-21.webp', cap:'From Diagnosis To Survivorship And Beyond'},
    {src:'assets/work/sisters/sisters-28.webp', cap:'World Cancer Day - February 4'}
  ]
},
{
  id:'jjtammy', idx:'08', span:'c5 t6 m12', ratio:'1/1',
  title:'Episode Teasers',
  client:'See You At The Top - JJ & Tammy',
  desc:'Square teaser graphics announcing upcoming podcast episodes, each built around the episode topic.',
  tags:['Podcast','Teaser','Social','1080x1080'],
  cover:'assets/work/jjtammy/jj-01-inlaw-drama.webp',
  items:[
    {src:'assets/work/jjtammy/jj-01-inlaw-drama.webp',  cap:'In-Laws and Extended Family Drama'},
    {src:'assets/work/jjtammy/jj-02-life-gets-busy.webp',cap:'Life Gets Busy'},
    {src:'assets/work/jjtammy/jj-03-money-stress.webp', cap:'Money and Financial Stress'},
    {src:'assets/work/jjtammy/jj-04-silent-storm.webp', cap:'The Silent Storm'},
    {src:'assets/work/jjtammy/jj-05-love-rekindled.webp', cap:'Love Rekindled'}
  ]
}
];

window.CAPABILITIES = [
  {n:'01', icon:'iconMic',     title:'Podcast Production',
   body:'Full podcast workflow: editing, mixing, publishing, plus the supporting content - thumbnails, highlight reels and social assets.'},
  {n:'02', icon:'iconPalette', title:'Graphic Design',
   body:'Social media campaigns, event materials and brand visuals, designed to get attention and stay consistent with who you are.'},
  {n:'03', icon:'iconFilm',    title:'Video Editing',
   body:'Short-form reels, podcast highlights and long-form content, edited and optimised for YouTube, Instagram, TikTok and Facebook.'},
  {n:'04', icon:'iconWeb',     title:'Webflow Development',
   body:'Clean, responsive Webflow builds with structured CMS collections, dynamic pages and branding that scales with your business.'}
];

/* roles and dates as listed on the CV */
window.EXPERIENCE = [
  {role:'Graphic Designer',            org:'Luna Group Brisbane - Remote',      date:'Aug 2026 - Present', type:'Full time',
   desc:'Designing graphics and visual content for digital marketing campaigns.'},
  {role:'Content Producer Assistant',  org:'Leilani Spring Digital - Remote',   date:'Jun 2026 - Present', type:'Part time',
   desc:'Supporting content production workflows across digital media creation and publishing.'},
  {role:'Podcast & Reel Editor',       org:'Broadcast Your Authority - Remote', date:'Feb 2026 - Jun 2026', type:'',
   desc:'Edited podcast episodes and short-form reels for YouTube and social media.'},
  {role:'Podcast Production & Management', org:'Podcast Production VA - Remote', date:'Oct 2025 - Present', type:'',
   desc:'Managing podcast workflow, episode organisation, publishing and social media assets.'},
  {role:'Webflow Developer',           org:'Webflow CMS - Remote',              date:'Sep 2025', type:'',
   desc:'Built CMS collections, templates and dynamic pages aligned with branding standards.'},
  {role:'Graphic Designer (OJT)',      org:'ArcTowers - Cebu City',             date:'Sep 2024 - Nov 2024', type:'',
   desc:'Designed social media posts, banners and marketing materials following brand guidelines.'},
  {role:'Graphic Designer & Video Editor', org:'Dream Media - Remote',     date:'Aug 2023 - Present', type:'',
   desc:'Designed graphics and edited podcast videos for YouTube, Instagram, Facebook and TikTok.'},
  {role:'Graphic Designer',            org:'Freelance - Remote',                date:'2022 - 2023', type:'',
   desc:'Created digital assets for TikTok creators and designed campaign and event materials.'}
];

window.TICKER = ['Podcast Production','Graphic Design','Video Editing','Webflow','UI/UX Design',
                 'Motion & Reels','Presentation Design','Brand Systems'];

/* ==========================================================
   Case-study copy, keyed by project id.
   ========================================================== */
window.CASES = {
podcast:{
  year:'2023 - present', role:'Video Editor', discipline:'Podcast Production',
  summary:'Full episode edits and a thumbnail system for seven independent shows.',
  tools:['Premiere Pro','Photoshop','CapCut'],
  sections:[
    {h:'The brief', p:'Seven independent shows needed episodes turned around on a steady schedule - not just the edit, but the thumbnails and clips that actually get someone to click.'},
    {h:'Approach', p:'Multi-camera assembly and cleanup first, then a repeatable thumbnail system per show: a fixed logo lockup, a pull-quote bar, a host name block and a waveform motif. Each show keeps its own colour, so a subscriber scrolling their feed reads the episodes as a series rather than as unrelated uploads.'},
    {h:'Output', p:'Seven episode packages across The Wealth District, The Gentleman’s Playbook, Dream Motivates, Impact Society and Pretty Powerful. Every thumbnail below links to the published episode.'}
  ]
},
rodwarner:{
  year:'2025', role:'Graphic Designer', discipline:'Social Campaign',
  summary:'One gold-on-black system carrying book launches, credibility posts and teasers.',
  tools:['Photoshop','Canva'],
  sections:[
    {h:'The brief', p:'An author, speaker and psychotherapist launching two books needed a social presence that read as one authority brand instead of a run of unrelated posts.'},
    {h:'Approach', p:'A single gold-on-black system: a signature script for the name, condensed caps for headlines, and the same footer bar with handles on every post. Cut-out portraits sit over dark backgrounds so attention stays on the subject, and book covers composite in at a fixed scale.'},
    {h:'Output', p:'Nine square posts covering the book promos for The Se7en S’s and Unshackled, credibility and trust posts, an about card, and campaign teasers.'}
  ]
},
impact:{
  year:'2024', role:'Graphic Designer', discipline:'Social Campaign',
  summary:'A six-post financial-literacy campaign built to run as a set.',
  tools:['Photoshop','Canva'],
  sections:[
    {h:'The brief', p:'Six financial-literacy posts that had to work as one campaign, not six separate designs.'},
    {h:'Approach', p:'A fixed split layout - portrait on one side, message on the other, over a blue city skyline. The type hierarchy is locked across all six: headline, highlighted sub-line, then a pill-shaped payoff. Only the copy and the photograph change between posts.'},
    {h:'Output', p:'Six posts on family legacy, smarter money, planning, financial literacy, generational change and success.'}
  ]
},
arctowers:{
  year:'2024', role:'Graphic Designer (OJT)', discipline:'Real Estate Marketing',
  summary:'Amenity features, unit showcases and an event campaign inside set brand guidelines.',
  tools:['Photoshop','Canva','Lightroom'],
  sections:[
    {h:'The brief', p:'A Cebu City residential developer needed amenity features, unit showcases, commercial-space advertising and a seasonal event campaign - all inside brand guidelines that were already set.'},
    {h:'Approach', p:'Two registers. A quiet property register for amenities and units, using the brand palette and photography with restrained type. Then a louder illustrated register for the Halloween open house, produced in a purple and a blue variant so the same invitation could run twice without repeating itself.'},
    {h:'Output', p:'Nine assets: four property features, two event invitations and three commercial-space advertisements.'}
  ]
},
deck:{
  year:'2025', role:'Presentation Designer', discipline:'Sales Deck',
  summary:'A 25-slide mastermind pitch, cover to close, on one gold-on-charcoal system.',
  tools:['PowerPoint','Photoshop'],
  sections:[
    {h:'The brief', p:'A 12-month mastermind sold from stage and on calls needed a deck that could carry the whole pitch - positioning, proof, programme, price and close - without a presenter filling the gaps.'},
    {h:'Approach', p:'One gold-on-charcoal system. Condensed display caps for section titles, cut-out portraits repeated as a rhythmic device, and a fixed grid underneath the content slides so before-and-after, the three phases, the value breakdown and the testimonials all sit on the same skeleton.'},
    {h:'Output', p:'Twenty-five slides: positioning, proof and facts, the three-phase programme, value breakdown, investment, bonuses, three testimonials and a closing slide.'}
  ]
},
ucredesign:{
  year:'2025', role:'UI/UX Designer', discipline:'Web Design',
  summary:'A four-page redesign concept for a university with a crowded homepage.',
  tools:['Figma'],
  sections:[
    {h:'The brief', p:'A redesign concept for the University of Cebu website - a large institution with news, events, multiple campuses and a basic-education arm all competing for the same homepage.'},
    {h:'Approach', p:'A sectioned model that gives every content type a fixed home: hero carousel, popular posts set against announcements, a news band, an events band, then quick-action tiles for enrolment and scholarship. The university blue and yellow carry the hierarchy, so the eye lands on actions rather than decoration.'},
    {h:'Output', p:'Four full-length page designs: homepage, homepage with news and events, campuses, and basic education.'}
  ]
},
sisters:{
  year:'2025', role:'Graphic Designer', discipline:'Non-profit Campaign',
  summary:'Eleven awareness posts for a breast cancer survivorship organisation.',
  tools:['Photoshop','Canva'],
  sections:[
    {h:'The brief', p:'An African-American breast cancer survivorship organisation needed awareness and community posts that stayed warm, legible and usable across a wide audience.'},
    {h:'Approach', p:'A pink-and-white system with the same contact footer on every post, so any single graphic can travel on its own and still say who made it and how to reach them. Photographs of real members carry most of the set; heavier type takes over only where the message itself is the point.'},
    {h:'Output', p:'Eleven posts spanning who-we-are, monthly survivor meetings, support resources, community strength and World Cancer Day.'}
  ]
},
jjtammy:{
  year:'2025', role:'Graphic Designer', discipline:'Podcast Promotion',
  summary:'Five episode teasers, each built on a single visual metaphor.',
  tools:['Photoshop','Canva'],
  sections:[
    {h:'The brief', p:'Teasers announcing upcoming episodes of See You At The Top, each built around one topic.'},
    {h:'Approach', p:'A shared frame - show logotype, topic in condensed caps, a stay-tuned call-out and the channel prompt. Each teaser then leans on a different visual metaphor for its subject: chains for family drama, a city skyline for a life that has got too busy, gold coins for financial stress, a storm-lit skyline for the silent storm, and warm gold for love rekindled.'},
    {h:'Output', p:'Five square teasers for the show’s YouTube channel.'}
  ]
}
};

/* the marquee lists only companies that appear in EXPERIENCE */
window.COMPANIES = window.EXPERIENCE.map(function (e) {
  return e.org.split(' - ')[0];
});
