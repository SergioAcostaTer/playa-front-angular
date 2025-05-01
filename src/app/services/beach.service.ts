// services/beach.service.ts
import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Beach } from '../models/beach';

@Injectable({
  providedIn: 'root',
})
export class BeachService {
  private firestore = inject(Firestore);
  private beachCollection: CollectionReference<DocumentData> = collection(
    this.firestore,
    'beaches'
  );

  async createBeach(beach: Beach): Promise<void> {
    const beachDoc = doc(this.beachCollection, beach.id);
    await setDoc(beachDoc, beach);
  }

  async createBeaches(beaches: Beach[]): Promise<void[]> {
    const promises = beaches.map((beach) => {
      const beachDoc = doc(this.beachCollection, beach.id);
      return setDoc(beachDoc, beach);
    });
    return Promise.all(promises);
  }

  getAllBeaches(): Observable<Beach[]> {
    return collectionData(this.beachCollection, {
      idField: 'id',
    }) as Observable<Beach[]>;
  }

  getBeachById(id: string): Observable<Beach> {
    const beachDoc = doc(this.firestore, `beaches/${id}`);
    return docData(beachDoc, { idField: 'id' }) as Observable<Beach>;
  }

  async updateBeach(id: string, updatedData: Partial<Beach>): Promise<void> {
    const beachDoc = doc(this.firestore, `beaches/${id}`);
    await updateDoc(beachDoc, updatedData);
  }

  async deleteBeach(id: string): Promise<void> {
    const beachDoc = doc(this.firestore, `beaches/${id}`);
    await deleteDoc(beachDoc);
  }
}
