import bbs from '../../assets/products/bbs.png'
import oz from '../../assets/products/oz.png'
import porsche from '../../assets/products/porsche.png'
import brembo from '../../assets/products/brembo_aqua.png'
import subaru from '../../assets/products/uwu.png'
import comando from '../../assets/products/comando.png'
import intercooler from '../../assets/products/intercooler_red.jpg'
import capacete from '../../assets/products/capacete.png'
import specialized from '../../assets/products/specialized.png'
import demo from '../../assets/products/senese_blue.png'
import carbono from '../../assets/products/quadro_cabono.png'

import type { SingleProduct } from '../../types/product'

/**
 * Catálogo local, montado sobre as fotos reais em `src/assets/products`.
 *
 * Serve de origem de dados enquanto a Airtable não está ligada — ver
 * `./index.ts`. Preços em centavos, como espera `utils/helpers.formatPrice`.
 */
export const CATALOG: SingleProduct[] = [
  {
    id: 'roda-bbs',
    name: 'Roda BBS',
    price: 185000,
    images: [{ url: bbs }],
    colors: ['#c0c0c0', '#2f2f2f', '#b8860b'],
    company: 'bbs',
    category: 'rodas',
    shipping: true,
    featured: true,
    stock: 4,
    reviews: 32,
    stars: 4.5,
    description:
      'Jogo de rodas BBS restaurado e repintado. Decapagem completa, correção de imperfeições do aro e acabamento em verniz de alta resistência.',
  },
  {
    id: 'roda-oz',
    name: 'Roda OZ Racing',
    price: 210000,
    images: [{ url: oz }],
    colors: ['#2f2f2f', '#c0c0c0', '#ffffff'],
    company: 'oz',
    category: 'rodas',
    shipping: true,
    featured: true,
    stock: 4,
    reviews: 18,
    stars: 4.5,
    description:
      'Rodas OZ Racing preparadas para pista. Pintura em camada única com proteção reforçada contra calor de freio e detritos.',
  },
  {
    id: 'roda-porsche',
    name: 'Roda Porsche',
    price: 265000,
    images: [{ url: porsche }],
    colors: ['#c0c0c0', '#2f2f2f'],
    company: 'porsche',
    category: 'rodas',
    shipping: true,
    featured: false,
    stock: 4,
    reviews: 11,
    stars: 5,
    description:
      'Restauração de rodas Porsche respeitando o acabamento original de fábrica, incluindo a recomposição dos detalhes do centro.',
  },
  {
    id: 'pinca-brembo',
    name: 'Pinça Brembo',
    price: 98000,
    images: [{ url: brembo }],
    colors: ['#30d5c8', '#d62828', '#ffd700'],
    company: 'brembo',
    category: 'freios',
    shipping: true,
    featured: true,
    stock: 8,
    reviews: 41,
    stars: 5,
    description:
      'Pinças Brembo pintadas com tinta refratária e logotipo reaplicado à mão. Suporta a temperatura de uso contínuo sem amarelar.',
  },
  {
    id: 'pinca-subaru',
    name: 'Pinça Subaru',
    price: 86000,
    images: [{ url: subaru }],
    colors: ['#30d5c8', '#0b3d91', '#d62828'],
    company: 'subaru',
    category: 'freios',
    shipping: true,
    featured: false,
    stock: 4,
    reviews: 27,
    stars: 4.5,
    description:
      'Jogo de quatro pinças em turquesa, com a inscrição スバル e os detalhes pintados à mão sobre a tinta curada.',
  },
  {
    id: 'tampa-comando-honda',
    name: 'Tampa de Comando Honda',
    price: 72000,
    images: [{ url: comando }],
    colors: ['#d62828', '#2f2f2f', '#c0c0c0'],
    company: 'honda',
    category: 'motor',
    shipping: false,
    featured: true,
    stock: 3,
    reviews: 22,
    stars: 5,
    description:
      'Tampa de comando de válvulas em vermelho, com as letras do relevo lixadas para voltar ao alumínio e contrastar com a pintura.',
  },
  {
    id: 'intercooler',
    name: 'Intercooler',
    price: 124000,
    images: [{ url: intercooler }],
    colors: ['#d62828', '#2f2f2f', '#c0c0c0'],
    company: 'mark',
    category: 'motor',
    shipping: true,
    featured: false,
    stock: 2,
    reviews: 9,
    stars: 4,
    description:
      'Intercooler pintado sem obstruir as colmeias, preservando a troca térmica e a vazão originais do conjunto.',
  },
  {
    id: 'capacete',
    name: 'Capacete Personalizado',
    price: 145000,
    images: [{ url: capacete }],
    colors: ['#2f2f2f', '#ffffff', '#d62828'],
    company: 'mark',
    category: 'capacetes',
    shipping: true,
    featured: true,
    stock: 5,
    reviews: 54,
    stars: 5,
    description:
      'Pintura personalizada de capacete, com arte desenvolvida junto do cliente e verniz automotivo de acabamento.',
  },
  {
    id: 'quadro-specialized',
    name: 'Quadro Specialized',
    price: 198000,
    images: [{ url: specialized }],
    colors: ['#0b3d91', '#2f2f2f', '#ffffff'],
    company: 'specialized',
    category: 'bikes',
    shipping: true,
    featured: false,
    stock: 2,
    reviews: 16,
    stars: 4.5,
    description:
      'Quadro de bicicleta repintado com decalques recortados em máscara, sem adesivo por cima da tinta.',
  },
  {
    id: 'quadro-demo-azul',
    name: 'Quadro Specialized Demo',
    price: 232000,
    images: [{ url: demo }],
    colors: ['#0b3d91', '#2f2f2f'],
    company: 'specialized',
    category: 'bikes',
    shipping: true,
    featured: true,
    stock: 1,
    reviews: 8,
    stars: 5,
    description:
      'Quadro Demo FSR em azul perolizado, com a tipografia da marca em verde claro aplicada sobre a base antes do verniz.',
  },
  {
    id: 'quadro-carbono',
    name: 'Preparação de Quadro em Carbono',
    price: 89000,
    images: [{ url: carbono }],
    colors: ['#2f2f2f', '#c0c0c0'],
    company: 'specialized',
    category: 'bikes',
    shipping: false,
    featured: false,
    stock: 6,
    reviews: 5,
    stars: 4,
    description:
      'Remoção da pintura antiga de quadros em fibra de carbono sem agredir a trama — etapa anterior a qualquer repintura.',
  },
]
