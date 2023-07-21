
import { useEffect, useRef, useState } from "react";

export default function Blog(){

    // const [title,setTitle] = useState("");
    // const [content,setContent] = useState("");
    const [formData, setformData] = useState({title:"", content:""})
    const [blogs, setBlogs] =  useState([]);
    const titleRef=useRef(null);
     useEffect(()=>{
        titleRef.current.focus();
     },[]);

    //  set title
    useEffect(()=>{
        if(blogs.length && blogs[0].title){
            document.title=blogs[0].title;
        }else{
            document.title='no-blogs'
        }
    },[blogs])

    function handleSubmit(e){
        e.preventDefault();
        setBlogs([{title: formData.title,content:formData.content}, ...blogs]);
        setformData({title:"",content:""});
        titleRef.current.focus();
        console.log(blogs);
    }

    function removeBlog(i){
        setBlogs(blogs.filter((blog,index)=> i!==index));
    }
    return(
        <>
        <h1>Write a Blog!</h1>
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>
                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of the Blog here.."
                                value={formData.title}
                                ref={titleRef}
                                onChange = {(e) => setformData({title: e.target.value, content:formData.content})}
                        />
                </Row >

                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.."
                                value={formData.content}
                                required
                                onChange = {(e) => setformData({title: formData.title,content: e.target.value})}
                        />
                </Row >
         
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
        {blogs.map((blog,i) => (
            <>
            <div className="blog">
                <h3>{blog.title}</h3>
                <hr/>
                <p>{blog.content}</p>
                <div className="blog-btn ">
            <button className="remove btn"  onClick={()=>removeBlog(i)}>Delete</button> 
                </div>
            </div>
            </>
            
        ))}
        
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}

