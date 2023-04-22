
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Test = () => {
    const [file, setFile] = useState()
    const [caption, setCaption] = useState("")
  
    const navigate = useNavigate()
  
    const submit = async event => {
      event.preventDefault()
  
      const formData = new FormData();
      formData.append("image", file)
      formData.append("caption", caption)
      await axios.post("http://localhost:3003/posts/test", formData, { headers: {'Content-Type': 'multipart/form-data'}})
  

    }
  
    const fileSelected = event => {
      const file = event.target.files[0]
          setFile(file)
      }
    return (
    
      
              <form onSubmit={submit} >
                <input onChange={fileSelected} type="file" accept="image/*"></input>
                <button type="submit">Submit</button>
                </form>
       
    )
}


export default Test;