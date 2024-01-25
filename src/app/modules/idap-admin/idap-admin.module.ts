import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { QaDatasetModule } from './qa-dataset/qa-dataset.module';
// The "Language", "Answer", "Question" & "QA-Dataset" services are imported here since these will be available through this "idap-admin" module
// import { LanguageService } from './qa-dataset/components/language/services/language.service';
// import { AnswerService } from './qa-dataset/components/answer/services/answer.service';
// import { QuestionService } from './qa-dataset/components/question/services/question.service';
import { QuestionAnswerService } from './qa-dataset/services/question-answer.service';
import { AppIdapAdminRoutingModule } from './idap-admin-routing.module';
import { UtilityModule } from 'src/app/utility/utility.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    UtilityModule,
    MaterialModule,
    SharedModule,
    CommonModule, 
    DashboardModule, 
    QaDatasetModule, 
    AppIdapAdminRoutingModule
  ],
  // providers: [LanguageService, AnswerService, QuestionService, QuestionAnswerService],
  providers: [QuestionAnswerService],
})
export class IdapAdminModule { }
