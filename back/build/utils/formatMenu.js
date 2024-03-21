"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMenuRestaurant = exports.formatMenu = void 0;
/**
 * El acumulador como any porque se esta creando un objeto ['id': {}]
 * Corregir y dejar el bueno
 */
const formatMenu = (menuDB) => {
    const formatData = menuDB.reduce((acc, item) => {
        if (acc[item.menu_id] === undefined) {
            acc[item.menu_id] = {
                id: item.menu_id,
                name: item.menu_name,
                description: item.menu_description,
                dishes: []
            };
        }
        acc[item.menu_id].dishes.push({
            name: item.dish_name,
            price: item.dish_price
        });
        return acc;
    }, {});
    return Object.values(formatData);
};
exports.formatMenu = formatMenu;
const formatMenuRestaurant = (menuDB) => {
    const transformedData = menuDB.reduce((acc, item) => {
        const existingRestaurantIndex = acc.findIndex((rest) => rest.id === item.restaurant_id);
        if (existingRestaurantIndex === -1) {
            acc.push({
                id: item.restaurant_id,
                name: item.restaurant_name,
                menus: [{
                        id: item.menu_id,
                        name: item.menu_name,
                        description: item.menu_description,
                        dishes: [{
                                name: item.dish_name,
                                price: item.dish_price
                            }]
                    }]
            });
        }
        else {
            const existingMenuIndex = acc[existingRestaurantIndex].menus.findIndex((menu) => menu.id === item.menu_id);
            if (existingMenuIndex === -1) {
                acc[existingRestaurantIndex].menus.push({
                    id: item.menu_id,
                    name: item.menu_name,
                    description: item.menu_description,
                    dishes: [{
                            name: item.dish_name,
                            price: item.dish_price
                        }]
                });
            }
            else {
                acc[existingRestaurantIndex].menus[existingMenuIndex].dishes.push({
                    name: item.dish_name,
                    price: item.dish_price
                });
            }
        }
        return acc;
    }, []);
    return transformedData;
};
exports.formatMenuRestaurant = formatMenuRestaurant;
