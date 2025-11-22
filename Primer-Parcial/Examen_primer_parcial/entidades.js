const entidades = {
    categoria: [
        { id: 0, nombre: "Todas" },
        { id: 1, nombre: "Ciencia" },
        { id: 2, nombre: "Matemáticas" },
        { id: 3, nombre: "Geografía" },
        { id: 4, nombre: "Literatura" }
    ],
    flashcards: [
        {
            id: "A1",
            img: "",
            pregunta: "¿Qué es una célula procariota?",
            respuesta: "Célula que no tiene núcleo definido",
            categoriaId: [0,1],
            fechaCreacion: "2024-05-24",
            fechaActualizacion: ""
        },
        {
            id: "A2",
            img: "",
            pregunta: "Potencia de un número elevado a 2",
            respuesta: "Cuadrado",
            categoriaId: [0,2],
            fechaCreacion: "2024-09-08",
            fechaActualizacion: ""
        },
        {
            id: "A3",
            img: "",
            pregunta: "País que tiene como capital a Montevideo",
            respuesta: "Uruguay",
            categoriaId: [0,3],
            fechaCreacion: "2025-05-13",
            fechaActualizacion: ""
        },
        {
            id: "A4",
            img: "",
            pregunta: "Autor de 'Cien años de soledad'",
            respuesta: "Gabriel García Márquez",
            categoriaId: [0,4],
            fechaCreacion: "2025-11-18",
            fechaActualizacion: ""
        }
        ],
    sesionEstudio : [
        {id: 1, fecha: "2024-06-01", categoriaID: 0, cuentaReviews: 0}
    ]
};


export default entidades;