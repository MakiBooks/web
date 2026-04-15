export interface BookLocation {
  id: number;
  street: string;
  lat: number;
  lng: number;
  imageUrl: string;
  hasBook: boolean;
  bookTitle?: string;
  bookCode?: string;
  bookSummary?: string;
}

// Coordenadas reales del barrio de Sant Andreu, Barcelona
// Centrado en: 41.4355, 2.1895 (aproximadamente Gran de Sant Andreu)
export const streetLocations: BookLocation[] = [
  {
    id: 1,
    street: "Gran de Sant Andreu, 123",
    lat: 41.4355,
    lng: 2.1895,
    imageUrl: "https://images.unsplash.com/photo-1652946337021-2ba5ca96c36c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBzdHJlZXQlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzczODQwOTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasBook: true,
    bookTitle: "Cien años de soledad",
    bookCode: "BCN001",
    bookSummary: "Obra maestra de Gabriel García Márquez que narra la historia de la familia Buendía en el pueblo ficticio de Macondo."
  },
  {
    id: 2,
    street: "Plaça Orfila, 5",
    lat: 41.4365,
    lng: 2.1875,
    imageUrl: "https://images.unsplash.com/photo-1656436753612-09ca9916a1be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBuYXJyb3clMjBzdHJlZXR8ZW58MXx8fHwxNzczOTE2MzYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasBook: false
  },
  {
    id: 3,
    street: "Carrer de Garcilaso, 67",
    lat: 41.4342,
    lng: 2.1908,
    imageUrl: "https://images.unsplash.com/photo-1701210730922-3789aaf9afce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjB1cmJhbiUyMHN0cmVldHxlbnwxfHx8fDE3NzM5MTYzNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasBook: true,
    bookTitle: "La sombra del viento",
    bookCode: "BCN002",
    bookSummary: "Novela de Carlos Ruiz Zafón ambientada en la Barcelona de posguerra, que nos sumerge en el misterio del Cementerio de los Libros Olvidados."
  },
  {
    id: 4,
    street: "Carrer de Potosí, 45",
    lat: 41.4348,
    lng: 2.1918,
    imageUrl: "https://images.unsplash.com/photo-1761992760574-371b7158b886?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBuZWlnaGJvcmhvb2QlMjBzdHJlZXR8ZW58MXx8fHwxNzczOTE2MzYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasBook: false
  },
  {
    id: 5,
    street: "Passeig de Santa Coloma, 89",
    lat: 41.4370,
    lng: 2.1900,
    imageUrl: "https://images.unsplash.com/photo-1760715700239-070a60fa405e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjByZXNpZGVudGlhbCUyMHN0cmVldHxlbnwxfHx8fDE3NzM5MTYzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasBook: true,
    bookTitle: "Don Quijote de la Mancha",
    bookCode: "BCN003",
    bookSummary: "Clásico de Miguel de Cervantes sobre las aventuras del ingenioso hidalgo y su fiel escudero Sancho Panza."
  },
  {
    id: 6,
    street: "Carrer de Segre, 34",
    lat: 41.4338,
    lng: 2.1882,
    imageUrl: "https://images.unsplash.com/photo-1721140822156-fd0310b8b91d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBsb2NhbCUyMHN0cmVldHxlbnwxfHx8fDE3NzM5MTYzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasBook: false
  }
];
