import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { TransactionsModule } from './transactions/transactions.module';
<<<<<<< HEAD
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
=======
import { AuthMiddleware } from './auth/auth.middleware';
>>>>>>> 80eb1ace50e8f84c878ea8484ab5a1f853f94c07

@Module({
  imports: [PrismaModule, SharedModule, CoreModule, TransactionsModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
