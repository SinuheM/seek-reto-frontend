import { useState } from 'react'

const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleResetToValues = (values) => {
    setValues(values)
  }

  return { values, handleChange, setValues, handleResetToValues }
}

export default useForm