import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ListView from '@/components/ListView'
import React, { Suspense } from 'react'

function Page() {
  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='mb-[30px]'>
        <Header />
      </div>

      <div className='bg-gray-100 px-4'>
        <Suspense fallback={<div>Loading...</div>}>
          <ListView />
        </Suspense>
      </div>

      <div className='mt-[30px]'>
        <Footer />
      </div>
    </div>
  )
}

export default Page