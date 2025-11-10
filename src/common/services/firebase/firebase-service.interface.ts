export const FIREBASE_SERVICE = Symbol('FIREBASE_SERVICE');

export interface FirebaseUser {
  uid: string;
  email?: string;
  name?: string;
  picture?: string;
  emailVerified: boolean;
  provider: string;
}

export interface IFirebaseService {
  /**
   * Verifica e decodifica um Firebase ID token
   * @param idToken - Token ID do Firebase Auth
   * @returns Promise com os dados do usuário decodificados
   */
  verifyIdToken(idToken: string): Promise<FirebaseUser>;

  /**
   * Obtém informações do usuário pelo UID
   * @param uid - UID do usuário no Firebase
   * @returns Promise com os dados do usuário
   */
  getUserByUid(uid: string): Promise<FirebaseUser>;
}
