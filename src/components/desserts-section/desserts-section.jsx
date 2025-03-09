import Card from "../card/card";
import { useRecipes } from "../../hooks/useRecipes";
import "./dessert-section.css"

const DessertsSection = () => {
  const { desserts, loading, error } = useRecipes()

  if(loading) {
    return <h2>Loading...</h2>
  }

  if(error) {
    return <div>{error}</div>
  }
  return (
    <section aria-labelledby="dessert-section">
        <h1 id="dessert-section">Desserts</h1>
        <ul role='list'>
        {desserts?.map(dessert => {
          return (
            <Card image={dessert.image} dessert={dessert} />
          )
        })}
      </ul>
    </section>
  )
}


export default DessertsSection