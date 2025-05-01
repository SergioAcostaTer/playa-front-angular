import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, catchError, from, switchMap } from 'rxjs';
import { Beach } from '../models/beach';
import { Comment } from '../models/comment';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { BeachService } from './beach.service';

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
  private commentCollection: CollectionReference<DocumentData> = collection(
    this.firestore,
    'comments'
  );

  async createComment(comment: {
    text: string;
    rating: number;
    userId: string;
    beachId: string;
  }): Promise<void> {
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

  async updateComment(
    commentId: string,
    updatedData: { text?: string; rating?: number }
  ): Promise<void> {
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
      switchMap((querySnapshot) => {
        const comments: Comment[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Comment[];

        return this.beachService.getAllBeaches().pipe(
          switchMap((beaches) => {
            const beachMap = new Map(beaches.map((beach) => [beach.id, beach]));
            return this.authService.getUsers().pipe(
              switchMap((users) => {
                const userMap = new Map(users.map((user) => [user.id, user]));
                return new Observable<CommentWithBeachAndUser[]>((observer) => {
                  const result = comments
                    .map((comment) => ({
                      comment,
                      beach: beachMap.get(comment.beachId),
                      user: userMap.get(comment.userId),
                    }))
                    .filter(
                      (item): item is CommentWithBeachAndUser =>
                        item.beach !== undefined && item.user !== undefined
                    );
                  observer.next(result);
                  observer.complete();
                });
              })
            );
          })
        );
      }),
      catchError((error) => {
        console.error('Error fetching comments:', error);
        throw error;
      })
    );
  }
}
