import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

// import { JwtStrategy } from './jwt.strategy';
// import { UserService } from 'src/user/user.service';

// @Module({
//   imports: [
//     UserService,
//     PassportModule.register({ defaultStrategy: 'jwt', session: false }),
//     JwtModule.registerAsync({
//       useFactory: (config: ConfigService) => ({
//         secret: config.get<string>('JWT_SECRET_KEY'),
//       }),
//       inject: [ConfigService],
//     }),
//   ],
//   providers: [JwtStrategy],
// })
// export class AuthModule {}

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    // jwtService 를 사용하기 위한 import...설정..
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [JwtStrategy, UserService],
  exports: [JwtStrategy, PassportModule, TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
