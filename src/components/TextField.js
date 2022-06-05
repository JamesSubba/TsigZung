import React from 'react'
import { ErrorMessage, useField } from 'formik'

const TextField = ({label,reff, ...props}) => {
    const [field] = useField(props);
    return (
    <>
        <input 
            ref={reff}
            className="form-field"
            {...field} {...props}
            autoComplete="off"
            />
        <ErrorMessage className='error' component="div" name={field.name}/>
    </>
  )
}
export default TextField