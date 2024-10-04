import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  constructor(private route: Router) { }
  ngOnInit(): void {
  }
  doSearch(value: string) {
    console.log(`value=${value}`);
    this.route.navigateByUrl(`/search/${value}`);
  }

}

