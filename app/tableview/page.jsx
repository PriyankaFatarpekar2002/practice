import AddNewEntry from '@/components/AddNewEntry'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import TableView from '@/components/TableView'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen'>

      <div>
        <Header />
      </div>

      <div>
        <TableView />
      </div>

      <div className='-mt-[150px] bg-gray-100'>
        <Footer />
      </div>

    </div>
  )
}

export default page
