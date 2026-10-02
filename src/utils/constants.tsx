import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";

import type { FileRouteTypes } from "../routeTree.gen";

type NavLink = {
  id: number;
  text: string;
  /**
   * As rotas reais, vindas da árvore gerada. `LinkProps["to"]` não serve
   * aqui: ele aceita string, e os links do menu ficariam de fora da checagem.
   */
  url: FileRouteTypes["to"];
};

export const links: NavLink[] = [
  {
    id: 1,
    text: "home",
    url: "/",
  },
  {
    id: 2,
    text: "sobre",
    url: "/about",
  },
  {
    id: 3,
    text: "produtos",
    url: "/products",
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: "Missão",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: "Valores",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: "História",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
];
