import restaurantData from './data.json'

const getAll = async (): Promise<any> => {
  const menus = []

  for (const res of restaurantData) {
    menus.push({
      name: res.name
    })
  }

  return menus
}

export default {
  getAll
}
