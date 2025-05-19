import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfilePageComponent implements OnInit {
  user: User | null = null;
  editedUser: User | null = null;
  loading = true;
  error: string | null = null;
  editMode = false;
  showDeleteVerification = false;
  showDeleteConfirmation = false;
  verificationUsername: string = '';
  usernameError: boolean = false;
  deleteConfirmed: boolean = false;
  showImageSearch = false;
  searchQuery = '';
  searchSuggestions: any[] = [];
  private searchSubject = new Subject<string>();
  userService = inject(UserService);
  router = inject(Router);
  http = inject(HttpClient); // Inyectar HttpClient
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((query) => this.fetchSuggestions(query));
    // Ejecutar initializeData solo en el cliente
    if (isPlatformBrowser(this.platformId)) {
      this.initializeData();
    } else {
      // En el servidor, establecer un estado inicial seguro
      this.loading = false;
    }
  }

  private async initializeData() {
    try {
      const response = await this.userService.getMe();
      this.user = { ...response };
    } catch (error: any) {
      console.error('Error fetching user:', error);
      if (error.response?.status === 401) {
        this.error = 'No has iniciado sesión o no estás registrado.';
        toast.error('Por favor, inicia sesión para ver tu perfil');
      } else if (error.message?.includes('Network Error')) {
        this.error = 'No se pudo conectar al servidor. Verifica tu conexión.';
        toast.error('Error de red. Intenta de nuevo más tarde');
      } else {
        this.error = 'No se pudieron cargar los datos del usuario.';
        toast.error('Error al cargar el perfil');
      }
    } finally {
      this.loading = false;
    }
  }

  enableEdit() {
    if (this.user) {
      this.editedUser = { ...this.user };
      this.editMode = true;
      toast.info('Modo de edición activado');
    }
  }

  cancelEdit() {
    this.editedUser = null;
    this.editMode = false;
    toast.info('Cambios descartados');
  }

  async saveChanges() {
    if (!this.user || !this.editedUser) return;

    try {
      this.user = { ...this.editedUser };
      await this.userService.updateUser(this.user);
      this.userService.loadUser();
      console.log('User updated successfully:', this.user);
      toast.success('Perfil actualizado correctamente');
      this.editMode = false;
      this.editedUser = null;
    } catch (error) {
      console.error('Error updating user:', error);
      this.error = 'No se pudieron guardar los cambios.';
      toast.error('Error al actualizar el perfil');
    }
  }

  openDeleteVerification() {
    this.showDeleteVerification = true;
    this.verificationUsername = '';
    this.usernameError = false;
  }

  closeDeleteVerification() {
    this.showDeleteVerification = false;
    this.verificationUsername = '';
    this.usernameError = false;
  }

  validateUsername() {
    this.usernameError = !this.verificationUsername || this.verificationUsername !== this.user?.username;
  }

  proceedToDeleteConfirmation() {
    if (!this.usernameError && this.verificationUsername === this.user?.username) {
      this.showDeleteVerification = false;
      this.showDeleteConfirmation = true;
      this.deleteConfirmed = false;
    }
  }

  closeDeleteConfirmation() {
    this.showDeleteConfirmation = false;
    this.deleteConfirmed = false;
  }

  async deleteAccount() {
    if (!this.deleteConfirmed || !this.user) return;

    try {
      await this.userService.deleteMe();
      toast.success('Cuenta borrada exitosamente');
      this.closeDeleteConfirmation();
      console.log('Navigating to /login');
      const navigationSuccess = await this.router.navigate(['/login']);
      if (!navigationSuccess) {
        console.error('Navigation to /login failed');
        toast.error('No se pudo redirigir a la página de inicio de sesión');
      }
    } catch (error: any) {
      console.error('Error deleting account:', error);
      toast.error('Error al borrar la cuenta');
      this.error = 'No se pudo borrar la cuenta. Intenta de nuevo.';
    }
  }

  openImageChange() {
    this.showImageSearch = true;
    this.searchQuery = '';
    this.searchSuggestions = [];
  }

  closeImageSearch() {
    this.showImageSearch = false;
    this.searchQuery = '';
    this.searchSuggestions = [];
  }

  onSearchChange(query: string) {
    if (!query.trim()) {
      this.searchSuggestions = [];
    } else {
      this.searchSubject.next(query);
    }
  }

  async fetchSuggestions(query: string) {
    try {
      // Usar HttpClient en lugar de fetch
      const result = await this.http
        .get<{ data: any[] }>(`http://localhost:8000/beaches/searchSuggestions?q=${encodeURIComponent(query)}`)
        .toPromise();
      this.searchSuggestions = result?.data || [];
    } catch (e) {
      console.error('Failed to fetch suggestions', e);
    }
  }

  selectBeach(suggestion: any) {
    if (this.editedUser) {
      this.editedUser.avatarUrl = suggestion.image || 'https://via.placeholder.com/100';
    }
    this.showImageSearch = false;
  }
}