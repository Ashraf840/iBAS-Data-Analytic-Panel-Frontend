import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-language',
  templateUrl: './create-language.component.html',
  styleUrls: ['./create-language.component.css']
})
export class CreateLanguageComponent implements OnInit {
  constructor(private languageService: LanguageService, private router: Router) {}

  data: any

  ngOnInit(): void {}

  form = new FormGroup({
    language_name: new FormControl('', Validators.required),  // "language_name" is associated with the "formControlName" in the HTML-template
  })

  addLang() {
    // console.log(`Submit button is clicked!`);
    // console.log(`form value:`, this.form.value);
    
    this.data = this.form.value
    this.languageService.addLang(this.data).subscribe(data => {
      this.router.navigate(['/qa-dataset/language'])
    })
  }
}
