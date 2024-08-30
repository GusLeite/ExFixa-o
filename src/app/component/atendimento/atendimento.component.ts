import { Component } from '@angular/core';

@Component({
  selector: 'app-atendimento',
  standalone: true,
  imports: [],
  templateUrl: './atendimento.component.html',
  styleUrl: './atendimento.component.css'
})
export class AtendimentoComponent {
  ticket: number | undefined;
  texto: string | undefined;
  id_atendente: number | undefined;
  motivo: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
