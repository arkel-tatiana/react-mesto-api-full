import React, { useState } from 'react';
export const useInputChange = () => {
    const [values, setValues] = useState({})
    const handleChange = (event) => { 
        const { name, value } = event.target
          setValues((prev) => ({ 
          ...prev, 
          [name]: value
        })) 
    };
   return [values, setValues, handleChange];
}   
export default useInputChange