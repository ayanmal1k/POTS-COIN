'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { SiteContent, DEFAULT_CONTENT } from '@/lib/default-content'
import {
  getSiteContentFromFirestore,
  saveSiteContentToFirestore,
  subscribeToSiteContent,
} from '@/lib/firebase'

interface ContentContextType {
  content: SiteContent
  updateContent: (newContent: SiteContent) => Promise<boolean>
  resetToDefaults: () => Promise<boolean>
  refreshContent: () => Promise<void>
  isLoading: boolean
  isFirebaseConnected: boolean
  lastSavedAt: string | null
}

const ContentContext = createContext<ContentContextType>({
  content: DEFAULT_CONTENT,
  updateContent: async () => false,
  resetToDefaults: async () => false,
  refreshContent: async () => {},
  isLoading: false,
  isFirebaseConnected: false,
  lastSavedAt: null,
})

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(false)
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null)

  // 1. Initial fetch from Firestore & set up real-time listener
  useEffect(() => {
    let isMounted = true

    // Fetch initial
    getSiteContentFromFirestore()
      .then((data) => {
        if (isMounted) {
          setContent(data)
          setIsLoading(false)
          setIsFirebaseConnected(true)
        }
      })
      .catch((err) => {
        console.warn('Initial Firestore fetch error:', err)
        if (isMounted) {
          setIsLoading(false)
        }
      })

    // Subscribe to real-time changes
    const unsubscribe = subscribeToSiteContent((freshContent) => {
      if (isMounted) {
        setContent(freshContent)
        setIsFirebaseConnected(true)
        setIsLoading(false)
        setLastSavedAt(new Date().toLocaleTimeString())
      }
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  // Save content to Firestore
  const updateContent = async (newContent: SiteContent): Promise<boolean> => {
    try {
      setContent(newContent)
      await saveSiteContentToFirestore(newContent)
      setLastSavedAt(new Date().toLocaleTimeString())
      setIsFirebaseConnected(true)
      return true
    } catch (err) {
      console.error('Failed to update content in Firestore pots collection:', err)
      return false
    }
  }

  // Reset to default content
  const resetToDefaults = async (): Promise<boolean> => {
    try {
      setContent(DEFAULT_CONTENT)
      await saveSiteContentToFirestore(DEFAULT_CONTENT)
      setLastSavedAt(new Date().toLocaleTimeString())
      return true
    } catch (err) {
      console.error('Failed to reset content in Firestore:', err)
      return false
    }
  }

  const refreshContent = async () => {
    setIsLoading(true)
    const data = await getSiteContentFromFirestore()
    setContent(data)
    setIsLoading(false)
  }

  return (
    <ContentContext.Provider
      value={{
        content,
        updateContent,
        resetToDefaults,
        refreshContent,
        isLoading,
        isFirebaseConnected,
        lastSavedAt,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}

