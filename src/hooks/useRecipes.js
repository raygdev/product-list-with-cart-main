import { useState, useEffect } from "react";

const useRecipes = () => {
    const [desserts, setDesserts] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    function errorToSet(e) {
        console.log(e)
        setError(e.toString())
    }
  
    useEffect(() => {
      setLoading(true)
      fetch("/data.json")
        .then(res => res.json())
        .then(setDesserts)
        .catch(errorToSet)
        .finally(() => setLoading(false))
    }, [])

    return { desserts, loading, error }
}

export { useRecipes }