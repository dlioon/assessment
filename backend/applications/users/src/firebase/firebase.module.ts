import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as firebase from 'firebase-admin';

import { firebaseConfig } from './config/firebase.config';
import { FirebaseService } from './services/firebase.service';
import { FIREBASE, FIREBASE_CONFIG } from './constants/firebase.constants';

@Global()
@Module({
  imports: [ConfigModule.forFeature(firebaseConfig)],
  providers: [
    {
      provide: FIREBASE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        firebase.initializeApp({
          credential: firebase.credential.cert(
            configService.get(FIREBASE_CONFIG),
          ),
        }),
    },
    FirebaseService,
  ],
  exports: [FirebaseService],
})
export class FirebaseModule {}
