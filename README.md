# Sistema de Telemedicina API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descripción

API REST desarrollada con NestJS para un sistema de telemedicina que permite la gestión de consultas médicas virtuales, historiales clínicos, y comunicación entre doctores y pacientes.

## Arquitectura del Proyecto

El proyecto está estructurado en módulos que manejan diferentes aspectos del sistema:

### Módulos Principales

- **Auth**: Gestión de autenticación y autorización
- **Users**: Administración de usuarios del sistema
- **Doctors**: Gestión de perfiles médicos y especialidades
- **Patients**: Administración de pacientes y sus datos
- **Appointments**: Sistema de citas médicas virtuales
- **Medical Records**: Historiales clínicos electrónicos
- **Prescriptions**: Gestión de recetas médicas
- **Chat Messages**: Sistema de mensajería para comunicación médico-paciente
- **Payments**: Procesamiento de pagos y facturación
- **Plans**: Gestión de planes y suscripciones
- **Reports**: Generación de reportes y estadísticas
- **Access Logs**: Registro de accesos al sistema
- **Audit Logs**: Registro de acciones para auditoría

### Características Técnicas

- Framework: NestJS
- Lenguaje: TypeScript
- Base de datos: PostgreSQL (configurada con TypeORM)
- Autenticación: JWT
- Documentación API: Swagger/OpenAPI

## Configuración del Proyecto

```bash
# Instalación de dependencias
$ npm install

# Variables de entorno
Crear un archivo .env basado en .env.example con las configuraciones necesarias
```

## Ejecución del Proyecto

```bash
# Desarrollo
$ npm run start

# Modo observador (desarrollo)
$ npm run start:dev

# Producción
$ npm run start:prod
```

## Pruebas

```bash
# Pruebas unitarias
$ npm run test

# Pruebas e2e
$ npm run test:e2e

# Cobertura de pruebas
$ npm run test:cov
```

## Estructura de Directorios

```
src/
├── auth/           # Autenticación y autorización
├── users/          # Gestión de usuarios
├── doctors/        # Módulo de doctores
├── patients/       # Módulo de pacientes
├── appointments/   # Gestión de citas
├── medical-records/# Historiales clínicos
├── prescriptions/  # Recetas médicas
├── chat-messages/  # Sistema de mensajería
├── payments/       # Procesamiento de pagos
├── plans/          # Gestión de planes
├── reports/        # Generación de reportes
├── access-logs/    # Registro de accesos
├── audit-logs/     # Registro de auditoría
├── common/         # Utilidades y componentes comunes
└── database/       # Configuración de base de datos
```

## Documentación API

La documentación de la API está disponible en `/api` cuando el servidor está en ejecución.

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
