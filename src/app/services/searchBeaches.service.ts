import { Injectable, inject } from '@angular/core';
import {
  collection,
  CollectionReference,
  DocumentData,
  Firestore,
  getDocs,
  query as firestoreQuery,
} from '@angular/fire/firestore';
import { Beach } from '../models/beach';

@Injectable({
  providedIn: 'root',
})
export class SearchBeaches { // Renamed class to follow Angular naming conventions (PascalCase)
  private firestore = inject(Firestore);
  private beachCollection: CollectionReference<DocumentData> = collection(this.firestore, 'beaches');

  async searchBeaches(searchQuery?: string, filters?: any): Promise<Beach[]> {
    try {
      console.log('Iniciando búsqueda en searchBeaches:', { searchQuery, filters });

      const q = firestoreQuery(this.beachCollection);
      console.log('Ejecutando consulta a Firestore...');
      const querySnapshot = await getDocs(q);
      const beaches: Beach[] = [];

      console.log('Documentos obtenidos:', querySnapshot.size);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('Documento encontrado:', { id: doc.id, ...data });
        beaches.push({ id: doc.id, ...data } as Beach);
      });

      const filteredBeaches = beaches.filter((beach) => {
        const beachName = beach.name.toLowerCase();
        const beachIsland = beach.island.toLowerCase();
        const normalizedSearchQuery = searchQuery?.toLowerCase() ?? '';

        const matchesQuery = normalizedSearchQuery
          ? beachName.includes(normalizedSearchQuery)
          : true;

        if (!filters) {
          console.log('Sin filtros, resultado para playa:', beach.name, matchesQuery);
          return matchesQuery;
        }

        const matchesIsland = filters.island
          ? beachIsland === filters.island.toLowerCase()
          : true;
        const matchesSand = filters.hasSand ? beach.hasSand : true;
        const matchesRock = filters.hasRock ? beach.hasRock : true;
        const matchesShowers = filters.hasShowers ? beach.hasShowers : true;
        const matchesToilets = filters.hasToilets ? beach.hasToilets : true;

        const result =
          matchesQuery &&
          matchesIsland &&
          matchesSand &&
          matchesRock &&
          matchesShowers &&
          matchesToilets;

        console.log('Filtrando playa:', beach.name, {
          matchesQuery,
          matchesIsland,
          matchesSand,
          matchesRock,
          matchesShowers,
          matchesToilets,
          result,
        });

        return result;
      });

      console.log('La searchQuery es:', searchQuery);
      console.log('Playas filtradas:', filteredBeaches.length, filteredBeaches.map((b) => b.name));
      return filteredBeaches;
    } catch (error) {
      console.error('Error en searchBeaches:', error);
      throw error;
    }
  }

  async getBlueFlagBeaches(): Promise<Beach[]> {
    try {
      const q = firestoreQuery(this.beachCollection);
      const querySnapshot = await getDocs(q);
      const beaches: Beach[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Use bracket notation to access blueFlag
        if (data['blueFlag'] === true) {
          beaches.push({ id: doc.id, ...data } as Beach);
        }
      });

      console.log('Playas con bandera azul:', beaches.length, beaches.map((b) => b.name));
      return beaches;
    } catch (error) {
      console.error('Error en getBlueFlagBeaches:', error);
      throw error;
    }
  }
}
