import Card from "../card/card";
import { useRecipes } from "../../hooks/useRecipes";
import "./dessert-section.css"
import ShoppingCartProvider from "../../context/cart-provider";

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
        <h1 id="dessert-section" className="text-1-bold">Desserts</h1>
        <ShoppingCartProvider>
            <ul role='list' className="list">
                {desserts?.map((dessert, index) => {
                return (
                        <Card key={index} image={dessert.image} dessert={dessert} index={index} />
                )
                })}
            </ul>
        </ShoppingCartProvider>
    </section>
  )
}


export default DessertsSection