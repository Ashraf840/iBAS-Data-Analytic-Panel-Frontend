import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListQuestionAnswerComponent } from './cud_components/list-question-answer/list-question-answer.component';
import { NewQuestionAnswerComponent } from './cud_components/new-question-answer/new-question-answer.component';
import { SuggestiveQaComponent } from './suggestive-qa/suggestive-qa.component';
import { FinalDatasetComponent } from './final-dataset/final-dataset.component';

export const routes: Routes = [
  { path: 'list', component: ListQuestionAnswerComponent },
  { path: 'add', component: NewQuestionAnswerComponent },
  { path: 'suggestive-qa', component: SuggestiveQaComponent },
  { path: 'final-dataset', component: FinalDatasetComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class QaDatasetRoutingModule { }
