import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly orgContacts: { name: string; imgSrc: string; phone: string }[] = [
    {
      name: '',
      imgSrc: 'assets/mes.png',
      phone: 'ცხელი ხაზი: 9100',
    },
    {
      name: '',
      imgSrc: 'assets/emis.png',
      phone: 'Eflow-ს ცხელი ხაზი: 5500, ტექნიკური დახმარება: 9300, მონაცემთა ბაზები: 9400',
    },
    {
      name: '',
      imgSrc: 'assets/esida.png',
      phone: 'ცხელი ხაზი: 2100',
    },
    {
      name: '',
      imgSrc: 'assets/eqe.png',
      phone: 'ცხელი ხაზი: 3599',
    },
    {
      name: '',
      imgSrc: 'assets/tpdc.png',
      phone: 'ცხელი ხაზი: 4710',
    },
    {
      name: '',
      imgSrc: 'assets/rustaveli.png',
      phone: 'ცხელი ხაზი: 4020',
    },
    {
      name: '',
      imgSrc: 'assets/mandat.png',
      phone: 'ცხელი ხაზი: 3335',
    },
    {
      name: '',
      imgSrc: 'assets/iec.png',
      phone: 'ცხელი ხაზი: 2800',
    },
  ];
}
