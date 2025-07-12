import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ListView from '@/components/ListView'
import React from 'react'

function page() {
  return (
    <div className='bg-gray-50'>
      <div className='mb-[30px]'>
        <Header />
      </div>

      <div className='bg-gray-50'>
        <ListView />
      </div>

      <div className='mt-[30px]'>
        <Footer />
      </div>
    </div>
  )
}

export default page
