export const COLOR = {
    NAV: '#FFA3A3',
    FOOTER: '#EFF0F1',
    TEXT: '#212529',
    HEADING: '#0D0D25',
    LINEAR_PRIMARY:
        'linear-gradient(150deg, rgba(255,194,107,1) 0%, rgba(255,141,142,1) 100%)',
    WHITE: '#FFF',
    PRIMARY: '#EA6A12',
    SECONDARY: '#fff5ee',
    GREY: '#A3ABBD',
};

export const IMAGE = {
    PLACEHOLDER:
        'https://res.cloudinary.com/duuxjqkla/image/upload/v1668441306/review/placeholder-image_l5crky.png',
};

export const PAGINATION = { PAGE_SIZE: 20, ALL: 200 };

export const districts = [
    { id: 490, label: 'Quận Liên Chiểu', value: 'quan-lien-chieu' },
    { id: 491, label: 'Quận Thanh Khê', value: 'quan-thanh-khe' },
    { id: 492, label: 'Quận Hải Châu', value: 'quan-hai-chau' },
    { id: 493, label: 'Quận Sơn Trà', value: 'quan-son-tra' },
    { id: 494, label: 'Quận Ngũ Hành Sơn', value: 'quan-ngu-hanh-son' },
    { id: 495, label: 'Quận Cẩm Lệ', value: 'quan-cam-le' },
    { id: 497, label: 'Hòa Vang', value: 'hoa-vang' },
    //Dont need to add Hoang Sa District because there aren't any restaurants there
];

export const restaurantTypes = [
    'CAFÉ/DESSERT',
    'QUÁN ĂN',
    'ĂN VẶT/VỈA HÈ',
    'SHOP ONLINE',
    'QUÁN ĂN, GIAO CƠM VĂN PHÒNG',
    'ĂN VẶT/VỈA HÈ, GIAO CƠM VĂN PHÒNG',
    'TIỆM BÁNH',
    'QUÁN ĂN, ĂN VẶT/VỈA HÈ',
    'NHÀ HÀNG',
    'ĂN VẶT/VỈA HÈ, SHOP ONLINE',
    'NHÀ HÀNG, TIỆM BÁNH',
    'SHOP ONLINE, GIAO CƠM VĂN PHÒNG',
];

export enum TAB {
    VIEW = 'view',
    CREATE = 'create',
}
