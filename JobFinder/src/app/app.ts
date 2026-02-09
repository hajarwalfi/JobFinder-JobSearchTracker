import { Component } from '@angular/core';
import { JsonServerTest } from './services/json-server-test';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  users: any[] = [];

  constructor(private jsonServerTest: JsonServerTest) {}

  // GET - fetch all users
  loadUsers() {
    this.jsonServerTest.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log('GET /users :', data);
      },
      error: (err) => console.error('GET error:', err)
    });
  }

  // POST - add a test user
  addTestUser() {
    const newUser = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: '123456'
    };
    this.jsonServerTest.addUser(newUser).subscribe({
      next: (data) => {
        console.log('POST /users :', data);
        this.loadUsers(); // reload after adding
      },
      error: (err) => console.error('POST error:', err)
    });
  }

  // DELETE - delete a user by id
  deleteUser(id: number) {
    this.jsonServerTest.deleteUser(id).subscribe({
      next: () => {
        console.log('DELETE /users/' + id + ' : success');
        this.loadUsers(); // reload after deleting
      },
      error: (err) => console.error('DELETE error:', err)
    });
  }
}
