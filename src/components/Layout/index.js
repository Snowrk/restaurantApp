import {useState, useEffect} from 'react'
import Header from '../Header'
import Menu from '../Menu'
import Dishes from '../Dishes'
import './index.css'

const Layout = () => {
  const [cartObj, setCartObj] = useState({})
  const [restaurant, setRestaurant] = useState({})
  const [menuList, setmenuList] = useState([])
  const [dishesList, setDishesList] = useState([])
  let cart = 0
  console.log(cartObj)
  const vals = Object.values(cartObj)
  vals.forEach(item => {
    cart += item
  })
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
      )
      const data = await response.json()
      setRestaurant(data[0])
      setmenuList(data[0].table_menu_list)
      setDishesList(data[0].table_menu_list[0].category_dishes)
    }

    getData()
  }, [])
  if (Object.getOwnPropertyNames(restaurant).length === 0) {
    return <h1>Loading</h1>
  }
  return (
    <div className="layout">
      <Header restaurant={restaurant} cart={cart} />
      <Menu
        menuList={menuList}
        dishesList={dishesList}
        setDishesList={setDishesList}
      />
      <Dishes
        dishesList={dishesList}
        setCartObj={setCartObj}
        cartObj={cartObj}
      />
    </div>
  )
}

export default Layout
