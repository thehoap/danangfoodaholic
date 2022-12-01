interface IRestaurantFilter {
    districtId: number | undefined;
    type: string | undefined;
    searchTerm: string | undefined;
}

interface IRestaurant {
    _id: string;
    link: string;
    image: string;
    name: string;
    type: string;
    address: string;
    // id: string;
    districtId: number;
    wardId: number;
    menuId: string;
    time: string;
    priceRange: string;
    coordinates: ICoordinates;
}

interface IMenu {
    currentPrice: string;
    id: string;
    image: string;
    name: string;
    originalPrice: string;
    _id: string;
}

interface IRestaurantDetail extends IRestaurant {
    menu: IMenu[];
    ratings: {
        space: number[];
        food: number[];
        hygiene: number[];
        service: number[];
        price: number[];
        average: number[];
    };
}
