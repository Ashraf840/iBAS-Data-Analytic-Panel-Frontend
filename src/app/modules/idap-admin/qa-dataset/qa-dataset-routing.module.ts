import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListQuestionAnswerComponent } from './cud_components/list-question-answer/list-question-answer.component';
import { NewQuestionAnswerComponent } from './cud_components/new-question-answer/new-question-answer.component';

export const routes: Routes = [
  { path: 'list', component: ListQuestionAnswerComponent },
  { path: 'add', component: NewQuestionAnswerComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class QaDatasetRoutingModule { }
