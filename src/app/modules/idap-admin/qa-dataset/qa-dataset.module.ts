import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { QaDatasetComponent } from './qa-dataset.component';
// import { NewQuestionAnswerComponent } from './cud_components/new-question-answer/new-question-answer.component';
// import { UpdateQuestionAnswerComponent } from './update-question-answer/update-question-answer.component';

import { AppRoutingModule } from 'src/app/app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LanguageComponent } from './components/language/language.component';
// import { CreateLanguageComponent } from './components/language/cud_components/create-language/create-language.component';
// import { UpdateLanguageComponent } from './components/language/cud_components/update-language/update-language.component';
// import { AnswerComponent } from './components/answer/answer.component';
// import { CreateAnswerComponent } from './components/answer/cud_components/create-answer/create-answer.component'; // Require while using "formGroup" in the HTML template
// import { QuestionComponent } from './components/question/question.component';
// import { QuestionAnswerListComponent } from './question-answer-list/question-answer-list.component';
// import { CreateQuestionComponent } from './components/question/cud_components/create-question/create-question.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { NewQuestionAnswerComponent } from './cud_components/new-question-answer/new-question-answer.component';
import { UpdateQuestionAnswerComponent } from './cud_components/update-question-answer/update-question-answer.component';
import { QaDatasetRoutingModule } from './qa-dataset-routing.module';
import { ListQuestionAnswerComponent } from './cud_components/list-question-answer/list-question-answer.component';
import { SuggestiveQaComponent } from './suggestive-qa/suggestive-qa.component';
import { SuggestiveQaService } from './services/suggestive-qa.service';
import { FinalDatasetComponent } from './final-dataset/final-dataset.component';
import { WebsocketService_FinalDataset } from './services/websockets/finalDataset.websocket.service';
import { WebsocketService_SuggestiveQa } from './services/websockets/suggestive-qa-websocket.service';
import { UtilityModule } from 'src/app/utility/utility.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { UpdateFinalDatasetComponent } from './update-final-dataset/update-final-dataset.component';

@NgModule({
  declarations: [
    QaDatasetComponent,
    NewQuestionAnswerComponent,
    UpdateQuestionAnswerComponent,
    ListQuestionAnswerComponent,
    SuggestiveQaComponent,
    FinalDatasetComponent,
    UpdateFinalDatasetComponent
  ],
  imports: [
    UtilityModule,
    MaterialModule,
    SharedModule,
    QaDatasetRoutingModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [QaDatasetComponent],
  providers: [
    SuggestiveQaService,
    WebsocketService_FinalDataset,
    WebsocketService_SuggestiveQa,
  ],
})
export class QaDatasetModule { }
