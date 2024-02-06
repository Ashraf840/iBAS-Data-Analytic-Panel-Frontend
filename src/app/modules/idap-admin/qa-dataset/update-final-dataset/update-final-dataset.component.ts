import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlItem } from 'src/app/utility/utils/form';

@Component({
  selector: 'app-update-final-dataset',
  templateUrl: './update-final-dataset.component.html',
  styleUrls: ['./update-final-dataset.component.css']
})
export class UpdateFinalDatasetComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private router: Router,
  private dialog: MatDialog,
  private fb: FormBuilder,
  private activatedRoute: ActivatedRoute,
  public dialogRef: MatDialogRef<UpdateFinalDatasetComponent>) { }

  form!: FormGroup;
  isInline!: boolean;
  isLoading: boolean = false;

  lenguages: ControlItem[] = [
    {
      value: "Bangla",
      label: "Bangla"
    },
    {
      value: "English",
      label: "English"
    }
  ];

  statuses: ControlItem[] = [
    {
      value: "Active",
      label: "Active"
    },
    {
      value: "Inactive",
      label: "Inactive"
    }
  ];

  ngOnInit(): void {
    this.createform();
  }

  onSubmit(){

  }

  createform(){
    this.form = this.fb.group({
      oid: [this.data.oid, {
        updateOn: 'change', validators: [
            Validators.required
        ]
    }],
      banglaQuestion: ["Bangla Question", {
          updateOn: 'change', validators: [
              Validators.required
          ]
      }],
      englishQuestion: ["English Question", {
        updateOn: 'change', validators: [
            Validators.required
        ]
    }],
    transliterateQuestion: ["Transliterate Question", {
      updateOn: 'change', validators: [
          Validators.required
      ]
     }],
     banglaAnswer: ["Bangla Answer", {
      updateOn: 'change', validators: [
        Validators.required
    ]
     }],
     englishAnswer: ["Englsh Answer", {
      updateOn: 'change', validators: [
        Validators.required
        ]    
     }]
    });
  }

  close(){
    this.dialogRef.close();
  }

}
