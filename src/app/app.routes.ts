import {Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AdvertisementListComponent} from "./components/advertisement-list/advertisement-list.component";
import {AdvertisementComponent} from "./components/advertisement/advertisement.component";
import {DiscussionListComponent} from "./components/discussion-list/discussion-list.component";
import {DiscussionComponent} from "./components/discussion/discussion.component";
import {CreateDiscussionComponent} from "./components/create-discussion/create-discussion.component";
import {CreateAdvertisementComponent} from "./components/create-advertisement/create-advertisement.component";

export const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path: "api/advertisement", component: AdvertisementListComponent},
  {path: "api/advertisement/:id", component: AdvertisementComponent},
  {path: "api/create_advertisement", component: CreateAdvertisementComponent},
  {path: "api/discussions/:advertisement_id", component: DiscussionListComponent},
  {path: "api/discussion/:discussion_id", component: DiscussionComponent},
  {path: "api/create_discussion/:advertisement_id", component: CreateDiscussionComponent},
];
