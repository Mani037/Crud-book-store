import React, { useState } from 'react'
import Backbutton from '../components/Backbutton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'

const DeleteBook = () => {
  const[loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()

  const handleDeleteBook = () =>{
    setLoading(true)
    axios.delete(`http://localhost:5000/books/${id}`)
    .then(()=>{
      setLoading(false)
      navigate('/')
    })
    .catch(err=>{
      setLoading(false)
      alert('An error happened. check console')
      console.log(err)
    })
  }
  return (
    <div className='p-4'>
      <Backbutton/>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner/>: ""}
      <div className="flex flex-col items-center border-2 border-sky-600 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure Want to delete this Book ?</h3>
        <button onClick={handleDeleteBook} className='p-4 bg-red-500 rounded-xl text-white m-8 w-full font-bold'>Yes,Delete it</button>
      </div>
    </div>
  )
}

export default DeleteBook