import { RefreshCcw } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className='flex items-center gap-4'>
        <RefreshCcw className='animate-spin'/>
        Loading...
    </div>
  )
}
