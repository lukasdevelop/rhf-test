# README

Ola, sou o Lucas Amaral e abaixo estara as instrucoes de como iniciar a aplicacao:

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (=18.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Comece instalando as dependencias do projeto:

```
yarn install
```

Rode as migrations do banco local:

```
yarn rw prisma migrate dev

```

Starter o server em desenvolvimento:

```
yarn redwood dev
```

## Variaveis de ambiente

Substitua o arquivo .env.example para .env e preencha o valor das variaveis de acesso ao seu BUCKET S3 da AWS conforme o arquivo .env.example

```.env
 AWS_ACCESS_KEY_ID=
 AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
```

