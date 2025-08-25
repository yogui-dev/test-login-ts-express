import 'reflect-metadata';
import app from './app';
import env from './config/env';
import AppDataSource from './config/data-source';

async function bootstrap() {
  try {
    await AppDataSource.initialize();
    app.listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

bootstrap();
