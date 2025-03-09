# Curso: Fundamentos de NodeJS
## Tema 10: Eslint y Documentación

Este tema explica la parte de documentación y estandarización de proyectos.

## Requisitios
Antes de comenzar, asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión recomendada: 20)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- Un editor de código, preferiblemente [Visual Studio Code](https://code.visualstudio.com/)

## Instalación
Pra instalar la paquetería vamos a ejecutar
```sh
npm i
```

## Uso
Para utilizar nuestro proyecto primero necesitamos hacer un set de variables de entorno
- PORT: puerto en el que se va a levantar Express

### Scripts
Para levantar el proyecto en modo desarrollo
```sh
npm run start:dev
```

Para levantar el proyecto en modo producción
```sh
npm run start:prod
```

Para compilar el proyecto
```sh
npm run build
```

Para correr los tests
```sh
npm run test
```

## 3. Estructura del Proyecto
Recomendada:
```
curso-nodejs/
|─ X - nombre_tema 
│-── src/
│   ├── index.ts
│── tsconfig.json
│ .gitignore
│ package.json
│ README.md
```

