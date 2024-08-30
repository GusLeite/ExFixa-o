import { Component } from '@angular/core';

@Component({
  selector: 'app-atendente',
  standalone: true,
  imports: [],
  templateUrl: './atendente.component.html',
  styleUrl: './atendente.component.css'
})
export class AtendenteComponent {
  id: number | undefined;
  departamento: string | undefined;
  setor: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
