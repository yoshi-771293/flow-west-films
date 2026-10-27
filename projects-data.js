/* Project + video data, shared by the site (pages.jsx, shared.jsx), the watch pages
 * at /projects/<slug> and scripts/seo-prerender (routes, VideoObject schema, sitemap).
 * Plain JS (no JSX) so Node can read it. Keep slugs stable: they are public URLs. */

window.FWF_PROJECTS = [
  // === ADS FIRST ===
  {
    slug: "kfc-spec-ad",
    client: "KFC", title: "Spec Ad", tag: "AI Spec Ad", cat: "ad", ind: "food", feature: 3,
    desc: "A cinematic spec ad for KFC — a gunslinger walks into a dusty frontier town for a quick draw, the fastest hand in the West going up against the world's fastest fried chicken. Powered by AI, curated by creators.",
    colors: ["#e4002b", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/14596e22-5c8c-42fc-a21e-d7fa4d3033ad/thumbnail_826e1ce9.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/14596e22-5c8c-42fc-a21e-d7fa4d3033ad?token=1763c69c0da5664b10e9295242ee0f09573d7e10378dc0e927b226e2d2fb013c&expires=1787907555&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "wgv-versicherung-ad-creative",
    client: "WGV Versicherung", title: "Ad Creative", tag: "Ad Creative", cat: "ad", ind: "finance",
    desc: "Ad creative for WGV Versicherung — a small mishap can quickly turn into real damage, and someone has to answer for it. Their private liability insurance has you covered.",
    colors: ["#2d6cdf", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/d1ef2cd0-f1f5-425e-8c7f-6c5d2bfef18f/thumbnail_a93ddee5.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/d1ef2cd0-f1f5-425e-8c7f-6c5d2bfef18f?token=c9676e9082150cfc7be006f83abb99581bebd9461e59c07c0b37c98ad78e5527&expires=1787850387&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "wgv-versicherung-vertical-cut",
    client: "WGV Versicherung", title: "Vertical Cut", tag: "Ad Creative", cat: "ad", ind: "finance", feature: 2,
    desc: "Vertical cut of the WGV Versicherung liability spot — reframed and upscaled for Reels and Stories, where the mishap has to land in the first two seconds.",
    colors: ["#2d6cdf", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/24acd352-29ff-4e05-917b-ff5716af6bbf/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/24acd352-29ff-4e05-917b-ff5716af6bbf?token=4cf8658e705771dd73a89ea979eb51ce1531bcb703b1105690c699a43ee4b271&expires=1787850076&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "nike-ad-creative",
    client: "Nike", title: "Ad Creative", tag: "Ad Creative", cat: "ad", ind: "sport", feature: 2,
    desc: "A cinematic spec ad for Nike — why athletes train through exhaustion and long odds, when giving up would be so much easier. Because you might win.",
    colors: ["#ff6420", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/d1b5fb3e-5c0b-435b-a9ec-9c1394f577d2/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/d1b5fb3e-5c0b-435b-a9ec-9c1394f577d2?token=d0e0018c7cdda6c2ee22db1f774b1ac7ab06e2a6006449e03ca40e7c5006c321&expires=1785493212&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "nord-vpn-ad-creative",
    client: "Nord VPN", title: "Ad Creative", tag: "Ad Creative", cat: "ad", ind: "tech", feature: 2,
    desc: "A spec commercial for Nord VPN — a young man feels watched everywhere, even by his own pets, until Nord VPN lets him relax, browse, and work in peace again.",
    colors: ["#4687ff", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/6f0f6301-6d12-42d9-a724-f29ec39a5f75/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/6f0f6301-6d12-42d9-a724-f29ec39a5f75?token=7a08a8999d42fb1837ed547d71935fac5de1a46658a4109acaf5ae63060cedc6&expires=1785488470&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "thomas-sabo-spec-ad",
    client: "Thomas Sabo", title: "Spec Ad", tag: "Ad Creative", cat: "ad", ind: "fashion",
    desc: "A cinematic spec ad for Thomas Sabo — a grave robber enters an abandoned pharaoh's tomb, searching for an artifact that can save his daughter. Dark, tense, and driven. Thomas Sabo: Rebel at Heart.",
    colors: ["#c9a96e", "#0a0a0a"],
    thumb: "assets/thumbs/thomas_sabo.png", video: "assets/videos/thomas_sabo.mp4"
  },
  {
    slug: "eibl-gmbh-ad-creative",
    client: "Eibl GmbH", title: "Ad Creative", tag: "Ad Creative", cat: "ad", ind: "realestate",
    desc: "Social ad creative for Eibl GmbH's ImmoVersteigerung — an Instagram platform helping people search all of Germany for real estate going up for auction.",
    colors: ["#c9a96e", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/c564f6f9-a279-4c39-be87-216cf6dc9fd9/thumbnail_e6b795ee.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/c564f6f9-a279-4c39-be87-216cf6dc9fd9?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "easy-foil-product-ad",
    client: "Easy Foil", title: "Product Ad", tag: "Ad Creative", cat: "ad", ind: "sport",
    desc: "Ad creative for Easy Foil — a lightweight, affordable hydrofoil built at Lake Constance. We spotlight the demo experience to make booking a test ride feel effortless. Ride the easy way.",
    colors: ["#9b30ff", "#ff6420"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/bb89e0c9-dba0-4457-b023-0f88a7309a86/thumbnail_03a191ed.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/bb89e0c9-dba0-4457-b023-0f88a7309a86?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "easy-foil-easy-drive-ad",
    client: "Easy Foil", title: "Easy Drive Ad", tag: "Ad Creative", cat: "ad", ind: "sport",
    desc: "Ad creative for Easy Foil's Easy Drive — showcasing the product in action for European market audiences.",
    colors: ["#9b30ff", "#ff6420"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/4a5a0bae-1c09-488e-9cd9-2b4ac461067e/thumbnail_c87ec7c6.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/4a5a0bae-1c09-488e-9cd9-2b4ac461067e?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "schmolke-carbon-ad-creative",
    client: "Schmolke Carbon", title: "Ad Creative", tag: "Ad Creative", cat: "ad", ind: "sport",
    desc: "Ad creative for Schmolke Carbon — a race handlebar built entirely from carbon, among the lightest bike components on the market. Premium engineering that shaves weight without sacrificing stability, built to help professional athletes go that little bit faster.",
    colors: ["#8a8f98", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/a0017744-8d83-4f2f-8f12-ca9e937adb3f/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/a0017744-8d83-4f2f-8f12-ca9e937adb3f?token=5fbde514eda6a34c2dfcf241b14a011c6ab6faf83cae60d1e13a7f88f981eda2&expires=1785494649&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "schmolke-carbon-ad-creative-cut-2",
    client: "Schmolke Carbon", title: "Ad Creative — Cut 2", tag: "Ad Creative", cat: "ad", ind: "sport",
    desc: "Ad creative for Schmolke Carbon — a stem built entirely from carbon, the same material and the same edge as their handlebars: among the lightest components on the market, shedding weight without giving up stability, built to help professional athletes go that little bit faster.",
    colors: ["#8a8f98", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/7b2b34e4-af62-4492-9247-5023b8f717a1/thumbnail_2204be89.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/7b2b34e4-af62-4492-9247-5023b8f717a1?token=e87b5cce50016d83e4b64a33aaabaadb25b34bbb88d2966a9c9003d009281c9f&expires=1785494752&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "schmolke-carbon-alps-descent",
    client: "Schmolke Carbon", title: "Alps Descent", tag: "AI Ad Creative", cat: "ad", ind: "sport", feature: 2,
    desc: "A cinematic spec ad for Schmolke Carbon — the precise moment physics meets the Alps. Ultralight carbon fibre, zero compromise, no motors — just mountain asphalt and absolute velocity. Powered by AI, curated by creators.",
    colors: ["#8a8f98", "#0a0a0a"],
    thumb: "https://i.ytimg.com/vi/IOSRkgMz6Ss/maxresdefault.jpg",
    video: "https://www.youtube.com/watch?v=IOSRkgMz6Ss"
  },
  {
    slug: "wilson-spec-ad",
    client: "Wilson", title: "Spec Ad", tag: "AI Ad Creative", cat: "ad", ind: "sport", feature: 2,
    desc: "A cinematic spec ad for Wilson — full commitment on the serve, the power and precision built into the racket captured in one frame. Powered by AI, curated by creators.",
    colors: ["#c8102e", "#0a0a0a"],
    thumb: "https://i.ytimg.com/vi/nYRfEo-6-Bk/maxresdefault.jpg",
    video: "https://youtu.be/nYRfEo-6-Bk"
  },
  {
    slug: "panthera-spec-ad",
    client: "Panthera", title: "Spec Ad", tag: "AI Ad Creative", cat: "ad", ind: "auto",
    desc: "A cinematic spec ad for Panthera — a close-up on the dash as the numbers climb past redline, selling raw performance in one held shot. Powered by AI, curated by creators.",
    colors: ["#111318", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/7c8bd9dd-aee2-4403-a564-24a9c9cb1597/thumbnail_6dcb52ff.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/7c8bd9dd-aee2-4403-a564-24a9c9cb1597?token=ae024d2b90742b4c25fcd33488d82cf705e0306d9d516a86b5761a06b1ba6495&expires=1788011506&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "porsche-for-the-chosen",
    client: "Porsche", title: "For the Chosen", tag: "Spec Ad", cat: "ad", ind: "auto", feature: 3,
    desc: "A cinematic spec ad for Porsche — an unmarked invitation, a wax seal broken, and a private collection left behind for the one car she's spent years earning the right to own. Exclusivity that isn't announced, just known.",
    colors: ["#d5001c", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/b383f508-762e-42a1-b709-ff858d7921a2/thumbnail_87ef2a1d.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/b383f508-762e-42a1-b709-ff858d7921a2?token=d915599a8dd079ce344fbc0915f219e0d8d93857668e8c56d43ec84aa535c074&expires=1788083004&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "eibl-gmbh-introduction-gloria",
    client: "Eibl GmbH", title: "Introduction: Gloria", tag: "Ad Creative", cat: "ad", ind: "realestate",
    desc: "Performance ad creative for Eibl GmbH's ImmoVersteigerung — an Instagram platform helping people search all of Germany for real estate going up for auction.",
    colors: ["#00ff88", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/ba8cc671-93fd-44ae-8e80-c72cb647d2c8/thumbnail_4088abe6.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/ba8cc671-93fd-44ae-8e80-c72cb647d2c8?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "list-for-less-brand-ad",
    client: "List for Less", title: "Brand Ad", tag: "Ad Creative", cat: "ad", ind: "tech", hidden: true,
    desc: "Animated brand ad for List for Less — no upfront cost, built for social performance.",
    colors: ["#00ff88", "#0a0a0a"],
    thumb: "assets/thumbs/list_for_less.png", video: "assets/videos/list_for_less.mp4"
  },
  {
    slug: "hook-creative-google-ranking-ad",
    client: "Hook Creative", title: "Google Ranking Ad", tag: "Ad Creative", cat: "ad", ind: "tech", hidden: true,
    desc: "Performance hook ad with on-screen copy — built for German-language social feeds.",
    colors: ["#ff6420", "#0a0a0a"],
    thumb: "assets/thumbs/hook2.png", video: "assets/videos/hook2.mp4"
  },
  {
    slug: "alienwork-skeleton-automatic-watch-short-cut",
    client: "Alienwork", title: "Skeleton Automatic Watch — Short Cut", tag: "Product", cat: "ad", ind: "fashion",
    desc: "Short-form product ad for the IK Automatic Watch reveal, built for social feeds.",
    colors: ["#00ff88", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/20d7d100-50a5-46f1-818b-d2a53fab7d9f/thumbnail_3627a386.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/20d7d100-50a5-46f1-818b-d2a53fab7d9f?token=7529d2fe701819da118392ca3b7ed4eec35ebd835b9c357a288e586061d0f6a8&expires=1785494607&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "alienwork-skeleton-automatic-watch-long-cut",
    client: "Alienwork", title: "Skeleton Automatic Watch — Long Cut", tag: "Product", cat: "ad", ind: "fashion",
    desc: "Full-length product film for the IK Automatic Watch reveal.",
    colors: ["#00ff88", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/9dc085af-2c2d-4f8c-acfd-d8ae5863c109/thumbnail_14fae6d7.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/9dc085af-2c2d-4f8c-acfd-d8ae5863c109?token=fdbabff47bdc0de76002f4a763a8932ce5b0095383825d078eb92e7148eaa636&expires=1785494800&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "alienwork-skeleton-automatic-watch-vertical-cut",
    client: "Alienwork", title: "Skeleton Automatic Watch — Vertical Cut", tag: "Product", cat: "ad", ind: "fashion",
    desc: "Vertical-format product commercial for the IK Automatic Watch — built for Meta Reels and Stories.",
    colors: ["#00ff88", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/08a90788-aa8a-4064-8574-8f80f57b454c/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/0ec6ff9f-c9e2-4415-b80e-b1bf6ed973a8?token=854c2caf8a78886201be846141911c2f25f7f68fba7948cbfb075befe312f297&expires=1785495352&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "swarovski-never-apologize",
    client: "Swarovski", title: "Never Apologize", tag: "Spec Ad", cat: "ad", ind: "fashion",
    desc: "A cinematic spec ad for Swarovski — a slow descent down a marble staircase in a gown, a necklace catching every light in the room, and a voiceover that refuses to soften itself. Luxury shot as confidence rather than seduction.",
    colors: ["#ff2d78", "#c9a96e"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/376b544f-331d-4b81-a3a6-a33ff0e0e91e/thumbnail_2352b428.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/376b544f-331d-4b81-a3a6-a33ff0e0e91e?token=af4d3cd50ee72620fbba1f456aaa4fc14e78ccb99e2a80d17f8de5310cff749a&expires=1787850351&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "voyah-360-tunnel-loop",
    client: "Voyah", title: "360° Tunnel Loop", tag: "Ad Creative", cat: "ad", ind: "auto", feature: 2,
    desc: "Ad creative for Voyah — an SUV runs a full 360-degree loop through a tunnel, pure stunt spectacle built to stop the scroll.",
    colors: ["#4687ff", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/637af620-778f-4a9b-83b6-7941d535a772/thumbnail_393fe05d.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/637af620-778f-4a9b-83b6-7941d535a772?token=613086822587d8be60269286e3b8c68f91c1e8aa67596a8ee013e0280f9026f3&expires=1787759279&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  // === SOCIAL / REELS ===
  {
    slug: "streetside-classics-showroom-reel",
    client: "Streetside Classics", title: "Showroom Reel", tag: "Ad Creative", cat: "social", ind: "auto", hidden: true,
    desc: "A reel for Streetside Classics — a classic car dealership in Dallas, Texas, showcasing oldtimers and other collector cars on the showroom floor.",
    colors: ["#c9a96e", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/17a28273-f384-4e59-8b80-246b438b39d7/thumbnail_185b77d1.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/17a28273-f384-4e59-8b80-246b438b39d7?token=95aa1ae35aece2cb912db29a8e60c714a77ad12e8cd53cbb99eedc33ff2fd243&expires=1787759058&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "swarovski-alienwork-thomas-sabo-jewelry-mashup",
    client: "Swarovski × Alienwork × Thomas Sabo", title: "Jewelry Mashup", tag: "Social Media", cat: "social", ind: "fashion", hidden: true,
    desc: "A fast-cut social mashup blending Swarovski, Alienwork, and Thomas Sabo — three jewelry and watch brands, one feed-ready reel.",
    colors: ["#c9a96e", "#9b30ff"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/55a6ac21-1885-439f-b4a4-575eba9bca85/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/55a6ac21-1885-439f-b4a4-575eba9bca85?token=ab0b09fa835293499e4548c2f61f9b642e21dd27e18d59d5f041a4ba5234031d&expires=1784306487&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "radisson-blu-valentines-campaign",
    client: "Radisson Blu", title: "Valentine's Campaign", tag: "Social Media", cat: "social", ind: "food",
    desc: "Valentine's Day campaign for Radisson Blu Stuttgart — candlelit ambiance, a skyline view, and 800,000+ organic impressions. No ad spend. Just a mood that sold itself.",
    colors: ["#ff2d78", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/58b5722f-c01a-49c3-b354-95f87ccfbbb5/thumbnail_1a214c59.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/58b5722f-c01a-49c3-b354-95f87ccfbbb5?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "radisson-blu-christmas-reel",
    client: "Radisson Blu", title: "Christmas Reel", tag: "Social Media", cat: "social", ind: "food", hidden: true,
    desc: "Seasonal cinematic reel for the Radisson Blu Stuttgart property.",
    colors: ["#9b30ff", "#ff2d78"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/c518444d-58e6-458e-a0a1-d7b880f8848d/thumbnail_56dc7cd1.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/c518444d-58e6-458e-a0a1-d7b880f8848d?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "palazzo-circus-dinner-show-reel",
    client: "Palazzo Circus", title: "Dinner Show Reel", tag: "Ad Creative", cat: "social", ind: "food",
    desc: "Instagram reel for Palazzo — five courses served inside a circus. Adult spectacle, a serious bar, and dinner that doubles as the show.",
    colors: ["#c9a96e", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/1dfa2361-efe0-4067-ae8c-6ccd66ea320c/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/1dfa2361-efe0-4067-ae8c-6ccd66ea320c?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "french-touch-patisserie-reel",
    client: "French Touch", title: "Patisserie Reel", tag: "Ad Creative", cat: "social", ind: "food", hidden: true,
    desc: "Instagram reel for French Touch — a French patisserie in the heart of Munich, where butter, flour, and a little patience do the talking.",
    colors: ["#ff2d78", "#9b30ff"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/ca3fa44f-26d8-4bef-9303-496692d4c76c/thumbnail_0acb9f11.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/ca3fa44f-26d8-4bef-9303-496692d4c76c?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "santa-lucia-restaurant-reel",
    client: "Santa Lucia", title: "Restaurant Reel", tag: "Ad Creative", cat: "social", ind: "food",
    desc: "Instagram reel for Santa Lucia — a founder-led Italian restaurant in Stuttgart, where the owner is on the floor every single day. The room, the plates, the atmosphere — everything that makes this place worth the table comes straight from the heart of Italy.",
    colors: ["#c9a96e", "#ff2d78"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/f8ed2a20-4ccb-4c66-8b60-84e314d177f6/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/f8ed2a20-4ccb-4c66-8b60-84e314d177f6?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "munich-bierfest-tavern-reel",
    client: "Munich Bierfest", title: "Tavern Reel", tag: "Ad Creative", cat: "social", ind: "food", hidden: true,
    desc: "A lively Instagram reel from a Munich Bierfest — clinking steins, swaying tables and the warm, golden buzz of a packed Bavarian tavern in full swing.",
    colors: ["#c9a96e", "#ff6420"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/9ac156cd-7c36-4057-835c-e199f03c1ecd/thumbnail_c3856f2e.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/9ac156cd-7c36-4057-835c-e199f03c1ecd?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "pane-e-vino-founder-reel",
    client: "Pane e Vino", title: "Founder Reel", tag: "Ad Creative", cat: "social", ind: "food", hidden: true,
    desc: "Instagram reel for Pane e Vino — a founder interview that breaks down what makes their Italian kitchen worth the table.",
    colors: ["#c9a96e", "#ff2d78"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/3a5fcbf7-486c-4aa6-a6e8-ece43bb17dfa/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/3a5fcbf7-486c-4aa6-a6e8-ece43bb17dfa?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "tim-rabitz-social-content",
    client: "Tim Rabitz", title: "Social Content", tag: "Social Media", cat: "social", ind: "personal",
    desc: "Social media content produced for Tim Rabitz.",
    colors: ["#9b30ff", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/649373ec-dede-43a1-86af-38639fdc2352/thumbnail_4e24d005.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/649373ec-dede-43a1-86af-38639fdc2352?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "schmolke-carbon-behind-the-lens",
    client: "Schmolke Carbon", title: "Behind the Lens", tag: "BTS", cat: "social", ind: "sport",
    desc: "Behind-the-scenes on a Schmolke Carbon production — in the studio, building the shot.",
    colors: ["#9b30ff", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/690975ad-3773-4966-8a30-92d3e4d4eae5/thumbnail_5142100b.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/690975ad-3773-4966-8a30-92d3e4d4eae5?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "recom-film-porsche-cgi-bts-racetrack-breakdown",
    client: "Recom Film", title: "Porsche — CGI BTS Racetrack Breakdown", tag: "BTS", cat: "social", ind: "auto",
    desc: "Porsche 911 GT3 RS commercial — produced by Recom Film (on-set production, video & CGI), edited by Flow West Films. Featuring a full CGI breakdown of the racetrack and car, and how the commercial was made.",
    colors: ["#00ff88", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/1e2b98cd-323c-4973-9301-7c295c5bba6d/thumbnail_b33fd788.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/1e2b98cd-323c-4973-9301-7c295c5bba6d?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "studio-sessions-behind-the-lens",
    client: "Studio Sessions", title: "Behind the Lens", tag: "BTS", cat: "social", ind: "food",
    desc: "Behind-the-scenes footage of a food & lifestyle commercial shoot.",
    colors: ["#ff6420", "#c9a96e"],
    thumb: "assets/thumbs/crew_bw.jpg", video: "assets/videos/inside_crew.mp4"
  },
  {
    slug: "flow-west-films-behind-the-scenes",
    client: "Flow West Films", title: "Behind the Scenes", tag: "BTS", cat: "social", ind: "culture",
    desc: "Behind-the-scenes from a Flow West Films production — on location, in the air.",
    colors: ["#9b30ff", "#0a0a0a"],
    thumb: "assets/thumbs/helikopter.jpg", video: "assets/videos/helikopter.mp4"
  },
  // === BRAND FILMS / TESTIMONIALS ===
  {
    slug: "eibl-gmbh-testimonial-elif-d",
    client: "Eibl GmbH", title: "Testimonial — Elif D.", tag: "Testimonial", cat: "image", ind: "realestate",
    desc: "Client testimonial with Elif D. for Eibl GmbH's ImmoVersteigerung — an Instagram platform helping people search all of Germany for real estate going up for auction.",
    colors: ["#c9a96e", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/c686eb45-8b2d-4513-a8d5-8a0419ca9469/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/c686eb45-8b2d-4513-a8d5-8a0419ca9469?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "eibl-gmbh-testimonial-chris",
    client: "Eibl GmbH", title: "Testimonial — Chris", tag: "Testimonial", cat: "image", ind: "realestate",
    desc: "Client testimonial for Eibl GmbH's ImmoVersteigerung — an Instagram platform helping people search all of Germany for real estate going up for auction.",
    colors: ["#9b30ff", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/cae8231c-893d-4a8c-910e-20c3c57b3384/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/cae8231c-893d-4a8c-910e-20c3c57b3384?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "cw-architectural-art-founder-interview",
    client: "CW Architectural Art", title: "Founder Interview", tag: "Brand Film", cat: "image", ind: "fashion",
    desc: "An intimate interview-led portrait for a luxury interior brand.",
    colors: ["#c9a96e", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/11efbd67-5d01-41da-829d-ea50d8d41e46/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/11efbd67-5d01-41da-829d-ea50d8d41e46?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "app-liqes-image-film",
    client: "App Liqes", title: "Image Film", tag: "Brand Film", cat: "image", ind: "tech",
    desc: "Image film for App Liqes — digital presence done right, featuring a Café Bar Relax customer testimonial. Shot on location in Ludwigsburg.",
    colors: ["#00ff88", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/d335b0a3-3816-44a1-af9e-7fb518ed16d1/thumbnail_46cf09ef.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/d335b0a3-3816-44a1-af9e-7fb518ed16d1?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  // === FILM ===
  {
    slug: "flow-west-films-the-lie-detector",
    client: "Flow West Films", title: "The Lie Detector", tag: "Short Film", cat: "film", ind: "culture",
    desc: "A short film built around a single interrogation — two men, one polygraph, and a needle that decides who walks out.",
    colors: ["#c9a96e", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/84e569a7-e590-49f3-8059-34f419507d9d/thumbnail_00a8a478.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/84e569a7-e590-49f3-8059-34f419507d9d?token=f68a92fb980a3c4a9359a693d97f929b632b914184479e9e57d610ce1b1e3217&expires=1787850430&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "whiskey-ice-short-film",
    client: "Whiskey & Ice", title: "Short Film", tag: "Short Film", cat: "film", ind: "culture",
    desc: "A family's son gets kidnapped, and the family deals with the aftermath of the kidnapping.",
    colors: ["#c9a96e", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/1e625e35-8914-4d5f-a7ba-1f0bb74503c1/thumbnail_8e1529b8.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/1e625e35-8914-4d5f-a7ba-1f0bb74503c1?token=454a24fae561ca750764e73bb60b19a64c9b1291b74dbdf1757cc58953b1dfd1&expires=1782990535&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "old-suffolk-boys-documentary",
    client: "Old Suffolk Boys", title: "Documentary", tag: "Doc", cat: "film", ind: "culture",
    desc: "A slice-of-life documentary following John Holder into the rural outback of East Anglia — small villages shaped by American influence, where locals make moonshine, play bluegrass, and collect old military gear. A unique subculture hiding in the British countryside.",
    colors: ["#c9a96e", "#1a1208"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/d62b1fcc-269a-4b00-9930-af757d8f2174/thumbnail_be26e700.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/d62b1fcc-269a-4b00-9930-af757d8f2174?token=180145980a43be1ad70f306f6f7691a2178ab2bc32954a9e04f92722dcfe6135&expires=1782989292&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    slug: "flow-west-films-quiet-sky",
    client: "Flow West Films", title: "Quiet Sky", tag: "Short Film", cat: "film", ind: "culture",
    desc: "A short film set in Earth orbit, where satellites and debris drift above the planet.",
    colors: ["#c9a96e", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/d0d7187d-abd0-4cce-85e9-784e691a596e/thumbnail_785257da.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/d0d7187d-abd0-4cce-85e9-784e691a596e?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  // === MUSIC ===
  {
    slug: "aonenine-shops-music-video",
    client: "aonenine", title: "SHOPS — Music Video", tag: "Music Video", cat: "music", ind: "culture",
    desc: "Directed music video for aonenine & DTOXiD. Shot on location in the UK.",
    colors: ["#9b30ff", "#ff2d78"],
    thumb: "assets/thumbs/shops_mv.jpg", video: "assets/videos/shops_mv.mp4"
  },
];

// When each video first went on the site (from git history) — uploadDate in the video schema.
window.FWF_VIDEO_ADDED = {
  "KFC·Spec Ad": "2026-08-27",
  "WGV Versicherung·Ad Creative": "2026-08-26",
  "WGV Versicherung·Vertical Cut": "2026-08-26",
  "Nike·Ad Creative": "2026-07-30",
  "Nord VPN·Ad Creative": "2026-07-30",
  "Thomas Sabo·Spec Ad": "2026-06-16",
  "Eibl GmbH·Ad Creative": "2026-06-16",
  "Easy Foil·Product Ad": "2026-06-18",
  "Easy Foil·Easy Drive Ad": "2026-06-18",
  "Schmolke Carbon·Ad Creative": "2026-07-30",
  "Schmolke Carbon·Ad Creative — Cut 2": "2026-07-30",
  "Schmolke Carbon·Alps Descent": "2026-08-12",
  "Wilson·Spec Ad": "2026-08-12",
  "Panthera·Spec Ad": "2026-08-28",
  "Porsche·For the Chosen": "2026-08-29",
  "Eibl GmbH·Introduction: Gloria": "2026-06-18",
  "List for Less·Brand Ad": "2026-06-16",
  "Hook Creative·Google Ranking Ad": "2026-06-16",
  "Alienwork·Skeleton Automatic Watch — Short Cut": "2026-07-30",
  "Alienwork·Skeleton Automatic Watch — Long Cut": "2026-07-30",
  "Alienwork·Skeleton Automatic Watch — Vertical Cut": "2026-07-30",
  "Swarovski·Never Apologize": "2026-08-26",
  "Voyah·360° Tunnel Loop": "2026-08-25",
  "Streetside Classics·Showroom Reel": "2026-08-25",
  "Swarovski × Alienwork × Thomas Sabo·Jewelry Mashup": "2026-07-16",
  "Radisson Blu·Valentine's Campaign": "2026-06-17",
  "Radisson Blu·Christmas Reel": "2026-06-18",
  "Palazzo Circus·Dinner Show Reel": "2026-06-16",
  "French Touch·Patisserie Reel": "2026-06-17",
  "Santa Lucia·Restaurant Reel": "2026-06-16",
  "Munich Bierfest·Tavern Reel": "2026-06-17",
  "Pane e Vino·Founder Reel": "2026-06-16",
  "Tim Rabitz·Social Content": "2026-06-17",
  "Schmolke Carbon·Behind the Lens": "2026-06-18",
  "Recom Film·Porsche — CGI BTS Racetrack Breakdown": "2026-06-16",
  "Studio Sessions·Behind the Lens": "2026-05-27",
  "Flow West Films·Behind the Scenes": "2026-06-16",
  "Eibl GmbH·Testimonial — Elif D.": "2026-06-16",
  "Eibl GmbH·Testimonial — Chris": "2026-06-16",
  "CW Architectural Art·Founder Interview": "2026-06-16",
  "App Liqes·Image Film": "2026-06-16",
  "Flow West Films·The Lie Detector": "2026-08-26",
  "Whiskey & Ice·Short Film": "2026-07-01",
  "Old Suffolk Boys·Documentary": "2026-07-01",
  "aonenine·SHOPS — Music Video": "2026-05-27",
  "Flow West Films·Brand Film": "2026-08-05",
  "Flow West Films·Quiet Sky": "2026-10-08"
};

// Pixel size of the top rendition and running time in seconds (Bunny HLS playlists, local files via mdls).
// YouTube entries only carry the 16:9 frame; their running time is not known here.
window.FWF_VIDEO_META = {
  "KFC·Spec Ad": {w: 1920, h: 1080, secs: 54},
  "WGV Versicherung·Ad Creative": {w: 1920, h: 1080, secs: 17},
  "WGV Versicherung·Vertical Cut": {w: 1080, h: 1920, secs: 29},
  "Nike·Ad Creative": {w: 1920, h: 1080, secs: 64},
  "Nord VPN·Ad Creative": {w: 1920, h: 1080, secs: 41},
  "Thomas Sabo·Spec Ad": {w: 1280, h: 720, secs: 110},
  "Eibl GmbH·Ad Creative": {w: 1080, h: 1920, secs: 55},
  "Easy Foil·Product Ad": {w: 1080, h: 1920, secs: 41},
  "Easy Foil·Easy Drive Ad": {w: 1920, h: 1080, secs: 12},
  "Schmolke Carbon·Ad Creative": {w: 1920, h: 1080, secs: 14},
  "Schmolke Carbon·Ad Creative — Cut 2": {w: 1920, h: 1080, secs: 14},
  "Schmolke Carbon·Alps Descent": {w: 16, h: 9},
  "Wilson·Spec Ad": {w: 16, h: 9},
  "Panthera·Spec Ad": {w: 1920, h: 1080, secs: 21},
  "Porsche·For the Chosen": {w: 1920, h: 1080, secs: 73},
  "Eibl GmbH·Introduction: Gloria": {w: 1920, h: 1080, secs: 25},
  "List for Less·Brand Ad": {w: 1920, h: 1080, secs: 33},
  "Hook Creative·Google Ranking Ad": {w: 1080, h: 1920, secs: 34},
  "Alienwork·Skeleton Automatic Watch — Short Cut": {w: 1920, h: 1080, secs: 17},
  "Alienwork·Skeleton Automatic Watch — Long Cut": {w: 1920, h: 1080, secs: 25},
  "Alienwork·Skeleton Automatic Watch — Vertical Cut": {w: 1920, h: 1080, secs: 22},
  "Swarovski·Never Apologize": {w: 1080, h: 1920, secs: 24},
  "Voyah·360° Tunnel Loop": {w: 1080, h: 1920, secs: 30},
  "Streetside Classics·Showroom Reel": {w: 1080, h: 1920, secs: 31},
  "Swarovski × Alienwork × Thomas Sabo·Jewelry Mashup": {w: 1080, h: 1920, secs: 9},
  "Radisson Blu·Valentine's Campaign": {w: 1080, h: 1920, secs: 63},
  "Radisson Blu·Christmas Reel": {w: 1080, h: 1920, secs: 36},
  "Palazzo Circus·Dinner Show Reel": {w: 1080, h: 1920, secs: 42},
  "French Touch·Patisserie Reel": {w: 1080, h: 1920, secs: 28},
  "Santa Lucia·Restaurant Reel": {w: 1080, h: 1920, secs: 51},
  "Munich Bierfest·Tavern Reel": {w: 1080, h: 1920, secs: 30},
  "Pane e Vino·Founder Reel": {w: 1080, h: 1920, secs: 56},
  "Tim Rabitz·Social Content": {w: 1080, h: 1920, secs: 22},
  "Schmolke Carbon·Behind the Lens": {w: 1080, h: 1920, secs: 14},
  "Recom Film·Porsche — CGI BTS Racetrack Breakdown": {w: 1920, h: 1080, secs: 105},
  "Studio Sessions·Behind the Lens": {w: 1920, h: 1080, secs: 15},
  "Flow West Films·Behind the Scenes": {w: 1920, h: 1080, secs: 12},
  "Eibl GmbH·Testimonial — Elif D.": {w: 1920, h: 1080, secs: 103},
  "Eibl GmbH·Testimonial — Chris": {w: 1920, h: 1080, secs: 166},
  "CW Architectural Art·Founder Interview": {w: 1920, h: 1080, secs: 135},
  "App Liqes·Image Film": {w: 1920, h: 1080, secs: 142},
  "Flow West Films·The Lie Detector": {w: 1920, h: 1080, secs: 130},
  "Whiskey & Ice·Short Film": {w: 1920, h: 1080, secs: 215},
  "Old Suffolk Boys·Documentary": {w: 1920, h: 1080, secs: 861},
  "Flow West Films·Quiet Sky": {w: 2520, h: 1080, secs: 638},
  "aonenine·SHOPS — Music Video": {w: 1280, h: 720, secs: 140}
};

// Watch pages (/projects/<slug>): H1 = project name + type, e.g. "Wilson — KI-Werbefilm".
// Shared with scripts/seo-prerender so the VideoObject name matches the page.
(function () {
  var TYPES = {
    "AI Spec Ad": { de: "KI-Werbefilm", en: "AI Commercial" },
    "AI Ad Creative": { de: "KI-Werbefilm", en: "AI Commercial" },
    "Ad Creative": { de: "Ad Creative", en: "Ad Creative" },
    "Spec Ad": { de: "Spec-Werbefilm", en: "Spec Commercial" },
    "Product": { de: "Produktvideo", en: "Product Video" },
    "Social Media": { de: "Social-Media-Video", en: "Social Media Video" },
    "BTS": { de: "Behind the Scenes", en: "Behind the Scenes" },
    "Testimonial": { de: "Testimonial-Video", en: "Testimonial Video" },
    "Brand Film": { de: "Imagefilm", en: "Brand Film" },
    "Short Film": { de: "Kurzfilm", en: "Short Film" },
    "Doc": { de: "Dokumentarfilm", en: "Documentary" },
    "Music Video": { de: "Musikvideo", en: "Music Video" },
  };
  // Titles that only repeat the format; the client name alone is clearer.
  var GENERIC = ["Spec Ad", "Ad Creative", "Product Ad", "Image Film", "Short Film", "Documentary", "Social Content", "Brand Ad", "Behind the Scenes"];
  function name(p) {
    if (GENERIC.indexOf(p.title) >= 0) return p.client;
    var t = p.title.replace(/^(Ad Creative|Testimonial) — /, "").replace(/ — Music Video$/, "");
    return p.client + ": " + t.replace(/ — |: /g, " · ");
  }
  function type(p, lang) { var t = TYPES[p.tag]; return t ? t[lang === "en" ? "en" : "de"] : p.tag; }
  function duration(secs) { return secs ? Math.floor(secs / 60) + ":" + String(secs % 60).padStart(2, "0") : ""; }
  window.FWF_WATCH = {
    name: name,
    type: type,
    title: function (p, lang) { return name(p) + " — " + type(p, lang); },
    duration: duration,
    find: function (slug) { return (window.FWF_PROJECTS || []).filter(function (p) { return p.slug === slug; })[0]; },
  };
})();
