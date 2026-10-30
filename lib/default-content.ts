export interface SiteContent {
  global: {
    brandName: string
    solanaContractAddress: string
    charityVaultAddress: string
    telegramUrl: string
    dexScreenerUrl: string
    dexScreenerChartEmbedUrl: string
  }
  hero: {
    eyebrow: string
    headingPart1: string
    headingHighlight: string
    headingPart2: string
    transparencyBadge: string
    description: string
    contractLabel: string
    joinButtonText: string
    joinButtonLink: string
    chartButtonText: string
    chartButtonLink: string
    stJudeCardEyebrow: string
    stJudeCardTitle: string
    stJudeCardMilestonePrefix: string
    stJudeCardMilestoneHighlight: string
    stJudeCardMilestoneSuffix: string
    stJudeCardButtonLink: string
  }
  utilities: {
    eyebrow: string
    heading: string
    description: string
    buttonText: string
    buttonLink: string
    card1Title: string
    card1Badge: string
    card1Desc: string
    card2Title: string
    card2Badge: string
    card2Desc: string
  }
  mission: {
    eyebrow: string
    heading: string
    description: string
    points: Array<{
      title: string
      text: string
    }>
  }
  partnership: {
    heading: string
    headingHighlight: string
    headingSuffix: string
    description: string
    badgeText: string
    donateButtonText: string
    donateButtonLink: string
    milestoneGoalTitle: string
    milestoneGoalDesc: string
    milestoneProgressPercent: number
    milestoneRaisedAmount: string
    milestoneTargetAmount: string
  }
  roadmap: {
    eyebrow: string
    heading: string
    description: string
    phases: Array<{
      id: string
      phaseNumber: string
      title: string
      badge: string
      description: string
      items: string[]
    }>
  }
  tokenInfo: {
    eyebrow: string
    heading: string
    tokenName: string
    ticker: string
    blockchain: string
    chartTitle: string
    chartBadge: string
    chartSubtitle: string
    features: string[]
  }
  footer: {
    heading: string
    subheading: string
    telegramButtonText: string
    telegramButtonLink: string
    copyright: string
  }
}

export const DEFAULT_CONTENT: SiteContent = {
  global: {
    brandName: 'EpiCoin',
    solanaContractAddress: 'GUtUrPGwfJDj3WTb2dEe2B9UnLtG1GGdBMreFtDXJxEw',
    charityVaultAddress: '4UE6MCdehqLbeDuvKB5piM1VMm199WJxCWqTubQpim7k',
    telegramUrl: 'https://t.me/epicoins',
    dexScreenerUrl: 'https://dexscreener.com/solana/GUtUrPGwfJDj3WTb2dEe2B9UnLtG1GGdBMreFtDXJxEw',
    dexScreenerChartEmbedUrl: 'https://dexscreener.com/solana/GUtUrPGwfJDj3WTb2dEe2B9UnLtG1GGdBMreFtDXJxEw?embed=1&theme=dark&trades=0&info=0',
  },
  hero: {
    eyebrow: 'The EpiCoin Ecosystem',
    headingPart1: 'Welcome to',
    headingHighlight: '$POT Luck',
    headingPart2: 'Community (PLC)',
    transparencyBadge: '100% Verified Transparency',
    description: 'PLC combines meme culture with real-world impact to transform the lives of vulnerable children.',
    contractLabel: 'Contract Address (SPL)',
    joinButtonText: 'Join the Community',
    joinButtonLink: 'https://t.me/epicoins',
    chartButtonText: 'View $POT live chart',
    chartButtonLink: '#chart',
    stJudeCardEyebrow: 'Supporting',
    stJudeCardTitle: "St. Jude Children's Research Hospital",
    stJudeCardMilestonePrefix: 'When we reach a $100K market cap, we donate',
    stJudeCardMilestoneHighlight: '12 SOL',
    stJudeCardMilestoneSuffix: 'to St. Jude.',
    stJudeCardButtonLink: '#partnership',
  },
  utilities: {
    eyebrow: 'WHY $POT LUCK?',
    heading: 'Two Utilities.\nOne Mission.',
    description: '$POT Luck rewards its holders with 3% SOL reflections and fuels real-world impact through charitable donations.',
    buttonText: 'Learn More',
    buttonLink: '#partnership',
    card1Title: 'Holder Rewards',
    card1Badge: '3% SOL Reflections',
    card1Desc: 'The longer you hold and the more volume we do, the better your return.',
    card2Title: 'Real Impact',
    card2Badge: 'Charity at $100K MC',
    card2Desc: "Reach $100K market cap and we donate 12 SOL to St. Jude Children's Hospital.",
  },
  mission: {
    eyebrow: 'OUR MISSION',
    heading: 'More Than a Meme Coin',
    description: 'We’re building a transparent, organic, peer-to-peer community focused on sustainable growth and meaningful impact. PLC represents the philanthropic heart of the EpiCoin ecosystem.',
    points: [
      {
        title: 'Reach $100K Market Cap',
        text: "Donate 12 SOL to St. Jude Children's Research Hospital.",
      },
      {
        title: 'Full Transparency',
        text: 'Public charity wallet on-chain. Track our progress.',
      },
      {
        title: 'Real Community',
        text: 'No insider groups. No artificial hype. Just people with a purpose.',
      },
    ],
  },
  partnership: {
    heading: 'Our Partnership with',
    headingHighlight: "St. Jude Children's",
    headingSuffix: 'Research Hospital',
    description: 'Our most significant charitable relationship is our authorized connection with St. Jude Children\'s Research Hospital. St. Jude is internationally recognized for its pioneering work in pediatric cancer treatment and research, freely sharing breakthroughs to advance childhood medicine worldwide.',
    badgeText: 'Official Authorized Charity Relationship',
    donateButtonText: 'Support St. Jude Directly',
    donateButtonLink: 'https://www.stjude.org/donate',
    milestoneGoalTitle: '$100K Market Cap Milestone',
    milestoneGoalDesc: 'When $POT reaches a $100K market cap, our verified on-chain donation of 12 SOL is released directly to St. Jude Children\'s Research Hospital.',
    milestoneProgressPercent: 35,
    milestoneRaisedAmount: '4.2 SOL',
    milestoneTargetAmount: '12 SOL',
  },
  roadmap: {
    eyebrow: 'PROJECT ROADMAP',
    heading: 'The Journey Ahead',
    description: 'Our transparent roadmap outlines key development milestones, community rewards, and charitable impact goals.',
    phases: [
      {
        id: 'phase1',
        phaseNumber: 'Phase 1',
        title: 'Build the Foundation',
        badge: 'Active Now',
        description: 'Establish core infrastructure and build organic holder base.',
        items: [
          'Launch token & ecosystem',
          'DexScreener profile & verification',
          'Automated charity process',
          'Organic holder community',
        ],
      },
      {
        id: 'phase2',
        phaseNumber: 'Phase 2',
        title: 'The $100K Milestone',
        badge: 'Next Goal',
        description: 'Achieve $100K Market Cap and execute the landmark 12 SOL donation.',
        items: [
          '$100K market cap target',
          '12 SOL official donation',
          'Publish on-chain receipt on X',
          'Community expansion initiatives',
        ],
      },
      {
        id: 'phase3',
        phaseNumber: 'Phase 3',
        title: 'Expand Our Impact',
        badge: 'Planned',
        description: 'Reach $1M market cap and expand to multiple charity recipients.',
        items: [
          '$1M market cap milestone',
          'Additional charity partners',
          'Exclusive holder rewards',
          'Major DEX / CEX expansion',
        ],
      },
      {
        id: 'phase4',
        phaseNumber: 'Phase 4',
        title: 'Long-Term Legacy',
        badge: 'Vision',
        description: 'Sustained philanthropic impact powered by on-chain volume.',
        items: [
          'Perpetual charity pool',
          'DAO governance voting',
          'Global outreach initiatives',
          'Permanent philanthropic presence',
        ],
      },
    ],
  },
  tokenInfo: {
    eyebrow: '$POT LUCK TOKEN INFORMATION',
    heading: '$POT / PLC',
    tokenName: 'POT Luck',
    ticker: '$POT / PLC',
    blockchain: 'Solana',
    chartTitle: 'Live DexScreener Chart',
    chartBadge: 'LIVE ON-CHAIN',
    chartSubtitle: 'Real-time price candles, liquidity, and trading volume for $POT / SOL',
    features: [
      'Community-driven development focused on organic participation.',
      'A holder reward mechanism designed around 3% SOL reflections.',
      'Locked liquidity, as represented by the project\'s stated liquidity arrangements.',
      'No founder allocation, according to the project\'s stated token distribution.',
      'A charitable mission supporting St. Jude Children\'s Research Hospital.',
      'Publicly accessible on-chain charity wallet activity.',
    ],
  },
  footer: {
    heading: 'Join the $POT Movement',
    subheading: 'Be part of a meme coin with a real heart.',
    telegramButtonText: 'Join Telegram Community',
    telegramButtonLink: 'https://t.me/epicoins',
    copyright: '© 2026 $POT Luck Community. All rights reserved.',
  },
}
