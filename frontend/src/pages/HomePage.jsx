import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUi from '../components/RateLimitedUi'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import api from '../lib/axios'
import NotesNotFound from '../components/NotesNotFound'

const HomePage = () => {
  const [rateLimited, setRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get('/notes')
        const data = response.data
        setNotes(data)
        setRateLimited(false)
      } catch (error) {
        console.log('Error fetching notes:', error);
        if (error.response?.status === 429) {
          setRateLimited(true)
        } else {
          toast.error('Failed to fetch notes. Please try again later.')
        } 
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])
  

  return (
    <div className='min-h-screen'>
      <Navbar />

      {rateLimited && <RateLimitedUi />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading...</div>}

        {!loading && notes.length === 0 && !rateLimited && <NotesNotFound />}
        
        {notes.length > 0 && !rateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => {
              return (
                <NoteCard key={note._id} {...note} setNotes={setNotes} />
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}

export default HomePage