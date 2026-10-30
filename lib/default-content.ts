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
    transparencyBadgeIcon?: string
    transparencyBadgeIconFilled?: boolean
    stJudeCardIcon?: string
    stJudeCardIconFilled?: boolean
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
    card1Icon?: string
    card1IconFilled?: boolean
    card2Title: string
    card2Badge: string
    card2Desc: string
    card2Icon?: string
    card2IconFilled?: boolean
  }
  mission: {
    eyebrow: string
    heading: string
    description: string
    points: Array<{
      title: string
      text: string
      icon?: string
      iconFilled?: boolean
    }>
  }
  howToBuy: {
    eyebrow: string
    heading: string
    headingHighlight: string
    description: string
    contractLabel: string
    buyButtonText: string
    buyButtonLink: string
    chartButtonText: string
    chartButtonLink: string
    steps: Array<{
      stepNumber: string
      stepBadge: string
      title: string
      description: string
      icon?: string
      iconFilled?: boolean
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
      icon?: string
      iconFilled?: boolean
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
    chartIcon?: string
    chartIconFilled?: boolean
    features: string[]
  }
  footer: {
    heading: string
    subheading: string
    telegramButtonText: string
    telegramButtonLink: string
    contactIcon?: string
    contactIconFilled?: boolean
    copyright: string
  }
  textStyles?: Record<string, {
    x?: number
    y?: number
    align?: 'left' | 'center' | 'right'
  }>
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
    joinButtonText: 'Buy Now',
    joinButtonLink: 'https://dexscreener.com/solana/GUtUrPGwfJDj3WTb2dEe2B9UnLtG1GGdBMreFtDXJxEw',
    chartButtonText: 'View $POT live chart',
    chartButtonLink: '#chart',
    stJudeCardEyebrow: 'Supporting',
    stJudeCardTitle: "St. Jude Children's Research Hospital",
    stJudeCardMilestonePrefix: 'When we reach a $100K market cap, we donate',
    stJudeCardMilestoneHighlight: '12 SOL',
    stJudeCardMilestoneSuffix: 'to St. Jude.',
    stJudeCardButtonLink: '#partnership',
    transparencyBadgeIcon: 'ShieldCheck',
    transparencyBadgeIconFilled: false,
    stJudeCardIcon: 'Heart',
    stJudeCardIconFilled: true,
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
    card1Icon: 'CoinStack',
    card1IconFilled: false,
    card2Title: 'Real Impact',
    card2Badge: 'Charity at $100K MC',
    card2Desc: "Reach $100K market cap and we donate 12 SOL to St. Jude Children's Hospital.",
    card2Icon: 'Heart',
    card2IconFilled: true,
  },
  mission: {
    eyebrow: 'OUR MISSION',
    heading: 'More Than a Meme Coin',
    description: 'We’re building a transparent, organic, peer-to-peer community focused on sustainable growth and meaningful impact. PLC represents the philanthropic heart of the EpiCoin ecosystem.',
    points: [
      {
        title: 'Reach $100K Market Cap',
        text: "Donate 12 SOL to St. Jude Children's Research Hospital.",
        icon: 'Heart',
        iconFilled: true,
      },
      {
        title: 'Full Transparency',
        text: 'Public charity wallet on-chain. Track our progress.',
        icon: 'Shield',
        iconFilled: true,
      },
      {
        title: 'Real Community',
        text: 'No insider groups. No artificial hype. Just people with a purpose.',
        icon: 'Users',
        iconFilled: true,
      },
    ],
  },
  howToBuy: {
    eyebrow: '',
    heading: 'How to Buy $POT on',
    headingHighlight: 'FOMO',
    description: 'Get started with $POT Luck Community in under 3 minutes. Follow this step-by-step guide to swap securely on Solana.',
    contractLabel: 'Official Verified Token Address (SPL)',
    buyButtonText: 'Buy on FOMO',
    buyButtonLink: 'http://fomo.family/tokens/solana/GUtUrPGwfJDj3WTb2dEe2B9UnLtG1GGdBMreFtDXJxEw?r=MistyJustViper',
    chartButtonText: 'View Live Chart',
    chartButtonLink: '#chart',
    steps: [
      {
        stepNumber: '01',
        stepBadge: 'STEP 1',
        title: 'Get a Solana Wallet',
        description: 'Download and install Phantom, Solflare, or Backpack wallet on your browser extension or mobile app. Create a new wallet and keep your recovery phrase safe.',
        icon: 'Wallet',
        iconFilled: true,
      },
      {
        stepNumber: '02',
        stepBadge: 'STEP 2',
        title: 'Add SOL to Your Wallet',
        description: 'Purchase Solana (SOL) directly within your wallet or withdraw it from an exchange (Coinbase, Binance, Kraken) to your personal Solana wallet public address.',
        icon: 'Coins',
        iconFilled: true,
      },
      {
        stepNumber: '03',
        stepBadge: 'STEP 3',
        title: 'Connect to FOMO',
        description: 'Navigate to FOMO or your preferred Solana swap platform. Connect your wallet and paste the official $POT contract address to import the verified token.',
        icon: 'Compass',
        iconFilled: true,
      },
      {
        stepNumber: '04',
        stepBadge: 'STEP 4',
        title: 'Swap SOL for $POT',
        description: 'Choose the amount of SOL you want to swap for $POT, review transaction details, and confirm the trade. Welcome to the $POT Luck Community!',
        icon: 'Rocket',
        iconFilled: true,
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
  textStyles: {},
}
