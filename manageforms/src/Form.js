import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';


const formSchema = yup.object().shape({
    name: yup.string().required('name is required'),
    email: yup.string().required('email required'),
    password: yup.string().required('password required'),
    terms: yup.boolean().oneOf([true], 'press dat ish')
})

function Form(){

    const [formState, setForm] = useState({
        name:'',
        email:'',
        password:'',
        terms:''
    })


const [errors, setErrors] = useState({
    name:'',
    email:'',
    password:'',
    terms:''
})
const [buttonDisabled, setButtonDisabled] = useState(true);

const [post, setPost] = useState([])

useEffect(() => {
    formSchema.isValid(formState).then(valid => {
        setButtonDisabled(!valid)
    });
}, [formState]);

const validateChange = e => {
    yup
    .reach(formSchema, e.target.name)
    .validate(e.target.value)
    .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
}
      const formSubmit = e => {
        e.preventDefault();
        axios
          .post("https://reqres.in/api/users", formState)
          .then(res => {
            setPost(res.data);
            console.log("success", post);
    
            setForm({
              name: "",
              email: "",
              password: "",
              terms: "",
            });
          })
          .catch(err => {
            console.log(err.res);
          });
      };


const inputChange = e => {
    e.persist();
    const newForm = {
    ...formState,[e.target.name]:e.target.type === "checkbox" ? e.target.checked : e.target.value
} 
validateChange(e);
setForm(newForm);
}

    return(
        <form onSubmit={formSubmit}>
            <label htmlfor='name'>
                name
                <input 
                type='text'
                name='name'
                value={formState.name}
                onChange={inputChange}/>
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>
            <label htmlfor='email'>
                email
                <input 
                type='email'
                name='email'
                value={formState.email}
                onChange={inputChange}/>
                {errors.email.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>
            <label htmlfor='password'>
                password
                <input 
                type='password'
                name='password'
                value={formState.password}
                onChange={inputChange}/>
                {errors.password.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>
            <label htmlfor='terms'>
                terms
                <input 
                type='checkbox'
                name='terms'
                value={formState.terms}
                onChange={inputChange}/>
            </label>
            <pre>{JSON.stringify(post, null, 2)}</pre>
      <button disabled={buttonDisabled}>Submit</button>
        </form>
    )   
}

export default Form;
