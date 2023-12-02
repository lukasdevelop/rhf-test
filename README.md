# README

Oi, sou o Lucas Amaral e abaixo estara as instrucoes de como iniciar a aplicacao:

> **Pre-requisitos**
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

Substitua o arquivo .env.example para .env e preencha os valores das variaveis de acesso ao seu BUCKET S3 da AWS conforme o arquivo .env.example

```.env
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
```

## O Teste

Abaixo segue as instrucoes do teste:

> **Instrucoes**
>
> Segue o coding challenge:
>
> - 1. Leia sobre o https://redwoodjs.com/ - a framework em NodeJS que a gente usa. Já vem com tudo para o desenvolvimento.
>
> - 2. Você pode usar JS ou TypeScript para esse problema
>
> - 3. Crie uma página em React que faz upload de arquivos via the UI, similar com o Dropbox. Se o arquivo for duplicado, o upload deve ser ignorado como uma no-op. O arquivo pode ser armazenado localmente. A aplicação deve ter API endpoints para lista, delete, get, create, update files. A UI deve mostrar todos os arquivos que o usuário fez o upload.
>
> - 4. Fazer um aplicativo que faz versão no S3. O usuário faz o upload de um filé usando GraphQL é uma versão diferente é criada e armazenada no S3. Toda vez que o arquivo for feito o upload e o diff entre as versões. Numa diferente versão deve aparecer, por exemplo, a primeira versão V1, segunda V2. Se não houver diferença entre conteúdo, não haverá mudança. A resposta aparecerá no payload do response to request.
>
> - 5. Fazer o upload do code em um repositório GitHub publico, com um README.md com as instruções de como executar.
