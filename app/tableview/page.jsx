import AddNewEntry from '@/components/AddNewEntry'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import TableView from '@/components/TableView'
import React from 'react'

const page = () => {
  return (
    <div className='relative min-h-screen bg-gray-100'>

      <div>
        <Header />
      </div>

      <div>
        <TableView />
      </div>

      <div className=' bg-gray-100'>
        <Footer />
      </div>

    </div>
  )
}

export default page
