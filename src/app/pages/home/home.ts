import { Component } from '@angular/core';
import { WorkerCard } from "../../components/worker-card/worker-card";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [WorkerCard, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  public iterations = new Array(38);

}
