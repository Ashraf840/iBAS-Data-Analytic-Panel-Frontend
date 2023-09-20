import { Component, OnInit } from '@angular/core';
// import { Language } from './types/langauge';
import { LanguageService } from './services/language.service';


@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  languages: any | undefined;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void { 
    this.languageService.getLangList().subscribe(data => {
      this.languages = data;
      // console.log(`Fetched languages:`, this.languages);
    });
  }
}
