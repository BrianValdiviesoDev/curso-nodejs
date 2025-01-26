# Curso Fundamentos Node
## Tema 2: Introducción a Express
### Iniciar un proyecto con TypeScript
Primero vamos a crear un proyecto npm
```bash
npm init -y
```
Luego vamos a añadir las dependencias de desarrollo para poder trabajar con TypeScript
```bash
npm i --save-dev typescript @types/node ts-node nodemon
```
Ahora vamos a configurar la compilación de TypeScript
```bash
npx tsc --init
```
Esto nos generará un fichero tsconfig.json en el cual modificaremos las siguientes propiedades:
- __"rootDir"__: path al código fuente que hay que compilar. Normalmente "./src" .
- __"outDir"__: path al código fuente que hay que compilar. Normalmente "./src" .

### Añadir Express al proyecto
Primero añadimos la dependencia de Express
```bash
npm i express
```
Y los tipos
```bash
npm i --save-dev @types/express
```

### Scripts NPM
Vamos a crear tres scripts básicos:
- start:dev : arranca el servicio en watchmode para desarrollo activo.
- start:prod : arranca el servicio desde el proyecto compilado.
- build : compila el proyecto.
```json
"scripts": {
    "start:dev": "nodemon src/index.ts",
    "start:prod": "node dist/index.js",
    "build": "tsc"
}
```