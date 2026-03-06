export interface Product {
    id: string;
    name: string;
    shortName: string;
    badge: string;
    price: number;
    originalPrice: number;
    discount: string;
    weight: string;
    rating: number;
    imagePath: string;
    imageAlt: string;
    description: string;
    stripePriceId: {
        production: string;
        development: string;
    };
}

export const productsData: Record<string, Product> = {
    "cobra-balm": {
        id: "cobra-balm",
        name: "Banna Czarny Balsam z Jadem Kobry",
        shortName: "Kobra",
        badge: "🐍 Oryginalny tajski balsam",
        price: 33.29,
        originalPrice: 35.80,
        discount: "-7%",
        weight: "50g",
        rating: 4.9,
        imagePath: "/assets/images/banna-tajskie-balsamy/cobra-balm.jpeg",
        imageAlt: "Banna Cobra Thai Balm Black",
        description: "Intensywne rozgrzewanie i regeneracja mięśni. Tajska formuła wzbogacona jadem kobry dla głębokiego działania przeciwbólowego i regenerującego.",
        stripePriceId: {
            production: "price_1T7uyeHSVM2lsj0JudJmBLi9",
            development: "price_1T7j5RFxNbQ4Qwoi1UzW9rDJ"
        }
    },
    "scorpion-balm": {
        id: "scorpion-balm",
        name: "Banna Czarny Balsam z Jadem Skorpiona",
        shortName: "Skorpion",
        badge: "🦂 Oryginalny tajski balsam",
        price: 33.29,
        originalPrice: 35.80,
        discount: "-7%",
        weight: "50g",
        rating: 4.8,
        imagePath: "/assets/images/banna-tajskie-balsamy/scorpion-balm.avif",
        imageAlt: "Banna Scorpion Thai Balm Black",
        description: "Natychmiastowa ulga w bólach mięśni i stawów. Ponad 100 tajskich ziół leczniczych + ekstrakt z jadu skorpiona dla maksymalnej skuteczności.",
        stripePriceId: {
            production: "price_1T7v3SHSVM2lsj0JKYIffoTR",
            development: "price_1T4by9FxNbQ4QwoifKmO4gxC"
        }
    },
    "tiger-balm": {
        id: "tiger-balm",
        name: "Banna Tygrysi Balsam Rozgrzewający",
        shortName: "Tygrys",
        badge: "🐯 Oryginalny tajski balsam",
        price: 33.29,
        originalPrice: 35.80,
        discount: "-7%",
        weight: "50g",
        rating: 4.7,
        imagePath: "/assets/images/banna-tajskie-balsamy/tiger-balm.jpeg",
        imageAlt: "Banna Tiger Thai Balm",
        description: "Klasyczny tygrysi balsam o silnym działaniu rozgrzewającym. Idealny do masażu przy bólach pleców, karku i stawów.",
        stripePriceId: {
            production: "price_1T7v2VHSVM2lsj0J0FR6CAnp",
            development: "price_1T7j6mFxNbQ4QwoiHft4shOS"
        }
    }
};
