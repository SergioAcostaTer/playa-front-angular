// services/beach.service.ts
import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  setDoc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  DocumentData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Beach } from '../models/beach';

@Injectable({
  providedIn: 'root',
})
export class BeachService {
  private firestore = inject(Firestore);
  private beachCollection: CollectionReference<DocumentData> = collection(this.firestore, 'beaches');

  // 🟢 Create
  async createBeach(beach: Beach): Promise<void> {
    const beachDoc = doc(this.beachCollection, beach.id);
    await setDoc(beachDoc, beach);
  }

  // 🔵 Read all
  getAllBeaches(): Observable<Beach[]> {
    return collectionData(this.beachCollection, { idField: 'id' }) as Observable<Beach[]>;
  }

  // 🔵 Read one
  getBeachById(id: string): Observable<Beach> {
    const beachDoc = doc(this.firestore, `beaches/${id}`);
    return docData(beachDoc, { idField: 'id' }) as Observable<Beach>;
  }

  // 🟡 Update
  async updateBeach(id: string, updatedData: Partial<Beach>): Promise<void> {
    const beachDoc = doc(this.firestore, `beaches/${id}`);
    await updateDoc(beachDoc, updatedData);
  }

  // 🔴 Delete
  async deleteBeach(id: string): Promise<void> {
    const beachDoc = doc(this.firestore, `beaches/${id}`);
    await deleteDoc(beachDoc);
  }
}
