import { Component, Input } from '@angular/core';
import { GithubUser } from '../../../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule,RouterModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user!: GithubUser;

}
