import React from 'react'
import { useState,useEffect } from 'react'
import Backbutton from '../components/Backbutton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'


const EditBook = () => {
  const[title,setTitle] = useState("")
  const[author,setAuthor] = useState("")
  const[publishYear,setPublishYear] = useState("")
  const[loading,setLoading]= useState(false)
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
        setLoading(true);
        axios.get(`http://localhost:5000/books/${id}`)
        .then((response)=>{
          setAuthor(response.data.author)
          setTitle(response.data.title)
          setPublishYear(response.data.publishYear)
          setLoading(false)
          setAuthor("")
          setPublishYear("")
          setTitle("")
        })
        .catch(err=>{
          setLoading(false)
          alert('An error happened. Check the console')
          console.log(err)
        })
  },[])

  const handleEditBook = () =>{
       const data= {author,title,publishYear};
       setLoading(true);
       axios.put(`http://localhost:5000/books/${id}`, data)
       .then(()=>{
        setLoading(false)
        navigate('/')
       })
       .catch((err)=>{
        setLoading(false)
        alert("An error happened. Please check console")
        console.log(err)
       })
  }
  return (
    <div className="py-4">
    <Backbutton/>
    <h1 className='text-3xl my-4'>Create Book</h1>
    {loading ?
      (<Spinner/>)
      :
      ('')
  }
  <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
    <div className="my-4">
      <label htmlFor="" className="text-xl mr-4 text-gray-500">Title</label>
      <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full '></input>
    </div>
    <div className="my-4">
      <label htmlFor="" className="text-xl mr-4 text-gray-500">Author</label>
      <input type="text" value={author} onChange={(e)=> setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full '></input>
    </div>
    <div className="my-4">
      <label htmlFor="" className="text-xl mr-4 text-gray-500">Published Year</label>
      <input type="text" value={publishYear} onChange={(e)=> setPublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full '></input>
    </div>
    <button className="p-2 bg-sky-600 m-8" onClick={handleEditBook}>Save</button>
  </div>
  </div>
)
}

export default EditBook