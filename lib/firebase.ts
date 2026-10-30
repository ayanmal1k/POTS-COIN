import { initializeApp, getApps, getApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  Firestore,
} from 'firebase/firestore'
import { SiteContent, DEFAULT_CONTENT } from './default-content'

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyDMf7TIRHP0OzASfxMXjbg6ra3No9LcFYg',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'admiral-1a377.firebaseapp.com',
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'admiral-1a377',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'admiral-1a377.firebasestorage.app',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '175933062112',
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    '1:175933062112:web:e2975beba5c209297e8985',
}

// Initialize Firebase safely
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
export const db: Firestore = getFirestore(app)

// The user specified collection name: "pots"
export const POTS_COLLECTION = 'pots'
export const CONTENT_DOC_ID = 'content'

/**
 * Fetch all site content from the 'pots' collection.
 * Merges with DEFAULT_CONTENT so newly added fields never break.
 */
export async function getSiteContentFromFirestore(): Promise<SiteContent> {
  try {
    const docRef = doc(db, POTS_COLLECTION, CONTENT_DOC_ID)
    const snap = await getDoc(docRef)
    if (snap.exists()) {
      const data = snap.data() as Partial<SiteContent>
      return {
        ...DEFAULT_CONTENT,
        ...data,
        hero: { ...DEFAULT_CONTENT.hero, ...(data.hero || {}) },
        utilities: { ...DEFAULT_CONTENT.utilities, ...(data.utilities || {}) },
        mission: {
          ...DEFAULT_CONTENT.mission,
          ...(data.mission || {}),
          points: data.mission?.points || DEFAULT_CONTENT.mission.points,
        },
        partnership: { ...DEFAULT_CONTENT.partnership, ...(data.partnership || {}) },
        roadmap: {
          ...DEFAULT_CONTENT.roadmap,
          ...(data.roadmap || {}),
          phases: data.roadmap?.phases || DEFAULT_CONTENT.roadmap.phases,
        },
        tokenInfo: {
          ...DEFAULT_CONTENT.tokenInfo,
          ...(data.tokenInfo || {}),
          features: data.tokenInfo?.features || DEFAULT_CONTENT.tokenInfo.features,
        },
        footer: { ...DEFAULT_CONTENT.footer, ...(data.footer || {}) },
        global: { ...DEFAULT_CONTENT.global, ...(data.global || {}) },
      }
    }
  } catch (error) {
    console.warn('Could not read from Firestore pots collection, using defaults:', error)
  }
  return DEFAULT_CONTENT
}

/**
 * Save updated content to 'pots' collection
 */
export async function saveSiteContentToFirestore(content: SiteContent): Promise<void> {
  const docRef = doc(db, POTS_COLLECTION, CONTENT_DOC_ID)
  await setDoc(docRef, {
    ...content,
    updatedAt: new Date().toISOString(),
  }, { merge: true })
}

/**
 * Subscribe to real-time updates from Firestore
 */
export function subscribeToSiteContent(
  callback: (content: SiteContent) => void
): () => void {
  try {
    const docRef = doc(db, POTS_COLLECTION, CONTENT_DOC_ID)
    const unsubscribe = onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data() as Partial<SiteContent>
          callback({
            ...DEFAULT_CONTENT,
            ...data,
            hero: { ...DEFAULT_CONTENT.hero, ...(data.hero || {}) },
            utilities: { ...DEFAULT_CONTENT.utilities, ...(data.utilities || {}) },
            mission: {
              ...DEFAULT_CONTENT.mission,
              ...(data.mission || {}),
              points: data.mission?.points || DEFAULT_CONTENT.mission.points,
            },
            partnership: { ...DEFAULT_CONTENT.partnership, ...(data.partnership || {}) },
            roadmap: {
              ...DEFAULT_CONTENT.roadmap,
              ...(data.roadmap || {}),
              phases: data.roadmap?.phases || DEFAULT_CONTENT.roadmap.phases,
            },
            tokenInfo: {
              ...DEFAULT_CONTENT.tokenInfo,
              ...(data.tokenInfo || {}),
              features: data.tokenInfo?.features || DEFAULT_CONTENT.tokenInfo.features,
            },
            footer: { ...DEFAULT_CONTENT.footer, ...(data.footer || {}) },
            global: { ...DEFAULT_CONTENT.global, ...(data.global || {}) },
          })
        }
      },
      (error) => {
        console.warn('Firestore subscription notice:', error)
      }
    )
    return unsubscribe
  } catch (error) {
    console.warn('Could not subscribe to Firestore pots collection:', error)
    return () => {}
  }
}

