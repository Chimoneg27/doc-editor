'use client'
 
import React from 'react'
import dynamic from 'next/dynamic'
 
const Viewer = dynamic(() => import('../../Viewer'), { ssr: false })
 
export function ClientOnly() {
  return <Viewer />
}