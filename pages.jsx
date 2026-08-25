/* global React, Icons, Link, Crosshairs, FinalCTA, OfferCard, OFFERS, ProjectThumb, TypewriterWord, VideoModal, BunnyPlayer, GrowthEngineSection, WhyFwfSection */
const { useState: useStateP, useEffect: useEffectP, useRef: useRefP } = React;

// ============================================
// All projects data (with real video/thumb where available)
// ============================================
const ALL_PROJECTS = [
  // === ADS FIRST ===
  {
    client: "WGV Versicherung", title: "Ad Creative", tag: "Ad Creative", cat: "ad", feature: 5,
    desc: "Ad creative for WGV Versicherung — a small mishap can quickly turn into real damage, and someone has to answer for it. Their private liability insurance has you covered.",
    colors: ["#2d6cdf", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/6c5e6dd1-cb8e-4031-ba05-e233a28bb5c1/thumbnail_d8e174d4.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/6c5e6dd1-cb8e-4031-ba05-e233a28bb5c1?token=dd6c824357b5106c675b3fa00ab52be2902b7100a012a6fa08b3791ef547b994&expires=1785488747&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Nike", title: "Ad Creative", tag: "Ad Creative", cat: "ad", feature: 5,
    desc: "A cinematic spec ad for Nike — why athletes train through exhaustion and long odds, when giving up would be so much easier. Because you might win.",
    colors: ["#ff6420", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/d1b5fb3e-5c0b-435b-a9ec-9c1394f577d2/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/d1b5fb3e-5c0b-435b-a9ec-9c1394f577d2?token=d0e0018c7cdda6c2ee22db1f774b1ac7ab06e2a6006449e03ca40e7c5006c321&expires=1785493212&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Nord VPN", title: "Ad Creative", tag: "Ad Creative", cat: "ad", feature: 6,
    desc: "A spec commercial for Nord VPN — a young man feels watched everywhere, even by his own pets, until Nord VPN lets him relax, browse, and work in peace again.",
    colors: ["#4687ff", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/6f0f6301-6d12-42d9-a724-f29ec39a5f75/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/6f0f6301-6d12-42d9-a724-f29ec39a5f75?token=7a08a8999d42fb1837ed547d71935fac5de1a46658a4109acaf5ae63060cedc6&expires=1785488470&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Thomas Sabo", title: "Spec Ad", tag: "Ad Creative", cat: "ad",
    desc: "A cinematic spec ad for Thomas Sabo — a grave robber enters an abandoned pharaoh's tomb, searching for an artifact that can save his daughter. Dark, tense, and driven. Thomas Sabo: Rebel at Heart.",
    colors: ["#c9a96e", "#0a0a0a"],
    thumb: "assets/thumbs/thomas_sabo.png", video: "assets/videos/thomas_sabo.mp4"
  },
  {
    client: "Eibl GmbH", title: "Ad Creative", tag: "Ad Creative", cat: "ad", feature: 3,
    desc: "Social ad creative for Eibl GmbH's ImmoVersteigerung — an Instagram platform helping people search all of Germany for real estate going up for auction.",
    colors: ["#c9a96e", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/c564f6f9-a279-4c39-be87-216cf6dc9fd9/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/c564f6f9-a279-4c39-be87-216cf6dc9fd9?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Easy Foil", title: "Product Ad", tag: "Ad Creative", cat: "ad",
    desc: "Ad creative for Easy Foil — a lightweight, affordable hydrofoil built at Lake Constance. We spotlight the demo experience to make booking a test ride feel effortless. Ride the easy way.",
    colors: ["#9b30ff", "#ff6420"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/bb89e0c9-dba0-4457-b023-0f88a7309a86/thumbnail_03a191ed.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/bb89e0c9-dba0-4457-b023-0f88a7309a86?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Easy Foil", title: "Easy Drive Ad", tag: "Ad Creative", cat: "ad",
    desc: "Ad creative for Easy Foil's Easy Drive — showcasing the product in action for European market audiences.",
    colors: ["#9b30ff", "#ff6420"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/4a5a0bae-1c09-488e-9cd9-2b4ac461067e/thumbnail_c87ec7c6.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/4a5a0bae-1c09-488e-9cd9-2b4ac461067e?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Schmolke Carbon", title: "Ad Creative", tag: "Ad Creative", cat: "ad",
    desc: "Ad creative for Schmolke Carbon — a race handlebar built entirely from carbon, among the lightest bike components on the market. Premium engineering that shaves weight without sacrificing stability, built to help professional athletes go that little bit faster.",
    colors: ["#8a8f98", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/a0017744-8d83-4f2f-8f12-ca9e937adb3f/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/a0017744-8d83-4f2f-8f12-ca9e937adb3f?token=5fbde514eda6a34c2dfcf241b14a011c6ab6faf83cae60d1e13a7f88f981eda2&expires=1785494649&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Schmolke Carbon", title: "Ad Creative — Cut 2", tag: "Ad Creative", cat: "ad",
    desc: "Ad creative for Schmolke Carbon — a stem built entirely from carbon, the same material and the same edge as their handlebars: among the lightest components on the market, shedding weight without giving up stability, built to help professional athletes go that little bit faster.",
    colors: ["#8a8f98", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/7b2b34e4-af62-4492-9247-5023b8f717a1/thumbnail_2204be89.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/7b2b34e4-af62-4492-9247-5023b8f717a1?token=e87b5cce50016d83e4b64a33aaabaadb25b34bbb88d2966a9c9003d009281c9f&expires=1785494752&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Schmolke Carbon", title: "Alps Descent", tag: "AI Ad Creative", cat: "ad", feature: 5,
    desc: "A cinematic spec ad for Schmolke Carbon — the precise moment physics meets the Alps. Ultralight carbon fibre, zero compromise, no motors — just mountain asphalt and absolute velocity. Powered by AI, curated by creators.",
    colors: ["#8a8f98", "#0a0a0a"],
    thumb: "https://i.ytimg.com/vi/IOSRkgMz6Ss/maxresdefault.jpg",
    video: "https://www.youtube.com/watch?v=IOSRkgMz6Ss"
  },
  {
    client: "Wilson", title: "Spec Ad", tag: "AI Ad Creative", cat: "ad", feature: 5,
    desc: "A cinematic spec ad for Wilson — full commitment on the serve, the power and precision built into the racket captured in one frame. Powered by AI, curated by creators.",
    colors: ["#c8102e", "#0a0a0a"],
    thumb: "https://i.ytimg.com/vi/nYRfEo-6-Bk/maxresdefault.jpg",
    video: "https://youtu.be/nYRfEo-6-Bk"
  },
  {
    client: "Eibl GmbH", title: "Introduction: Gloria", tag: "Ad Creative", cat: "ad",
    desc: "Performance ad creative for Eibl GmbH's ImmoVersteigerung — an Instagram platform helping people search all of Germany for real estate going up for auction.",
    colors: ["#00ff88", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/ba8cc671-93fd-44ae-8e80-c72cb647d2c8/thumbnail_4088abe6.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/ba8cc671-93fd-44ae-8e80-c72cb647d2c8?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "List for Less", title: "Brand Ad", tag: "Ad Creative", cat: "ad",
    desc: "Animated brand ad for List for Less — no upfront cost, built for social performance.",
    colors: ["#00ff88", "#0a0a0a"],
    thumb: "assets/thumbs/list_for_less.png", video: "assets/videos/list_for_less.mp4"
  },
  {
    client: "Hook Creative", title: "Google Ranking Ad", tag: "Ad Creative", cat: "ad",
    desc: "Performance hook ad with on-screen copy — built for German-language social feeds.",
    colors: ["#ff6420", "#0a0a0a"],
    thumb: "assets/thumbs/hook2.png", video: "assets/videos/hook2.mp4"
  },
  {
    client: "Alienwork", title: "Skeleton Automatic Watch — Short Cut", tag: "Product", cat: "ad",
    desc: "Short-form product ad for the IK Automatic Watch reveal, built for social feeds.",
    colors: ["#00ff88", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/20d7d100-50a5-46f1-818b-d2a53fab7d9f/thumbnail_3627a386.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/20d7d100-50a5-46f1-818b-d2a53fab7d9f?token=7529d2fe701819da118392ca3b7ed4eec35ebd835b9c357a288e586061d0f6a8&expires=1785494607&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Alienwork", title: "Skeleton Automatic Watch — Long Cut", tag: "Product", cat: "ad", feature: 3,
    desc: "Full-length product film for the IK Automatic Watch reveal.",
    colors: ["#00ff88", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/9dc085af-2c2d-4f8c-acfd-d8ae5863c109/thumbnail_14fae6d7.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/9dc085af-2c2d-4f8c-acfd-d8ae5863c109?token=fdbabff47bdc0de76002f4a763a8932ce5b0095383825d078eb92e7148eaa636&expires=1785494800&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Alienwork", title: "Skeleton Automatic Watch — Vertical Cut", tag: "Product", cat: "ad",
    desc: "Vertical-format product commercial for the IK Automatic Watch — built for Meta Reels and Stories.",
    colors: ["#00ff88", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/08a90788-aa8a-4064-8574-8f80f57b454c/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/0ec6ff9f-c9e2-4415-b80e-b1bf6ed973a8?token=854c2caf8a78886201be846141911c2f25f7f68fba7948cbfb075befe312f297&expires=1785495352&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Swarovski", title: "Product Reel", tag: "Product", cat: "ad",
    desc: "Coming soon — luxury product reel for a Swarovski jewellery line.",
    colors: ["#ff2d78", "#c9a96e"]
  },
  {
    client: "Voyah", title: "360° Tunnel Loop", tag: "Ad Creative", cat: "ad",
    desc: "Ad creative for Voyah — an SUV runs a full 360-degree loop through a tunnel, pure stunt spectacle built to stop the scroll.",
    colors: ["#4687ff", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/637af620-778f-4a9b-83b6-7941d535a772/thumbnail_393fe05d.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/637af620-778f-4a9b-83b6-7941d535a772?token=613086822587d8be60269286e3b8c68f91c1e8aa67596a8ee013e0280f9026f3&expires=1787759279&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  // === SOCIAL / REELS ===
  {
    client: "Streetside Classics", title: "Showroom Reel", tag: "Reel", cat: "social",
    desc: "A reel for Streetside Classics — a classic car dealership in Dallas, Texas, showcasing oldtimers and other collector cars on the showroom floor.",
    colors: ["#c9a96e", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/17a28273-f384-4e59-8b80-246b438b39d7/thumbnail_185b77d1.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/17a28273-f384-4e59-8b80-246b438b39d7?token=95aa1ae35aece2cb912db29a8e60c714a77ad12e8cd53cbb99eedc33ff2fd243&expires=1787759058&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Swarovski × Alienwork × Thomas Sabo", title: "Jewelry Mashup", tag: "Social Media", cat: "social", feature: 3,
    desc: "A fast-cut social mashup blending Swarovski, Alienwork, and Thomas Sabo — three jewelry and watch brands, one feed-ready reel.",
    colors: ["#c9a96e", "#9b30ff"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/55a6ac21-1885-439f-b4a4-575eba9bca85/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/55a6ac21-1885-439f-b4a4-575eba9bca85?token=ab0b09fa835293499e4548c2f61f9b642e21dd27e18d59d5f041a4ba5234031d&expires=1784306487&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Radisson Blu", title: "Valentine's Campaign", tag: "Social Media", cat: "social",
    desc: "Valentine's Day campaign for Radisson Blu Stuttgart — candlelit ambiance, a skyline view, and 800,000+ organic impressions. No ad spend. Just a mood that sold itself.",
    colors: ["#ff2d78", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/58b5722f-c01a-49c3-b354-95f87ccfbbb5/thumbnail_1a214c59.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/58b5722f-c01a-49c3-b354-95f87ccfbbb5?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Radisson Blu", title: "Christmas Reel", tag: "Social Media", cat: "social",
    desc: "Seasonal cinematic reel for the Radisson Blu Stuttgart property.",
    colors: ["#9b30ff", "#ff2d78"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/c518444d-58e6-458e-a0a1-d7b880f8848d/thumbnail_56dc7cd1.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/c518444d-58e6-458e-a0a1-d7b880f8848d?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Palazzo Circus", title: "Dinner Show Reel", tag: "Reel", cat: "social",
    desc: "Instagram reel for Palazzo — five courses served inside a circus. Adult spectacle, a serious bar, and dinner that doubles as the show.",
    colors: ["#c9a96e", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/1dfa2361-efe0-4067-ae8c-6ccd66ea320c/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/1dfa2361-efe0-4067-ae8c-6ccd66ea320c?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "French Touch", title: "Patisserie Reel", tag: "Reel", cat: "social",
    desc: "Instagram reel for French Touch — a French patisserie in the heart of Munich, where butter, flour, and a little patience do the talking.",
    colors: ["#ff2d78", "#9b30ff"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/ca3fa44f-26d8-4bef-9303-496692d4c76c/thumbnail_0acb9f11.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/ca3fa44f-26d8-4bef-9303-496692d4c76c?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Santa Lucia", title: "Restaurant Reel", tag: "Reel", cat: "social",
    desc: "Instagram reel for Santa Lucia — a founder-led Italian restaurant in Stuttgart, where the owner is on the floor every single day. The room, the plates, the atmosphere — everything that makes this place worth the table comes straight from the heart of Italy.",
    colors: ["#c9a96e", "#ff2d78"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/f8ed2a20-4ccb-4c66-8b60-84e314d177f6/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/f8ed2a20-4ccb-4c66-8b60-84e314d177f6?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Munich Bierfest", title: "Tavern Reel", tag: "Reel", cat: "social",
    desc: "A lively Instagram reel from a Munich Bierfest — clinking steins, swaying tables and the warm, golden buzz of a packed Bavarian tavern in full swing.",
    colors: ["#c9a96e", "#ff6420"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/9ac156cd-7c36-4057-835c-e199f03c1ecd/thumbnail_c3856f2e.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/9ac156cd-7c36-4057-835c-e199f03c1ecd?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Pane e Vino", title: "Founder Reel", tag: "Reel", cat: "social",
    desc: "Instagram reel for Pane e Vino — a founder interview that breaks down what makes their Italian kitchen worth the table.",
    colors: ["#c9a96e", "#ff2d78"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/3a5fcbf7-486c-4aa6-a6e8-ece43bb17dfa/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/3a5fcbf7-486c-4aa6-a6e8-ece43bb17dfa?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Tim Rabitz", title: "Social Content", tag: "Social Media", cat: "social",
    desc: "Social media content produced for Tim Rabitz.",
    colors: ["#9b30ff", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/649373ec-dede-43a1-86af-38639fdc2352/thumbnail_4e24d005.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/649373ec-dede-43a1-86af-38639fdc2352?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Schmolke Carbon", title: "Behind the Lens", tag: "BTS", cat: "social",
    desc: "Behind-the-scenes on a Schmolke Carbon production — in the studio, building the shot.",
    colors: ["#9b30ff", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/690975ad-3773-4966-8a30-92d3e4d4eae5/thumbnail_5142100b.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/690975ad-3773-4966-8a30-92d3e4d4eae5?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Recom Film", title: "Porsche — CGI BTS Racetrack Breakdown", tag: "BTS", cat: "social",
    desc: "Porsche 911 GT3 RS commercial — produced by Recom Film (on-set production, video & CGI), edited by Flow West Films. Featuring a full CGI breakdown of the racetrack and car, and how the commercial was made.",
    colors: ["#00ff88", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/1e2b98cd-323c-4973-9301-7c295c5bba6d/thumbnail_b33fd788.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/1e2b98cd-323c-4973-9301-7c295c5bba6d?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Studio Sessions", title: "Behind the Lens", tag: "BTS", cat: "social",
    desc: "Behind-the-scenes footage of a food & lifestyle commercial shoot.",
    colors: ["#ff6420", "#c9a96e"],
    thumb: "assets/thumbs/crew_bw.jpg", video: "assets/videos/inside_crew.mp4"
  },
  {
    client: "Flow West Films", title: "Behind the Scenes", tag: "BTS", cat: "social",
    desc: "Behind-the-scenes from a Flow West Films production — on location, in the air.",
    colors: ["#9b30ff", "#0a0a0a"],
    thumb: "assets/thumbs/helikopter.jpg", video: "assets/videos/helikopter.mp4"
  },
  // === BRAND FILMS / TESTIMONIALS ===
  {
    client: "Eibl GmbH", title: "Testimonial — Elif D.", tag: "Testimonial", cat: "image",
    desc: "Client testimonial with Elif D. for Eibl GmbH's ImmoVersteigerung — an Instagram platform helping people search all of Germany for real estate going up for auction.",
    colors: ["#c9a96e", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/c686eb45-8b2d-4513-a8d5-8a0419ca9469/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/c686eb45-8b2d-4513-a8d5-8a0419ca9469?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Eibl GmbH", title: "Testimonial — Chris", tag: "Testimonial", cat: "image",
    desc: "Client testimonial for Eibl GmbH's ImmoVersteigerung — an Instagram platform helping people search all of Germany for real estate going up for auction.",
    colors: ["#9b30ff", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/cae8231c-893d-4a8c-910e-20c3c57b3384/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/cae8231c-893d-4a8c-910e-20c3c57b3384?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "CW Architectural Art", title: "Founder Interview", tag: "Brand Film", cat: "image",
    desc: "An intimate interview-led portrait for a luxury interior brand.",
    colors: ["#c9a96e", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/11efbd67-5d01-41da-829d-ea50d8d41e46/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/11efbd67-5d01-41da-829d-ea50d8d41e46?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "App Liqes", title: "Image Film", tag: "Brand Film", cat: "image", feature: 3,
    desc: "Image film for App Liqes — digital presence done right, featuring a Café Bar Relax customer testimonial. Shot on location in Ludwigsburg.",
    colors: ["#00ff88", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/91b09a39-35a9-41b3-a181-6dcfbca79e73/thumbnail_73fb59f1.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/91b09a39-35a9-41b3-a181-6dcfbca79e73?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  // === FILM ===
  {
    client: "Whiskey & Ice", title: "Short Film", tag: "Short Film", cat: "film",
    desc: "A family's son gets kidnapped, and the family deals with the aftermath of the kidnapping.",
    colors: ["#c9a96e", "#0a0a0a"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/1e625e35-8914-4d5f-a7ba-1f0bb74503c1/thumbnail_8e1529b8.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/1e625e35-8914-4d5f-a7ba-1f0bb74503c1?token=454a24fae561ca750764e73bb60b19a64c9b1291b74dbdf1757cc58953b1dfd1&expires=1782990535&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Old Suffolk Boys", title: "Documentary", tag: "Doc", cat: "film",
    desc: "A slice-of-life documentary following John Holder into the rural outback of East Anglia — small villages shaped by American influence, where locals make moonshine, play bluegrass, and collect old military gear. A unique subculture hiding in the British countryside.",
    colors: ["#c9a96e", "#1a1208"],
    thumb: "https://vz-fd89cb27-622.b-cdn.net/d62b1fcc-269a-4b00-9930-af757d8f2174/thumbnail_be26e700.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/d62b1fcc-269a-4b00-9930-af757d8f2174?token=180145980a43be1ad70f306f6f7691a2178ab2bc32954a9e04f92722dcfe6135&expires=1782989292&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  // === MUSIC ===
  {
    client: "aonenine", title: "SHOPS — Music Video", tag: "Music Video", cat: "music",
    desc: "Directed music video for aonenine & DTOXiD. Shot on location in the UK.",
    colors: ["#9b30ff", "#ff2d78"],
    thumb: "assets/thumbs/shops_mv.jpg", video: "assets/videos/shops_mv.mp4"
  },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "ad", label: "Ads" },
  { id: "image", label: "Brand Films" },
  { id: "social", label: "Reels & Social" },
  { id: "film", label: "Film" },
  { id: "music", label: "Music" },
];

// ============================================
// PROJECTS PAGE
// ============================================
function ProjectsPage() {
  const [filter, setFilter] = useStateP("all");
  const [activeVideo, setActiveVideo] = useStateP(null);
  const visible = filter === "all" ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.cat === filter);

  return (
    <main>
      {/* Hero */}
      <section style={{ position: "relative", paddingTop: 180, paddingBottom: 60, overflow: "hidden" }}>
        <div className="fwf-grid-bg" />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 40% 40% at 50% 30%, rgba(155,48,255,0.16), transparent 60%)"
        }} />
        <div className="fwf-container" style={{ position: "relative" }}>
          <div className="fwf-section-label fwf-fade-up fwf-d1">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">Portfolio · 50+ projects · 2018 — present</span>
          </div>
          <h1 className="fwf-display fwf-fade-up fwf-d2" style={{ fontSize: "clamp(56px, 9vw, 130px)", margin: "0 0 24px 0", lineHeight: 0.95, textWrap: "balance" }}>
            Selected <em className="fwf-display-italic" style={{ color: "var(--fwf-purple)" }}>work.</em>
          </h1>
          <p className="fwf-fade-up fwf-d3" style={{ color: "var(--fwf-text-mute)", fontSize: 19, maxWidth: 560, margin: 0, lineHeight: 1.5 }}>
            Films, reels, ads, and brand productions delivered for B2C brands across hospitality, sports, and consumer goods.
          </p>
        </div>
      </section>

      {/* Sticky filters */}
      <section style={{ position: "sticky", top: 72, zIndex: 10, background: "rgba(10,10,10,0.85)", backdropFilter: "blur(12px)", borderTop: "1px solid var(--fwf-hairline)", borderBottom: "1px solid var(--fwf-hairline)", padding: "20px 0" }}>
        <div className="fwf-container">
          <div className="fwf-scroll-x" style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
            {FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={"fwf-tab " + (filter === f.id ? "fwf-tab-active" : "")}
              >
                {f.label}
                <span style={{ marginLeft: 6, opacity: 0.5, fontSize: 10 }}>
                  {f.id === "all" ? ALL_PROJECTS.length : ALL_PROJECTS.filter(p => p.cat === f.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "64px 0 120px" }}>
        <div className="fwf-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="fwf-proj-grid">
            {visible.map((p, i) => (
              <ProjectCard
                key={p.client + p.title}
                {...p}
                index={i}
                onPlay={p.video ? () => setActiveVideo(p.video) : null}
              />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        headline={<>Seen enough? <em className="fwf-display-italic" style={{ color: "var(--fwf-pink)" }}>Let's talk.</em></>}
        sub="Tell us about your brand. We'll tell you what we'd do."
      />

      {activeVideo && <VideoModal src={activeVideo} onClose={() => setActiveVideo(null)} />}
    </main>
  );
}

function ProjectCard({ client, title, tag, desc, colors, thumb, video, index, onPlay }) {
  return (
    <div
      className="fwf-card fwf-card-pink"
      style={{
        padding: 0, overflow: "hidden", display: "flex", flexDirection: "column",
        animation: "fwfFadeUp 600ms " + (index * 50) + "ms cubic-bezier(0.4,0,0.2,1) backwards",
        cursor: video ? "pointer" : "default",
      }}
      onClick={video && onPlay ? onPlay : undefined}
    >
      <div style={{
        position: "relative",
        aspectRatio: "16/10",
        background: thumb ? "#0a0a0a" : "linear-gradient(135deg, " + colors[0] + "40, " + colors[1] + " 90%), #0a0a0a",
        overflow: "hidden",
      }}>
        {thumb
          ? <img src={thumb} alt={title} className="fwf-proj-thumb-img" />
          : <>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 40%, " + colors[0] + "50, transparent 55%), radial-gradient(circle at 70% 80%, " + colors[1] + "60, transparent 55%)", mixBlendMode: "screen" }} />
              <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.3'/%3E%3C/svg%3E\")", mixBlendMode: "overlay", opacity: 0.6 }} />
            </>
        }
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7))" }} />
        {video && <div className="fwf-play"><Icons.Play size={18} /></div>}
        <div style={{ position: "absolute", top: 14, left: 14 }}>
          <span className="fwf-badge fwf-badge-pink" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}>{tag}</span>
        </div>
      </div>
      <div style={{ padding: 22, flex: 1, display: "flex", flexDirection: "column" }}>
        <div className="fwf-label" style={{ marginBottom: 6, fontSize: 10 }}>{client}</div>
        <h3 className="fwf-display" style={{ fontSize: 26, margin: "0 0 10px 0", letterSpacing: "-0.01em" }}>{title}</h3>
        <p style={{ color: "var(--fwf-text-mute)", fontSize: 13.5, lineHeight: 1.55, margin: "0 0 18px 0", flex: 1 }}>{desc}</p>
        {!video && (
          <a href="#" className="fwf-btn-bare" style={{ alignSelf: "flex-start" }} onClick={e => e.preventDefault()}>
            Coming soon <Icons.ArrowRight size={11} />
          </a>
        )}
      </div>
    </div>
  );
}

// ============================================
// PROJECTS — IMMERSIVE GALLERY (preview route: #/projects-lab)
// Self-contained. Three.js / GSAP / ScrollTrigger / Lenis are loaded globally
// in index.html but only ever INSTANTIATED while this page is mounted, and are
// fully torn down on unmount — so every other page/route stays untouched.
// ============================================
const FWF_PINK = "#e91e8c";
const FWF_PURPLE = "#a855f7";

// Desktop (non-touch, >=768px) -> Three.js sphere; otherwise -> cinematic grid.
function useDesktopGallery() {
  const get = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches &&
    !("ontouchstart" in window || (navigator.maxTouchPoints || 0) > 0);
  const [desktop, setDesktop] = useStateP(get);
  useEffectP(() => {
    const update = () => setDesktop(get());
    const mq = window.matchMedia("(min-width: 768px)");
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return desktop;
}

// ---- canvas helpers (bake each project card into a texture) ----
function fwfRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function fwfHexA(hex, a) {
  const h = hex.replace("#", "");
  const f = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(f, 16);
  return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
}
// Cell texture layout — floating label strip (transparent bg) above a rounded card image,
// like phantom.land's project wall. One texture pair (normal/hover) per unique project.
const FWF_CELL_W = 640, FWF_CELL_LABEL = 72, FWF_CELL_H = 536;

function fwfDrawCell(ctx, p, img, hover) {
  const W = FWF_CELL_W, H = FWF_CELL_H, L = FWF_CELL_LABEL;
  ctx.clearRect(0, 0, W, H);

  // --- floating label: CLIENT  TITLE…  [TAG] ---
  ctx.textBaseline = "middle";
  const ly = L / 2 + 4;
  ctx.font = '500 24px "JetBrains Mono", monospace';
  ctx.fillStyle = hover ? "#ff9ecb" : "rgba(255,255,255,0.92)";
  const client = p.client.toUpperCase();
  ctx.fillText(client, 8, ly);
  const cw = ctx.measureText(client).width;

  ctx.font = '500 17px "JetBrains Mono", monospace';
  const tagText = p.tag.toUpperCase();
  const tagW = ctx.measureText(tagText).width + 26;

  ctx.font = '400 20px "JetBrains Mono", monospace';
  let title = p.title.toUpperCase();
  const maxTitleW = W - cw - tagW - 60;
  if (ctx.measureText(title).width > maxTitleW) {
    while (title.length > 2 && ctx.measureText(title + "…").width > maxTitleW) title = title.slice(0, -1);
    title += "…";
  }
  ctx.fillStyle = "rgba(255,255,255,0.48)";
  ctx.fillText(title, 8 + cw + 20, ly);

  const pillH = 38, pillX = W - tagW - 8, pillY = ly - pillH / 2;
  fwfRoundRect(ctx, pillX, pillY, tagW, pillH, 8);
  ctx.strokeStyle = hover ? "rgba(233,30,140,0.85)" : "rgba(255,255,255,0.32)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.font = '500 17px "JetBrains Mono", monospace';
  ctx.fillStyle = hover ? "#ff9ecb" : "rgba(255,255,255,0.78)";
  ctx.fillText(tagText, pillX + 13, ly + 1);

  // --- card image (rounded, hairline border; pure imagery like the reference) ---
  const ix = 3, iy = L + 3, iw = W - 6, ih = H - L - 6, r = 16;
  ctx.save();
  fwfRoundRect(ctx, ix, iy, iw, ih, r);
  ctx.clip();
  if (img) {
    const ir = img.width / img.height, cr = iw / ih;
    let dw, dh;
    if (ir > cr) { dh = ih; dw = ih * ir; } else { dw = iw; dh = iw / ir; }
    ctx.drawImage(img, ix + (iw - dw) / 2, iy + (ih - dh) / 2, dw, dh);
  } else {
    const g = ctx.createLinearGradient(ix, iy, ix + iw, iy + ih);
    g.addColorStop(0, p.colors[0]);
    g.addColorStop(1, p.colors[1]);
    ctx.fillStyle = g;
    ctx.fillRect(ix, iy, iw, ih);
    const r1 = ctx.createRadialGradient(ix + iw * 0.3, iy + ih * 0.35, 0, ix + iw * 0.3, iy + ih * 0.35, iw * 0.5);
    r1.addColorStop(0, fwfHexA(p.colors[0], 0.6));
    r1.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = r1;
    ctx.fillRect(ix, iy, iw, ih);
    const r2 = ctx.createRadialGradient(ix + iw * 0.75, iy + ih * 0.85, 0, ix + iw * 0.75, iy + ih * 0.85, iw * 0.45);
    r2.addColorStop(0, "rgba(0,0,0,0.5)");
    r2.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = r2;
    ctx.fillRect(ix, iy, iw, ih);
  }
  // dark overlay — lifts on hover
  ctx.fillStyle = hover ? "rgba(8,8,12,0.04)" : "rgba(8,8,12,0.36)";
  ctx.fillRect(ix, iy, iw, ih);
  if (hover) { // pink accent bleeds up from the base
    const wash = ctx.createLinearGradient(0, iy + ih, 0, iy);
    wash.addColorStop(0, "rgba(233,30,140,0.32)");
    wash.addColorStop(0.55, "rgba(233,30,140,0)");
    ctx.fillStyle = wash;
    ctx.fillRect(ix, iy, iw, ih);
  }
  ctx.restore();

  fwfRoundRect(ctx, ix, iy, iw, ih, r);
  ctx.strokeStyle = hover ? FWF_PINK : "rgba(255,255,255,0.15)";
  ctx.lineWidth = hover ? 5 : 2;
  ctx.stroke();
  if (hover) { // purple rim glow
    ctx.save();
    ctx.shadowColor = FWF_PURPLE;
    ctx.shadowBlur = 34;
    fwfRoundRect(ctx, ix, iy, iw, ih, r);
    ctx.strokeStyle = "rgba(168,85,247,0.95)";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
  }
}

// ---- desktop: phantom.land-style curved wall — every card is a true sphere
// segment tiled on the inside of a sphere, viewer at the centre, so card edges
// curve with the dome. Cards repeat to fill the full 360° wall. ----
function SphereGallery({ items, onOpen, openKey }) {
  const mountRef = useRefP(null);
  const stateRef = useRefP({});

  useEffectP(() => {
    const THREE = window.THREE, gsap = window.gsap;
    const mount = mountRef.current;
    if (!THREE || !mount || !items.length) return;

    const S = stateRef.current;
    let disposed = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const R = 10, D2R = Math.PI / 180;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(74, 1, 0.1, 100);
    camera.position.set(0, 0, 0.001);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if (THREE.sRGBEncoding !== undefined) renderer.outputEncoding = THREE.sRGBEncoding;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.cursor = "grab";

    const group = new THREE.Group();
    scene.add(group);

    // --- one texture pair per unique project (duplicate cells share GPU memory) ---
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const disposables = [];
    const projTex = items.map((p) => {
      const cN = document.createElement("canvas"); cN.width = FWF_CELL_W; cN.height = FWF_CELL_H;
      const cH = document.createElement("canvas"); cH.width = FWF_CELL_W; cH.height = FWF_CELL_H;
      fwfDrawCell(cN.getContext("2d"), p, null, false);
      fwfDrawCell(cH.getContext("2d"), p, null, true);
      const entry = { p, cN, cH, img: null, texN: new THREE.CanvasTexture(cN), texH: new THREE.CanvasTexture(cH) };
      [entry.texN, entry.texH].forEach((t) => {
        if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
        t.anisotropy = maxAniso;
        t.wrapS = THREE.RepeatWrapping;
        t.repeat.x = -1; t.offset.x = 1; // un-mirror for inside-the-sphere viewing
        disposables.push(t);
      });
      if (p.thumb) {
        const img = new Image();
        img.crossOrigin = "anonymous"; // hotlinked CDN thumbs (Bunny) need this to avoid tainting the canvas texture
        img.onload = () => {
          if (disposed) return;
          entry.img = img;
          fwfDrawCell(cN.getContext("2d"), p, img, false);
          fwfDrawCell(cH.getContext("2d"), p, img, true);
          entry.texN.needsUpdate = true;
          entry.texH.needsUpdate = true;
        };
        img.src = p.thumb;
      }
      return entry;
    });
    // re-bake once webfonts land (avoids fallback-font flash in labels)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (disposed) return;
        projTex.forEach((e) => {
          fwfDrawCell(e.cN.getContext("2d"), e.p, e.img, false);
          fwfDrawCell(e.cH.getContext("2d"), e.p, e.img, true);
          e.texN.needsUpdate = true;
          e.texH.needsUpdate = true;
        });
      });
    }

    // --- tile the sphere interior: 4 rows × 9 variable-width columns = 36 cells ---
    const ROWS = [44.5, 15, -15, -44.5];  // row-centre latitudes (deg); outer rows crop at viewport edge
    const ROW_H = 27;                     // angular cell height (incl. label strip)
    const COL_W = [1.12, 0.92, 1.06, 0.88, 1.0, 1.08, 0.9, 1.12, 0.92]; // ×40° — phantom's varied sizes
    const PHI_GAP = 3;

    // Weighted fill: a project with `feature: n` claims n tiles on the wall instead
    // of one, so flagship work (Nord VPN, Alienwork, Thomas Sabo) reads as more present.
    // A greedy "most-remaining-first" placement (same idea as the classic reorganize-string
    // problem) fills all 36 cells while guaranteeing no two cells carrying the same project
    // ever land next to each other — including the wrap from the last cell back to the first,
    // since each row is a full ring around the sphere. Degrades gracefully (best-effort spacing,
    // no crash) if one project is weighted heavily enough to exceed half the wall.
    const CELLS = 36;
    const pool = [];
    items.forEach((p, i) => { const w = Math.max(1, p.feature || 1); for (let k = 0; k < w; k++) pool.push(i); });
    const cellCounts = {};
    for (let c = 0; c < CELLS; c++) {
      const idx = pool[c % pool.length];
      cellCounts[idx] = (cellCounts[idx] || 0) + 1;
    }
    const arrangement = (() => {
      const entries = Object.keys(cellCounts).map((k) => ({ idx: Number(k), count: cellCounts[k] }));
      const out = [];
      for (let step = 0; step < CELLS; step++) {
        entries.sort((a, b) => b.count - a.count);
        let choice = entries.find((e) =>
          e.count > 0 &&
          e.idx !== out[out.length - 1] &&
          !(step === CELLS - 1 && e.idx === out[0])
        );
        if (!choice) choice = entries.find((e) => e.count > 0); // only item left, or unavoidable due to dominance
        out.push(choice.idx);
        choice.count--;
      }
      return out;
    })();

    const meshes = [];
    const cellsByProj = {};
    let cell = 0;
    ROWS.forEach((lat, ri) => {
      const thetaStart = (90 - lat - ROW_H / 2) * D2R;
      let phiCursor = ri * 17 * D2R; // stagger row seams
      COL_W.forEach((w) => {
        const span = w * 40 * D2R;
        const idx = arrangement[cell];
        const p = items[idx], tex = projTex[idx];
        const geo = new THREE.SphereGeometry(
          R, 20, 14,
          phiCursor + (PHI_GAP / 2) * D2R, span - PHI_GAP * D2R,
          thetaStart, ROW_H * D2R
        );
        const mat = new THREE.MeshBasicMaterial({ map: tex.texN, transparent: true, side: THREE.BackSide });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.userData = { cell, p, tex, targetScale: 1 };
        const key = p.client + "·" + p.title;
        if (!cellsByProj[key]) cellsByProj[key] = mesh;
        group.add(mesh);
        meshes.push(mesh);
        disposables.push(geo, mat);
        phiCursor += span;
        cell++;
      });
    });

    // --- drag rotation with inertia + idle cinematic drift ---
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(99, 99);
    let hovered = -1, dragging = false, moved = 0, downTime = 0;
    const last = { x: 0, y: 0 };
    const vel = { x: 0, y: 0 };

    function applyHover(idx) {
      if (idx === hovered) return;
      if (hovered >= 0 && meshes[hovered]) {
        const m = meshes[hovered];
        m.material.map = m.userData.tex.texN;
        m.userData.targetScale = 1;
      }
      hovered = idx;
      if (idx >= 0 && meshes[idx]) {
        const m = meshes[idx];
        m.material.map = m.userData.tex.texH;
        m.userData.targetScale = 0.962; // radius shrinks → card glides toward the viewer
        renderer.domElement.style.cursor = "pointer";
      } else {
        renderer.domElement.style.cursor = dragging ? "grabbing" : "grab";
      }
    }
    function onMove(e) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      if (dragging) {
        const dx = e.clientX - last.x, dy = e.clientY - last.y;
        last.x = e.clientX; last.y = e.clientY;
        moved += Math.abs(dx) + Math.abs(dy);
        vel.y = dx * 0.0042; vel.x = dy * 0.0042;
        group.rotation.y += vel.y;
        group.rotation.x = Math.max(-0.55, Math.min(0.55, group.rotation.x + vel.x));
      }
    }
    function onDown(e) {
      if (S.locked) return;
      if (gsap) gsap.killTweensOf(group.rotation); // cancel intro drift-in if mid-flight
      dragging = true; moved = 0; downTime = performance.now();
      last.x = e.clientX; last.y = e.clientY;
      renderer.domElement.style.cursor = "grabbing";
      e.preventDefault();
    }
    function onUp() {
      if (!dragging) return;
      dragging = false;
      const quick = performance.now() - downTime < 400;
      if (!S.locked && quick && moved < 7 && hovered >= 0) {
        S.pendingMesh = meshes[hovered]; // remember the exact cell that was clicked
        onOpen(meshes[hovered].userData.p);
      } else {
        renderer.domElement.style.cursor = hovered >= 0 ? "pointer" : "grab";
      }
    }
    function onLeave() { pointer.set(99, 99); }

    let raf = 0, lastT = performance.now();
    function animate(time) {
      raf = requestAnimationFrame(animate);
      const dt = Math.min((time - lastT) / 16.67, 3);
      lastT = time;
      if (!S.locked) {
        if (!dragging) {
          group.rotation.y += vel.y;
          group.rotation.x = Math.max(-0.55, Math.min(0.55, group.rotation.x + vel.x));
          vel.y *= 0.95; vel.x *= 0.95; // Lenis-style glide-out, never snappy
          if (Math.abs(vel.y) + Math.abs(vel.x) < 0.0006 && hovered < 0 && !reduceMotion) {
            group.rotation.y += 0.0009; // idle cinematic drift (pauses on hover)
          }
        }
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(meshes, false);
        applyHover(hits.length ? hits[0].object.userData.cell : -1);
      }
      for (let i = 0; i < meshes.length; i++) {
        const m = meshes[i];
        if (m === S.frozen) continue;
        const s = m.scale.x + (m.userData.targetScale - m.scale.x) * 0.16 * dt;
        m.scale.setScalar(s);
      }
      renderer.render(scene, camera);
    }

    // --- click zoom: clicked card pulls toward the viewer, the wall falls away ---
    S.locked = false; S.frozen = null; S.openedMesh = null; S.pendingMesh = null;
    S.cellsByProj = cellsByProj;
    S.zoomTo = function (mesh, opening) {
      if (!gsap || !mesh) return;
      applyHover(-1);
      S.frozen = mesh;
      const done = () => { if (S.frozen === mesh) S.frozen = null; };
      const others = meshes.filter((m) => m !== mesh);
      gsap.killTweensOf(mesh.scale);
      if (opening) {
        mesh.material.map = mesh.userData.tex.texH;
        mesh.userData.targetScale = 0.55;
        gsap.to(mesh.scale, { x: 0.55, y: 0.55, z: 0.55, duration: 0.8, ease: "power3.inOut", onComplete: done });
        others.forEach((m) => gsap.to(m.material, { opacity: 0.06, duration: 0.5, overwrite: true }));
      } else {
        mesh.material.map = mesh.userData.tex.texN;
        mesh.userData.targetScale = 1;
        gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 0.7, ease: "power3.inOut", onComplete: done });
        others.forEach((m) => gsap.to(m.material, { opacity: 1, duration: 0.5, overwrite: true }));
      }
    };

    function resize() {
      const w = mount.clientWidth, h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    renderer.domElement.addEventListener("mousedown", onDown);
    renderer.domElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(animate);

    // cinematic entry: wall drifts into place
    if (gsap && !reduceMotion) {
      group.rotation.y = -0.5;
      gsap.to(group.rotation, { y: 0, duration: 1.6, ease: "power3.out" });
      gsap.fromTo(mount, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: "power2.out" });
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("mousedown", onDown);
      renderer.domElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      if (gsap) {
        gsap.killTweensOf(group.rotation);
        gsap.killTweensOf(mount);
        meshes.forEach((m) => { gsap.killTweensOf(m.scale); gsap.killTweensOf(m.material); });
      }
      disposables.forEach((d) => { if (d && d.dispose) d.dispose(); });
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      stateRef.current = {};
    };
  }, []); // built once per mount; the page re-keys on filter change

  // open/close zoom, driven by the detail-panel state
  useEffectP(() => {
    const S = stateRef.current;
    if (!S.zoomTo) return;
    S.locked = !!openKey;
    if (openKey) {
      const pm = S.pendingMesh;
      const mesh = (pm && pm.userData.p.client + "·" + pm.userData.p.title === openKey) ? pm : S.cellsByProj[openKey];
      if (mesh) { S.zoomTo(mesh, true); S.openedMesh = mesh; }
    } else if (S.openedMesh) {
      S.zoomTo(S.openedMesh, false);
      S.openedMesh = null;
      S.pendingMesh = null;
    }
  }, [openKey]);

  return <div ref={mountRef} style={{ position: "absolute", inset: 0, cursor: "grab", userSelect: "none" }} />;
}

// ---- mobile/touch: cinematic 2-col grid with GSAP scroll-reveal ----
function CinematicCard({ p, onOpen }) {
  return (
    <div
      className="fwf-cin-card"
      onClick={() => onOpen(p)}
      style={{
        position: "relative", borderRadius: 10, overflow: "hidden", cursor: "pointer",
        border: "1px solid rgba(168,85,247,0.35)",
        boxShadow: "0 0 0 1px rgba(233,30,140,0.10), 0 18px 40px -22px rgba(168,85,247,0.6)",
        background: "#0d0d0f", willChange: "transform, opacity",
      }}
    >
      <div style={{
        position: "relative", aspectRatio: "16/11", overflow: "hidden",
        background: p.thumb ? "#0a0a0a" : "linear-gradient(135deg, " + p.colors[0] + "55, " + p.colors[1] + " 92%)",
      }}>
        {p.thumb && <img src={p.thumb} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(233,30,140,0.12) 0%, transparent 32%, rgba(8,8,10,0.86) 100%)" }} />
        <div style={{ position: "absolute", top: 12, left: 12 }}>
          <span style={{
            fontFamily: "var(--fwf-mono)", fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase",
            color: "#ff8ec4", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
            padding: "5px 9px", borderRadius: 5, border: "1px solid rgba(233,30,140,0.45)",
          }}>{p.tag}</span>
        </div>
      </div>
      <div style={{ padding: "14px 15px 17px" }}>
        <div style={{ fontFamily: "var(--fwf-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fwf-text-mute)", marginBottom: 5 }}>{p.client}</div>
        <h3 className="fwf-display" style={{ fontSize: 21, margin: 0, lineHeight: 1.05 }}>{p.title}</h3>
      </div>
    </div>
  );
}
function CinematicGrid({ items, onOpen }) {
  const ref = useRefP(null);
  useEffectP(() => {
    const gsap = window.gsap, ST = window.ScrollTrigger, Lenis = window.Lenis;
    const root = ref.current;
    if (!gsap || !ST || !root) return;
    gsap.registerPlugin(ST);
    let lenis = null, rafId = 0;
    if (Lenis) {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true, smoothTouch: false, touchMultiplier: 1.6 });
      const loop = (t) => { lenis.raf(t); rafId = requestAnimationFrame(loop); };
      rafId = requestAnimationFrame(loop);
      lenis.on("scroll", ST.update);
    }
    const cards = gsap.utils.toArray(root.querySelectorAll(".fwf-cin-card"));
    gsap.set(cards, { opacity: 0, y: 48, rotateZ: -4 });
    const triggers = ST.batch(cards, {
      start: "top 88%",
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, rotateZ: 0, duration: 0.7, ease: "power3.out", stagger: 0.09, overwrite: true }),
    });
    ST.refresh();
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      triggers.forEach((t) => t.kill());
      gsap.set(cards, { clearProps: "all" });
    };
  }, []);
  return (
    <div className="fwf-container" ref={ref}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {items.map((p) => <CinematicCard key={p.client + p.title} p={p} onOpen={onOpen} />)}
      </div>
    </div>
  );
}

// ---- project theater: the film autoplays with its info right beside it; a
// single close returns to the sphere. Replaces the old panel-+-lightbox combo
// where the video covered the info and closing took two steps. ----
function ProjectTheater({ project, mobile, onClose }) {
  const ref = useRefP(null);
  function close() {
    const gsap = window.gsap;
    if (gsap && ref.current) {
      gsap.to(ref.current, { opacity: 0, scale: 0.985, duration: 0.3, ease: "power3.in", onComplete: onClose });
      setTimeout(onClose, 360); // guarantee unmount even if rAF stalls mid-tween (idempotent)
    } else onClose();
  }
  useEffectP(() => {
    const gsap = window.gsap;
    document.body.style.overflow = "hidden";
    const esc = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", esc);
    if (gsap && ref.current) {
      gsap.fromTo(ref.current, { opacity: 0, scale: 0.985 }, { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" });
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", esc);
    };
  }, []);

  // video source → Bunny (own HLS player, max resolution) vs YouTube / Vimeo embed vs local mp4
  const src = project.video;
  const isYouTube = !!src && (src.includes("youtube.com") || src.includes("youtu.be"));
  const isBunny = !!src && src.includes("mediadelivery.net");
  const isEmbed = !!src && (isYouTube || src.includes("vimeo.com"));

  let embedSrc = src;
  if (isYouTube) {
    const id = src.includes("/shorts/") ? src.split("/shorts/")[1].split(/[?&/]/)[0]
             : src.includes("youtu.be") ? src.split("/").pop().split("?")[0]
             : new URL(src).searchParams.get("v");
    // youtube-nocookie: privacy domain, far less likely to be hit by ad/privacy blockers
    embedSrc = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
  } else if (isEmbed && src.includes("vimeo.com") && !src.includes("player.vimeo.com")) {
    const id = src.split("/").filter(Boolean).pop().split("?")[0];
    embedSrc = "https://player.vimeo.com/video/" + id + "?autoplay=1&title=0&byline=0&portrait=0";
  }

  const media = !src ? (
    <div style={{ width: "100%", height: "100%", minHeight: 220, background: "linear-gradient(135deg, " + fwfHexA(FWF_PURPLE, 0.35) + ", #0a0a0c)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fwf-text-faint)", fontFamily: "var(--fwf-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" }}>
      Film coming soon
    </div>
  ) : isBunny ? (
    <BunnyPlayer src={src} poster={project.thumb}
      style={{ width: "100%", height: "100%", objectFit: "contain", background: "#000", display: "block" }} />
  ) : isEmbed ? (
    <iframe title={project.title} src={embedSrc} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen
      style={{ width: "100%", height: "100%", border: "none", display: "block" }} />
  ) : (
    <video src={src} controls autoPlay playsInline
      style={{ width: "100%", height: "100%", objectFit: "contain", background: "#000", display: "block" }} />
  );

  return (
    <div onClick={close} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(5,5,7,0.8)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: mobile ? 0 : 28 }}>
      <div
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: mobile ? "100%" : "min(1180px, 95vw)",
          height: mobile ? "100%" : "min(80vh, 720px)",
          display: "flex", flexDirection: mobile ? "column" : "row",
          borderRadius: mobile ? 0 : 16, overflow: "hidden",
          border: mobile ? "none" : "1px solid " + fwfHexA(FWF_PURPLE, 0.32),
          boxShadow: mobile ? "none" : "0 30px 120px -20px " + fwfHexA(FWF_PURPLE, 0.5),
          background: "#0a0a0c",
        }}
      >
        {/* single close → straight back to the sphere */}
        <button onClick={close} aria-label="Close" style={{
          position: "absolute", top: 14, right: 16, zIndex: 6,
          display: "inline-flex", alignItems: "center", gap: 7,
          background: "rgba(10,10,12,0.7)", backdropFilter: "blur(8px)",
          border: "1px solid var(--fwf-hairline)", borderRadius: 999,
          color: "#fff", fontFamily: "var(--fwf-mono)", fontSize: 10.5, letterSpacing: "0.16em",
          textTransform: "uppercase", padding: "8px 14px", cursor: "pointer",
        }}>
          <Icons.X size={11} /> Close
        </button>

        {/* the film */}
        <div style={{ flex: mobile ? "0 0 auto" : "1 1 auto", position: "relative", background: "#000", minHeight: mobile ? "44vh" : 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {media}
        </div>

        {/* the info, right beside it */}
        <aside style={{
          flex: mobile ? "1 1 auto" : "0 0 344px", width: mobile ? "auto" : 344,
          background: "linear-gradient(180deg, #101013, #0a0a0c)",
          borderLeft: mobile ? "none" : "1px solid var(--fwf-hairline)",
          borderTop: mobile ? "1px solid var(--fwf-hairline)" : "none",
          padding: mobile ? "26px 22px 34px" : "44px 36px", display: "flex", flexDirection: "column", overflowY: "auto",
        }}>
          <span style={{ alignSelf: "flex-start", fontFamily: "var(--fwf-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#ff8ec4", border: "1px solid " + fwfHexA(FWF_PINK, 0.5), borderRadius: 6, padding: "6px 11px", marginBottom: 22 }}>
            {project.tag}
          </span>
          <div style={{ fontFamily: "var(--fwf-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--fwf-text-mute)", marginBottom: 10 }}>{project.client}</div>
          <h2 className="fwf-display" style={{ fontSize: "clamp(30px, 3.4vw, 48px)", lineHeight: 1.02, margin: "0 0 18px 0" }}>{project.title}</h2>
          <p style={{ color: "var(--fwf-text-mute)", fontSize: 16, lineHeight: 1.6, margin: "0 0 32px 0" }}>{project.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: "auto" }}>
            <Link to="contact" className="fwf-btn fwf-btn-primary" onClick={onClose}>Book a similar project →</Link>
          </div>
          {isYouTube && (
            <a href={src} target="_blank" rel="noopener noreferrer" style={{ marginTop: 14, fontFamily: "var(--fwf-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--fwf-text-faint)", textDecoration: "none" }}>
              Or watch on YouTube ↗
            </a>
          )}
        </aside>
      </div>
    </div>
  );
}

// ---- the preview page itself (route: #/projects-lab) ----
function useBerlinTime() {
  const [t, setT] = useStateP("");
  useEffectP(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Berlin" });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const fwfLabMono = (size, color) => ({
  fontFamily: "var(--fwf-mono)", fontSize: size, letterSpacing: "0.18em",
  textTransform: "uppercase", color, lineHeight: 1.7,
});

function ProjectsLabPage() {
  const [filter, setFilter] = useStateP("all");
  const [open, setOpen] = useStateP(null);
  const desktop = useDesktopGallery();
  const time = useBerlinTime();
  const visible = filter === "all" ? ALL_PROJECTS : ALL_PROJECTS.filter((p) => p.cat === filter);
  const openKey = open ? open.client + "·" + open.title : null;
  // click → the theater opens: film autoplays with its info beside it, one close to exit
  const handleOpen = (p) => setOpen(p);

  // first-load affordance: the sphere is draggable but not everyone knows that.
  // Show a brand-voice cue until the first interaction (or a short timeout).
  const [hintSeen, setHintSeen] = useStateP(false);
  useEffectP(() => {
    if (hintSeen) return;
    const t = setTimeout(() => setHintSeen(true), 6500);
    return () => clearTimeout(t);
  }, [hintSeen]);

  if (desktop) {
    return (
      <main>
        <section onPointerDown={() => setHintSeen(true)} style={{ position: "relative", height: "100vh", minHeight: 560, overflow: "hidden", background: "#070708" }}>
          <style>{"@keyframes fwfDragSlide{0%,100%{transform:translateX(-13px);opacity:.35}50%{transform:translateX(13px);opacity:1}}@keyframes fwfHintIn{from{opacity:0;transform:translate(-50%,-46%)}to{opacity:1;transform:translate(-50%,-50%)}}"}</style>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 55% at 50% 48%, rgba(155,48,255,0.13), transparent 70%)" }} />
          <SphereGallery key={"sphere:" + filter} items={visible} onOpen={handleOpen} openKey={openKey} />
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 75% 70% at 50% 50%, transparent 58%, rgba(5,5,6,0.72) 100%)" }} />

          {/* first-load drag affordance — fades on first interaction */}
          <div style={{
            position: "absolute", left: "50%", top: "50%", zIndex: 6, pointerEvents: "none", textAlign: "center",
            opacity: hintSeen ? 0 : 1, transform: "translate(-50%,-50%)",
            transition: "opacity 0.55s ease", animation: hintSeen ? "none" : "fwfHintIn 0.7s ease both",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 20 }}>
              <span style={{ fontSize: 20, color: "rgba(255,255,255,0.32)" }}>‹</span>
              <span style={{ display: "inline-block", width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.32)", position: "relative" }}>
                <span style={{ position: "absolute", left: "50%", top: "50%", width: 8, height: 8, borderRadius: "50%", background: "#fff", marginLeft: -4, marginTop: -4, animation: "fwfDragSlide 1.8s ease-in-out infinite" }} />
              </span>
              <span style={{ fontSize: 20, color: "rgba(255,255,255,0.32)" }}>›</span>
            </div>
            <div style={{ ...fwfLabMono(10, "var(--fwf-text-mute)"), marginBottom: 10 }}>Interactive</div>
            <div className="fwf-display" style={{ fontSize: 32, lineHeight: 1, color: "#fff" }}>
              Grab it. <em className="fwf-display-italic" style={{ color: "var(--fwf-purple)" }}>Give it a spin.</em>
            </div>
          </div>

          {/* top info strip (below the site nav) */}
          <div style={{ position: "absolute", top: 92, left: 0, right: 0, padding: "0 36px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", pointerEvents: "none", zIndex: 5 }}>
            <div style={{ ...fwfLabMono(10, "var(--fwf-text-mute)"), display: "flex", alignItems: "center", gap: 9 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--fwf-green)", boxShadow: "0 0 8px var(--fwf-green)" }} />
              Available · Q3 2026
            </div>
            <div style={{ ...fwfLabMono(10, "rgba(255,255,255,0.82)"), maxWidth: 330 }}>
              Ad Creative · Brand Films · AI Content
            </div>
            <div style={{ ...fwfLabMono(10, "var(--fwf-text-mute)"), textAlign: "right" }}>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>● Stuttgart, DE</span>&nbsp;&nbsp;{time}
            </div>
          </div>

          {/* bottom-left: view toggle (immersive ↔ classic) */}
          <div style={{ position: "absolute", left: 28, bottom: 26, zIndex: 6, display: "flex", gap: 6, background: "rgba(14,14,16,0.72)", backdropFilter: "blur(14px)", border: "1px solid var(--fwf-hairline)", borderRadius: 999, padding: 5 }}>
            <span title="Immersive view" style={{ width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", color: "#000", fontSize: 13 }}>▦</span>
            <Link to="projects-classic" title="Classic view" style={{ width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.65)", fontSize: 13, textDecoration: "none" }}>☰</Link>
          </div>

          {/* bottom-centre: floating filter pill */}
          <div style={{ position: "absolute", left: "50%", bottom: 24, transform: "translateX(-50%)", zIndex: 6, display: "flex", gap: 2, background: "rgba(14,14,16,0.72)", backdropFilter: "blur(14px)", border: "1px solid var(--fwf-hairline)", borderRadius: 999, padding: 5 }}>
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                style={{
                  fontFamily: "var(--fwf-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase",
                  padding: "10px 16px", borderRadius: 999, border: "none", cursor: "pointer", whiteSpace: "nowrap",
                  background: filter === f.id ? "#fff" : "transparent",
                  color: filter === f.id ? "#000" : "rgba(255,255,255,0.7)",
                  transition: "background 0.25s, color 0.25s",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* bottom-right: count + hint */}
          <div style={{ position: "absolute", right: 32, bottom: 36, zIndex: 5, pointerEvents: "none", ...fwfLabMono(10, "var(--fwf-text-faint)") }}>
            {visible.length} Projects · Drag to explore
          </div>
        </section>

        {open && <ProjectTheater project={open} mobile={false} onClose={() => setOpen(null)} />}
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section style={{ position: "relative", paddingTop: 180, paddingBottom: 40, overflow: "hidden" }}>
        <div className="fwf-grid-bg" />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 42% 42% at 50% 28%, rgba(168,85,247,0.18), transparent 60%)" }} />
        <div className="fwf-container" style={{ position: "relative" }}>
          <div className="fwf-section-label fwf-fade-up fwf-d1">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">Immersive showcase</span>
          </div>
          <h1 className="fwf-display fwf-fade-up fwf-d2" style={{ fontSize: "clamp(56px, 9vw, 130px)", margin: "0 0 24px 0", lineHeight: 0.95, textWrap: "balance" }}>
            Step inside the <em className="fwf-display-italic" style={{ color: "var(--fwf-purple)" }}>work.</em>
          </h1>
          <p className="fwf-fade-up fwf-d3" style={{ color: "var(--fwf-text-mute)", fontSize: 19, maxWidth: 560, margin: 0, lineHeight: 1.5 }}>
            Films, reels, ads, and brand productions — tap a project to dive in.
          </p>
        </div>
      </section>

      {/* Sticky filters */}
      <section style={{ position: "sticky", top: 72, zIndex: 10, background: "rgba(10,10,10,0.85)", backdropFilter: "blur(12px)", borderTop: "1px solid var(--fwf-hairline)", borderBottom: "1px solid var(--fwf-hairline)", padding: "20px 0" }}>
        <div className="fwf-container">
          <div className="fwf-scroll-x" style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
            {FILTERS.map((f) => (
              <button key={f.id} onClick={() => setFilter(f.id)} className={"fwf-tab " + (filter === f.id ? "fwf-tab-active" : "")}>
                {f.label}
                <span style={{ marginLeft: 6, opacity: 0.5, fontSize: 10 }}>
                  {f.id === "all" ? ALL_PROJECTS.length : ALL_PROJECTS.filter((p) => p.cat === f.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ position: "relative", padding: "32px 0 100px", overflow: "hidden" }}>
        <CinematicGrid key={"grid:" + filter} items={visible} onOpen={handleOpen} />
      </section>

      <FinalCTA
        headline={<>Seen something you like? <em className="fwf-display-italic" style={{ color: "var(--fwf-pink)" }}>Let's talk.</em></>}
        sub="Tell us about your brand. We'll tell you what we'd do."
      />

      {open && <ProjectTheater project={open} mobile onClose={() => setOpen(null)} />}
    </main>
  );
}

// ============================================
// PRICING PAGE
// ============================================
function PricingPage() {
  return (
    <main>
      <section style={{ position: "relative", paddingTop: 180, paddingBottom: 80, overflow: "hidden" }}>
        <div className="fwf-grid-bg" />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 40% 40% at 50% 30%, rgba(255,45,120,0.18), transparent 60%)" }} />
        <div className="fwf-container" style={{ position: "relative", textAlign: "center" }}>
          <div className="fwf-section-label fwf-fade-up fwf-d1" style={{ justifyContent: "center" }}>
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">No hidden fees · no lock-ins</span>
            <span className="fwf-section-label-line" />
          </div>
          <h1 className="fwf-display fwf-fade-up fwf-d2" style={{ fontSize: "clamp(56px, 9vw, 130px)", margin: "0 0 28px 0", lineHeight: 0.95, textWrap: "balance" }}>
            Four ways to <em className="fwf-display-italic" style={{ color: "var(--fwf-pink)" }}>work with us.</em>
          </h1>
          <p className="fwf-fade-up fwf-d3" style={{ color: "var(--fwf-text-mute)", fontSize: 19, maxWidth: 620, margin: "0 auto", lineHeight: 1.5 }}>
            No hidden fees. No lock-ins. Just results. <span style={{ color: "#fff" }}>Pricing is discussed on your strategy call</span> — because every brand starts in a different place.
          </p>
        </div>
      </section>

      <section style={{ padding: "40px 0 120px" }}>
        <div className="fwf-container">
          <div className="fwf-offers-grid">
            {OFFERS.map((o, i) => (
              <OfferCard key={i} {...o} expanded />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: 80 }} className="fwf-grid-collapse">
            <div>
              <div className="fwf-section-label">
                <span className="fwf-section-label-line" />
                <span className="fwf-eyebrow">FAQ</span>
              </div>
              <h2 className="fwf-display" style={{ fontSize: "clamp(40px, 5vw, 60px)", margin: 0, lineHeight: 1, textWrap: "balance" }}>
                Things people <em className="fwf-display-italic">ask.</em>
              </h2>
            </div>
            <FAQ />
          </div>
        </div>
      </section>

      {/* Audit bridge */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)", background: "rgba(0,200,122,0.025)" }}>
        <div className="fwf-container" style={{ textAlign: "center" }}>
          <div className="fwf-eyebrow" style={{ color: "var(--fwf-green)", marginBottom: 20 }}>
            Not sure which offer fits?
          </div>
          <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 60px)", margin: "0 0 20px 0", textWrap: "balance" }}>
            Take the free 7-minute brand audit first.
          </h2>
          <p style={{ color: "var(--fwf-text-mute)", fontSize: 17, maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.5 }}>
            Get a clear picture of where your content stands before you invest.
          </p>
          <a href="/audit/" className="fwf-btn fwf-btn-primary">
            Take the free audit →
          </a>
        </div>
      </section>

      <WhyFwfSection />

      <GrowthEngineSection cta={false} />

      <FinalCTA
        headline={<>Not sure which offer is <em className="fwf-display-italic" style={{ color: "var(--fwf-pink)" }}>right for you?</em></>}
        sub="Let's figure it out together. 30 minutes, no pressure."
      />
    </main>
  );
}

function FAQ() {
  const items = [
    { q: "Do you work with brands outside Germany?", a: "Yes — we work remotely with B2C brands across Europe and beyond. Production travel is built into the quote when needed." },
    { q: "How long does a project take?", a: "Launch Films typically run 1–2 weeks from kickoff to delivery. The Growth Retainer is ongoing with a 4–6 month minimum so we can actually learn what works." },
    { q: "Why no prices on the website?", a: "Every project is different. We price based on your goals, scope, and timeline — not a menu. That's how we keep quality up and clients honest about what they actually need." },
    { q: "Can I start with just one project?", a: "Absolutely. The Creative Sprint is designed for exactly that — pure creative volume for brands that run their own paid. Most retainer clients start with a sprint, see the results, and continue from there." },
    { q: "Who's on the team?", a: "Florian Kotulla leads creative and strategy. We bring in a vetted bench of DPs, editors, motion designers, and media buyers depending on the project scope." },
  ];
  const [open, setOpen] = useStateP(0);
  return (
    <div>
      {items.map((it, i) => (
        <div key={i} style={{ borderBottom: "1px solid var(--fwf-hairline)" }}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            style={{
              width: "100%", textAlign: "left", padding: "24px 0",
              background: "none", border: "none", color: "#fff",
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
              cursor: "pointer", fontFamily: "var(--fwf-body)"
            }}>
            <span style={{ fontSize: 20, fontWeight: 500 }}>{it.q}</span>
            <span style={{ color: open === i ? "var(--fwf-pink)" : "var(--fwf-text-mute)", flexShrink: 0 }}>
              {open === i ? <Icons.Minus size={20}/> : <Icons.Plus size={20}/>}
            </span>
          </button>
          {open === i && (
            <div style={{ paddingBottom: 24, color: "var(--fwf-text-mute)", fontSize: 16, lineHeight: 1.6, maxWidth: 640, animation: "fwfFadeUp 300ms ease" }}>
              {it.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================
// ABOUT PAGE
// ============================================
function AboutPage() {
  return (
    <main>
      <section style={{ position: "relative", paddingTop: 180, paddingBottom: 80, overflow: "hidden" }}>
        <div className="fwf-grid-bg" />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 40% 40% at 30% 50%, rgba(0,255,136,0.10), transparent 60%)" }} />
        <div className="fwf-container" style={{ position: "relative" }}>
          <div className="fwf-section-label fwf-fade-up fwf-d1">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">About · Studio philosophy</span>
          </div>
          <h1 className="fwf-display fwf-fade-up fwf-d2" style={{ fontSize: "clamp(48px, 7.5vw, 110px)", margin: "0 0 28px 0", lineHeight: 0.95, maxWidth: 1100, textWrap: "balance" }}>
            We believe great brands deserve <em className="fwf-display-italic" style={{ color: "var(--fwf-green)" }}>great creative.</em>
          </h1>
        </div>
      </section>

      {/* Founder block */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 64, alignItems: "center" }} className="fwf-grid-collapse">
            <div style={{ position: "relative" }}>
              <Crosshairs />
              <div style={{
                aspectRatio: "3/4",
                background: "url(assets/founder.jpg?v=2) center/cover no-repeat",
                borderRadius: 8,
                border: "1px solid var(--fwf-hairline-strong)",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7))" }} />
                <div style={{
                  position: "absolute", left: 20, bottom: 20,
                  fontFamily: "var(--fwf-mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "#fff",
                  borderLeft: "2px solid var(--fwf-pink)", paddingLeft: 12
                }}>
                  Florian Kotulla<br/>
                  <span style={{ color: "var(--fwf-text-mute)", fontSize: 10 }}>Founder & Creative Director</span>
                </div>
              </div>
            </div>

            <div>
              <div className="fwf-section-label">
                <span className="fwf-section-label-line" />
                <span className="fwf-eyebrow">The Founder</span>
              </div>
              <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: "0 0 28px 0", lineHeight: 1.05, textWrap: "balance" }}>
                Filmmaker. Creative director. <em className="fwf-display-italic">Performance thinker.</em>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 18, lineHeight: 1.65, margin: "0 0 18px 0" }}>
                Flow West Films was founded by <strong style={{ color: "#fff", fontWeight: 500 }}>Florian Kotulla</strong> — filmmaker, creative director, and performance marketing thinker. Based in Stuttgart, the studio combines cinematic storytelling with ad strategy to help B2C brands grow.
              </p>
              <p style={{ color: "var(--fwf-text-mute)", fontSize: 16, lineHeight: 1.65, margin: "0 0 32px 0" }}>
                Florian has shot for hospitality groups, sports brands, watchmakers, and SaaS companies — with credits on IMDb across narrative film and commercial work.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="https://imdb.com/name/nm6945443/" target="_blank" rel="noreferrer" className="fwf-btn fwf-btn-ghost fwf-btn-sm">
                  IMDb credits <Icons.ExternalLink size={12}/>
                </a>
                <a href="https://linkedin.com/in/florian-kotulla/" target="_blank" rel="noreferrer" className="fwf-btn fwf-btn-ghost fwf-btn-sm">
                  LinkedIn <Icons.ExternalLink size={12}/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 pillars */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div className="fwf-section-label">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">Operating system</span>
          </div>
          <h2 className="fwf-display" style={{ fontSize: "clamp(40px, 5vw, 72px)", margin: "0 0 80px 0", maxWidth: 800, textWrap: "balance" }}>
            Four pillars. <em className="fwf-display-italic">One outcome.</em>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="fwf-pillars">
            {[
              { n: "01", t: "Strategy", d: "We start where most agencies finish: with the funnel, the audience, the proof of why this exists.", c: "pink" },
              { n: "02", t: "Craft", d: "4K cinema cameras, considered lighting, restraint in the edit. Cinematic doesn't mean noisy.", c: "purple" },
              { n: "03", t: "Speed", d: "Tight pre-production, ruthless on timelines. You'll never wonder where your edit is.", c: "green" },
              { n: "04", t: "Results", d: "Every frame is built to drive an action. We measure performance like a media buyer, not an artist.", c: "orange" },
            ].map((p, i) => (
              <div key={i} className={"fwf-card fwf-card-" + p.c} style={{ padding: 28, position: "relative", minHeight: 280 }}>
                <Crosshairs />
                <div className="fwf-mono" style={{ color: "var(--fwf-" + p.c + ")", fontSize: 14, letterSpacing: "0.2em", marginBottom: 24 }}>{p.n}</div>
                <h3 className="fwf-display" style={{ fontSize: 40, margin: "0 0 16px 0" }}>{p.t}.</h3>
                <p style={{ color: "var(--fwf-text-mute)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client strip */}
      <section style={{ borderTop: "1px solid var(--fwf-hairline)", padding: "60px 0", background: "#080808" }}>
        <div className="fwf-container">
          <div className="fwf-label" style={{ textAlign: "center", marginBottom: 36 }}>— Partial client list —</div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "32px 56px" }}>
            {["Porsche", "Thomas Sabo", "Radisson Blu", "Palazzo Stuttgart", "Schmolke Carbon", "App Liqes", "Zenroots", "Swarovski", "Alienwork", "Pane Vino", "EasyFoil", "CW Architectural Art"].map((c, i) => (
              <span key={i} className="fwf-display" style={{ fontSize: 24, color: "rgba(255,255,255,0.55)", letterSpacing: "-0.01em" }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}

// ============================================
// META ADS AGENTUR (channel landing page)
// ============================================
function MetaAdsPage() {
  const included = [
    { i: <Icons.Target size={22} />, t: "Strategy & audience mapping", d: "We map who we're targeting at each funnel stage before a single ad goes live.", c: "pink" },
    { i: <Icons.Film size={22} />, t: "Creative production", d: "The same team that shoots your film builds and tests your ad creative — no handoff, no drift.", c: "purple" },
    { i: <Icons.Aperture size={22} />, t: "Full account management", d: "Campaign structure, ad sets, tracking, audiences — set up and run end to end.", c: "green" },
    { i: <Icons.Repeat size={22} />, t: "Structured scaling", d: "We don't inflate budgets on a hunch. Winning creative gets duplicated into new audience campaigns.", c: "orange" },
    { i: <Icons.Phone size={22} />, t: "Weekly performance calls", d: "A standing sync with your dedicated Performance Marketing Manager — no black box.", c: "pink" },
    { i: <Icons.BarChart size={22} />, t: "Live dashboard + monthly reporting", d: "Real-time CTR, ROAS, and CPA, plus a full report every month on where budget is going and why.", c: "purple" },
  ];

  const process = [
    { n: "01", i: <Icons.Brain size={22} />, t: "Concept", d: "Strategy first. Or we don't press record." },
    { n: "02", i: <Icons.Film size={22} />, t: "Creative", d: "Built to be remembered. Engineered to convert." },
    { n: "03", i: <Icons.Zap size={22} />, t: "Launch & Test", d: "A defined test budget against agreed targets — CTR, ROAS, or CPA, whichever matters to you." },
    { n: "04", i: <Icons.TrendUp size={22} />, t: "Scale", d: "We duplicate what's working into new audiences. Not a bigger bet on a hunch." },
  ];

  const faqs = [
    {
      q: "Do I need an existing Meta ad account or pixel set up?",
      a: "No. Onboarding runs 2–3 days and includes full setup — ad account, tracking, audiences.",
    },
    {
      q: "I've only ever done organic. Never run paid social. Is that a problem?",
      a: "No problem — we guide you through it. What already performs organically is usually the first thing we test as paid, so your existing work isn't wasted.",
    },
    {
      q: "How much budget do I need?",
      a: "There's no fixed minimum. We agree on a test budget and clear targets on the strategy call, then scale only what earns it.",
    },
    {
      q: "How is this different from a normal Meta Ads agency?",
      a: "Most agencies split creative and media buying between two teams, or two vendors. We don't. One team owns the camera and the ad account, because the moment you split them, the work stops connecting to the result.",
    },
    {
      q: "Is there a minimum commitment?",
      a: "The Growth Retainer runs on a minimum 4–6 month commitment — long enough to actually learn what works. After that, you stay because it's compounding, not because of a contract.",
    },
  ];

  return (
    <main>
      <section style={{ position: "relative", paddingTop: 180, paddingBottom: 80, overflow: "hidden" }}>
        <div className="fwf-grid-bg" />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 40% 40% at 30% 30%, rgba(255,45,120,0.14), transparent 60%)" }} />
        <div className="fwf-container" style={{ position: "relative" }}>
          <div className="fwf-section-label fwf-fade-up fwf-d1">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">Meta Ads Agency</span>
          </div>
          <h1 className="fwf-display fwf-fade-up fwf-d2" style={{ fontSize: "clamp(44px, 6.5vw, 92px)", margin: "0 0 28px 0", lineHeight: 1, maxWidth: 1000, textWrap: "balance" }}>
            Turn cold Meta traffic into <em className="fwf-display-italic" style={{ color: "var(--fwf-pink)" }}>repeat customers.</em>
          </h1>
          <p className="fwf-fade-up fwf-d3" style={{ color: "var(--fwf-text-mute)", fontSize: 18, maxWidth: 620, margin: "0 0 28px 0", lineHeight: 1.6 }}>
            Full Meta Ads management for e-commerce and B2C brands — strategy, creative, audiences, and scaling, run by the same team that shoots the film. Most of our clients start here.
          </p>
          <div className="fwf-fade-up fwf-d3b" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "9px 18px", borderRadius: 999, border: "1px solid rgba(0,255,136,0.28)", background: "rgba(0,255,136,0.06)", fontSize: 13.5, color: "rgba(255,255,255,0.9)", marginBottom: 36 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--fwf-green)", boxShadow: "0 0 8px var(--fwf-green)", flexShrink: 0 }} />
            Real client: Weinzeit — a wine festival touring all of Germany — went from <strong>2× to 14× ROAS</strong> on Meta with us.
          </div>
          <div className="fwf-fade-up fwf-d4" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="https://calendly.com/flowwestfilms-appointment/30min" target="_blank" rel="noreferrer" className="fwf-btn fwf-btn-primary">
              Book a strategy call <Icons.ArrowRight size={12} />
            </a>
            <a href="/audit/" className="fwf-btn fwf-btn-ghost">
              Get your free audit →
            </a>
          </div>
        </div>
      </section>

      {/* Position */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="fwf-grid-collapse">
            <div>
              <div className="fwf-section-label">
                <span className="fwf-section-label-line" />
                <span className="fwf-eyebrow">Why Meta, why us</span>
              </div>
              <h2 className="fwf-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", margin: 0, lineHeight: 1.1, textWrap: "balance" }}>
                The wall between your creative team and your performance team is why neither one works.
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 17, lineHeight: 1.65, margin: "0 0 20px 0" }}>
                Most agencies hand you off between a creative shop and a media buyer — two teams, two invoices, and a gap where accountability should be. We don't split them. The people who shoot and edit your ads are the same people running the account that spends against them.
              </p>
              <p style={{ color: "var(--fwf-text-mute)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>
                That's the whole thesis: premium creative isn't the opposite of performance. Done right, it's the source of it.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 56, padding: 32, border: "1px solid rgba(0,255,136,0.25)", background: "rgba(0,255,136,0.04)", borderRadius: 8, display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "center" }} className="fwf-grid-collapse">
            <div className="fwf-display" style={{ color: "var(--fwf-green)", fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 700, lineHeight: 1, whiteSpace: "nowrap" }}>
              2× → 14×
            </div>
            <div>
              <div className="fwf-label" style={{ marginBottom: 8, color: "var(--fwf-green)" }}>Real result · Weinzeit</div>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15.5, lineHeight: 1.6, margin: 0 }}>
                Weinzeit — a wine festival touring all of Germany — scaled their Meta Ads ROAS from 2× to 14× working with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div className="fwf-section-label">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">What's included</span>
          </div>
          <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: "0 0 56px 0", maxWidth: 780, textWrap: "balance" }}>
            Everything a Meta Ads engine needs. <em className="fwf-display-italic">Nothing it doesn't.</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }} className="fwf-grid-collapse">
            {included.map((f, i) => (
              <div key={i} className={"fwf-card fwf-card-" + f.c} style={{ padding: 28 }}>
                <div style={{ color: "var(--fwf-" + f.c + ")", marginBottom: 18 }}>{f.i}</div>
                <h3 style={{ fontSize: 17, margin: "0 0 10px 0", fontWeight: 500 }}>{f.t}</h3>
                <p style={{ color: "var(--fwf-text-mute)", fontSize: 14, lineHeight: 1.55, margin: 0 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div className="fwf-section-label">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">How it runs</span>
          </div>
          <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: "0 0 56px 0", maxWidth: 780, textWrap: "balance" }}>
            Concept to scale. <em className="fwf-display-italic" style={{ color: "var(--fwf-pink)" }}>One system.</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: "1px solid var(--fwf-hairline)", borderBottom: "1px solid var(--fwf-hairline)" }} className="fwf-pillars">
            {process.map((p, i, arr) => (
              <div key={i} style={{ padding: "40px 32px", borderRight: i < arr.length - 1 ? "1px solid var(--fwf-hairline)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <span style={{ color: "var(--fwf-pink)" }}>{p.i}</span>
                  <span className="fwf-mono" style={{ color: "var(--fwf-pink)", fontSize: 13, letterSpacing: "0.2em" }}>{p.n}</span>
                </div>
                <h3 style={{ fontSize: 18, margin: "0 0 12px 0", fontWeight: 500 }}>{p.t}</h3>
                <p style={{ color: "var(--fwf-text-mute)", fontSize: 14, lineHeight: 1.55, margin: 0 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: 80 }} className="fwf-grid-collapse">
            <div>
              <div className="fwf-section-label">
                <span className="fwf-section-label-line" />
                <span className="fwf-eyebrow">FAQ</span>
              </div>
              <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: 0, lineHeight: 1, textWrap: "balance" }}>
                Meta Ads, <em className="fwf-display-italic">answered.</em>
              </h2>
            </div>
            <div>
              {faqs.map((f, i) => (
                <div key={i} style={{ padding: "24px 0", borderBottom: i < faqs.length - 1 ? "1px solid var(--fwf-hairline)" : "none" }}>
                  <h3 style={{ fontSize: 17, margin: "0 0 10px 0", fontWeight: 500 }}>{f.q}</h3>
                  <p style={{ color: "var(--fwf-text-mute)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to work with us */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div className="fwf-section-label">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">How to work with us</span>
          </div>
          <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: "0 0 16px 0", maxWidth: 780, textWrap: "balance" }}>
            This runs on the <em className="fwf-display-italic" style={{ color: "var(--fwf-pink)" }}>Growth Retainer or Premium Partner.</em>
          </h2>
          <p style={{ color: "var(--fwf-text-mute)", fontSize: 15, lineHeight: 1.6, margin: "0 0 40px 0", maxWidth: 620 }}>
            Full paid media management is bundled into these two offers — not sold separately.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }} className="fwf-grid-collapse">
            {OFFERS.filter((o) => o.title === "Growth Retainer" || o.title === "Premium Partner").map((o, i) => (
              <OfferCard key={i} {...o} />
            ))}
          </div>
          <Link to="services" className="fwf-btn-bare">
            See all four ways to work with us <Icons.ArrowRight size={12} />
          </Link>
        </div>
      </section>

      <FinalCTA
        headline={<>Ready to run Meta Ads <em className="fwf-display-italic" style={{ color: "var(--fwf-pink)" }}>the right way?</em></>}
        sub="Tell us about your brand. We'll tell you what we'd do."
      />
    </main>
  );
}

// ============================================
// GOOGLE ADS PAGE
// ============================================
function GoogleAdsPage() {
  const included = [
    { i: <Icons.Target size={22} />, t: "Search strategy & keyword mapping", d: "We map the exact searches your buyers already type before they find you — and bid where it counts.", c: "pink" },
    { i: <Icons.Film size={22} />, t: "YouTube ad creative", d: "The same team that shoots your film builds the YouTube creative — most Google agencies can only run text ads.", c: "purple" },
    { i: <Icons.Aperture size={22} />, t: "Full account management", d: "Campaign structure, conversion tracking, bidding strategy — set up and run end to end.", c: "green" },
    { i: <Icons.Repeat size={22} />, t: "Shopping & Performance Max", d: "For e-commerce catalogs — product feeds set up correctly so Google can actually sell for you.", c: "orange" },
    { i: <Icons.Phone size={22} />, t: "Weekly performance calls", d: "A standing sync with your dedicated Performance Marketing Manager — no black box.", c: "pink" },
    { i: <Icons.BarChart size={22} />, t: "Live dashboard + monthly reporting", d: "Real-time CTR, ROAS, and CPA, plus a full report every month on where budget is going and why.", c: "purple" },
  ];

  const process = [
    { n: "01", i: <Icons.Brain size={22} />, t: "Concept", d: "Which searches, which products, which intent — mapped before a single euro is spent." },
    { n: "02", i: <Icons.Film size={22} />, t: "Creative", d: "YouTube ads built to earn attention, not just fill inventory." },
    { n: "03", i: <Icons.Zap size={22} />, t: "Launch & Test", d: "A defined test budget against agreed targets — CTR, ROAS, or CPA, whichever matters to you." },
    { n: "04", i: <Icons.TrendUp size={22} />, t: "Scale", d: "We duplicate what's working into new campaigns and audiences. Not a bigger bet on a hunch." },
  ];

  const faqs = [
    {
      q: "Do I need an existing Google Ads account or conversion tracking set up?",
      a: "No. Onboarding runs 2–3 days and includes full setup — account, conversion tracking, and (for e-commerce) product feed.",
    },
    {
      q: "I've only ever run Meta Ads. Never Google. Is that a problem?",
      a: "No problem. Google and Meta run on different mechanics — intent vs. interest — and most brands eventually want both. We guide you through the setup either way.",
    },
    {
      q: "How much budget do I need?",
      a: "There's no fixed minimum. We agree on a test budget and clear targets on the strategy call, then scale only what earns it.",
    },
    {
      q: "How is this different from a normal Google Ads agency?",
      a: "Most Google Ads agencies are Search-only — they can bid on keywords, but they can't produce the video creative YouTube actually needs to compete for attention. We can do both.",
    },
    {
      q: "Is there a minimum commitment?",
      a: "The Growth Retainer runs on a minimum 4–6 month commitment — long enough to actually learn what works. After that, you stay because it's compounding, not because of a contract.",
    },
  ];

  return (
    <main>
      <section style={{ position: "relative", paddingTop: 180, paddingBottom: 80, overflow: "hidden" }}>
        <div className="fwf-grid-bg" />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 40% 40% at 30% 30%, rgba(155,48,255,0.14), transparent 60%)" }} />
        <div className="fwf-container" style={{ position: "relative" }}>
          <div className="fwf-section-label fwf-fade-up fwf-d1">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">Google & YouTube Ads Agency</span>
          </div>
          <h1 className="fwf-display fwf-fade-up fwf-d2" style={{ fontSize: "clamp(44px, 6.5vw, 92px)", margin: "0 0 28px 0", lineHeight: 1, maxWidth: 1000, textWrap: "balance" }}>
            Capture the customers <em className="fwf-display-italic" style={{ color: "var(--fwf-purple)" }}>already searching for you.</em>
          </h1>
          <p className="fwf-fade-up fwf-d3" style={{ color: "var(--fwf-text-mute)", fontSize: 18, maxWidth: 620, margin: "0 0 40px 0", lineHeight: 1.6 }}>
            Google & YouTube Ads for e-commerce and B2C brands — built to catch high-intent search traffic and turn it into sales, with the same team producing the video creative YouTube ads actually need to perform.
          </p>
          <div className="fwf-fade-up fwf-d4" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="https://calendly.com/flowwestfilms-appointment/30min" target="_blank" rel="noreferrer" className="fwf-btn fwf-btn-primary">
              Book a strategy call <Icons.ArrowRight size={12} />
            </a>
            <a href="/audit/" className="fwf-btn fwf-btn-ghost">
              Get your free audit →
            </a>
          </div>
        </div>
      </section>

      {/* Position */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="fwf-grid-collapse">
            <div>
              <div className="fwf-section-label">
                <span className="fwf-section-label-line" />
                <span className="fwf-eyebrow">Why Google, why us</span>
              </div>
              <h2 className="fwf-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", margin: 0, lineHeight: 1.1, textWrap: "balance" }}>
                Google runs on intent. Most agencies only bring half of what it needs to win.
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 17, lineHeight: 1.65, margin: "0 0 20px 0" }}>
                Search catches people who already decided to buy — that part is mostly about bidding discipline. YouTube is different: it's an attention game, and attention needs real creative, not a repurposed static banner. Most Google Ads agencies are set up to do the first and not the second.
              </p>
              <p style={{ color: "var(--fwf-text-mute)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>
                We run both from one team — the Search account that captures intent, and the YouTube creative built by the same people who shoot your Launch Film.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div className="fwf-section-label">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">What's included</span>
          </div>
          <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: "0 0 56px 0", maxWidth: 780, textWrap: "balance" }}>
            Everything a Google & YouTube engine needs. <em className="fwf-display-italic">Nothing it doesn't.</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }} className="fwf-grid-collapse">
            {included.map((f, i) => (
              <div key={i} className={"fwf-card fwf-card-" + f.c} style={{ padding: 28 }}>
                <div style={{ color: "var(--fwf-" + f.c + ")", marginBottom: 18 }}>{f.i}</div>
                <h3 style={{ fontSize: 17, margin: "0 0 10px 0", fontWeight: 500 }}>{f.t}</h3>
                <p style={{ color: "var(--fwf-text-mute)", fontSize: 14, lineHeight: 1.55, margin: 0 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div className="fwf-section-label">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">How it runs</span>
          </div>
          <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: "0 0 56px 0", maxWidth: 780, textWrap: "balance" }}>
            Concept to scale. <em className="fwf-display-italic" style={{ color: "var(--fwf-purple)" }}>One system.</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: "1px solid var(--fwf-hairline)", borderBottom: "1px solid var(--fwf-hairline)" }} className="fwf-pillars">
            {process.map((p, i, arr) => (
              <div key={i} style={{ padding: "40px 32px", borderRight: i < arr.length - 1 ? "1px solid var(--fwf-hairline)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <span style={{ color: "var(--fwf-purple)" }}>{p.i}</span>
                  <span className="fwf-mono" style={{ color: "var(--fwf-purple)", fontSize: 13, letterSpacing: "0.2em" }}>{p.n}</span>
                </div>
                <h3 style={{ fontSize: 18, margin: "0 0 12px 0", fontWeight: 500 }}>{p.t}</h3>
                <p style={{ color: "var(--fwf-text-mute)", fontSize: 14, lineHeight: 1.55, margin: 0 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: 80 }} className="fwf-grid-collapse">
            <div>
              <div className="fwf-section-label">
                <span className="fwf-section-label-line" />
                <span className="fwf-eyebrow">FAQ</span>
              </div>
              <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: 0, lineHeight: 1, textWrap: "balance" }}>
                Google & YouTube, <em className="fwf-display-italic">answered.</em>
              </h2>
            </div>
            <div>
              {faqs.map((f, i) => (
                <div key={i} style={{ padding: "24px 0", borderBottom: i < faqs.length - 1 ? "1px solid var(--fwf-hairline)" : "none" }}>
                  <h3 style={{ fontSize: 17, margin: "0 0 10px 0", fontWeight: 500 }}>{f.q}</h3>
                  <p style={{ color: "var(--fwf-text-mute)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to work with us */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div className="fwf-section-label">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">How to work with us</span>
          </div>
          <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: "0 0 16px 0", maxWidth: 780, textWrap: "balance" }}>
            This runs on the <em className="fwf-display-italic" style={{ color: "var(--fwf-purple)" }}>Growth Retainer or Premium Partner.</em>
          </h2>
          <p style={{ color: "var(--fwf-text-mute)", fontSize: 15, lineHeight: 1.6, margin: "0 0 40px 0", maxWidth: 620 }}>
            Full paid media management is bundled into these two offers — not sold separately.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }} className="fwf-grid-collapse">
            {OFFERS.filter((o) => o.title === "Growth Retainer" || o.title === "Premium Partner").map((o, i) => (
              <OfferCard key={i} {...o} />
            ))}
          </div>
          <Link to="services" className="fwf-btn-bare">
            See all four ways to work with us <Icons.ArrowRight size={12} />
          </Link>
        </div>
      </section>

      <FinalCTA
        headline={<>Ready to capture the customers <em className="fwf-display-italic" style={{ color: "var(--fwf-purple)" }}>already searching for you?</em></>}
        sub="Tell us about your brand. We'll tell you what we'd do."
      />
    </main>
  );
}

// ============================================
// AI VISIBILITY PAGE
// ============================================
function AiVisibilityPage() {
  const included = [
    { i: <Icons.Sparkles size={22} />, t: "AI visibility audit", d: "We systematically ask ChatGPT, Claude, and Gemini what they say about your brand vs. your competitors — and show you exactly where the gaps are.", c: "pink" },
    { i: <Icons.Target size={22} />, t: "Positioning & content clarity", d: "We tighten your public positioning into language a model can actually summarize and recommend correctly.", c: "purple" },
    { i: <Icons.FileText size={22} />, t: "Structured proof content", d: "Comparisons, FAQs, and case studies published in a format AI systems can actually cite when asked.", c: "green" },
    { i: <Icons.Repeat size={22} />, t: "Ongoing re-checks", d: "Models update constantly. We re-test your visibility on a regular cadence, not just once.", c: "orange" },
    { i: <Icons.Phone size={22} />, t: "Weekly performance calls", d: "A standing sync with your dedicated Performance Marketing Manager — no black box.", c: "pink" },
    { i: <Icons.BarChart size={22} />, t: "Monthly reporting", d: "A full report every month on what's changed across models and what we're doing about it.", c: "purple" },
  ];

  const process = [
    { n: "01", i: <Icons.Brain size={22} />, t: "Audit", d: "See exactly what AI currently says — and doesn't say — about your brand." },
    { n: "02", i: <Icons.Target size={22} />, t: "Reposition", d: "Tighten your public positioning into language models actually quote." },
    { n: "03", i: <Icons.FileText size={22} />, t: "Publish", d: "Ship the structured proof content models pull from — comparisons, FAQs, case studies." },
    { n: "04", i: <Icons.Repeat size={22} />, t: "Re-check", d: "Re-test across models as they update. This space moves fast." },
  ];

  const faqs = [
    {
      q: "Can you guarantee my brand shows up in ChatGPT's answers?",
      a: "No — and any agency that promises that isn't being straight with you. Nobody can guarantee placement inside a black-box model. What we can do is fix the actual, fixable gaps: unclear positioning, missing proof content, and weak public presence — the same things that keep a brand invisible to AI as much as to a human researching you.",
    },
    {
      q: "Is this the same as SEO?",
      a: "Related, not the same. SEO targets search crawlers and rankings. This targets what a language model actually says when someone asks it a question — a different, newer surface that ranks differently.",
    },
    {
      q: "How do you know what AI is currently saying about my brand?",
      a: "We ask it — systematically, with a consistent set of prompts across ChatGPT, Claude, and Gemini, tracked over time so we can see what's changing and why.",
    },
    {
      q: "Do I still need Google or Meta Ads if I do this?",
      a: "Yes — this complements paid, it doesn't replace it. Think of it the way you'd think of SEO next to paid search: one is free visibility that compounds, the other is immediate and scalable.",
    },
    {
      q: "Is there a minimum commitment?",
      a: "This runs on the same minimum 4–6 month commitment as our other retainers — model behavior shifts over weeks and months, not days, so short engagements don't show much.",
    },
  ];

  return (
    <main>
      <section style={{ position: "relative", paddingTop: 180, paddingBottom: 80, overflow: "hidden" }}>
        <div className="fwf-grid-bg" />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 40% 40% at 30% 30%, rgba(255,100,32,0.14), transparent 60%)" }} />
        <div className="fwf-container" style={{ position: "relative" }}>
          <div className="fwf-section-label fwf-fade-up fwf-d1">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">AI Visibility & Optimization</span>
          </div>
          <h1 className="fwf-display fwf-fade-up fwf-d2" style={{ fontSize: "clamp(44px, 6.5vw, 92px)", margin: "0 0 28px 0", lineHeight: 1, maxWidth: 1000, textWrap: "balance" }}>
            Get recommended, not skipped, <em className="fwf-display-italic" style={{ color: "var(--fwf-orange)" }}>when they ask AI what to buy.</em>
          </h1>
          <p className="fwf-fade-up fwf-d3" style={{ color: "var(--fwf-text-mute)", fontSize: 18, maxWidth: 640, margin: "0 0 40px 0", lineHeight: 1.6 }}>
            More shoppers are asking ChatGPT, Claude, and Gemini for recommendations before they ever open Google. We help e-commerce and B2C brands show up in those answers — not just in search results.
          </p>
          <div className="fwf-fade-up fwf-d4" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="https://calendly.com/flowwestfilms-appointment/30min" target="_blank" rel="noreferrer" className="fwf-btn fwf-btn-primary">
              Book a strategy call <Icons.ArrowRight size={12} />
            </a>
            <a href="/audit/" className="fwf-btn fwf-btn-ghost">
              Get your free audit →
            </a>
          </div>
        </div>
      </section>

      {/* Position */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="fwf-grid-collapse">
            <div>
              <div className="fwf-section-label">
                <span className="fwf-section-label-line" />
                <span className="fwf-eyebrow">Why AI visibility, why now</span>
              </div>
              <h2 className="fwf-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", margin: 0, lineHeight: 1.1, textWrap: "balance" }}>
                Ranking #1 on Google doesn't mean your brand gets mentioned when someone asks an AI instead.
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 17, lineHeight: 1.65, margin: "0 0 20px 0" }}>
                Buying research is shifting from search engines to AI assistants. Being visible there runs on different signals than SEO — clear positioning, structured proof content, and real presence across the web a model can actually draw from.
              </p>
              <p style={{ color: "var(--fwf-text-mute)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>
                This is an emerging channel and we're honest about that — nobody has it fully figured out yet. What we do is make sure your brand's story is legible to a model, not just to a search crawler.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div className="fwf-section-label">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">What's included</span>
          </div>
          <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: "0 0 56px 0", maxWidth: 780, textWrap: "balance" }}>
            Everything an AI visibility engine needs. <em className="fwf-display-italic">Nothing it doesn't.</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }} className="fwf-grid-collapse">
            {included.map((f, i) => (
              <div key={i} className={"fwf-card fwf-card-" + f.c} style={{ padding: 28 }}>
                <div style={{ color: "var(--fwf-" + f.c + ")", marginBottom: 18 }}>{f.i}</div>
                <h3 style={{ fontSize: 17, margin: "0 0 10px 0", fontWeight: 500 }}>{f.t}</h3>
                <p style={{ color: "var(--fwf-text-mute)", fontSize: 14, lineHeight: 1.55, margin: 0 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div className="fwf-section-label">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">How it runs</span>
          </div>
          <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: "0 0 56px 0", maxWidth: 780, textWrap: "balance" }}>
            Audit to re-check. <em className="fwf-display-italic" style={{ color: "var(--fwf-orange)" }}>One system.</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: "1px solid var(--fwf-hairline)", borderBottom: "1px solid var(--fwf-hairline)" }} className="fwf-pillars">
            {process.map((p, i, arr) => (
              <div key={i} style={{ padding: "40px 32px", borderRight: i < arr.length - 1 ? "1px solid var(--fwf-hairline)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <span style={{ color: "var(--fwf-orange)" }}>{p.i}</span>
                  <span className="fwf-mono" style={{ color: "var(--fwf-orange)", fontSize: 13, letterSpacing: "0.2em" }}>{p.n}</span>
                </div>
                <h3 style={{ fontSize: 18, margin: "0 0 12px 0", fontWeight: 500 }}>{p.t}</h3>
                <p style={{ color: "var(--fwf-text-mute)", fontSize: 14, lineHeight: 1.55, margin: 0 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: 80 }} className="fwf-grid-collapse">
            <div>
              <div className="fwf-section-label">
                <span className="fwf-section-label-line" />
                <span className="fwf-eyebrow">FAQ</span>
              </div>
              <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: 0, lineHeight: 1, textWrap: "balance" }}>
                AI visibility, <em className="fwf-display-italic">answered.</em>
              </h2>
            </div>
            <div>
              {faqs.map((f, i) => (
                <div key={i} style={{ padding: "24px 0", borderBottom: i < faqs.length - 1 ? "1px solid var(--fwf-hairline)" : "none" }}>
                  <h3 style={{ fontSize: 17, margin: "0 0 10px 0", fontWeight: 500 }}>{f.q}</h3>
                  <p style={{ color: "var(--fwf-text-mute)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA
        headline={<>Curious what AI is already saying <em className="fwf-display-italic" style={{ color: "var(--fwf-orange)" }}>about your brand?</em></>}
        sub="Tell us about your brand. We'll tell you what we'd do."
      />
    </main>
  );
}

// ============================================
// CONTENT PAGE
// ============================================
function ContentPage() {
  const included = [
    { i: <Icons.Brain size={22} />, t: "Monthly ad concepts", d: "Two new concepts a month — hooks, scripts, and CTAs mapped out before we shoot.", c: "pink" },
    { i: <Icons.Film size={22} />, t: "Finished video creatives", d: "Multiple cuts per concept, ready for feed, stories, and reels.", c: "purple" },
    { i: <Icons.Aperture size={22} />, t: "Static creatives", d: "Scroll-stopping statics for the placements video can't fill.", c: "green" },
    { i: <Icons.Sparkles size={22} />, t: "UGC-style option", d: "Prefer UGC? Swap in UGC-style videos at the same volume.", c: "orange" },
    { i: <Icons.Zap size={22} />, t: "Fast turnaround", d: "Built on a monthly cadence, not a one-off project timeline.", c: "pink" },
    { i: <Icons.Repeat size={22} />, t: "Pairs with your media buying", d: "Creative-only — plug it into whatever you're already running on Meta, Google, or TikTok.", c: "purple" },
  ];

  const process = [
    { n: "01", i: <Icons.Target size={22} />, t: "Brief", d: "We start with what's already working — and not — in your account." },
    { n: "02", i: <Icons.Brain size={22} />, t: "Concept", d: "Hooks, scripts, and CTAs mapped out before a single shot." },
    { n: "03", i: <Icons.Film size={22} />, t: "Produce", d: "Video and static production on a monthly cadence." },
    { n: "04", i: <Icons.Zap size={22} />, t: "Deliver", d: "Ready to plug into whatever you're already running." },
  ];

  const faqs = [
    {
      q: "Do you handle the media buying too?",
      a: "Not on this offer — Content is creative-only, built to pair with your own team or agency. If you want us running the media buying as well, that's the Full Service offer (Growth Retainer or Premium Partner).",
    },
    {
      q: "What if I don't know what to test?",
      a: "We bring the concepts. Every month starts with hooks and angles based on what typically converts for e-commerce and B2C — you're not starting from a blank page.",
    },
    {
      q: "Can I do video-only or static-only?",
      a: "Yes. The volume and mix flexes to what your accounts actually need.",
    },
    {
      q: "What are the usage rights?",
      a: "Full usage rights across paid, organic, sales, and internal — the same as everything else we produce.",
    },
    {
      q: "Is there a minimum commitment?",
      a: "Creative Sprint runs month to month — no long lock-in. Most clients stay because the creative keeps working, not because of a contract.",
    },
  ];

  return (
    <main>
      <section style={{ position: "relative", paddingTop: 180, paddingBottom: 80, overflow: "hidden" }}>
        <div className="fwf-grid-bg" />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 40% 40% at 30% 30%, rgba(255,100,32,0.14), transparent 60%)" }} />
        <div className="fwf-container" style={{ position: "relative" }}>
          <div className="fwf-section-label fwf-fade-up fwf-d1">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">Content</span>
          </div>
          <h1 className="fwf-display fwf-fade-up fwf-d2" style={{ fontSize: "clamp(44px, 6.5vw, 92px)", margin: "0 0 28px 0", lineHeight: 1, maxWidth: 1000, textWrap: "balance" }}>
            More creative to test. <em className="fwf-display-italic" style={{ color: "var(--fwf-orange)" }}>Without hiring in-house.</em>
          </h1>
          <p className="fwf-fade-up fwf-d3" style={{ color: "var(--fwf-text-mute)", fontSize: 18, maxWidth: 640, margin: "0 0 40px 0", lineHeight: 1.6 }}>
            Ad creative production for e-commerce and B2C brands who run their own media buying — hooks, scripts, video and statics, delivered on a monthly cadence, ready to plug into whatever you're already running.
          </p>
          <div className="fwf-fade-up fwf-d4" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="https://calendly.com/flowwestfilms-appointment/30min" target="_blank" rel="noreferrer" className="fwf-btn fwf-btn-primary">
              Book a strategy call <Icons.ArrowRight size={12} />
            </a>
            <a href="/audit/" className="fwf-btn fwf-btn-ghost">
              Get your free audit →
            </a>
          </div>
        </div>
      </section>

      {/* Position */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="fwf-grid-collapse">
            <div>
              <div className="fwf-section-label">
                <span className="fwf-section-label-line" />
                <span className="fwf-eyebrow">Why creative, why us</span>
              </div>
              <h2 className="fwf-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", margin: 0, lineHeight: 1.1, textWrap: "balance" }}>
                Most of what makes an ad perform gets decided before a single euro is spent.
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 17, lineHeight: 1.65, margin: "0 0 20px 0" }}>
                Every concept ships with hooks, scripts, and CTAs built the same way we'd build them if we were running your media buying ourselves — because the hook decides more of the outcome than the algorithm does.
              </p>
              <p style={{ color: "var(--fwf-text-mute)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>
                You keep your media buying wherever it already lives. We just make sure it's never short on creative worth testing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div className="fwf-section-label">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">What's included</span>
          </div>
          <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: "0 0 56px 0", maxWidth: 780, textWrap: "balance" }}>
            Everything a creative pipeline needs. <em className="fwf-display-italic">Nothing it doesn't.</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }} className="fwf-grid-collapse">
            {included.map((f, i) => (
              <div key={i} className={"fwf-card fwf-card-" + f.c} style={{ padding: 28 }}>
                <div style={{ color: "var(--fwf-" + f.c + ")", marginBottom: 18 }}>{f.i}</div>
                <h3 style={{ fontSize: 17, margin: "0 0 10px 0", fontWeight: 500 }}>{f.t}</h3>
                <p style={{ color: "var(--fwf-text-mute)", fontSize: 14, lineHeight: 1.55, margin: 0 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div className="fwf-section-label">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">How it runs</span>
          </div>
          <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: "0 0 56px 0", maxWidth: 780, textWrap: "balance" }}>
            Brief to delivery. <em className="fwf-display-italic" style={{ color: "var(--fwf-orange)" }}>One cadence.</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: "1px solid var(--fwf-hairline)", borderBottom: "1px solid var(--fwf-hairline)" }} className="fwf-pillars">
            {process.map((p, i, arr) => (
              <div key={i} style={{ padding: "40px 32px", borderRight: i < arr.length - 1 ? "1px solid var(--fwf-hairline)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <span style={{ color: "var(--fwf-orange)" }}>{p.i}</span>
                  <span className="fwf-mono" style={{ color: "var(--fwf-orange)", fontSize: 13, letterSpacing: "0.2em" }}>{p.n}</span>
                </div>
                <h3 style={{ fontSize: 18, margin: "0 0 12px 0", fontWeight: 500 }}>{p.t}</h3>
                <p style={{ color: "var(--fwf-text-mute)", fontSize: 14, lineHeight: 1.55, margin: 0 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: 80 }} className="fwf-grid-collapse">
            <div>
              <div className="fwf-section-label">
                <span className="fwf-section-label-line" />
                <span className="fwf-eyebrow">FAQ</span>
              </div>
              <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: 0, lineHeight: 1, textWrap: "balance" }}>
                Content, <em className="fwf-display-italic">answered.</em>
              </h2>
            </div>
            <div>
              {faqs.map((f, i) => (
                <div key={i} style={{ padding: "24px 0", borderBottom: i < faqs.length - 1 ? "1px solid var(--fwf-hairline)" : "none" }}>
                  <h3 style={{ fontSize: 17, margin: "0 0 10px 0", fontWeight: 500 }}>{f.q}</h3>
                  <p style={{ color: "var(--fwf-text-mute)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to work with us */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div className="fwf-section-label">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">How to work with us</span>
          </div>
          <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: "0 0 16px 0", maxWidth: 780, textWrap: "balance" }}>
            Two ways to get this creative. <em className="fwf-display-italic" style={{ color: "var(--fwf-orange)" }}>Pick your shape.</em>
          </h2>
          <p style={{ color: "var(--fwf-text-mute)", fontSize: 15, lineHeight: 1.6, margin: "0 0 40px 0", maxWidth: 620 }}>
            A one-off anchor film, or a running monthly retainer — both include full production.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }} className="fwf-grid-collapse">
            {OFFERS.filter((o) => o.title === "Launch Film" || o.title === "Creative Sprint").map((o, i) => (
              <OfferCard key={i} {...o} />
            ))}
          </div>
          <Link to="services" className="fwf-btn-bare">
            See all four ways to work with us <Icons.ArrowRight size={12} />
          </Link>
        </div>
      </section>

      <FinalCTA
        headline={<>Ready for creative that <em className="fwf-display-italic" style={{ color: "var(--fwf-orange)" }}>doesn't run out?</em></>}
        sub="Tell us about your brand. We'll tell you what we'd do."
      />
    </main>
  );
}

// ============================================
// FULL SERVICE PAGE
// ============================================
function FullServicePage() {
  const included = [
    { i: <Icons.Target size={22} />, t: "Strategy across every channel", d: "One strategy that spans creative and media, not a separate plan per vendor.", c: "pink" },
    { i: <Icons.Film size={22} />, t: "Creative production", d: "The same team that shoots your film builds and tests your ad creative — no handoff, no drift.", c: "purple" },
    { i: <Icons.Aperture size={22} />, t: "Full account management", d: "Meta, Google & YouTube — campaigns, tracking, audiences, set up and run end to end.", c: "green" },
    { i: <Icons.Repeat size={22} />, t: "Structured scaling", d: "We don't inflate budgets on a hunch. Winning creative gets duplicated into new audience campaigns.", c: "orange" },
    { i: <Icons.Phone size={22} />, t: "Weekly performance calls", d: "A standing sync with your dedicated Performance Marketing Manager — no black box.", c: "pink" },
    { i: <Icons.BarChart size={22} />, t: "Live dashboard + monthly reporting", d: "Real-time CTR, ROAS, and CPA, plus a full report every month on where budget is going and why.", c: "purple" },
  ];

  const process = [
    { n: "01", i: <Icons.Brain size={22} />, t: "Concept", d: "Strategy first. Or we don't press record." },
    { n: "02", i: <Icons.Film size={22} />, t: "Creative", d: "Built to be remembered. Engineered to convert." },
    { n: "03", i: <Icons.Zap size={22} />, t: "Launch & Test", d: "A defined test budget against agreed targets — CTR, ROAS, or CPA, whichever matters to you." },
    { n: "04", i: <Icons.TrendUp size={22} />, t: "Scale", d: "We duplicate what's working into new audiences. Not a bigger bet on a hunch." },
  ];

  const faqs = [
    {
      q: "Which channels are included?",
      a: "Meta and Google & YouTube today, with more added as they prove out — TikTok and LinkedIn are next. Everything runs through the same team and the same reporting.",
    },
    {
      q: "How is this different from hiring a creative agency and a media buying agency separately?",
      a: "You'd be paying two invoices, syncing two teams, and absorbing the gap when something underperforms and neither side owns it. Here, one team owns the whole chain — the camera and the ad account.",
    },
    {
      q: "Do I need an existing ad account or tracking set up?",
      a: "No. Onboarding runs 2–3 days and includes full setup across every channel we're running for you.",
    },
    {
      q: "How much budget do I need?",
      a: "There's no fixed minimum. We agree on a test budget and clear targets on the strategy call, then scale only what earns it.",
    },
    {
      q: "Is there a minimum commitment?",
      a: "Both offers run on a minimum 4–6 month commitment — long enough to actually learn what works. After that, you stay because it's compounding, not because of a contract.",
    },
  ];

  return (
    <main>
      <section style={{ position: "relative", paddingTop: 180, paddingBottom: 80, overflow: "hidden" }}>
        <div className="fwf-grid-bg" />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 40% 40% at 30% 30%, rgba(255,45,120,0.14), transparent 60%)" }} />
        <div className="fwf-container" style={{ position: "relative" }}>
          <div className="fwf-section-label fwf-fade-up fwf-d1">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">Full Service</span>
          </div>
          <h1 className="fwf-display fwf-fade-up fwf-d2" style={{ fontSize: "clamp(44px, 6.5vw, 92px)", margin: "0 0 28px 0", lineHeight: 1, maxWidth: 1000, textWrap: "balance" }}>
            Creative and performance, run as one system. <em className="fwf-display-italic" style={{ color: "var(--fwf-pink)" }}>Not two vendors.</em>
          </h1>
          <p className="fwf-fade-up fwf-d3" style={{ color: "var(--fwf-text-mute)", fontSize: 18, maxWidth: 640, margin: "0 0 40px 0", lineHeight: 1.6 }}>
            For e-commerce and B2C brands who want production and media buying handled by the same team — so nothing gets lost between the shoot and the spend.
          </p>
          <div className="fwf-fade-up fwf-d4" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="https://calendly.com/flowwestfilms-appointment/30min" target="_blank" rel="noreferrer" className="fwf-btn fwf-btn-primary">
              Book a strategy call <Icons.ArrowRight size={12} />
            </a>
            <a href="/audit/" className="fwf-btn fwf-btn-ghost">
              Get your free audit →
            </a>
          </div>
        </div>
      </section>

      {/* Position */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="fwf-grid-collapse">
            <div>
              <div className="fwf-section-label">
                <span className="fwf-section-label-line" />
                <span className="fwf-eyebrow">Why full service, why us</span>
              </div>
              <h2 className="fwf-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", margin: 0, lineHeight: 1.1, textWrap: "balance" }}>
                Split creative and media buying across two vendors, and you've split accountability too.
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 17, lineHeight: 1.65, margin: "0 0 20px 0" }}>
                Flow West Films is the only B2C ad creative partner in DACH offering full-cycle cinematic production — not template editing. We build the concept, shoot and produce the creative to a film-level standard, then launch and scale it through paid social with data-driven testing.
              </p>
              <p style={{ color: "var(--fwf-text-mute)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>
                Brands get agency-grade strategy and film-grade craft under one roof — not a freelancer stitching together stock footage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div className="fwf-section-label">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">What's included</span>
          </div>
          <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: "0 0 56px 0", maxWidth: 780, textWrap: "balance" }}>
            Everything a growth engine needs. <em className="fwf-display-italic">Nothing it doesn't.</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }} className="fwf-grid-collapse">
            {included.map((f, i) => (
              <div key={i} className={"fwf-card fwf-card-" + f.c} style={{ padding: 28 }}>
                <div style={{ color: "var(--fwf-" + f.c + ")", marginBottom: 18 }}>{f.i}</div>
                <h3 style={{ fontSize: 17, margin: "0 0 10px 0", fontWeight: 500 }}>{f.t}</h3>
                <p style={{ color: "var(--fwf-text-mute)", fontSize: 14, lineHeight: 1.55, margin: 0 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div className="fwf-section-label">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">How it runs</span>
          </div>
          <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: "0 0 56px 0", maxWidth: 780, textWrap: "balance" }}>
            Concept to scale. <em className="fwf-display-italic" style={{ color: "var(--fwf-pink)" }}>One system.</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: "1px solid var(--fwf-hairline)", borderBottom: "1px solid var(--fwf-hairline)" }} className="fwf-pillars">
            {process.map((p, i, arr) => (
              <div key={i} style={{ padding: "40px 32px", borderRight: i < arr.length - 1 ? "1px solid var(--fwf-hairline)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <span style={{ color: "var(--fwf-pink)" }}>{p.i}</span>
                  <span className="fwf-mono" style={{ color: "var(--fwf-pink)", fontSize: 13, letterSpacing: "0.2em" }}>{p.n}</span>
                </div>
                <h3 style={{ fontSize: 18, margin: "0 0 12px 0", fontWeight: 500 }}>{p.t}</h3>
                <p style={{ color: "var(--fwf-text-mute)", fontSize: 14, lineHeight: 1.55, margin: 0 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: 80 }} className="fwf-grid-collapse">
            <div>
              <div className="fwf-section-label">
                <span className="fwf-section-label-line" />
                <span className="fwf-eyebrow">FAQ</span>
              </div>
              <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: 0, lineHeight: 1, textWrap: "balance" }}>
                Full Service, <em className="fwf-display-italic">answered.</em>
              </h2>
            </div>
            <div>
              {faqs.map((f, i) => (
                <div key={i} style={{ padding: "24px 0", borderBottom: i < faqs.length - 1 ? "1px solid var(--fwf-hairline)" : "none" }}>
                  <h3 style={{ fontSize: 17, margin: "0 0 10px 0", fontWeight: 500 }}>{f.q}</h3>
                  <p style={{ color: "var(--fwf-text-mute)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to work with us */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div className="fwf-section-label">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">How to work with us</span>
          </div>
          <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: "0 0 16px 0", maxWidth: 780, textWrap: "balance" }}>
            The two ways to run this as <em className="fwf-display-italic" style={{ color: "var(--fwf-pink)" }}>one system.</em>
          </h2>
          <p style={{ color: "var(--fwf-text-mute)", fontSize: 15, lineHeight: 1.6, margin: "0 0 40px 0", maxWidth: 620 }}>
            Growth Retainer for a defined monthly engine, Premium Partner for a bespoke founder-led partnership.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }} className="fwf-grid-collapse">
            {OFFERS.filter((o) => o.title === "Growth Retainer" || o.title === "Premium Partner").map((o, i) => (
              <OfferCard key={i} {...o} />
            ))}
          </div>
          <Link to="services" className="fwf-btn-bare">
            See all four ways to work with us <Icons.ArrowRight size={12} />
          </Link>
        </div>
      </section>

      <FinalCTA
        headline={<>Ready to run this <em className="fwf-display-italic" style={{ color: "var(--fwf-pink)" }}>as one system?</em></>}
        sub="Tell us about your brand. We'll tell you what we'd do."
      />
    </main>
  );
}

// ============================================
// CONTACT PAGE
// ============================================
function ContactPage() {
  return (
    <main>
      <section style={{ position: "relative", paddingTop: 140, paddingBottom: 100, overflow: "hidden" }}>
        <div className="fwf-grid-bg" />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 50% 40% at 70% 30%, rgba(255,45,120,0.14), transparent 60%)" }} />

        <div className="fwf-container" style={{ position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 80, alignItems: "start" }} className="fwf-grid-collapse">
            {/* Left — founder photo */}
            <div style={{ position: "relative", minHeight: 600 }} className="fwf-contact-photo">
              <Crosshairs />
              <div style={{
                position: "absolute", inset: 0,
                background: "url(assets/founder-contact.jpg?v=1) center 20%/cover no-repeat",
                borderRadius: 8,
                border: "1px solid var(--fwf-hairline-strong)",
                overflow: "hidden",
              }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85))" }} />
                <div style={{
                  position: "absolute", top: 24, left: 24,
                  fontFamily: "var(--fwf-mono)", fontSize: 10, letterSpacing: "0.22em",
                  textTransform: "uppercase", color: "var(--fwf-text-mute)",
                  display: "flex", alignItems: "center", gap: 8
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--fwf-green)", boxShadow: "0 0 8px var(--fwf-green)" }} />
                  Available · Q3 2026
                </div>
                <div style={{ position: "absolute", left: 28, bottom: 28, right: 28, display: "flex", flexDirection: "column", gap: 12 }}>
                  <div className="fwf-eyebrow" style={{ color: "var(--fwf-pink)" }}>Florian Kotulla</div>
                  <div className="fwf-display" style={{ fontSize: 36, lineHeight: 1, letterSpacing: "-0.01em" }}>
                    Founder & Creative Director
                  </div>
                  <div style={{ color: "var(--fwf-text-mute)", fontSize: 14, marginTop: 6 }}>
                    Stuttgart · Available remotely across Europe
                  </div>
                </div>
              </div>
            </div>

            {/* Right — CTA + trust block */}
            <div>
              <div className="fwf-section-label">
                <span className="fwf-section-label-line" />
                <span className="fwf-eyebrow">Get in touch</span>
              </div>
              <h1 className="fwf-display" style={{ fontSize: "clamp(40px, 5.5vw, 72px)", margin: "0 0 24px 0", lineHeight: 0.95 }}>
                Let's build something{" "}
                <TypewriterWord
                  words={["exceptional.", "unique.", "unforgettable.", "remarkable."]}
                  className="fwf-display-italic"
                  style={{ color: "var(--fwf-pink)", display: "inline-block", minWidth: "14ch" }}
                />
              </h1>
              <p style={{ color: "var(--fwf-text-mute)", fontSize: 17, lineHeight: 1.6, margin: "0 0 32px 0", maxWidth: 620 }}>
                We work with established DACH B2C brands and growth-stage companies — €500K+ revenue — who are ready to move beyond templated social content and invest in premium, cinematic ad creative that builds trust and drives conversion. Ideal partners value craft as much as performance, and are scaling paid social for the first time or upgrading from a cheaper creative supplier.
              </p>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 48, alignItems: "center" }}>
                <a href="https://calendly.com/flowwestfilms-appointment/30min" target="_blank" rel="noreferrer" className="fwf-btn fwf-btn-primary fwf-pulse">
                  <Icons.Calendar size={14}/>
                  Book a strategy call
                  <Icons.ArrowRight size={14}/>
                </a>
                <a href="/audit/" className="fwf-btn fwf-btn-ghost">
                  Free Audit →
                </a>
              </div>

              {/* Trust block */}
              <div style={{ borderTop: "1px solid var(--fwf-hairline)", paddingTop: 40 }}>
                <div style={{ fontFamily: "var(--fwf-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fwf-text-faint)", marginBottom: 28 }}>
                  Results that speak for themselves
                </div>

                {/* Stats row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                  {[
                    {
                      num: "4×",
                      label: "ROAS",
                      color: "var(--fwf-pink)",
                    },
                    {
                      num: "30",
                      label: "DAYS TO FIRST OUTPUT",
                      sub: "Results within the first sprint",
                      color: "var(--fwf-orange)",
                    },
                    {
                      num: "€0",
                      label: "SPENT ON GUESSING",
                      sub: "Every creative decision is backed by data. No spray-and-pray, no wasted budget on untested ideas.",
                      color: "var(--fwf-green)",
                    },
                  ].map((s, i) => (
                    <div key={i} style={{ padding: "20px 16px", border: "1px solid var(--fwf-hairline)", textAlign: "center" }}>
                      <div style={{ fontFamily: "var(--fwf-display)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, lineHeight: 1, color: s.color, marginBottom: 8 }}>{s.num}</div>
                      <div style={{ fontFamily: "var(--fwf-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fwf-text-faint)", marginBottom: s.sub ? 8 : 0 }}>{s.label}</div>
                      {s.sub && (
                        <div style={{ fontFamily: "var(--fwf-mono)", fontSize: 9, color: "var(--fwf-text-mute)", lineHeight: 1.5 }}>{s.sub}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: "16px 32px", alignItems: "center" }}>
                <a href="tel:+4915737918515" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--fwf-text-mute)", textDecoration: "none", fontSize: 14, fontFamily: "var(--fwf-mono)" }}>
                  <Icons.Phone size={14}/> +49 157 37918515
                </a>
                <a href="https://instagram.com/flowwestfilms" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--fwf-text-mute)", textDecoration: "none", fontSize: 14, fontFamily: "var(--fwf-mono)" }}>
                  <Icons.Instagram size={14}/> @flowwestfilms
                </a>
                <a href="https://linkedin.com/in/florian-kotulla/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--fwf-text-mute)", textDecoration: "none", fontSize: 14, fontFamily: "var(--fwf-mono)" }}>
                  <Icons.Linkedin size={14}/> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ============================================
// ImpressumPage
// ============================================
function ImpressumPage() {
  return (
    <main>
      <section className="fwf-section" style={{ paddingTop: 140, paddingBottom: 120 }}>
        <div className="fwf-container">
          <div className="fwf-eyebrow" style={{ marginBottom: 16 }}>Legal</div>
          <h1 className="fwf-display" style={{ fontSize: "clamp(48px, 7vw, 84px)", margin: "0 0 56px 0", lineHeight: 1 }}>
            Impressum
          </h1>
          <div className="fwf-legal-body">
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
              <strong>Florian Elias Kotulla</strong><br />
              Flow West Films<br />
              Neckarstraße 240<br />
              70190 Stuttgart
            </p>

            <h2>Kontakt</h2>
            <p>
              Telefon: 015737918515<br />
              E-Mail: <a href="mailto:kotullaflorian@gmail.com">kotullaflorian@gmail.com</a>
            </p>

            <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>Florian Elias Kotulla, Neckarstraße 240, 70190 Stuttgart</p>

            <h2>Hinweis zur Online-Streitbeilegung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">https://ec.europa.eu/consumers/odr</a>.
              Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht verpflichtet und nicht bereit,
              an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

// ============================================
// DatenschutzPage
// ============================================
function DatenschutzPage() {
  return (
    <main>
      <section className="fwf-section" style={{ paddingTop: 140, paddingBottom: 120 }}>
        <div className="fwf-container">
          <div className="fwf-eyebrow" style={{ marginBottom: 16 }}>Legal</div>
          <h1 className="fwf-display" style={{ fontSize: "clamp(48px, 7vw, 84px)", margin: "0 0 56px 0", lineHeight: 1 }}>
            Datenschutzerklärung
          </h1>
          <div className="fwf-legal-body">

            <h2>1. Datenschutz auf einen Blick</h2>
            <p>
              <strong>Verantwortliche Stelle</strong><br />
              Florian Elias Kotulla · Flow West Films · Neckarstraße 240 · 70190 Stuttgart ·{" "}
              <a href="mailto:kotullaflorian@gmail.com">kotullaflorian@gmail.com</a>
            </p>
            <p>
              Die Nutzung dieser Website ist ohne Angabe personenbezogener Daten möglich. Soweit Daten erhoben
              werden, geschieht dies nur, soweit Sie uns diese aktiv mitteilen oder es technisch erforderlich ist.
            </p>

            <h2>2. Hosting</h2>
            <p>
              Diese Website wird über Vercel (vercel.com) gehostet. Beim Besuch der Website werden automatisch
              technische Daten (IP-Adresse, Browsertyp, Betriebssystem, Uhrzeit des Zugriffs) im Rahmen von
              Server-Log-Dateien erfasst. Dies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO — wir haben
              ein berechtigtes Interesse an der technisch einwandfreien Darstellung unserer Website.
            </p>

            <h2>3. Kontaktaufnahme</h2>
            <p>
              Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben (Name, E-Mail-Adresse, Nachrichteninhalt)
              zur Bearbeitung Ihrer Anfrage gespeichert. Diese Daten werden nicht ohne Ihre Einwilligung
              weitergegeben und gelöscht, sobald der Zweck der Speicherung entfällt.
            </p>
            <p>
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an Anfragenbearbeitung).
            </p>

            <h2>4. Social Media & externe Dienste</h2>
            <p>
              <strong>Instagram / Facebook (Meta)</strong><br />
              Auf dieser Website sind Links zu unseren Instagram- und Facebook-Präsenzen eingebunden. Beim
              Anklicken wird eine Verbindung zu den Servern von Meta Platforms Ireland Limited (4 Grand Canal
              Square, Dublin 2, Irland) hergestellt. Meta erhält dabei die Information, dass Sie unsere Seite
              besucht haben. Wir haben keinen Einfluss auf die Datenverarbeitung durch Meta. Weitere
              Informationen:{" "}
              <a href="https://instagram.com/about/legal/privacy/" target="_blank" rel="noreferrer">instagram.com/about/legal/privacy</a>{" "}
              und{" "}
              <a href="https://de-de.facebook.com/privacy/explanation" target="_blank" rel="noreferrer">facebook.com/privacy/explanation</a>.
            </p>
            <p>
              <strong>Meta Ads / Facebook Pixel</strong><br />
              Wir betreiben bezahlte Werbung über Meta Ads. Dazu wird der Facebook Pixel auf dieser Website
              eingesetzt, um Conversion-Daten zu erheben und Werbekampagnen zu optimieren. Die dabei erfassten
              Daten (u. a. IP-Adresse, Seitenaufrufe, User-Agent) werden an Meta übermittelt und können in den
              USA verarbeitet werden. Die Nutzung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a
              DSGVO). Die Einwilligung ist jederzeit widerrufbar. Wir und Meta Platforms Ireland Limited sind für
              die Erfassung und Übermittlung dieser Daten gemeinsam verantwortlich (Art. 26 DSGVO). Die
              Datenübertragung in die USA stützt sich auf die Standardvertragsklauseln der EU-Kommission.
            </p>
            <p>
              <strong>YouTube</strong><br />
              Auf dieser Website sind YouTube-Videos eingebunden (Google Ireland Limited, Gordon House, Barrow
              Street, Dublin 4, Irland). Wir nutzen den erweiterten Datenschutzmodus. Beim Abspielen eines Videos
              wird eine Verbindung zu YouTube-Servern hergestellt. Wenn Sie in Ihrem Google-Konto eingeloggt
              sind, kann YouTube das Abspielen Ihrem Profil zuordnen. Weitere Informationen:{" "}
              <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noreferrer">policies.google.com/privacy</a>.
            </p>

            <h2>5. Ihre Rechte</h2>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer
              personenbezogenen Daten sowie das Recht auf Datenübertragbarkeit. Bei Beschwerden steht Ihnen das
              Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>
            <p>
              Für alle Anfragen:{" "}
              <a href="mailto:kotullaflorian@gmail.com">kotullaflorian@gmail.com</a>
            </p>

          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { ProjectsPage, ProjectsLabPage, PricingPage, AboutPage, ContactPage, ImpressumPage, DatenschutzPage, MetaAdsPage, GoogleAdsPage, AiVisibilityPage, ContentPage, FullServicePage });
