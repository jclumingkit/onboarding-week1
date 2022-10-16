export type FoodType = {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
};

const foodList: FoodType[] = [
  {
    id: 0,
    name: "Chicken Adobo",
    description:
      "Chicken Adobo is a type of Filipino chicken stew. Chicken pieces are marinated in soy sauce and spices, pan-fried, and stewed until tender. The dish gained popularity because of its delicious taste and ease in preparation.",
    image: "/assets/images/Chicken-Adobo.jpg",
    rating: 4,
  },
  {
    id: 1,
    name: "Halo-Halo",
    description:
      "Halo-halo is a Filipino-style shaved ice made with sweetened beans, fruits, and jellies and topped with milk, Leche flan, purple yam jam, and ice cream. It's a cold and refreshing treat you'll want year-round!",
    image: "/assets/images/Halo-Halo.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Pork Belly Lechon Roll",
    description:
      "Pork Belly Lechon Roll is slow-roasted in the oven for super crispy skin and super moist meat. There is no need to order a whole pig; this Filipino-style porchetta is easy to make and sure to be the star of any party!",
    image: "/assets/images/Pork-Belly.jpg",
    rating: 3,
  },
  {
    id: 3,
    name: "Lechon",
    description:
      "A traditional pork dish from Spain, lechón is a suckling pig that's roasted.",
    image: "/assets/images/Lechon.jpg",
    rating: 3,
  },
  {
    id: 4,
    name: "Mango Float",
    description:
      "This Filipino icebox dessert consists of layers of graham crackers, sweetened whipped cream, and ripe mango.",
    image: "/assets/images/Mango-Float.jpg",
    rating: 4,
  },
  {
    id: 5,
    name: "Calamari",
    description:
      "Crispy fried Calamari is one of the most classic appetizers consisting of lightly battered rings of squid that's quickly fried and served with a warm marinara sauce. It's very easy to make homemade calamari for as a nice dinner party appetizer.",
    image: "/assets/images/Calamari.jpg",
    rating: 5,
  },
];

export default foodList;
