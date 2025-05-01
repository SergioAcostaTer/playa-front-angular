import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  CollectionReference,
  DocumentData, doc,
} from '@angular/fire/firestore';
import { Observable, from, map, catchError, switchMap } from 'rxjs';
import { BeachService } from './beach.service';
import { AuthService } from './auth.service';
import { Beach } from '../models/beach';
import { User } from '../models/user';
import { Comment } from '../models/comment';

export interface CommentWithBeachAndUser {
  comment: Comment;
  beach: Beach;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private firestore = inject(Firestore);
  private beachService = inject(BeachService);
  private authService = inject(AuthService);
  private commentCollection: CollectionReference<DocumentData> = collection(this.firestore, 'comments');

  async createComment(comment: { text: string; rating: number; userId: string; beachId: string }): Promise<void> {
    try {
      const commentData: Omit<Comment, 'id'> = {
        text: comment.text,
        rating: comment.rating,
        userId: comment.userId,
        beachId: comment.beachId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await addDoc(this.commentCollection, commentData);
    } catch (error: any) {
      console.error('Error creating comment:', error);
      throw new Error(`Error al crear comentario: ${error.message}`);
    }
  }

  async updateComment(commentId: string, updatedData: { text?: string; rating?: number }): Promise<void> {
    try {
      const commentDocRef = doc(this.firestore, `comments/${commentId}`);
      const updatePayload: Partial<Comment> = {
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };
      await updateDoc(commentDocRef, updatePayload);
    } catch (error: any) {
      console.error('Error updating comment:', error);
      throw new Error(`Error al actualizar comentario: ${error.message}`);
    }
  }

  async deleteComment(commentId: string): Promise<void> {
    try {
      const commentDocRef = doc(this.firestore, `comments/${commentId}`);
      await deleteDoc(commentDocRef);
    } catch (error: any) {
      console.error('Error deleting comment:', error);
      throw new Error(`Error al eliminar comentario: ${error.message}`);
    }
  }

  getCommentsByBeachId(beachId: string): Observable<CommentWithBeachAndUser[]> {
    const q = query(this.commentCollection, where('beachId', '==', beachId));
    return from(getDocs(q)).pipe(
      switchMap((querySnapshot) =>
        from(
          Promise.all(
            querySnapshot.docs.map(async (docSnap) => {
              const data = docSnap.data() as Omit<Comment, 'id'>;
              const comment: Comment = {
                id: docSnap.id,
                text: data.text,
                rating: data.rating,
                userId: data.userId,
                beachId: data.beachId,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
              };

              const beach = await this.beachService.getBeachById(comment.beachId).toPromise();
              const user = await this.authService.getUserById(comment.userId).toPromise();

              return beach && user ? { comment, beach, user } : null;
            })
          )
        ).pipe(map((results) => results.filter((item): item is CommentWithBeachAndUser => item !== null)))
      ),
      catchError((error) => {
        console.error('Error fetching comments by beach ID:', error);
        throw new Error(`Error al obtener comentarios: ${error.message}`);
      })
    );
  }
}
