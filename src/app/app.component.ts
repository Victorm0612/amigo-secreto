import { Component, OnInit } from '@angular/core';
import { ItemModel, StepEnum, UserModel } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'amigo-secreto';
  isLoading = false;
  stepEnum = StepEnum;
  user: UserModel | undefined;
  ticket: ItemModel | undefined;
  currentState: StepEnum = StepEnum.Initial;
  images: ItemModel[] = [
    {  id: 3, image: 'Nata', name: 'Natalia', lastname: 'Mesa', friend: 4 },
    {  id: 7, image: 'laura_prado', name: 'Laura', lastname: 'Prado', friend: 8 },
    {  id: 2, image: 'maleja', name: 'Maleja', lastname: 'Obando', friend: 3 },
    {  id: 5, image: 'maria_claudia', name: 'Maria C.', lastname: 'Torres', friend: 6 },
    {  id: 4, image: 'laura_serna', name: 'Laura', lastname: 'Serna', friend: 5 },
    {  id: 1, image: 'paula', name: 'Paula', lastname: 'Hurtado', friend: 2 },
    {  id: 6, image: 'daniela_150x150', name: 'Daniela',  lastname: 'Hinestroza', friend: 7 },
    {  id: 9, image: 'sara', name: 'Sara', lastname: 'Quiceno', friend: 1 },
    {  id: 8, image: 'eri', name: 'Erika', lastname: 'Barón', friend: 9 },
  ]

  ngOnInit(): void {
    const found = localStorage.getItem('user');
    const ticket = localStorage.getItem('ticket');

    if (found && ticket) {
      this.user = JSON.parse(found);
      this.ticket = JSON.parse(ticket);
      this.currentState = StepEnum.Reveal;
    }
  }

  nextToChoose(): void {
    this.currentState = StepEnum.WhoAreYou;
  }

  nextToPlay(item: ItemModel): void {
    this.user = {
      name: item.name,
      lastname: item.lastname
    };
    localStorage.setItem('user', JSON.stringify(this.user));
    this.currentState = StepEnum.Playing;
    this.isLoading = true;
    setTimeout(() => this.revealFriend(), 3000);
  }

  revealFriend(): void {
    const found = this.images.find(({ name, lastname }) => name === this.user?.name && lastname === this.user?.lastname)?.friend;
    if(!found) {
      console.error('Algo salió mal! Escribanle a Victoor!');
      return;
    }
    this.ticket = this.images.find(item => item.id === found);
    localStorage.setItem('ticket', JSON.stringify(this.ticket));
    this.currentState = StepEnum.Reveal;
  }
}
