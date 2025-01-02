# Paraguay Sin Gluten

Una aplicación web para encontrar y explorar lugares sin gluten en Paraguay 🇵🇾. Desarrollada con Next.js, TypeScript, y Tailwind CSS.

## Características

- 🗺️ Mapa interactivo con ubicaciones sin gluten
- 💬 Celia - Asistente virtual IA para recomendaciones
- 🌙 Modo oscuro/claro
- 📱 Diseño responsivo
- 🔍 Búsqueda de ubicaciones
- 📍 Lista detallada de lugares
- 🌐 Integración con Google Maps

## Tecnologías Utilizadas

- [Next.js 14](https://nextjs.org/) - Framework de React
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS
- [Google Maps API](https://developers.google.com/maps) - Integración de mapas
- [Vercel AI SDK](https://sdk.vercel.ai/docs) - Integración de IA
- [OpenAI API](https://openai.com/api/) - Motor de IA para el asistente virtual
- [Framer Motion](https://www.framer.com/motion/) - Animaciones
- [next-themes](https://github.com/pacocoursey/next-themes) - Manejo de temas

## Inicio Rápido

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/paraguay-sin-gluten.git
```

2. Instala las dependencias:

```bash
npm install
```

3. Copia el archivo de ejemplo de variables de entorno:

```bash
cp .env.example .env
```

4. Configura tus variables de entorno:

- Obtén una [API key de Google Maps](https://developers.google.com/maps/documentation/javascript/get-api-key)
- Obtén una [API key de OpenAI](https://platform.openai.com/api-keys)
- Reemplaza las claves correspondientes en el archivo `.env`:
  - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
  - `OPENAI_API_KEY`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5. Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Características del Asistente Virtual

Celia es nuestra asistente virtual impulsada por IA que puede:

- 💬 Responder preguntas sobre alimentación sin gluten
- 🍽️ Recomendar restaurantes y lugares seguros
- ℹ️ Proporcionar información sobre la enfermedad celíaca
- 🛍️ Sugerir productos sin gluten disponibles
- 🚨 Ofrecer consejos sobre contaminación cruzada

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# Locations Table Schema

| Column Name      | Type         | Constraints |
|-----------------|--------------|-------------|
| id              | int8         | Primary Key |
| created_at      | timestamptz  |             |
| ciudad          | text         |             |
| nombre_local    | text         |             |
| categoria       | text         |             |
| telefono        | text         |             |
| celular         | text         |             |
| redes_sociales  | json         |             |
| es_gluten_free  | bool         |             |
| servicios       | json         |             |
| coordenadas     | text         |             |
| whatsapp        | text         |             |

## Column Descriptions

- `id`: Unique identifier for each location
- `created_at`: Timestamp of when the record was created
- `ciudad`: City where the location is situated
- `nombre_local`: Name of the establishment
- `categoria`: Category/type of establishment
- `telefono`: Landline phone number
- `celular`: Mobile phone number
- `redes_sociales`: JSON object containing social media links
- `es_gluten_free`: Boolean indicating if the establishment is fully gluten-free
- `servicios`: JSON object containing available services
- `coordenadas`: Geographic coordinates of the location
- `whatsapp`: WhatsApp contact number



## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
