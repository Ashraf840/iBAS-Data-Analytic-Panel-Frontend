import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { QaDatasetComponent } from './qa-dataset/qa-dataset.component';
// import { QuestionAnswerListComponent } from './qa-dataset/question-answer-list/question-answer-list.component';
import { NewQuestionAnswerComponent } from './qa-dataset/cud_components/new-question-answer/new-question-answer.component';
import { NgModule } from '@angular/core';
// import { UpdateQuestionAnswerComponent } from './qa-dataset/update-question-answer/update-question-answer.component';

// import { LanguageComponent } from './qa-dataset/components/language/language.component';
// import { CreateLanguageComponent } from './qa-dataset/components/language/cud_components/create-language/create-language.component';
// import { UpdateLanguageComponent } from './qa-dataset/components/language/cud_components/update-language/update-language.component';
// import { AnswerComponent } from './qa-dataset/components/answer/answer.component';
// import { CreateAnswerComponent } from './qa-dataset/components/answer/cud_components/create-answer/create-answer.component';
// import { QuestionComponent } from './qa-dataset/components/question/question.component';
// import { CreateQuestionComponent } from './qa-dataset/components/question/cud_components/create-question/create-question.component';

export const routes: Routes = [
  // { path: '', component: DashboardComponent },
  {
    path: "qa-dataset",
    loadChildren: () =>
      import("./qa-dataset/qa-dataset.module").then(
        (m) => m.QaDatasetModule
      ),
  },

  // { path: 'qa-dataset', component: QaDatasetComponent },
    // { path: 'qa-dataset/create', component: NewQuestionAnswerComponent },
  // { path: 'qa-dataset/update', component: UpdateQuestionAnswerComponent },
  // {
  //   path: "",
  //   loadChildren: () =>
  //     import("./qa-dataset/qa-dataset.module").then(
  //       (m) => m.QaDatasetModule
  //     ),
  // },

  // { path: '', component: DashboardComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AppIdapAdminRoutingModule { }
