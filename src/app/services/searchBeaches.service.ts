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
export class searchBeaches {
  private firestore = inject(Firestore);
  private beachCollection: CollectionReference<DocumentData> = collection(this.firestore, 'beaches');

  async searchBeaches(searchQuery?: string, filters?: any): Promise<Beach[]> {
    try {
      console.log('Iniciando búsqueda en searchBeaches:', { searchQuery, filters });

      // Obtener todos los documentos de la colección
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

      // Aplicar filtros y búsqueda por nombre en el cliente
      const filteredBeaches = beaches.filter((beach) => {
        const beachName = beach.name.toLowerCase();
        const beachIsland = beach.island.toLowerCase();
        const normalizedSearchQuery = searchQuery?.toLowerCase() ?? '';

        // Filtrar por nombre: verificar si el nombre contiene searchQuery
        const matchesQuery = normalizedSearchQuery
          ? beachName.includes(normalizedSearchQuery)
          : true;

        if (!filters) {
          console.log('Sin filtros, resultado para playa:', beach.name, matchesQuery);
          return matchesQuery;
        }

        // Aplicar filtros adicionales
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
}
