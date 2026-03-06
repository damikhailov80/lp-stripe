export interface Product {
    id: string;
    name: string;
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
    "scorpion-balm": {
        id: "scorpion-balm",
        name: "Czarny Balsam z Jadem Skorpiona",
        badge: "🦂 Oryginalny tajski balsam",
        price: 33.91,
        originalPrice: 55,
        discount: "-38%",
        weight: "50g",
        rating: 4.8,
        imagePath: "/assets/images/warming-ointments/scorpion-balm.avif",
        imageAlt: "Banna Scorpion Thai Balm Black",
        description: "Natychmiastowa ulga w bólach mięśni i stawów. Ponad 100 tajskich ziół leczniczych + ekstrakt z jadu skorpiona dla maksymalnej skuteczności.",
        stripePriceId: {
            production: "price_1T4eesHSVM2lsj0JF3QX4aKI",
            development: "price_1T4by9FxNbQ4QwoifKmO4gxC"
        }
    },
    "cobra-balm": {
        id: "cobra-balm",
        name: "Czarny Balsam z Jadem Kobry",
        badge: "🐍 Oryginalny tajski balsam",
        price: 34.99,
        originalPrice: 56,
        discount: "-38%",
        weight: "50g",
        rating: 4.9,
        imagePath: "/assets/images/warming-ointments/cobra-balm.jpeg",
        imageAlt: "Banna Cobra Thai Balm Black",
        description: "Intensywne rozgrzewanie i regeneracja mięśni. Tajska formuła wzbogacona jadem kobry dla głębokiego działania przeciwbólowego i regenerującego.",
        stripePriceId: {
            production: "PLACEHOLDER_PRODUCTION_PRICE_ID",
            development: "price_1T7j5RFxNbQ4Qwoi1UzW9rDJ"
        }
    },
    "tiger-balm": {
        id: "tiger-balm",
        name: "Tygrysi Balsam Rozgrzewający",
        badge: "🐯 Oryginalny tajski balsam",
        price: 32.99,
        originalPrice: 53,
        discount: "-38%",
        weight: "50g",
        rating: 4.7,
        imagePath: "/assets/images/warming-ointments/tiger-balm.jpeg",
        imageAlt: "Banna Tiger Thai Balm",
        description: "Klasyczny tygrysi balsam o silnym działaniu rozgrzewającym. Idealny do masażu przy bólach pleców, karku i stawów.",
        stripePriceId: {
            production: "PLACEHOLDER_PRODUCTION_PRICE_ID",
            development: "price_1T7j6mFxNbQ4QwoiHft4shOS"
        }
    }
};
